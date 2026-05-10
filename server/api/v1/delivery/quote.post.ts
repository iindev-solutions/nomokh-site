import { readBody } from 'h3'
import { z } from 'zod'
import { quoteDelivery } from '~/server/utils/delivery'
import { fail, ok } from '~/server/utils/response'

const schema = z.object({ deliveryType: z.enum(['CDEK', 'POST', 'PICKUP']), city: z.string().optional(), weight: z.number().optional() })

export default defineEventHandler(async (event) => {
  const input = schema.safeParse(await readBody(event))
  if (!input.success) fail('VALIDATION_ERROR', 'Неверные параметры доставки', input.error.flatten())
  return ok(quoteDelivery(input.data.deliveryType))
})
