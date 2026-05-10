<script setup lang="ts">
const route = useRoute()
const catalog = useCatalogStore()
const query = computed(() => ({
  categorySlug: route.params.slug,
  page: catalog.page,
  limit: 12,
  minPrice: catalog.filters.minPrice || undefined,
  maxPrice: catalog.filters.maxPrice || undefined,
  steel: catalog.filters.steel || undefined,
  handleMaterial: catalog.filters.handleMaterial || undefined,
  sort: catalog.filters.sort
}))
const { data, pending, refresh } = await useFetch<any>('/api/v1/products', { query })
const { data: categoryResponse } = await useFetch<any>(`/api/v1/categories/${route.params.slug}`)
const products = computed(() => data.value?.data?.items || [])
const meta = computed(() => data.value?.data?.pagination || { page: 1, pages: 1, total: 0 })
const facets = computed(() => data.value?.data?.facets || { steels: [], handleMaterials: [] })
const category = computed(() => categoryResponse.value?.data)
watch(() => catalog.filters, () => { catalog.page = 1; refresh() }, { deep: true })
watch(() => catalog.page, () => refresh())
</script>

<template>
  <section class="container-page py-12">
    <div class="mb-10">
      <p class="text-sm uppercase tracking-[0.28em] text-forge">Каталог</p>
      <h1 class="mt-3 text-5xl font-semibold">{{ category?.name || 'Ножи NOMOKH' }}</h1>
      <p class="mt-4 max-w-3xl text-steel">{{ category?.description || 'Фильтруйте по стали, рукояти, цене и назначению.' }}</p>
    </div>
    <div class="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside class="card-dark h-fit space-y-5 p-5">
        <div><label class="text-sm text-steel">Цена от</label><input v-model="catalog.filters.minPrice" class="input-dark mt-2" inputmode="numeric" placeholder="0" /></div>
        <div><label class="text-sm text-steel">Цена до</label><input v-model="catalog.filters.maxPrice" class="input-dark mt-2" inputmode="numeric" placeholder="50000" /></div>
        <div>
          <label class="text-sm text-steel">Сталь</label>
          <select v-model="catalog.filters.steel" class="input-dark mt-2">
            <option value="">Любая</option><option v-for="steel in facets.steels" :key="steel" :value="steel">{{ steel }}</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-steel">Рукоять</label>
          <select v-model="catalog.filters.handleMaterial" class="input-dark mt-2">
            <option value="">Любая</option><option v-for="material in facets.handleMaterials" :key="material" :value="material">{{ material }}</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-steel">Сортировка</label>
          <select v-model="catalog.filters.sort" class="input-dark mt-2">
            <option value="popular">Популярные</option><option value="price_asc">Цена ↑</option><option value="price_desc">Цена ↓</option><option value="new">Новые</option>
          </select>
        </div>
        <button class="btn-secondary w-full" @click="catalog.reset(); refresh()">Сбросить</button>
      </aside>
      <div>
        <div class="mb-5 flex items-center justify-between text-sm text-steel"><span>Найдено: {{ meta.total }}</span><span v-if="pending">Загрузка...</span></div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><ProductCard v-for="product in products" :key="product.id" :product="product" /></div>
        <div class="mt-10 flex items-center justify-center gap-4">
          <button class="btn-secondary" :disabled="catalog.page <= 1" @click="catalog.page--">Назад</button>
          <span class="text-sm text-steel">{{ meta.page }} / {{ meta.pages }}</span>
          <button class="btn-secondary" :disabled="catalog.page >= meta.pages" @click="catalog.page++">Вперед</button>
        </div>
      </div>
    </div>
  </section>
</template>
