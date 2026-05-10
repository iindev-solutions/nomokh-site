export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-10',
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    adminApiToken: process.env.ADMIN_API_TOKEN,
    smsRuApiId: process.env.SMS_RU_API_ID,
    yookassaShopId: process.env.YOOKASSA_SHOP_ID,
    yookassaSecretKey: process.env.YOOKASSA_SECRET_KEY,
    yookassaReturnUrl: process.env.YOOKASSA_RETURN_URL,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      enableAuction: process.env.NUXT_PUBLIC_ENABLE_AUCTION === 'true',
      demoMode: process.env.NUXT_PUBLIC_DEMO_MODE === 'true',
      ymId: process.env.NUXT_PUBLIC_YM_ID || ''
    }
  },
  routeRules: {
    '/': { swr: 300 },
    '/catalog/**': { swr: 300 },
    '/product/**': { swr: 300 },
    '/cart': { ssr: false },
    '/checkout': { ssr: false },
    '/login': { ssr: false },
    '/account/**': { ssr: false },
    '/admin/**': { ssr: false },
    '/auction': { swr: 60 },
    '/auction/**': { ssr: false }
  },
  nitro: { compressPublicAssets: true },
  image: { format: ['webp', 'jpg', 'png'], quality: 82 },
  app: {
    head: {
      title: 'NOMOKH — якутские ножи с легендой',
      meta: [
        { name: 'description', content: 'Премиальный каталог якутских ножей, украшений и северных ремесленных изделий с историей, упаковкой и проверкой подлинности.' },
        { name: 'theme-color', content: '#0B0D10' }
      ]
    }
  }
})
