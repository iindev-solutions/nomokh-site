<script setup lang="ts">
const route = useRoute()
const amount = ref('')
const message = ref('')
const { apiFetch } = useApi()
const { data, refresh } = await useFetch<any>(`/api/v1/auctions/${route.params.id}`)
const lot = computed(() => data.value?.data?.lot)
async function bid() {
  message.value = ''
  try {
    await apiFetch(`/api/v1/auctions/${route.params.id}/bids`, { method: 'POST', body: { amount: Number(amount.value) } })
    amount.value = ''
    message.value = 'Ставка принята'
    await refresh()
  } catch (error: any) {
    message.value = error?.data?.error?.message || 'Не удалось сделать ставку'
  }
}
</script>
<template>
  <section class="container-page py-12">
    <div v-if="!lot" class="card-dark p-8">Лот не найден или аукцион выключен.</div>
    <div v-else class="grid gap-8 lg:grid-cols-2">
      <NuxtImg :src="lot.product.images?.[0]?.url || '/demo/knife-1.svg'" :alt="lot.product.name" class="card-dark w-full" />
      <div>
        <AuctionBadge :status="lot.status" />
        <h1 class="mt-4 text-5xl font-semibold">{{ lot.product.name }}</h1>
        <p class="mt-5 text-steel">{{ lot.product.description }}</p>
        <p class="mt-8 text-4xl font-semibold text-forge">{{ lot.currentPrice.toLocaleString('ru-RU') }} ₽</p>
        <form class="mt-8 flex gap-3" @submit.prevent="bid">
          <input v-model="amount" class="input-dark" type="number" :min="lot.currentPrice + 100" placeholder="Ваша ставка" />
          <button class="btn-primary">Сделать ставку</button>
        </form>
        <p v-if="message" class="mt-4 text-forge">{{ message }}</p>
      </div>
    </div>
  </section>
</template>
