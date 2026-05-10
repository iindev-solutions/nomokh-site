<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <section class="container-page py-16">
    <div class="card-dark p-8">
      <p class="text-sm uppercase tracking-[0.28em] text-forge">Оплата</p>
      <h1 class="mt-3 text-4xl font-semibold">Спасибо! Заказ принят.</h1>
      <p class="mt-4 text-steel">Номер заказа: {{ route.query.order || 'будет отправлен в уведомлении' }}</p>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="btn-primary mt-8">Вернуться в каталог</NuxtLink>
    </div>
  </section>
</template>
