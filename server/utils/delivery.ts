export type DeliveryType = 'CDEK' | 'POST' | 'PICKUP'

const deliveryByType: Record<DeliveryType, { amount: number; etaDays: number }> = {
  PICKUP: { amount: 0, etaDays: 0 },
  POST: { amount: 450, etaDays: 7 },
  CDEK: { amount: 650, etaDays: 4 }
}

export function quoteDelivery(deliveryType: DeliveryType) {
  const quote = deliveryByType[deliveryType]
  return { deliveryType, amount: quote.amount, currency: 'RUB', etaDays: quote.etaDays, mode: 'stub' }
}
