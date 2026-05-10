export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    filters: { minPrice: '', maxPrice: '', steel: '', handleMaterial: '', sort: 'popular' },
    page: 1
  }),
  actions: {
    reset() {
      this.filters = { minPrice: '', maxPrice: '', steel: '', handleMaterial: '', sort: 'popular' }
      this.page = 1
    }
  }
})
