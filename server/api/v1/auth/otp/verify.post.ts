import { getRequestIP, readBody } from 'h3'
import { z } from 'zod'
import { consumeOtp, setRefreshCookie, signAccessToken, signRefreshToken } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { rateLimit as checkRateLimit } from '~/server/utils/rateLimit'
import { fail, ok } from '~/server/utils/response'
import { hashValue, normalizePhone } from '~/server/utils/security'

const schema = z.object({ phone: z.string().min(10).max(24), code: z.string().length(6), name: z.string().optional() })

export default defineEventHandler(async (event) => {
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Неверный код или телефон', input.error.flatten())
  const phone = normalizePhone(input.data.phone)
  await checkRateLimit(`otp-verify:${hashValue(phone)}`, 10, 15 * 60)
  await checkRateLimit(`ip:${getRequestIP(event) || 'unknown'}:otp-verify`, 30, 15 * 60)
  const valid = await consumeOtp(phone, input.data.code)
  if (!valid) fail('UNAUTHORIZED', 'Код неверный или истек')

  const user = await prisma.user.upsert({
    where: { phone },
    update: input.data.name ? { name: input.data.name } : {},
    create: { phone, name: input.data.name, role: 'USER' }
  })
  const accessToken = await signAccessToken(user)
  const refreshToken = await signRefreshToken(user)
  setRefreshCookie(event, refreshToken)
  return ok({ accessToken, user: { id: user.id, phone: user.phone, name: user.name, role: user.role } })
})
