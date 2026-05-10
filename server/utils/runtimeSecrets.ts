const DEV_SECRET = 'development-secret-change-before-production-32bytes'
const PLACEHOLDER_MARKERS = ['change-me', 'development-secret', 'nomokh_dev_password']

export function requireRuntimeSecret(name: string, value: unknown, isProduction = process.env.NODE_ENV === 'production') {
  const secret = typeof value === 'string' && value ? value : process.env[name] || ''
  if (isProduction && PLACEHOLDER_MARKERS.some((marker) => secret.includes(marker))) throw new Error(`${name} must not use placeholder value in production`)
  if (secret.length >= 32) return secret
  if (isProduction) throw new Error(`${name} must be at least 32 characters in production`)
  return DEV_SECRET
}

export function secretBytes(name: string, value: unknown, isProduction = process.env.NODE_ENV === 'production') {
  return new TextEncoder().encode(requireRuntimeSecret(name, value, isProduction))
}
