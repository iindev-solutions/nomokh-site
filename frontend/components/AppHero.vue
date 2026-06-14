<template>
  <section class="hero">
    <div class="l-wrapper">
      <div class="hero__container">
        <div class="hero__content shadow-left shadow--dark">
          <div class="hero__brand">
            <img src="/logo-nomokh.jpg" alt="НОМОХ" class="hero__logo" />
          </div>
          <h1 class="hero__title" data-anim="hero-text">
            Якутские ножи<br />
            ручной работы
          </h1>
          <p class="hero__desc" data-anim="hero-text">
            Ножи, одежда и украшения. Доставка по всей России.
          </p>
          <a href="#catalog" class="hero__btn" data-anim="hero-text">
            Перейти в каталог
          </a>
        </div>
        <div class="hero__visual">
          <div class="hero__image-wrap" data-anim="hero-visual">
            <img src="/img/hero-bg.png" alt="Якутские ножи" class="hero__image" />
          </div>
          <div class="hero__card-wrap">
            <div class="hero__card shadow-right shadow--orange">
              <div class="hero__card-text">
                <h3 class="hero__card-title">Нож из якутской стали Н003</h3>
                <p class="hero__card-meta">
                  Твердость клинка, HRC: 62-64<br />
                  Ножны (чехол): кожа
                </p>
              </div>
              <button class="hero__card-arrow" aria-label="Подробнее">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
onMounted(() => {
  // @ts-ignore
  const gsap = window.gsap
  if (!gsap) return

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  heroTl
    .to('[data-anim="hero-text"]', {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
    })
    .to('[data-anim="hero-visual"]', {
      x: 0,
      opacity: 1,
      duration: 1,
    }, '-=0.4')
})
</script>
