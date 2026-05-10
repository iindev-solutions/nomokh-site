import { describe, expect, it } from 'vitest'
import { decideYooKassaOrderUpdate } from '../../server/utils/yookassa'

describe('decideYooKassaOrderUpdate', () => {
  it('marks confirmed order paid only when payment matches order', () => {
    const result = decideYooKassaOrderUpdate({
      order: { id: 'order-1', totalAmount: 1200, status: 'CONFIRMED', paymentStatus: 'PENDING', paymentExternalId: 'pay-1' },
      payment: { id: 'pay-1', status: 'succeeded', metadata: { orderId: 'order-1' }, amount: { value: '1200.00', currency: 'RUB' } }
    })
    expect(result).toEqual({ status: 'PAID', paymentStatus: 'PAID', paymentExternalId: 'pay-1' })
  })

  it('ignores mismatched amount', () => {
    const result = decideYooKassaOrderUpdate({
      order: { id: 'order-1', totalAmount: 1200, status: 'CONFIRMED', paymentStatus: 'PENDING', paymentExternalId: 'pay-1' },
      payment: { id: 'pay-1', status: 'succeeded', metadata: { orderId: 'order-1' }, amount: { value: '1.00', currency: 'RUB' } }
    })
    expect(result).toBeNull()
  })

  it('does not overwrite terminal shipped order', () => {
    const result = decideYooKassaOrderUpdate({
      order: { id: 'order-1', totalAmount: 1200, status: 'SHIPPED', paymentStatus: 'PAID', paymentExternalId: 'pay-1' },
      payment: { id: 'pay-1', status: 'succeeded', metadata: { orderId: 'order-1' }, amount: { value: '1200.00', currency: 'RUB' } }
    })
    expect(result).toBeNull()
  })

  it('cancels only unpaid draft or confirmed orders', () => {
    const result = decideYooKassaOrderUpdate({
      order: { id: 'order-1', totalAmount: 1200, status: 'CONFIRMED', paymentStatus: 'PENDING', paymentExternalId: 'pay-1' },
      payment: { id: 'pay-1', status: 'canceled', metadata: { orderId: 'order-1' }, amount: { value: '1200.00', currency: 'RUB' } }
    })
    expect(result).toEqual({ status: 'CANCELLED', paymentStatus: 'CANCELLED', paymentExternalId: 'pay-1' })
  })

  it('does not cancel already paid orders', () => {
    const result = decideYooKassaOrderUpdate({
      order: { id: 'order-1', totalAmount: 1200, status: 'PAID', paymentStatus: 'PAID', paymentExternalId: 'pay-1' },
      payment: { id: 'pay-1', status: 'canceled', metadata: { orderId: 'order-1' }, amount: { value: '1200.00', currency: 'RUB' } }
    })
    expect(result).toBeNull()
  })

  it('ignores mismatched order metadata', () => {
    const result = decideYooKassaOrderUpdate({
      order: { id: 'order-1', totalAmount: 1200, status: 'CONFIRMED', paymentStatus: 'PENDING', paymentExternalId: 'pay-1' },
      payment: { id: 'pay-1', status: 'succeeded', metadata: { orderId: 'order-2' }, amount: { value: '1200.00', currency: 'RUB' } }
    })
    expect(result).toBeNull()
  })
})
