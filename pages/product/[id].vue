<script setup lang="ts">
const route = useRoute()
const cart = useCartStore()
const { data, pending, error } = await useFetch<any>(`/api/v1/products/${route.params.id}`)
const product = computed(() => data.value?.data?.product)
const related = computed(() => data.value?.data?.related || [])
const specs = computed(() => product.value ? [
  { label: 'Сталь', value: product.value.steel },
  { label: 'Рукоять', value: product.value.handleMaterial },
  { label: 'Больстер', value: product.value.bolster },
  { label: 'Ножны', value: product.value.sheath },
  { label: 'Вес', value: product.value.weight ? `${product.value.weight} г` : null },
  { label: 'Длина', value: product.value.length ? `${product.value.length} мм` : null },
  { label: 'Клинок', value: product.value.bladeLength ? `${product.value.bladeLength} мм` : null }
] : [])
</script>

<template>
  <section class="container-page py-12">
    <div v-if="pending" class="text-steel">Загрузка...</div>
    <div v-else-if="error || !product" class="card-dark p-8">Товар не найден.</div>
    <div v-else class="grid gap-10 lg:grid-cols-[1fr_.9fr]">
      <div class="card-dark overflow-hidden">
        <NuxtImg :src="product.images?.[0]?.url || product.imageUrl || '/demo/knife-1.svg'" :alt="product.name" class="w-full object-cover" />
      </div>
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-forge">{{ product.category?.name }}</p>
        <h1 class="mt-3 text-5xl font-semibold leading-tight">{{ product.name }}</h1>
        <p class="mt-5 text-lg leading-8 text-steel">{{ product.description }}</p>
        <div class="mt-8 flex items-center gap-5">
          <span class="text-3xl font-semibold text-forge">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
          <span v-if="product.oldPrice" class="text-steel line-through">{{ product.oldPrice.toLocaleString('ru-RU') }} ₽</span>
        </div>
        <button class="btn-primary mt-8 w-full sm:w-auto" :disabled="product.stockQty <= 0" @click="cart.addFromProduct(product)">
          {{ product.stockQty > 0 ? 'Добавить в корзину' : 'Нет в наличии' }}
        </button>
        <div class="mt-10"><h2 class="mb-4 text-2xl font-semibold">Характеристики</h2><SpecList :specs="specs" /></div>
      </div>
    </div>
    <div v-if="product?.story" class="mt-12 card-dark p-8">
      <p class="text-sm uppercase tracking-[0.28em] text-forge">Легенда ножа</p>
      <div class="mt-4 max-w-4xl whitespace-pre-line text-lg leading-8 text-steel">{{ product.story }}</div>
    </div>
    <div v-if="related.length" class="mt-16">
      <h2 class="text-3xl font-semibold">Похожие ножи</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3"><ProductCard v-for="item in related" :key="item.id" :product="item" /></div>
    </div>
  </section>
</template>
