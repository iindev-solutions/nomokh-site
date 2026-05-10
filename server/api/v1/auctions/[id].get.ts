import { getRouterParam } from 'h3'
import { useRuntimeConfig } from '#imports'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.public.enableAuction) return ok({ enabled: false, lot: null })
  const id = String(getRouterParam(event, 'id'))
  const lot = await prisma.auctionLot.findUnique({ where: { id }, include: { product: { include: { images: { orderBy: { sortOrder: 'asc' } } } }, bids: { orderBy: { createdAt: 'desc' }, take: 20 } } })
  if (!lot) fail('NOT_FOUND', 'Лот не найден')
  return ok({ enabled: true, lot: { ...lot, startPrice: Number(lot.startPrice), reservePrice: lot.reservePrice == null ? null : Number(lot.reservePrice), currentPrice: Number(lot.currentPrice), bids: lot.bids.map((bid) => ({ ...bid, amount: Number(bid.amount) })) } })
})
