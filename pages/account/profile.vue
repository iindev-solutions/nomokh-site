<script setup lang="ts">
definePageMeta({ middleware: [async () => { const auth = useAuthStore(); await auth.hydrate(); if (!auth.isAuth) return navigateTo('/login') }] })
const auth = useAuthStore()
onMounted(() => { auth.hydrate() })
</script>
<template>
  <section class="container-page py-12">
    <h1 class="text-5xl font-semibold">Профиль</h1>
    <div class="card-dark mt-8 p-8">
      <p v-if="auth.user" class="text-steel">Телефон: {{ auth.user.phone }}</p>
      <p v-else class="text-steel">Войдите, чтобы управлять профилем.</p>
    </div>
  </section>
</template>
