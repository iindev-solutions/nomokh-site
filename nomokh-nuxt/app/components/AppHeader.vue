<template>
  <header class="header" id="mainHeader">
    <div class="l-wrapper">
      <div class="header__inner">
        <button
          class="header__burger"
          id="burgerBtn"
          aria-label="Меню"
          :aria-expanded="menuOpen"
          aria-controls="mainNav"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
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
    </div>

    <div class="header__overlay" id="mainNav" :class="{ open: menuOpen }">
      <nav class="header__nav">
        <a href="#about" @click="closeMenu">О нас</a>
        <a href="#catalog" @click="closeMenu">Каталог</a>
        <a href="#contacts" @click="closeMenu">Контакты</a>
      </nav>
      <div class="header__contacts">
        <a href="tel:+79244640888" class="header__phone">8 (924) 464-08-88</a>
        <p class="header__address">Лермонтова 62/2г, Якутск</p>
        <a href="https://wa.me/+79244640888" target="_blank" rel="noreferrer" class="header__whatsapp">wa.me/+79244640888</a>
      </div>
    </div>
  </header>
</template>

<script setup>
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.3s, transform 0.3s;
}

.header--scrolled {
  background: var(--color-dark);
}

.header--hidden {
  transform: translateY(-100%);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header__burger {
  position: relative;
  z-index: 101;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
}

.header__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-white);
  border-radius: 1px;
  transition: transform 0.3s, opacity 0.3s;
}

.header__burger.active span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.header__burger.active span:nth-child(2) {
  opacity: 0;
}

.header__burger.active span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.header__overlay {
  position: fixed;
  inset: 0;
  background: var(--color-dark);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 16px 64px;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 100;
}

.header__overlay.open {
  transform: translateY(0);
  opacity: 1;
}

.header__nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header__nav a {
  font-size: clamp(32px, 6vw, 72px);
  font-weight: 800;
  color: var(--color-white);
  transition: color 0.2s;
}

.header__nav a:hover {
  color: var(--color-orange);
}

.header__contacts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header__phone {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-white);
}

.header__phone:hover {
  color: var(--color-orange);
}

.header__address {
  font-size: 14px;
  color: var(--color-gray);
}

.header__whatsapp {
  font-size: 14px;
  color: var(--color-gray);
}

.header__whatsapp:hover {
  color: var(--color-white);
}

.header__actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.header__icon {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  transition: color 0.2s;
  border-radius: 6px;
}

.header__icon:hover {
  color: var(--color-orange);
}

.header__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-gray);
  color: var(--color-dark);
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__badge--orange {
  background: var(--color-orange);
  color: var(--color-white);
}
</style>
