<script setup lang="ts">
const auth = useAuthStore()
const phone = ref('')
const code = ref('')
const devCode = ref('')
const step = ref<'phone' | 'code'>('phone')
const errorMessage = ref('')
onMounted(() => auth.hydrate())

async function sendOtp() {
  errorMessage.value = ''
  try {
    const response: any = await $fetch('/api/v1/auth/otp/send', { method: 'POST', body: { phone: phone.value } })
    devCode.value = response.data?.devCode || ''
    step.value = 'code'
  } catch (error: any) {
    errorMessage.value = error?.data?.error?.message || 'Не удалось отправить код'
  }
}
async function verifyOtp() {
  errorMessage.value = ''
  try {
    const response: any = await $fetch('/api/v1/auth/otp/verify', { method: 'POST', body: { phone: phone.value, code: code.value } })
    auth.setSession(response.data.accessToken, response.data.user)
    await navigateTo('/')
  } catch (error: any) {
    errorMessage.value = error?.data?.error?.message || 'Код неверный'
  }
}
</script>
<template>
  <section class="container-page flex min-h-[calc(100vh-5rem)] items-center py-12">
    <div class="card-dark mx-auto w-full max-w-xl p-8">
      <p class="text-sm uppercase tracking-[0.28em] text-forge">Passwordless auth</p>
      <h1 class="mt-3 text-4xl font-semibold">Вход по телефону</h1>
      <form v-if="step === 'phone'" class="mt-8 space-y-5" @submit.prevent="sendOtp">
        <input v-model="phone" required class="input-dark" placeholder="+7 999 000 00 00" />
        <button class="btn-primary w-full">Получить код</button>
      </form>
      <form v-else class="mt-8 space-y-5" @submit.prevent="verifyOtp">
        <input v-model="code" required class="input-dark" placeholder="6-значный код" />
        <p v-if="devCode" class="rounded-2xl border border-forge/40 bg-forge/10 p-3 text-sm text-forge">Dev code: {{ devCode }}</p>
        <button class="btn-primary w-full">Войти</button>
      </form>
      <p v-if="errorMessage" class="mt-5 text-forge">{{ errorMessage }}</p>
    </div>
  </section>
</template>
