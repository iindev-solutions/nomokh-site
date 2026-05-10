export function useApi() {
  const auth = useAuthStore()
  async function apiFetch<T>(url: string, options: any = {}) {
    if (!auth.hydrated) await auth.hydrate()
    const headers = new Headers(options.headers || {})
    if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`)
    return await $fetch<T>(url, { ...options, headers })
  }
  return { apiFetch }
}
