<script setup lang="ts">
const config = useRuntimeConfig()
const { data } = await useFetch<any>('/api/v1/auctions', { query: { status: 'active' } })
const lots = computed(() => data.value?.data?.items || [])
</script>
<template>
  <section class="container-page py-12">
    <div class="flex items-center gap-4"><AuctionBadge status="v2" /><h1 class="text-5xl font-semibold">Аукцион редких ножей</h1></div>
    <p class="mt-5 max-w-3xl text-steel">Аукцион оставлен как v2-модуль. Для первого запуска лучше держать его выключенным.</p>
    <div v-if="!config.public.enableAuction" class="card-dark mt-8 p-8">
      <p class="text-xl font-semibold">Аукцион пока выключен</p>
      <p class="mt-3 text-steel">Включить можно через `NUXT_PUBLIC_ENABLE_AUCTION=true`, когда будут правила торгов и уведомления.</p>
    </div>
    <div v-else class="mt-8 grid gap-6 md:grid-cols-3">
      <NuxtLink v-for="lot in lots" :key="lot.id" :to="`/auction/${lot.id}`" class="card-dark p-6">
        <p class="text-xl font-semibold">{{ lot.product.name }}</p>
        <p class="mt-3 text-forge">Текущая ставка: {{ lot.currentPrice.toLocaleString('ru-RU') }} ₽</p>
      </NuxtLink>
    </div>
  </section>
</template>
