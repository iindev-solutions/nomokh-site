import { describe, expect, it } from 'vitest'
import { requireRuntimeSecret } from '../../server/utils/runtimeSecrets'

describe('requireRuntimeSecret', () => {
  it('throws in production when secret is too short', () => {
    expect(() => requireRuntimeSecret('JWT_SECRET', 'short', true)).toThrow(/JWT_SECRET/)
  })

  it('throws in production for placeholder secrets', () => {
    expect(() => requireRuntimeSecret('JWT_SECRET', 'change-me-change-me-change-me-change-me-32bytes', true)).toThrow(/placeholder/)
  })

  it('allows dev fallback outside production', () => {
    expect(requireRuntimeSecret('JWT_SECRET', undefined, false).length).toBeGreaterThanOrEqual(32)
  })

  it('uses matching process env when explicit value is absent', () => {
    const previous = process.env.JWT_SECRET
    process.env.JWT_SECRET = 'x'.repeat(40)
    try {
      expect(requireRuntimeSecret('JWT_SECRET', undefined, true)).toBe('x'.repeat(40))
    } finally {
      process.env.JWT_SECRET = previous
    }
  })
})
