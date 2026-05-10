<script setup lang="ts">
const route = useRoute()
const cart = useCartStore()
const { data, pending, error } = await useFetch<any>(`/api/v1/products/${route.params.id}`)
const product = computed(() => data.value?.data?.product)
const related = computed(() => data.value?.data?.related || [])
const specs = computed(() => product.value ? [
  { label: 'Сталь', value: product.value.steel },
  { label: 'Рукоять', value: product.value.handleMaterial },
  { label: 'Больстер', value: product.value.bolster },
  { label: 'Ножны', value: product.value.sheath },
  { label: 'Вес', value: product.value.weight ? `${product.value.weight} г` : null },
  { label: 'Длина', value: product.value.length ? `${product.value.length} мм` : null },
  { label: 'Клинок', value: product.value.bladeLength ? `${product.value.bladeLength} мм` : null }
] : [])
const mainImage = computed(() => product.value?.images?.[0]?.url || product.value?.imageUrl || '/demo/knife-1.svg')
const provenanceItems = [
  { title: 'Проверка подлинности', text: 'Фото и документы изделия можно сверить через поддержку перед покупкой.' },
  { title: 'Сертификат / протокол', text: 'Документы партии выводятся рядом с товаром, когда они приложены поставщиком.' },
  { title: 'Подарочная упаковка включена', text: 'Футляр, коробка или карточка легенды добавляются под формат изделия.' }
]
const careItems = [
  'Протирайте клинок насухо после контакта с влагой.',
  'Не храните нож долго в мокрых ножнах.',
  'Для рукояти используйте мягкое масло или воск по рекомендации мастера.'
]

function addToCart() {
  if (!product.value) return
  cart.addFromProduct(product.value)
}
</script>

<template>
  <section class="container-page py-12">
    <div v-if="pending" class="text-steel">Загрузка...</div>
    <div v-else-if="error || !product" class="card-dark p-8">Товар не найден.</div>
    <div v-else class="grid gap-10 lg:grid-cols-[1fr_.9fr]">
      <div class="space-y-4">
        <div class="card-dark overflow-hidden p-4">
          <div class="relative overflow-hidden rounded-[24px] bg-obsidian">
            <NuxtImg :src="mainImage" :alt="product.name" class="w-full object-cover" />
            <div class="absolute left-4 top-4 flex flex-wrap gap-2">
              <span class="trust-badge">Изготовлено мастером из Якутии</span>
              <span v-if="product.isAuction" class="rounded-full bg-ember/10 px-3 py-1.5 text-xs text-bone ring-1 ring-ember/30">Аукционный лот</span>
            </div>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div v-for="item in provenanceItems" :key="item.title" class="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <p class="text-sm font-semibold text-bone">{{ item.title }}</p>
            <p class="mt-2 text-xs leading-5 text-steel">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-brass">{{ product.category?.name }}</p>
        <h1 class="mt-3 font-display text-5xl leading-tight text-bone">{{ product.name }}</h1>
        <p class="mt-4 text-sm uppercase tracking-[0.16em] text-steel">Мастерская NOMOKH · Якутия</p>
        <p class="mt-5 text-lg leading-8 text-steel">{{ product.description }}</p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span v-if="product.steel" class="tag-dark normal-case tracking-normal">{{ product.steel }}</span>
          <span v-if="product.handleMaterial" class="tag-dark normal-case tracking-normal">{{ product.handleMaterial }}</span>
          <span v-if="product.sheath" class="tag-dark normal-case tracking-normal">{{ product.sheath }}</span>
        </div>
        <div class="mt-8 flex items-center gap-5">
          <span class="text-3xl font-semibold text-bone">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
          <span v-if="product.oldPrice" class="text-steel line-through">{{ product.oldPrice.toLocaleString('ru-RU') }} ₽</span>
        </div>
        <button class="btn-primary mt-8 w-full sm:w-auto" :disabled="product.stockQty <= 0" @click="addToCart">
          {{ product.stockQty > 0 ? 'Добавить в корзину' : 'Нет в наличии' }}
        </button>
        <div class="mt-10">
          <h2 class="mb-4 font-display text-2xl text-bone">Характеристики</h2>
          <SpecList :specs="specs" />
        </div>
      </div>
    </div>
    <div v-if="product?.story" class="mt-12 card-dark p-8">
      <p class="text-sm uppercase tracking-[0.28em] text-brass">Легенда изделия</p>
      <div class="mt-4 max-w-4xl whitespace-pre-line font-display text-3xl leading-tight text-bone">{{ product.story }}</div>
    </div>
    <div v-if="product" class="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <section class="card-dark p-8">
        <p class="text-sm uppercase tracking-[0.28em] text-brass">Подлинность</p>
        <h2 class="mt-3 font-display text-3xl text-bone">Происхождение рядом с покупкой</h2>
        <p class="mt-4 leading-7 text-steel">NOMOKH показывает материал, характеристики и сервисные гарантии до checkout. Финальные сертификаты и ограничения зависят от конкретной партии изделия.</p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="trust-badge">Сертификат</span>
          <span class="trust-badge">Проверка по фото</span>
          <span class="trust-badge">Гарантия</span>
        </div>
      </section>
      <section class="card-dark p-8">
        <p class="text-sm uppercase tracking-[0.28em] text-brass">Как ухаживать</p>
        <h2 class="mt-3 font-display text-3xl text-bone">Чтобы вещь служила долго</h2>
        <ul class="mt-5 space-y-3 text-sm leading-6 text-steel">
          <li v-for="item in careItems" :key="item" class="flex gap-3">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-brass" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>
    </div>
    <div v-if="related.length" class="mt-16">
      <h2 class="font-display text-3xl text-bone">Похожие легенды</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3"><ProductCard v-for="item in related" :key="item.id" :product="item" /></div>
    </div>
  </section>
</template>
