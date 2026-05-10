<script setup lang="ts">
const visible = ref(false)
onMounted(() => {
  visible.value = localStorage.getItem('nomokh_cookie_consent') !== 'accepted'
  if (!visible.value) enableAnalytics()
})
function accept() {
  localStorage.setItem('nomokh_cookie_consent', 'accepted')
  visible.value = false
  enableAnalytics()
}
</script>
<template>
  <div v-if="visible" class="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-3xl border border-white/10 bg-obsidian p-5 shadow-blade">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p class="text-sm leading-6 text-steel">Мы используем cookie и аналитику только после согласия.</p>
      <button class="btn-primary shrink-0" @click="accept">Принять</button>
    </div>
  </div>
</template>
