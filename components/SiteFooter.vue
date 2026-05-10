<template>
  <footer class="border-t border-white/10 py-12">
    <div class="container-page grid gap-8 md:grid-cols-3">
      <div>
        <p class="text-lg font-semibold tracking-[0.24em]">NOMOKH</p>
        <p class="mt-3 max-w-sm text-sm leading-6 text-steel">Премиальный дом якутских ножей и северных вещей. Каждый предмет — материал, мастер и легенда.</p>
      </div>
      <div class="text-sm text-steel">
        <p class="font-semibold text-bone">Покупателю</p>
        <NuxtLink to="/privacy" class="mt-3 block hover:text-forge">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/offer" class="mt-2 block hover:text-forge">Публичная оферта</NuxtLink>
        <NuxtLink to="/catalog/yakutskie-nozhi" class="mt-2 block hover:text-forge">Каталог</NuxtLink>
      </div>
      <div class="text-sm text-steel">
        <p class="font-semibold text-bone">Контакты</p>
        <p class="mt-3">WhatsApp/SMS уведомления подключаются в production.</p>
        <p class="mt-2">Перед продажей: оферта, сертификаты, возрастные ограничения.</p>
        <p class="mt-2">© {{ new Date().getFullYear() }} NOMOKH</p>
      </div>
    </div>
  </footer>
</template>
