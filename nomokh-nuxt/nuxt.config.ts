// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  app: {
    head: {
      title: 'НОМОХ — Якутские изделия ручной работы',
      meta: [
        { name: 'description', content: 'Якутские ножи, одежда и украшения ручной работы. Гравировка, заточка, коврики Gelixmax. Доставка по всей России.' },
        { property: 'og:title', content: 'НОМОХ — Якутские изделия ручной работы' },
        { property: 'og:description', content: 'Якутские ножи, одежда и украшения ручной работы. Доставка по всей России.' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#2E2F31' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/logo-nomokh.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
