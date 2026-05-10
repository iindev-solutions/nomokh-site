export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  await auth.hydrate()
  if (!auth.isAuth) return navigateTo('/login')
})
