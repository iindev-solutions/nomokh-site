import { requireAdmin } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const logs = await prisma.syncLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
  return ok(logs)
})
