<script setup lang="ts">
const cart = useCartStore()
const auth = useAuthStore()
const { apiFetch } = useApi()
const form = reactive({ contactName: '', contactPhone: '', city: '', street: '', deliveryType: 'CDEK', paymentType: 'YOOKASSA' })
const loading = shallowRef(false)
const result = shallowRef<any>(null)
const errorMessage = shallowRef('')
const trustItems = [
  'Сертификат и документы партии',
  'Подарочная упаковка включена',
  'Проверка подлинности через поддержку',
  'Гарантия, обмен и возврат по оферте'
]
onMounted(() => { cart.hydrate(); auth.hydrate() })

async function submit() {
  loading.value = true
  errorMessage.value = ''
  try {
    const response: any = await apiFetch('/api/v1/orders', {
      method: 'POST',
      body: {
        contactName: form.contactName,
        contactPhone: form.contactPhone,
        deliveryType: form.deliveryType,
        paymentType: form.paymentType,
        address: { city: form.city, street: form.street }
      }
    })
    result.value = response.data
    trackGoal('checkout_created', { orderId: response.data.order.id, total: response.data.order.totalAmount })
    cart.clear()
  } catch (error: any) {
    errorMessage.value = error?.data?.error?.message || 'Не удалось создать заказ'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <section class="container-page py-12">
    <p class="text-sm uppercase tracking-[0.28em] text-brass">Checkout</p>
    <h1 class="mt-3 font-display text-5xl text-bone">Оформление заказа</h1>
    <CheckoutStepper class="mt-8" :active="2" />
    <div v-if="result" class="card-dark mt-8 p-8">
      <p class="font-display text-3xl text-bone">Заказ {{ result.order.orderNumber }} создан</p>
      <p class="mt-3 text-steel">Сумма: {{ result.order.totalAmount.toLocaleString('ru-RU') }} ₽</p>
      <a v-if="result.paymentUrl" :href="result.paymentUrl" class="btn-primary mt-6 inline-flex">Перейти к оплате</a>
      <NuxtLink v-else to="/" class="btn-primary mt-6">На главную</NuxtLink>
    </div>
    <form v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]" @submit.prevent="submit">
      <div class="card-dark space-y-5 p-6">
        <div><label class="text-sm text-steel">Имя</label><input v-model="form.contactName" required class="input-dark mt-2" placeholder="Ваше имя" /></div>
        <div><label class="text-sm text-steel">Телефон</label><input v-model="form.contactPhone" required class="input-dark mt-2" placeholder="+7..." /></div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label class="text-sm text-steel">Город</label><input v-model="form.city" required class="input-dark mt-2" placeholder="Якутск" /></div>
          <div><label class="text-sm text-steel">Адрес</label><input v-model="form.street" required class="input-dark mt-2" placeholder="Улица, дом" /></div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label class="text-sm text-steel">Доставка</label><select v-model="form.deliveryType" class="input-dark mt-2"><option value="CDEK">СДЭК</option><option value="POST">Почта РФ</option><option value="PICKUP">Самовывоз</option></select></div>
          <div><label class="text-sm text-steel">Оплата</label><select v-model="form.paymentType" class="input-dark mt-2"><option value="YOOKASSA">ЮKassa</option><option value="CASH">При получении</option></select></div>
        </div>
        <p class="text-xs leading-5 text-steel">
          Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/privacy" class="text-bone underline decoration-brass/60 underline-offset-4">обработкой персональных данных</NuxtLink> и <NuxtLink to="/offer" class="text-bone underline decoration-brass/60 underline-offset-4">публичной офертой</NuxtLink>.
        </p>
        <p v-if="errorMessage" class="text-forge">{{ errorMessage }}</p>
      </div>
      <aside class="card-dark h-fit p-6">
        <p class="text-sm uppercase tracking-[0.24em] text-steel">К оплате</p>
        <p class="mt-3 text-4xl font-semibold text-bone">{{ cart.totalAmount.toLocaleString('ru-RU') }} ₽</p>
        <p class="mt-3 text-sm text-steel">Доставка рассчитана stub-логикой, реальные CDEK/Почта подключаются на следующем этапе.</p>
        <div class="mt-6 rounded-2xl border border-white/10 bg-white/[.04] p-4">
          <p class="text-sm font-semibold text-bone">Trust rail</p>
          <ul class="mt-3 space-y-2 text-xs leading-5 text-steel">
            <li v-for="item in trustItems" :key="item" class="flex gap-2">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-moss" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <button class="btn-primary mt-6 w-full" :disabled="loading || !cart.items.length">{{ loading ? 'Создаем...' : 'Создать заказ' }}</button>
      </aside>
    </form>
  </section>
</template>
