import { getQuery } from 'h3'
import { Prisma } from '@prisma/client'
import { prisma } from '~/server/utils/prisma'
import { ok } from '~/server/utils/response'
import { serializeProduct } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(Number(query.page || 1), 1)
  const limit = Math.min(Math.max(Number(query.limit || 12), 1), 48)
  const where: Prisma.ProductWhereInput = { isActive: true }

  if (query.categorySlug) where.category = { slug: String(query.categorySlug) }
  if (query.steel) where.steel = { equals: String(query.steel), mode: 'insensitive' }
  if (query.handleMaterial) where.handleMaterial = { equals: String(query.handleMaterial), mode: 'insensitive' }
  if (query.minPrice || query.maxPrice) {
    where.price = {
      gte: query.minPrice ? Number(query.minPrice) : undefined,
      lte: query.maxPrice ? Number(query.maxPrice) : undefined
    }
  }
  if (query.q) {
    where.OR = [
      { name: { contains: String(query.q), mode: 'insensitive' } },
      { description: { contains: String(query.q), mode: 'insensitive' } },
      { story: { contains: String(query.q), mode: 'insensitive' } }
    ]
  }

  const orderBy = String(query.sort || 'popular') === 'price_asc'
    ? { price: 'asc' as const }
    : String(query.sort || '') === 'price_desc'
      ? { price: 'desc' as const }
      : String(query.sort || '') === 'new'
        ? { createdAt: 'desc' as const }
        : { sortOrder: 'asc' as const }

  const [items, total, steels, handles] = await Promise.all([
    prisma.product.findMany({ where, include: { category: true, images: { orderBy: { sortOrder: 'asc' } } }, orderBy, skip: (page - 1) * limit, take: limit }),
    prisma.product.count({ where }),
    prisma.product.findMany({ where: { isActive: true, steel: { not: null } }, distinct: ['steel'], select: { steel: true }, orderBy: { steel: 'asc' } }),
    prisma.product.findMany({ where: { isActive: true, handleMaterial: { not: null } }, distinct: ['handleMaterial'], select: { handleMaterial: true }, orderBy: { handleMaterial: 'asc' } })
  ])

  return ok({
    items: items.map(serializeProduct),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    facets: {
      steels: steels.map((item) => item.steel).filter(Boolean),
      handleMaterials: handles.map((item) => item.handleMaterial).filter(Boolean)
    }
  })
})
