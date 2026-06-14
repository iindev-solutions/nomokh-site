export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'НОМОХ — Якутские изделия',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.6.0/css/glide.core.min.css' }
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.6.0/glide.min.js' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 3000
  }
})
