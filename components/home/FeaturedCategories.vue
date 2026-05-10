<script setup lang="ts">
type Category = { id: string; slug: string; name: string; description?: string | null }

const { data: categoriesResponse, pending, error } = useFetch<{ data: Category[] }>('/api/v1/categories')
const categories = computed(() => categoriesResponse.value?.data || [])
</script>

<template>
  <section class="py-16 bg-steel-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-steel-900 mb-8">Популярные категории</h2>
      <div v-if="pending" class="text-steel-500">Загрузка...</div>
      <div v-else-if="error" class="text-ember">Ошибка загрузки категорий</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/catalog/${category.slug}`"
          class="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="h-48 bg-steel-200 flex items-center justify-center">
            <span class="text-steel-500 text-sm">{{ category.name }}</span>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-steel-900 group-hover:text-forge-600 transition-colors">
              {{ category.name }}
            </h3>
            <p v-if="category.description" class="text-sm text-steel-500 mt-1 line-clamp-2">
              {{ category.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
