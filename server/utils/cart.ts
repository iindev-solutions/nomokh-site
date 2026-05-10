import type { H3Event } from 'h3'
import { getCookie, setCookie } from 'h3'
import { prisma } from './prisma'

const CART_COOKIE = 'nomokh_cart_token'

export async function resolveCart(event: H3Event) {
  let token = getCookie(event, CART_COOKIE)
  if (!token) {
    token = crypto.randomUUID()
    setCookie(event, CART_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    })
  }

  return await prisma.cart.upsert({
    where: { anonymousToken: token },
    update: { expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    create: { anonymousToken: token, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    include: cartInclude()
  })
}

export function cartInclude() {
  return {
    items: {
      orderBy: { createdAt: 'asc' as const },
      include: {
        product: { include: { category: true, images: { orderBy: { sortOrder: 'asc' as const }, take: 1 } } }
      }
    }
  }
}
