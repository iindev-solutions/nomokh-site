<script setup lang="ts">
const { data: categoriesResponse } = await useFetch<any>('/api/v1/categories')
const { data: productsResponse } = await useFetch<any>('/api/v1/products', { query: { limit: 6, sort: 'popular' } })
const categories = computed(() => categoriesResponse.value?.data || [])
const featured = computed(() => productsResponse.value?.data?.items || [])
const trustItems = [
  { title: 'Подарочная упаковка', text: 'Дерево, картон и карточка легенды для gift-сценариев.' },
  { title: 'Сертификаты', text: 'Документы партии и проверка происхождения рядом с товаром.' },
  { title: 'Мастера Якутии', text: 'Каталог строится вокруг материала, руки мастера и истории.' }
]
let motionContext: { revert: () => void } | null = null

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  motionContext = gsap.context(() => {
    gsap.from('[data-hero-kicker]', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' })
    gsap.from('[data-hero-title]', { opacity: 0, y: 32, duration: 0.9, delay: 0.1, ease: 'power3.out' })
    gsap.from('[data-hero-media]', { opacity: 0, scale: 1.04, duration: 1.1, delay: 0.16, ease: 'power2.out' })
    gsap.from('[data-story-card]', { opacity: 0, y: 28, duration: 0.75, stagger: 0.1, scrollTrigger: { trigger: '[data-story-card]', once: true } })
  })
})

onUnmounted(() => motionContext?.revert())
</script>

<template>
  <section class="container-page grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
    <div>
      <p data-hero-kicker class="text-sm uppercase tracking-[0.36em] text-brass">Номох · легенды севера</p>
      <h1 data-hero-title class="mt-6 max-w-4xl text-balance font-display text-5xl leading-[0.98] text-bone md:text-7xl">
        Якутские ножи и северные вещи с подлинной историей.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-steel md:text-xl">
        NOMOKH собирает клинки, украшения и ремесленные изделия мастеров Якутии в спокойный dark luxury каталог: материал, мастер, легенда, подлинность.
      </p>
      <div class="mt-10 flex flex-wrap gap-4">
        <NuxtLink to="/catalog/yakutskie-nozhi" class="btn-primary">Смотреть каталог</NuxtLink>
        <NuxtLink to="/#provenance" class="btn-secondary">Происхождение и сервис</NuxtLink>
      </div>
      <div class="mt-8 flex flex-wrap gap-2">
        <span class="tag-dark">ручная работа</span>
        <span class="tag-dark">сертификаты</span>
        <span class="tag-dark">подарки</span>
      </div>
    </div>
    <div data-hero-media class="card-dark relative overflow-hidden p-4">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,212,227,.18),transparent_22rem)]" />
      <div class="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-silver/60 to-transparent" />
      <NuxtImg src="/demo/knife-hero.svg" alt="Якутский нож NOMOKH" class="relative z-10 h-auto w-full" priority />
      <div class="relative z-10 rounded-[24px] border border-white/10 bg-obsidian/80 p-5">
        <p class="text-sm uppercase tracking-[0.28em] text-steel">Клинок как символ</p>
        <p class="mt-2 font-display text-2xl text-bone">Один предмет. Материал, мастер и легенда рядом с покупкой.</p>
      </div>
    </div>
  </section>

  <section id="provenance" class="container-page py-16">
    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="(item, index) in trustItems" :key="item.title" data-story-card class="card-dark p-6">
        <p class="text-brass">0{{ index + 1 }}</p>
        <h2 class="mt-4 font-display text-2xl text-bone">{{ item.title }}</h2>
        <p class="mt-3 text-sm leading-6 text-steel">{{ item.text }}</p>
      </div>
    </div>
  </section>

  <section class="container-page py-16">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-brass">Категории</p>
        <h2 class="mt-3 font-display text-4xl text-bone">Дом северных вещей</h2>
      </div>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="hidden text-brass md:block">В каталог →</NuxtLink>
    </div>
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <NuxtLink v-for="category in categories" :key="category.id" :to="`/catalog/${category.slug}`" class="card-dark p-6 transition duration-300 hover:-translate-y-1 hover:border-brass/60">
        <p class="text-xl font-semibold text-bone">{{ category.name }}</p>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-steel">{{ category.description }}</p>
      </NuxtLink>
    </div>
  </section>

  <section class="container-page py-16">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-brass">В наличии</p>
        <h2 class="mt-3 font-display text-4xl text-bone">Клинки с характером</h2>
      </div>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="hidden text-brass md:block">Все товары →</NuxtLink>
    </div>
    <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProductCard v-for="product in featured" :key="product.id" :product="product" />
    </div>
  </section>

  <section id="delivery" class="container-page py-16">
    <div class="card-dark p-8 md:p-10">
      <p class="text-sm uppercase tracking-[0.28em] text-brass">Доставка и оплата</p>
      <h2 class="mt-3 font-display text-4xl text-bone">Сервис без шума</h2>
      <p class="mt-4 max-w-3xl text-steel">Checkout уже готов под CDEK, Почту РФ и YooKassa. Перед production нужны реальные credentials, сертификаты партии и финальные юридические тексты.</p>
    </div>
  </section>
</template>
