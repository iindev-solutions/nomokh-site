import { randomUUID } from 'node:crypto'
import { readBody } from 'h3'
import { z } from 'zod'
import { createYooKassaPayment } from '~/server/utils/yookassa'
import { resolveCart } from '~/server/utils/cart'
import { quoteDelivery } from '~/server/utils/delivery'
import { getCurrentUser } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeOrder } from '~/server/utils/serializers'
import { normalizePhone } from '~/server/utils/security'

const schema = z.object({
  deliveryType: z.enum(['CDEK', 'POST', 'PICKUP']),
  address: z.record(z.any()).default({}),
  contactPhone: z.string().min(10).max(24),
  contactName: z.string().min(2).max(120),
  paymentType: z.enum(['YOOKASSA', 'SBER', 'TINKOFF', 'CASH']).default('YOOKASSA')
})

function createOrderNumber() {
  const now = new Date()
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  return `NM-${date}-${randomUUID().slice(0, 8).toUpperCase()}`
}

export default defineEventHandler(async (event) => {
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Проверьте данные заказа', input.error.flatten())
  const cart = await resolveCart(event)
  if (!cart.items.length) fail('VALIDATION_ERROR', 'Корзина пустая')
  if (!['YOOKASSA', 'CASH'].includes(input.data.paymentType)) fail('VALIDATION_ERROR', 'Этот способ оплаты пока не подключен в MVP')
  const user = await getCurrentUser(event)

  const pricedItems = cart.items.map((item) => {
    if (!item.product?.isActive) fail('CONFLICT', `Товар недоступен: ${item.product?.name || item.productId}`)
    if (item.quantity > item.product.stockQty) fail('CONFLICT', `Недостаточно товара: ${item.product.name}`)
    return { productId: item.productId, name: item.product.name, price: Number(item.product.price), quantity: item.quantity }
  })
  const subtotal = pricedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryAmount = quoteDelivery(input.data.deliveryType).amount
  const totalAmount = subtotal + deliveryAmount

  const order = await prisma.$transaction(async (tx) => {
    for (const item of pricedItems) {
      const stock = await tx.product.updateMany({ where: { id: item.productId, stockQty: { gte: item.quantity } }, data: { stockQty: { decrement: item.quantity } } })
      if (stock.count !== 1) fail('CONFLICT', `Недостаточно товара: ${item.name}`)
    }

    return await tx.order.create({
      data: {
        orderNumber: createOrderNumber(),
        userId: user?.id,
        status: 'DRAFT',
        totalAmount,
        deliveryAmount,
        discountAmount: 0,
        deliveryType: input.data.deliveryType,
        deliveryAddress: input.data.address,
        contactPhone: normalizePhone(input.data.contactPhone),
        contactName: input.data.contactName,
        paymentType: input.data.paymentType,
        paymentStatus: 'PENDING',
        items: {
          create: pricedItems.map((item) => ({ productId: item.productId, nameSnapshot: item.name, priceSnapshot: item.price, quantity: item.quantity }))
        }
      }
    })
  })

  let payment
  try {
    payment = input.data.paymentType === 'CASH'
      ? { paymentUrl: `/checkout/success?order=${order.id}`, externalId: null, mode: 'cash' }
      : await createYooKassaPayment(order)
  } catch (error) {
    await prisma.$transaction(async (tx) => {
      for (const item of pricedItems) await tx.product.update({ where: { id: item.productId }, data: { stockQty: { increment: item.quantity } } })
      await tx.order.delete({ where: { id: order.id } })
    }).catch(() => {})
    throw error
  }

  const updated = await prisma.$transaction(async (tx) => {
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
    return await tx.order.update({ where: { id: order.id }, data: { status: 'CONFIRMED', paymentExternalId: payment.externalId }, include: { items: true } })
  })

  return ok({ order: serializeOrder(updated), paymentUrl: payment.paymentUrl, paymentMode: payment.mode })
})
