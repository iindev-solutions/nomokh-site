<script setup lang="ts">
defineProps<{ specs: Array<{ label: string; value?: string | number | null }> }>()
</script>
<template>
  <dl class="grid gap-3 sm:grid-cols-2">
    <div v-for="item in specs.filter((spec) => spec.value)" :key="item.label" class="rounded-2xl border border-white/10 bg-white/[.04] p-4">
      <dt class="text-xs uppercase tracking-[0.18em] text-steel-dark">{{ item.label }}</dt>
      <dd class="mt-2 text-bone">{{ item.value }}</dd>
    </div>
  </dl>
</template>
