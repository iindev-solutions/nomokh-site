import { getRefreshCookie, setRefreshCookie, signAccessToken, signRefreshToken, verifyRefreshToken } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { fail, ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const refresh = getRefreshCookie(event)
  if (!refresh) fail('UNAUTHORIZED', 'Refresh token не найден')
  try {
    const payload = await verifyRefreshToken(refresh)
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) fail('UNAUTHORIZED', 'Пользователь не найден')
    const accessToken = await signAccessToken(user)
    setRefreshCookie(event, await signRefreshToken(user))
    return ok({ accessToken, user: { id: user.id, phone: user.phone, name: user.name, role: user.role } })
  } catch {
    fail('UNAUTHORIZED', 'Refresh token недействителен')
  }
})
