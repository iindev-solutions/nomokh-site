<script setup lang="ts">
definePageMeta({ middleware: [async () => { const auth = useAuthStore(); await auth.hydrate(); if (!auth.isAdmin) return navigateTo('/login') }] })
const { apiFetch } = useApi()
const xmlUrl = ref('')
const xml = ref('')
const result = ref<any>(null)
const errorMessage = ref('')
async function sync() {
  errorMessage.value = ''
  result.value = null
  try {
    const response: any = await apiFetch('/api/v1/admin/sync/1c', {
      method: 'POST',
      body: { xmlUrl: xmlUrl.value || undefined, xml: xml.value || undefined }
    })
    result.value = response.data
  } catch (error: any) {
    errorMessage.value = error?.data?.error?.message || 'Sync failed'
  }
}
</script>
<template>
  <section class="container-page py-12">
    <h1 class="text-5xl font-semibold">1C Sync</h1>
    <div class="card-dark mt-8 space-y-5 p-6">
      <input v-model="xmlUrl" class="input-dark" placeholder="XML URL" />
      <textarea v-model="xml" class="input-dark min-h-48" placeholder="или вставить CommerceML XML"></textarea>
      <button class="btn-primary" @click="sync">Запустить импорт</button>
      <pre v-if="result" class="overflow-auto rounded-2xl bg-black/40 p-4 text-sm text-steel">{{ result }}</pre>
      <p v-if="errorMessage" class="text-forge">{{ errorMessage }}</p>
    </div>
  </section>
</template>
