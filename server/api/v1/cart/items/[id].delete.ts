import { getRouterParam } from 'h3'
import { resolveCart } from '~/server/utils/cart'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeCart } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const itemId = String(getRouterParam(event, 'id'))
  const cart = await resolveCart(event)
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } })
  if (!item) fail('NOT_FOUND', 'Позиция корзины не найдена')
  await prisma.cartItem.delete({ where: { id: itemId } })
  const updated = await prisma.cart.findUniqueOrThrow({ where: { id: cart.id }, include: { items: { orderBy: { createdAt: 'asc' }, include: { product: { include: { category: true, images: { orderBy: { sortOrder: 'asc' }, take: 1 } } } } } } })
  return ok(serializeCart(updated))
})
