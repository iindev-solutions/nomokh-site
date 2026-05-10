<script setup lang="ts">
const { data: categoriesResponse } = await useFetch<any>('/api/v1/categories')
const { data: productsResponse } = await useFetch<any>('/api/v1/products', { query: { limit: 6, sort: 'popular' } })
const categories = computed(() => categoriesResponse.value?.data || [])
const featured = computed(() => productsResponse.value?.data?.items || [])

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  gsap.from('.hero-kicker', { opacity: 0, y: 20, duration: 0.7 })
  gsap.from('.hero-title', { opacity: 0, y: 32, duration: 0.9, delay: 0.1 })
  gsap.from('.hero-card', { opacity: 0, y: 40, duration: 0.8, stagger: 0.12, scrollTrigger: { trigger: '.hero-card', once: true } })
})
</script>

<template>
  <section class="container-page grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
    <div>
      <p class="hero-kicker text-sm uppercase tracking-[0.36em] text-forge">Номох · легенда клинка</p>
      <h1 class="hero-title mt-6 max-w-4xl text-balance text-5xl font-semibold leading-tight text-bone md:text-7xl">
        Якутские ножи, у каждого из которых есть своя история.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-steel">
        NOMOKH — premium-витрина: каталог, фильтры, корзина, доставка, оплата и будущий аукцион редких лотов.
      </p>
      <div class="mt-10 flex flex-wrap gap-4">
        <NuxtLink to="/catalog/yakutskie-nozhi" class="btn-primary">Смотреть каталог</NuxtLink>
        <NuxtLink to="/#proposal" class="btn-secondary">Что получает бизнес</NuxtLink>
      </div>
    </div>
    <div class="hero-card card-dark relative overflow-hidden p-4">
      <div class="absolute inset-0 bg-gradient-to-br from-forge/20 via-transparent to-transparent" />
      <NuxtImg src="/demo/knife-hero.svg" alt="Якутский нож NOMOKH" class="relative z-10 h-auto w-full" priority />
      <div class="relative z-10 rounded-3xl bg-obsidian/80 p-5">
        <p class="text-sm uppercase tracking-[0.28em] text-steel">MVP stack</p>
        <p class="mt-2 text-2xl font-semibold">Nuxt 3 + Nitro API + Prisma + PostgreSQL</p>
      </div>
    </div>
  </section>

  <section id="proposal" class="container-page py-16">
    <div class="grid gap-4 md:grid-cols-3">
      <div class="hero-card card-dark p-6">
        <p class="text-forge">01</p>
        <h2 class="mt-4 text-2xl font-semibold">Каталог на тысячи товаров</h2>
        <p class="mt-3 text-sm leading-6 text-steel">Server-side фильтры, индексы БД, пагинация, характеристики стали и рукояти.</p>
      </div>
      <div class="hero-card card-dark p-6">
        <p class="text-forge">02</p>
        <h2 class="mt-4 text-2xl font-semibold">Заказы без ручной рутины</h2>
        <p class="mt-3 text-sm leading-6 text-steel">Корзина, checkout, YooKassa-ready платежи, доставка CDEK/Почта как следующий шаг.</p>
      </div>
      <div class="hero-card card-dark p-6">
        <p class="text-forge">03</p>
        <h2 class="mt-4 text-2xl font-semibold">Рост до аукциона</h2>
        <p class="mt-3 text-sm leading-6 text-steel">V2-заготовки: лоты, ставки, optimistic locking, таймеры, победитель.</p>
      </div>
    </div>
  </section>

  <section class="container-page py-16">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-forge">Категории</p>
        <h2 class="mt-3 text-4xl font-semibold">Популярные направления</h2>
      </div>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="hidden text-forge md:block">В каталог →</NuxtLink>
    </div>
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <NuxtLink v-for="category in categories" :key="category.id" :to="`/catalog/${category.slug}`" class="card-dark p-6 transition hover:border-forge/60">
        <p class="text-xl font-semibold">{{ category.name }}</p>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-steel">{{ category.description }}</p>
      </NuxtLink>
    </div>
  </section>

  <section class="container-page py-16">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-forge">В наличии</p>
        <h2 class="mt-3 text-4xl font-semibold">Первые ножи для демо</h2>
      </div>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="hidden text-forge md:block">Все товары →</NuxtLink>
    </div>
    <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProductCard v-for="product in featured" :key="product.id" :product="product" />
    </div>
  </section>

  <section id="delivery" class="container-page py-16">
    <div class="card-dark p-8 md:p-10">
      <p class="text-sm uppercase tracking-[0.28em] text-forge">Доставка и оплата</p>
      <h2 class="mt-3 text-4xl font-semibold">Готово под CDEK, Почту РФ и YooKassa</h2>
      <p class="mt-4 max-w-3xl text-steel">В MVP уже есть точки расширения. Для production нужно получить credentials провайдеров, включить webhooks и проверить юридические тексты.</p>
    </div>
  </section>
</template>
