import Redis from 'ioredis'
import type { H3Event } from 'h3'
import { getRequestIP } from 'h3'
import { fail } from './response'

let redis: Redis | null | undefined

export function getRedis() {
  if (redis !== undefined) return redis
  const url = process.env.REDIS_URL
  if (!url) return (redis = null)
  redis = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 1 })
  redis.on('error', () => {})
  return redis
}

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  const client = getRedis()
  if (!client) return
  try {
    if (client.status === 'wait') await client.connect()
    const hits = await client.incr(key)
    if (hits === 1) await client.expire(key, windowSeconds)
    if (hits > limit) fail('RATE_LIMITED', 'Слишком много запросов. Повторите позже.')
  } catch (error: any) {
    if (error?.data?.error?.code === 'RATE_LIMITED') throw error
  }
}

export function ipKey(event: H3Event, scope: string) {
  const ip = getRequestIP(event) || 'unknown'
  return `${scope}:ip:${ip}`
}
