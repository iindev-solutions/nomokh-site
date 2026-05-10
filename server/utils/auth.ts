import type { H3Event } from 'h3'
import { deleteCookie, getCookie, getHeader, setCookie } from 'h3'
import { SignJWT, jwtVerify } from 'jose'
import { useRuntimeConfig } from '#imports'
import { prisma } from './prisma'
import { fail } from './response'
import { getRedis } from './rateLimit'
import { hashValue, normalizePhone } from './security'
import { secretBytes } from './runtimeSecrets'
import { requireRuntimeSecret } from './runtimeSecrets'

const MAX_OTP_ATTEMPTS = 5
const fallbackOtpStore = new Map<string, { code: string; expiresAt: number; attempts: number }>()

function textSecret(name: string, value?: unknown) {
  return secretBytes(name, value)
}

export async function signAccessToken(user: { id: string; role: 'USER' | 'ADMIN'; phone: string }) {
  const config = useRuntimeConfig()
  return await new SignJWT({ role: user.role, phone: user.phone })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuer('nomokh')
    .setAudience('nomokh-api')
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(textSecret('JWT_SECRET', config.jwtSecret))
}

export async function signRefreshToken(user: { id: string; role: 'USER' | 'ADMIN'; phone: string }) {
  const config = useRuntimeConfig()
  const jwtSecret = requireRuntimeSecret('JWT_SECRET', config.jwtSecret)
  const refreshSecret = requireRuntimeSecret('REFRESH_TOKEN_SECRET', config.refreshTokenSecret)
  if (process.env.NODE_ENV === 'production' && refreshSecret === jwtSecret) throw new Error('REFRESH_TOKEN_SECRET must differ from JWT_SECRET')
  return await new SignJWT({ role: user.role, phone: user.phone, typ: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuer('nomokh')
    .setAudience('nomokh-api')
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(textSecret('REFRESH_TOKEN_SECRET', config.refreshTokenSecret))
}

export async function verifyAccessToken(token: string) {
  const config = useRuntimeConfig()
  const { payload } = await jwtVerify(token, textSecret('JWT_SECRET', config.jwtSecret), { issuer: 'nomokh', audience: 'nomokh-api' })
  return { sub: payload.sub!, role: payload.role as 'USER' | 'ADMIN', phone: payload.phone as string }
}

export async function verifyRefreshToken(token: string) {
  const config = useRuntimeConfig()
  const jwtSecret = requireRuntimeSecret('JWT_SECRET', config.jwtSecret)
  const refreshSecret = requireRuntimeSecret('REFRESH_TOKEN_SECRET', config.refreshTokenSecret)
  if (process.env.NODE_ENV === 'production' && refreshSecret === jwtSecret) throw new Error('REFRESH_TOKEN_SECRET must differ from JWT_SECRET')
  const { payload } = await jwtVerify(token, textSecret('REFRESH_TOKEN_SECRET', config.refreshTokenSecret), { issuer: 'nomokh', audience: 'nomokh-api' })
  if (payload.typ !== 'refresh') throw new Error('Invalid refresh token type')
  return { sub: payload.sub!, role: payload.role as 'USER' | 'ADMIN', phone: payload.phone as string }
}

export async function getCurrentUser(event: H3Event) {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) return null
  try {
    const payload = await verifyAccessToken(token)
    return await prisma.user.findUnique({ where: { id: payload.sub } })
  } catch {
    return null
  }
}

export async function requireUser(event: H3Event) {
  const user = await getCurrentUser(event)
  if (!user) fail('UNAUTHORIZED', 'Нужно войти по телефону')
  return user
}

export async function requireAdmin(event: H3Event) {
  const config = useRuntimeConfig()
  const adminToken = getHeader(event, 'x-admin-token')
  const configuredToken = config.adminApiToken || process.env.ADMIN_API_TOKEN
  if (configuredToken && adminToken && adminToken === configuredToken) {
    return { id: 'admin-token', role: 'ADMIN' as const, phone: 'admin-token' }
  }
  const user = await requireUser(event)
  if (user.role !== 'ADMIN') fail('FORBIDDEN', 'Нужны права администратора')
  return user
}

export function setRefreshCookie(event: H3Event, token: string) {
  setCookie(event, 'nomokh_refresh', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

export function clearRefreshCookie(event: H3Event) {
  deleteCookie(event, 'nomokh_refresh', { path: '/' })
}

export function getRefreshCookie(event: H3Event) {
  return getCookie(event, 'nomokh_refresh')
}

export async function storeOtp(phoneRaw: string, code: string) {
  const phone = normalizePhone(phoneRaw)
  const key = `otp:${hashValue(phone)}`
  const client = getRedis()
  if (client) {
    try {
      if (client.status === 'wait') await client.connect()
      await client.set(key, JSON.stringify({ code, attempts: 0 }), 'EX', 300)
      return
    } catch {}
  }
  fallbackOtpStore.set(key, { code, attempts: 0, expiresAt: Date.now() + 5 * 60_000 })
}

export async function consumeOtp(phoneRaw: string, code: string) {
  const phone = normalizePhone(phoneRaw)
  const key = `otp:${hashValue(phone)}`
  const client = getRedis()
  if (client) {
    try {
      if (client.status === 'wait') await client.connect()
      const result = await client.eval(`
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local data = cjson.decode(raw)
        if (data.attempts or 0) >= tonumber(ARGV[2]) then return 0 end
        if data.code == ARGV[1] then
          redis.call('DEL', KEYS[1])
          return 1
        end
        data.attempts = (data.attempts or 0) + 1
        redis.call('SET', KEYS[1], cjson.encode(data), 'EX', 300)
        return 0
      `, 1, key, code, String(MAX_OTP_ATTEMPTS))
      return result === 1
    } catch {}
  }
  const stored = fallbackOtpStore.get(key)
  if (!stored || stored.expiresAt < Date.now()) return false
  if (stored.attempts >= MAX_OTP_ATTEMPTS) return false
  const valid = stored.code === code
  if (valid) fallbackOtpStore.delete(key)
  else stored.attempts += 1
  return valid
}

export async function sendOtpViaSmsRu(phoneRaw: string, code: string) {
  const config = useRuntimeConfig()
  const smsRuApiId = config.smsRuApiId || process.env.SMS_RU_API_ID
  if (!smsRuApiId) return false
  const phone = normalizePhone(phoneRaw).replace('+', '')
  const params = new URLSearchParams({ api_id: String(smsRuApiId), to: phone, msg: `NOMOKH: код входа ${code}`, json: '1' })
  const response = await fetch(`https://sms.ru/sms/send?${params.toString()}`)
  if (!response.ok) return false
  const result = await response.json().catch(() => null)
  return result?.status === 'OK'
}
