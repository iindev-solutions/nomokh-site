import { getRouterParam } from 'h3'
import { requireUser } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeOrder } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const id = String(getRouterParam(event, 'id'))
  const user = await requireUser(event)
  const order = await prisma.order.findFirst({ where: { id, ...(user.role === 'ADMIN' ? {} : { userId: user.id }) }, include: { items: true } })
  if (!order) fail('NOT_FOUND', 'Заказ не найден')
  if (!['DRAFT', 'CONFIRMED'].includes(order.status) || order.paymentStatus === 'PAID') fail('CONFLICT', 'Этот заказ уже нельзя отменить')
  const updated = await prisma.$transaction(async (tx) => {
    const cancelled = await tx.order.update({ where: { id }, data: { status: 'CANCELLED', paymentStatus: 'CANCELLED' }, include: { items: true } })
    for (const item of cancelled.items) {
      if (item.productId) await tx.product.update({ where: { id: item.productId }, data: { stockQty: { increment: item.quantity } } })
    }
    return cancelled
  })
  return ok(serializeOrder(updated))
})
