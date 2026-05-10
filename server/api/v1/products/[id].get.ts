import { getRouterParam } from 'h3'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'
import { serializeProduct } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const id = String(getRouterParam(event, 'id'))
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
  const product = await prisma.product.findFirst({
    where: { isActive: true, OR: isUuid ? [{ id }, { slug: id }] : [{ slug: id }] },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } }
  })
  if (!product) fail('NOT_FOUND', 'Товар не найден')

  const related = await prisma.product.findMany({
    where: { isActive: true, categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
    take: 4,
    orderBy: { sortOrder: 'asc' }
  })

  return ok({ product: serializeProduct(product), related: related.map(serializeProduct) })
})
