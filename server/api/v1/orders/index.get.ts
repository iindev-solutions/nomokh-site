import { requireUser } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { ok } from '~/server/utils/response'
import { serializeOrder } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const orders = await prisma.order.findMany({ where: { userId: user.id }, include: { items: true }, orderBy: { createdAt: 'desc' } })
  return ok(orders.map(serializeOrder))
})
