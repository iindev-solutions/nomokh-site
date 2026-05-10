<script setup lang="ts">
const steps = ['Контакты', 'Доставка', 'Оплата']
defineProps<{ active: number }>()
</script>
<template>
  <div class="grid gap-3 sm:grid-cols-3">
    <div v-for="(step, index) in steps" :key="step" class="rounded-2xl border p-4 text-sm" :class="index <= active ? 'border-brass bg-brass/10 text-bone' : 'border-white/10 bg-white/[.03] text-steel'">
      <span class="mr-2 text-brass">0{{ index + 1 }}</span>{{ step }}
    </div>
  </div>
</template>
