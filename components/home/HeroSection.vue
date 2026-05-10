<template>
  <section class="relative h-[70vh] flex items-center justify-center overflow-hidden bg-obsidian">
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian" />
    </div>
    <div class="relative z-10 text-center text-white px-4">
      <h1 class="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
        Легенды стали
      </h1>
      <p class="text-lg sm:text-xl text-steel-300 max-w-2xl mx-auto mb-8">
        Премиальные ножи ручной работы. Каждый клинок — история, закованная в металл.
      </p>
      <NuxtLink
        to="/catalog/all"
        class="inline-flex items-center px-6 py-3 text-base font-medium bg-forge-600 hover:bg-forge-500 rounded-lg transition-colors"
      >
        В каталог
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Главная',
})
</script>
