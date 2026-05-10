type RuntimeConfig = {
  yookassaShopId?: string
  yookassaSecretKey?: string
  yookassaReturnUrl?: string
  public: { siteUrl?: string; demoMode?: boolean }
}

type WebhookOrder = {
  id: string
  totalAmount: unknown
  status: string
  paymentStatus: string
  paymentExternalId?: string | null
}

type WebhookPayment = {
  id: string
  status: string
  metadata?: { orderId?: string }
  amount?: { value?: string; currency?: string }
}

async function runtimeConfig(): Promise<RuntimeConfig> {
  const { useRuntimeConfig } = await import('#imports')
  const config = useRuntimeConfig() as RuntimeConfig
  return {
    ...config,
    yookassaShopId: config.yookassaShopId || process.env.YOOKASSA_SHOP_ID,
    yookassaSecretKey: config.yookassaSecretKey || process.env.YOOKASSA_SECRET_KEY,
    yookassaReturnUrl: config.yookassaReturnUrl || process.env.YOOKASSA_RETURN_URL,
    public: {
      ...config.public,
      siteUrl: config.public.siteUrl || process.env.NUXT_PUBLIC_SITE_URL
    }
  }
}

function sameMoney(left: unknown, right?: string) {
  if (!right) return false
  return Number(left).toFixed(2) === Number(right).toFixed(2)
}

export function decideYooKassaOrderUpdate(input: { order: WebhookOrder; payment: WebhookPayment }) {
  const { order, payment } = input
  if (!payment.id || payment.metadata?.orderId !== order.id) return null
  if (order.paymentExternalId && order.paymentExternalId !== payment.id) return null
  if (!sameMoney(order.totalAmount, payment.amount?.value) || payment.amount?.currency !== 'RUB') return null
  if (['SHIPPED', 'DELIVERED', 'REFUNDED'].includes(order.status)) return null

  if (payment.status === 'succeeded') {
    if (!['DRAFT', 'CONFIRMED', 'PAID'].includes(order.status)) return null
    return { status: 'PAID', paymentStatus: 'PAID', paymentExternalId: payment.id }
  }

  if (payment.status === 'canceled') {
    if (!['DRAFT', 'CONFIRMED'].includes(order.status) || order.paymentStatus === 'PAID') return null
    return { status: 'CANCELLED', paymentStatus: 'CANCELLED', paymentExternalId: payment.id }
  }

  return { paymentStatus: 'PENDING', paymentExternalId: payment.id }
}

export async function createYooKassaPayment(order: any) {
  const config = await runtimeConfig()

  if (!config.yookassaShopId || !config.yookassaSecretKey) {
    if (process.env.NODE_ENV === 'production' && !config.public.demoMode) throw new Error('YooKassa credentials are required in production')
    return { mode: 'stub', paymentUrl: `/checkout/success?order=${order.id}`, externalId: null }
  }

  const auth = Buffer.from(`${config.yookassaShopId}:${config.yookassaSecretKey}`).toString('base64')
  const response = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Idempotence-Key': order.id,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: { value: Number(order.totalAmount).toFixed(2), currency: 'RUB' },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: config.yookassaReturnUrl || `${config.public.siteUrl}/checkout/success?order=${order.id}`
      },
      description: `Заказ NOMOKH ${order.orderNumber}`,
      metadata: { orderId: order.id, orderNumber: order.orderNumber }
    })
  })

  if (!response.ok) throw new Error(`YooKassa payment failed: ${await response.text()}`)
  const data = await response.json()
  return { mode: 'yookassa', paymentUrl: data.confirmation?.confirmation_url, externalId: data.id }
}

export async function fetchYooKassaPayment(paymentId: string) {
  const config = await runtimeConfig()
  if (!config.yookassaShopId || !config.yookassaSecretKey) {
    if (process.env.NODE_ENV === 'production') throw new Error('YooKassa credentials are required in production')
    return null
  }

  const auth = Buffer.from(`${config.yookassaShopId}:${config.yookassaSecretKey}`).toString('base64')
  const response = await fetch(`https://api.yookassa.ru/v3/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Basic ${auth}` }
  })
  if (!response.ok) throw new Error(`YooKassa payment verify failed: ${await response.text()}`)
  return await response.json()
}
