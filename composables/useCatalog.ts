import type { Product, Category } from '@prisma/client'

export function useCatalog() {
  const { data: categories, pending: categoriesPending, error: categoriesError } = useFetch<Category[]>('/api/v1/categories')

  const fetchProducts = (filters?: { categorySlug?: string; minPrice?: number; maxPrice?: number; page?: number; limit?: number }) => {
    return useFetch<Product[]>('/api/v1/products', {
      query: filters,
    })
  }

  const fetchProduct = (id: string) => {
    return useFetch<Product>(`/api/v1/products/${id}`)
  }

  return {
    categories: readonly(categories),
    categoriesPending: readonly(categoriesPending),
    categoriesError: readonly(categoriesError),
    fetchProducts,
    fetchProduct,
  }
}
