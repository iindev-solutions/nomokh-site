import { readBody } from 'h3'
import type { H3Event } from 'h3'
import type { ZodSchema } from 'zod'
import { fail } from './response'

export async function readZodBody<T>(event: H3Event, schema: ZodSchema<T>): Promise<T> {
  const body = await readBody(event)
  const result = schema.safeParse(body)
  if (!result.success) {
    fail('VALIDATION_ERROR', 'Проверьте поля формы', result.error.flatten())
  }
  return result.data
}
