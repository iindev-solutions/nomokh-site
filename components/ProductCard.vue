<script setup lang="ts">
type Product = {
  id: string
  slug: string
  name: string
  description?: string
  price: number
  oldPrice?: number | null
  steel?: string | null
  handleMaterial?: string | null
  imageUrl?: string | null
  stockQty: number
}
const props = defineProps<{ product: Product }>()
const cart = useCartStore()
function addToCart() { cart.addFromProduct(props.product) }
</script>

<template>
  <article class="card-dark group overflow-hidden">
    <NuxtLink :to="`/product/${product.slug}`" class="block">
      <div class="aspect-[4/3] overflow-hidden bg-charcoal">
        <NuxtImg :src="product.imageUrl || '/demo/knife-1.svg'" :alt="product.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div class="space-y-4 p-5">
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-lg font-semibold text-bone">{{ product.name }}</h3>
          <span class="whitespace-nowrap text-forge">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
        </div>
        <p class="line-clamp-2 text-sm leading-6 text-steel">{{ product.description }}</p>
        <div class="flex flex-wrap gap-2 text-xs text-steel">
          <span v-if="product.steel" class="rounded-full bg-white/5 px-3 py-1">{{ product.steel }}</span>
          <span v-if="product.handleMaterial" class="rounded-full bg-white/5 px-3 py-1">{{ product.handleMaterial }}</span>
          <span class="rounded-full bg-white/5 px-3 py-1">{{ product.stockQty > 0 ? 'В наличии' : 'Под заказ' }}</span>
        </div>
      </div>
    </NuxtLink>
    <div class="px-5 pb-5">
      <button class="btn-primary w-full" :disabled="product.stockQty <= 0" @click="addToCart">
        {{ product.stockQty > 0 ? 'В корзину' : 'Нет в наличии' }}
      </button>
    </div>
  </article>
</template>
