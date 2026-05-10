import { resolveCart } from '~/server/utils/cart'
import { ok } from '~/server/utils/response'
import { serializeCart } from '~/server/utils/serializers'

export default defineEventHandler(async (event) => {
  const cart = await resolveCart(event)
  return ok(serializeCart(cart))
})
