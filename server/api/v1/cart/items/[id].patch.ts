import { getRouterParam, readBody } from 'h3'
import { z } from 'zod'
import { resolveCart } from '~/server/utils/cart'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeCart } from '~/server/utils/serializers'

const schema = z.object({ quantity: z.number().int().min(1).max(99) })

export default defineEventHandler(async (event) => {
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Неверное количество', input.error.flatten())
  const itemId = String(getRouterParam(event, 'id'))
  const cart = await resolveCart(event)
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id }, include: { product: true } })
  if (!item) fail('NOT_FOUND', 'Позиция корзины не найдена')
  if (input.data.quantity > item.product.stockQty) fail('CONFLICT', 'Недостаточно товара на складе')
  await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: input.data.quantity } })
  const updated = await prisma.cart.findUniqueOrThrow({ where: { id: cart.id }, include: { items: { orderBy: { createdAt: 'asc' }, include: { product: { include: { category: true, images: { orderBy: { sortOrder: 'asc' }, take: 1 } } } } } } })
  return ok(serializeCart(updated))
})
