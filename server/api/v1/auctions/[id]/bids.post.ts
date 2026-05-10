import { getRouterParam, readBody } from 'h3'
import { z } from 'zod'
import { useRuntimeConfig } from '#imports'
import { requireUser } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'

const schema = z.object({ amount: z.number().positive() })

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.public.enableAuction) fail('NOT_FOUND', 'Аукцион отложен до v2')
  const user = await requireUser(event)
  const lotId = String(getRouterParam(event, 'id'))
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Укажите ставку', input.error.flatten())

  const result = await prisma.$transaction(async (tx) => {
    const lot = await tx.auctionLot.findUnique({ where: { id: lotId } })
    if (!lot || lot.status !== 'ACTIVE' || lot.endAt <= new Date()) fail('CONFLICT', 'Лот не активен')
    if (Number(input.data.amount) <= Number(lot.currentPrice)) fail('CONFLICT', 'Ставка должна быть выше текущей')
    const updated = await tx.auctionLot.updateMany({ where: { id: lotId, currentPrice: lot.currentPrice, status: 'ACTIVE' }, data: { currentPrice: input.data.amount } })
    if (updated.count !== 1) fail('CONFLICT', 'Ставку уже перебили, обновите страницу')
    const bid = await tx.bid.create({ data: { lotId, userId: user.id, amount: input.data.amount } })
    return bid
  })
  return ok({ bid: { ...result, amount: Number(result.amount) } })
})
