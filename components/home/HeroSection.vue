<script setup lang="ts">
useHead({
  title: 'Главная',
})
</script>

<template>
  <section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-obsidian">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,212,227,.14),transparent_30rem)]" />
    <div class="relative z-10 px-4 text-center">
      <p class="text-sm uppercase tracking-[0.34em] text-brass">NOMOKH</p>
      <h1 class="mt-5 font-display text-4xl leading-tight text-bone sm:text-6xl">
        Легенды, выкованные Севером
      </h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-steel sm:text-xl">
        Премиальные якутские ножи ручной работы. Каждый клинок хранит материал, мастера и историю.
      </p>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="btn-primary mt-8">
        В каталог
      </NuxtLink>
    </div>
  </section>
</template>
