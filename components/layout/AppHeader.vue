<template>
  <header class="bg-obsidian text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold tracking-wider">
        NOMOKH
      </NuxtLink>
      <nav class="flex items-center gap-6 text-sm font-medium text-steel-300">
        <NuxtLink to="/" class="hover:text-white transition-colors">Главная</NuxtLink>
        <NuxtLink to="/catalog/all" class="hover:text-white transition-colors">Каталог</NuxtLink>
      </nav>
    </div>
  </header>
</template>
