<script setup lang="ts">
definePageMeta({ middleware: [async () => { const auth = useAuthStore(); await auth.hydrate(); if (!auth.isAuth) return navigateTo('/login') }] })
const auth = useAuthStore()
const { apiFetch } = useApi()
const orders = ref<any[]>([])
onMounted(async () => {
  await auth.hydrate()
  if (!auth.token) return
  const response: any = await apiFetch('/api/v1/orders').catch(() => ({ data: [] }))
  orders.value = response.data || []
})
</script>
<template>
  <section class="container-page py-12">
    <h1 class="text-5xl font-semibold">Мои заказы</h1>
    <p v-if="!auth.token" class="mt-6 text-steel">Войдите по телефону, чтобы увидеть историю заказов.</p>
    <div class="mt-8 space-y-4">
      <div v-for="order in orders" :key="order.id" class="card-dark p-5">
        <p class="font-semibold">{{ order.orderNumber }}</p>
        <p class="mt-2 text-steel">{{ order.status }} · {{ order.totalAmount.toLocaleString('ru-RU') }} ₽</p>
      </div>
    </div>
  </section>
</template>
