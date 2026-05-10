type AuthUser = { id: string; phone: string; name?: string | null; role: 'USER' | 'ADMIN' }

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', user: null as AuthUser | null, hydrated: false }),
  getters: { isAuth: (state) => Boolean(state.token && state.user), isAdmin: (state) => state.user?.role === 'ADMIN' },
  actions: {
    async hydrate() {
      if (!process.client || this.hydrated) return
      this.hydrated = true
      localStorage.removeItem('nomokh_access_token')
      localStorage.removeItem('nomokh_user')
      try {
        const response: any = await $fetch('/api/v1/auth/refresh', { method: 'POST' })
        this.token = response.data.accessToken
        this.user = response.data.user
      } catch {
        this.token = ''
        this.user = null
      }
    },
    setSession(token: string, user: AuthUser) {
      this.token = token
      this.user = user
    },
    logout() {
      this.token = ''
      this.user = null
      if (process.client) {
        localStorage.removeItem('nomokh_access_token')
        localStorage.removeItem('nomokh_user')
      }
      $fetch('/api/v1/auth/logout', { method: 'POST' }).catch(() => {})
    }
  }
})
