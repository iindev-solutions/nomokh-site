type CartProduct = { id: string; slug: string; name: string; price: number; imageUrl?: string | null; stockQty?: number }
type CartItem = CartProduct & { quantity: number; serverItemId?: string }
const STORAGE_KEY = 'nomokh_cart'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as CartItem[], hydrated: false }),
  getters: {
    totalQuantity: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: (state) => state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  },
  actions: {
    hydrate() {
      if (!process.client || this.hydrated) return
      try { this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { this.items = [] }
      this.hydrated = true
      this.syncFromServer().catch(() => {})
    },
    persist() { if (process.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items)) },
    async addFromProduct(product: CartProduct, quantity = 1) {
      const previous = this.items.map((item) => ({ ...item }))
      const found = this.items.find((item) => item.id === product.id)
      if (found) found.quantity += quantity
      else this.items.push({ ...product, quantity })
      this.persist()
      trackGoal('add_to_cart', { productId: product.id, price: product.price })
      try {
        await $fetch('/api/v1/cart/items', { method: 'POST', body: { productId: product.id, quantity } })
        await this.syncFromServer()
      } catch {
        this.items = previous
        this.persist()
      }
    },
    async remove(productId: string) {
      const previous = this.items.map((entry) => ({ ...entry }))
      const item = this.items.find((entry) => entry.id === productId)
      this.items = this.items.filter((entry) => entry.id !== productId)
      this.persist()
      if (!item?.serverItemId) return
      try { await $fetch(`/api/v1/cart/items/${item.serverItemId}`, { method: 'DELETE' }) }
      catch { this.items = previous; this.persist() }
    },
    async setQuantity(productId: string, quantity: number) {
      const previous = this.items.map((entry) => ({ ...entry }))
      const item = this.items.find((entry) => entry.id === productId)
      if (!item) return
      item.quantity = Math.max(1, quantity)
      this.persist()
      if (!item.serverItemId) return
      try { await $fetch(`/api/v1/cart/items/${item.serverItemId}`, { method: 'PATCH', body: { quantity: item.quantity } }) }
      catch { this.items = previous; this.persist() }
    },
    clear() { this.items = []; this.persist() },
    async syncFromServer() {
      const response: any = await $fetch('/api/v1/cart')
      const serverItems = response?.data?.items || []
      if (!serverItems.length) { this.items = []; this.persist(); return }
      this.items = serverItems.map((item: any) => ({
        id: item.product.id,
        slug: item.product.slug,
        name: item.product.name,
        price: item.priceSnapshot,
        imageUrl: item.product.imageUrl,
        quantity: item.quantity,
        serverItemId: item.id,
        stockQty: item.product.stockQty
      }))
      this.persist()
    }
  }
})
