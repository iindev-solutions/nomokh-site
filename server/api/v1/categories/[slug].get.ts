import { getRouterParam } from 'h3'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const category = await prisma.category.findUnique({ where: { slug: String(slug) }, include: { parent: true, children: true } })
  if (!category) fail('NOT_FOUND', 'Категория не найдена')
  const breadcrumbs = category.parent ? [category.parent, category] : [category]
  return ok({ ...category, breadcrumbs })
})
