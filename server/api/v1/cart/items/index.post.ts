import { readBody } from 'h3'
import { z } from 'zod'
import { resolveCart } from '~/server/utils/cart'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeCart } from '~/server/utils/serializers'

const schema = z.object({ productId: z.string().uuid(), quantity: z.number().int().min(1).max(99).default(1) })

export default defineEventHandler(async (event) => {
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Неверные данные корзины', input.error.flatten())

  const [cart, product] = await Promise.all([
    resolveCart(event),
    prisma.product.findFirst({ where: { id: input.data.productId, isActive: true } })
  ])
  if (!product) fail('NOT_FOUND', 'Товар не найден')
  if (product.stockQty <= 0) fail('CONFLICT', 'Товар закончился')
  const current = cart.items.find((item) => item.productId === product.id)
  const finalQuantity = (current?.quantity || 0) + input.data.quantity
  if (finalQuantity > 99) fail('CONFLICT', 'Максимум 99 единиц одного товара')
  if (finalQuantity > product.stockQty) fail('CONFLICT', 'Недостаточно товара на складе')

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    update: { quantity: finalQuantity, priceSnapshot: product.price },
    create: { cartId: cart.id, productId: product.id, quantity: finalQuantity, priceSnapshot: product.price }
  })

  const updated = await prisma.cart.findUniqueOrThrow({ where: { id: cart.id }, include: { items: { orderBy: { createdAt: 'asc' }, include: { product: { include: { category: true, images: { orderBy: { sortOrder: 'asc' }, take: 1 } } } } } } })
  return ok(serializeCart(updated))
})
