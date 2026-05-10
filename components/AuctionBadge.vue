<script setup lang="ts">
defineProps<{ status?: string }>()
</script>
<template>
  <span class="rounded-full border border-forge/40 bg-forge/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-forge">{{ status || 'V2' }}</span>
</template>
