import { createHmac, randomInt } from 'node:crypto'
import { requireRuntimeSecret } from './runtimeSecrets'

export function normalizePhone(input: string) {
  const cleaned = input.replace(/[^\d+]/g, '')
  if (cleaned.startsWith('8') && cleaned.length === 11) return `+7${cleaned.slice(1)}`
  if (cleaned.startsWith('7') && cleaned.length === 11) return `+${cleaned}`
  return cleaned
}

export function hashValue(value: string) {
  const secret = requireRuntimeSecret('OTP_HASH_SECRET', process.env.OTP_HASH_SECRET || process.env.JWT_SECRET)
  return createHmac('sha256', secret).update(value).digest('hex')
}

export function generateOtp() {
  return String(randomInt(100000, 999999))
}
