import { getRouterParam } from 'h3'
import { requireUser } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeOrder } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = String(getRouterParam(event, 'id'))
  const order = await prisma.order.findFirst({ where: { id, userId: user.id }, include: { items: true } })
  if (!order) fail('NOT_FOUND', 'Заказ не найден')
  return ok(serializeOrder(order))
})
