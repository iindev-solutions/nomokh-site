<template>
  <header class="header" id="mainHeader">
    <div class="l-wrapper">
      <div class="header__inner">
        <button class="header__burger" id="burgerBtn" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <div class="header__actions">
          <button class="header__icon" aria-label="Избранное">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="header__badge">3</span>
          </button>
          <button class="header__icon" aria-label="Корзина">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span class="header__badge header__badge--orange">4</span>
          </button>
        </div>
      </div>
      <div class="header__overlay" id="mainNav">
        <nav class="header__nav">
          <a href="#about">О нас</a>
          <a href="#catalog">Каталог</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div class="header__contacts">
          <a href="tel:+79244640888" class="header__phone">8 (924) 464-08-88</a>
          <p class="header__address">Лермонтова 62/2г, Якутск</p>
          <a href="https://wa.me/+79244640888" target="_blank" rel="noreferrer" class="header__whatsapp">wa.me/+79244640888</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
onMounted(() => {
  const header = document.getElementById('mainHeader')
  const burger = document.getElementById('burgerBtn')
  const overlay = document.getElementById('mainNav')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    if (currentScroll > 50) {
      header?.classList.add('header--scrolled')
    } else {
      header?.classList.remove('header--scrolled')
    }
    if (currentScroll > lastScroll && currentScroll > 100) {
      header?.classList.add('header--hidden')
    } else {
      header?.classList.remove('header--hidden')
    }
    lastScroll = currentScroll
  })

  burger?.addEventListener('click', () => {
    burger.classList.toggle('active')
    overlay?.classList.toggle('open')
    document.body.style.overflow = overlay?.classList.contains('open') ? 'hidden' : ''
  })

  overlay?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger?.classList.remove('active')
      overlay.classList.remove('open')
      document.body.style.overflow = ''
    })
  })
})
</script>
