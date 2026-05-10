<template>
  <div class="bg-steel-50 rounded-lg p-4">
    <h3 class="font-semibold text-steel-900 mb-3">Характеристики</h3>
    <dl class="space-y-2 text-sm">
      <div v-if="product.steel" class="flex justify-between">
        <dt class="text-steel-500">Сталь</dt>
        <dd class="font-medium text-steel-900">{{ product.steel }}</dd>
      </div>
      <div v-if="product.handleMaterial" class="flex justify-between">
        <dt class="text-steel-500">Рукоять</dt>
        <dd class="font-medium text-steel-900">{{ product.handleMaterial }}</dd>
      </div>
      <div v-if="product.bladeLength" class="flex justify-between">
        <dt class="text-steel-500">Длина клинка</dt>
        <dd class="font-medium text-steel-900">{{ product.bladeLength }} мм</dd>
      </div>
      <div v-if="product.weight" class="flex justify-between">
        <dt class="text-steel-500">Вес</dt>
        <dd class="font-medium text-steel-900">{{ product.weight }} г</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@prisma/client'

interface Props {
  product: Product
}

defineProps<Props>()
</script>
