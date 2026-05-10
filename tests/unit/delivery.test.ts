import { describe, expect, it } from 'vitest'
import { quoteDelivery } from '../../server/utils/delivery'

describe('quoteDelivery', () => {
  it('uses one pricing table for delivery types', () => {
    expect(quoteDelivery('PICKUP').amount).toBe(0)
    expect(quoteDelivery('POST').amount).toBe(450)
    expect(quoteDelivery('CDEK').amount).toBe(650)
  })
})
