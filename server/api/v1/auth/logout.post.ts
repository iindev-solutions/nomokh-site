import { clearRefreshCookie } from '~/server/utils/auth'
import { ok } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  clearRefreshCookie(event)
  return ok({ loggedOut: true })
})
