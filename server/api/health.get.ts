import { ok } from '~/server/utils/response'
import { prisma } from '~/server/utils/prisma'
import { setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const startedAt = Date.now()
  let database = 'ok'
  try {
    await prisma.$queryRaw`SELECT 1`
  } catch {
    database = 'error'
    setResponseStatus(event, 503)
  }
  return ok({ status: database === 'ok' ? 'ok' : 'degraded', database, latencyMs: Date.now() - startedAt, version: '0.1.0-mvp' })
})
