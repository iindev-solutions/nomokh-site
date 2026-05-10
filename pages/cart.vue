<script setup lang="ts">
const cart = useCartStore()
onMounted(() => cart.hydrate())
</script>
<template>
  <section class="container-page py-12">
    <h1 class="text-5xl font-semibold">Корзина</h1>
    <div v-if="!cart.items.length" class="card-dark mt-8 p-8">
      <p class="text-steel">Корзина пока пустая.</p>
      <NuxtLink to="/catalog/yakutskie-nozhi" class="btn-primary mt-6">Перейти в каталог</NuxtLink>
    </div>
    <div v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div class="space-y-4">
        <div v-for="item in cart.items" :key="item.id" class="card-dark flex gap-4 p-4">
          <NuxtImg :src="item.imageUrl || '/demo/knife-1.svg'" :alt="item.name" class="h-28 w-32 rounded-2xl object-cover" />
          <div class="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
            <div>
              <NuxtLink :to="`/product/${item.slug}`" class="text-xl font-semibold hover:text-brass">{{ item.name }}</NuxtLink>
              <p class="mt-2 text-steel">{{ item.price.toLocaleString('ru-RU') }} ₽</p>
              <span class="trust-badge mt-3">Упаковка включена</span>
            </div>
            <div class="flex items-center gap-3">
              <button class="btn-secondary px-3 py-2" @click="cart.setQuantity(item.id, item.quantity - 1)">−</button>
              <span>{{ item.quantity }}</span>
              <button class="btn-secondary px-3 py-2" @click="cart.setQuantity(item.id, item.quantity + 1)">+</button>
              <button class="text-sm text-steel hover:text-forge" @click="cart.remove(item.id)">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <aside class="card-dark h-fit p-6">
        <p class="text-sm uppercase tracking-[0.24em] text-steel">Итого</p>
        <p class="mt-3 text-4xl font-semibold text-bone">{{ cart.totalAmount.toLocaleString('ru-RU') }} ₽</p>
        <NuxtLink to="/checkout" class="btn-primary mt-6 w-full">Оформить заказ</NuxtLink>
      </aside>
    </div>
  </section>
</template>
