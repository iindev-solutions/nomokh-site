<script setup lang="ts">
const cart = useCartStore()
const auth = useAuthStore()
onMounted(() => { cart.hydrate(); auth.hydrate() })
const nav = [
  { label: 'Каталог', to: '/catalog/yakutskie-nozhi' },
  { label: 'Аукцион', to: '/auction' },
  { label: 'Сервис', to: '/#delivery' }
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-obsidian/80 backdrop-blur-xl">
    <div class="container-page flex h-20 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3">
        <span class="grid h-10 w-10 place-items-center rounded-full border border-brass/50 bg-brass/10 text-brass">N</span>
        <span>
          <span class="block text-lg font-semibold tracking-[0.24em]">NOMOKH</span>
          <span class="block text-xs text-steel">легенды севера</span>
        </span>
      </NuxtLink>
      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="text-sm text-steel transition hover:text-bone">{{ item.label }}</NuxtLink>
      </nav>
      <div class="flex items-center gap-3">
        <NuxtLink to="/login" class="hidden text-sm text-steel transition hover:text-bone sm:block">{{ auth.user?.name || auth.user?.phone || 'Войти' }}</NuxtLink>
        <NuxtLink to="/cart" class="btn-secondary px-4 py-2">Корзина · {{ cart.totalQuantity }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
