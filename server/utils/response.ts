import { createError } from 'h3'

export function ok<T>(data: T, meta?: Record<string, unknown>) {
  return { success: true, data, ...(meta ? { meta } : {}) }
}

const statusByCode: Record<string, number> = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500
}

export function fail(code: string, message: string, details?: unknown): never {
  throw createError({
    statusCode: statusByCode[code] || 500,
    statusMessage: message,
    data: { success: false, error: { code, message, details } }
  })
}
