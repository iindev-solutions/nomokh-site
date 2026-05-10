import { prisma } from '~/server/utils/prisma'
import { ok } from '~/server/utils/response'

function toTree(categories: any[]) {
  const byId = new Map(categories.map((category) => [category.id, { ...category, children: [] }]))
  const roots: any[] = []
  for (const category of byId.values()) {
    if (category.parentId && byId.has(category.parentId)) byId.get(category.parentId).children.push(category)
    else roots.push(category)
  }
  return roots
}

export default defineEventHandler(async () => {
  const categories = await prisma.category.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] })
  return ok(toTree(categories))
})
