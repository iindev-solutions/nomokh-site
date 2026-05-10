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
  sheath?: string | null
  imageUrl?: string | null
  stockQty: number
  category?: { name?: string | null } | null
}
const props = defineProps<{ product: Product }>()
const cart = useCartStore()
const priceLabel = computed(() => props.product.price.toLocaleString('ru-RU'))
const facts = computed(() => [
  props.product.steel,
  props.product.handleMaterial,
  props.product.sheath
].filter((fact): fact is string => Boolean(fact)).slice(0, 3))
const availabilityLabel = computed(() => props.product.stockQty > 0 ? 'В наличии' : 'Под заказ')
function addToCart() { cart.addFromProduct(props.product) }
</script>

<template>
  <article class="card-dark group overflow-hidden p-4 transition duration-500 hover:-translate-y-1 hover:border-brass/50">
    <NuxtLink :to="`/product/${product.slug}`" class="block">
      <div class="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-obsidian">
        <NuxtImg :src="product.imageUrl || '/demo/knife-1.svg'" :alt="product.name" class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
        <div class="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <span class="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-bone backdrop-blur">
            {{ product.category?.name || 'NOMOKH' }}
          </span>
          <span class="trust-badge">{{ availabilityLabel }}</span>
        </div>
      </div>
      <div class="space-y-4 pt-5">
        <div>
          <p class="text-xs uppercase tracking-[0.16em] text-steel">Мастерская NOMOKH</p>
          <h3 class="mt-2 font-display text-2xl leading-tight text-bone">{{ product.name }}</h3>
          <p class="mt-2 line-clamp-2 text-sm leading-6 text-steel">{{ product.description }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="fact in facts" :key="fact" class="tag-dark normal-case tracking-normal">{{ fact }}</span>
        </div>
      </div>
    </NuxtLink>
    <div class="mt-5 flex items-end justify-between gap-4">
      <div>
        <span class="block text-xs uppercase tracking-[0.14em] text-steel">Цена</span>
        <span class="text-xl font-semibold text-bone">{{ priceLabel }} ₽</span>
      </div>
      <button class="btn-primary px-4 py-2.5" :disabled="product.stockQty <= 0" @click="addToCart">
        {{ product.stockQty > 0 ? 'В корзину' : 'Нет в наличии' }}
      </button>
    </div>
  </article>
</template>
