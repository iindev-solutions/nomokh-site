import { getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'
import { prisma } from '~/server/utils/prisma'
import { ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.public.enableAuction) return ok({ enabled: false, items: [] })
  const query = getQuery(event)
  const status = String(query.status || 'ACTIVE').toUpperCase() as any
  const lots = await prisma.auctionLot.findMany({ where: { status }, include: { product: { include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } } } }, orderBy: { endAt: 'asc' }, take: 24 })
  return ok({ enabled: true, items: lots.map((lot) => ({ ...lot, startPrice: Number(lot.startPrice), reservePrice: lot.reservePrice == null ? null : Number(lot.reservePrice), currentPrice: Number(lot.currentPrice) })) })
})
