import { getRequestIP, readBody } from 'h3'
import { z } from 'zod'
import { storeOtp, sendOtpViaSmsRu } from '~/server/utils/auth'
import { rateLimit as checkRateLimit } from '~/server/utils/rateLimit'
import { fail, ok } from '~/server/utils/response'
import { generateOtp, hashValue, normalizePhone } from '~/server/utils/security'

const schema = z.object({ phone: z.string().min(10).max(24) })

export default defineEventHandler(async (event) => {
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Укажите телефон', input.error.flatten())
  const phone = normalizePhone(input.data.phone)
  await checkRateLimit(`otp:${hashValue(phone)}`, 3, 15 * 60)
  await checkRateLimit(`ip:${getRequestIP(event) || 'unknown'}:otp`, 10, 15 * 60)

  const code = process.env.NODE_ENV === 'production' ? generateOtp() : '111111'
  const sent = await sendOtpViaSmsRu(phone, code)
  if (process.env.NODE_ENV === 'production' && !sent) fail('INTERNAL_ERROR', 'SMS provider unavailable')
  await storeOtp(phone, code)

  return ok({ sent, devCode: process.env.NODE_ENV === 'production' ? undefined : code, devHint: process.env.NODE_ENV === 'production' ? undefined : 'В dev-режиме код 111111' })
})
