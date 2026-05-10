import { readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { decideYooKassaOrderUpdate, fetchYooKassaPayment } from '~/server/utils/yookassa'

export default defineEventHandler(async (event) => {
  const payload = await readBody(event)
  const paymentId = payload?.object?.id
  const orderId = payload?.object?.metadata?.orderId
  if (!paymentId || !orderId) return ok({ ignored: true })

  const order = await prisma.order.findUnique({ where: { id: String(orderId) }, include: { items: true } })
  if (!order || (order.paymentExternalId && order.paymentExternalId !== paymentId)) return ok({ ignored: true })
  if (order.paymentType !== 'YOOKASSA') return ok({ ignored: true })

  let verifiedPayment
  try {
    verifiedPayment = await fetchYooKassaPayment(String(paymentId))
  } catch {
    fail('UNAUTHORIZED', 'YooKassa payment verification failed')
  }

  const update = decideYooKassaOrderUpdate({ order, payment: verifiedPayment || payload.object })
  if (!update) return ok({ ignored: true })

  if (update.status === 'CANCELLED') {
    await prisma.$transaction(async (tx) => {
      const cancelled = await tx.order.updateMany({
        where: { id: order.id, status: { in: ['DRAFT', 'CONFIRMED'] }, paymentStatus: { not: 'PAID' } },
        data: update as any
      })
      if (cancelled.count === 1) {
        for (const item of order.items) {
          if (item.productId) await tx.product.update({ where: { id: item.productId }, data: { stockQty: { increment: item.quantity } } })
        }
      }
    })
  } else {
    await prisma.order.update({ where: { id: order.id }, data: update as any })
  }
  return ok({ processed: true })
})
