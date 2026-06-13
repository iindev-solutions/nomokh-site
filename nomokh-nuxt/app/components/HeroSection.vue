<template>
  <section class="hero">
    <div class="l-wrapper">
      <div class="hero__container">
        <div class="hero__content shadow-left shadow--dark">
          <div class="hero__brand">
            <img src="/logo-nomokh.jpg" alt="НОМОХ" class="hero__logo" />
            <p class="hero__brand-sub">НОМОХ</p>
          </div>
          <h1 class="hero__title">
            Якутские ножи<br />
            ручной работы
          </h1>
          <p class="hero__desc">
            Ножи, одежда и украшения. Доставка по всей России.
          </p>
          <a href="#catalog" class="hero__btn">
            Перейти в каталог
          </a>
        </div>
        <div class="hero__visual">
          <div class="hero__image-wrap">
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

<style scoped>
.hero {
  min-height: 100vh;
  max-height: 900px;
  position: relative;
  overflow: hidden;
}

.hero__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 48px;
  color: var(--color-white);
  background: var(--color-dark);
  background-image: url('/img/hero-left.jpg');
  background-size: cover;
  background-position: center;
}

.hero__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.hero__logo {
  height: 48px;
  width: auto;
  border-radius: 6px;
}

.hero__brand-sub {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--color-gray);
}

.hero__title {
  font-size: clamp(32px, 3.5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
}

.hero__desc {
  font-size: 14px;
  color: var(--color-gray);
  line-height: 1.7;
  max-width: 400px;
  margin-bottom: 32px;
}

.hero__btn {
  display: inline-flex;
  background: var(--color-white);
  color: var(--color-dark);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 16px 32px;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;
  width: fit-content;
}

.hero__btn:hover {
  background: var(--color-orange);
  color: var(--color-white);
}

.hero__visual {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0 80px 16px;
  background: #F5F5F5;
  overflow: hidden;
}

.hero__visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/logo-nomokh.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.06;
  filter: blur(1px);
  pointer-events: none;
}

.hero__image-wrap {
  position: relative;
  margin-left: -145px;
  margin-bottom: 40px;
}

.hero__image {
  width: 100%;
  max-width: 980px;
  height: 422px;
  display: block;
  object-fit: cover;
}

.hero__card-wrap {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: calc(100% - 16px);
  max-width: 420px;
}

.hero__card {
  background: var(--color-orange);
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-white);
}

.hero__card-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.hero__card-meta {
  font-size: 11px;
  opacity: 0.85;
  line-height: 1.5;
}

.hero__card-arrow {
  width: 40px;
  height: 40px;
  background: var(--color-white);
  color: var(--color-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s;
}

.hero__card-arrow:hover {
  background: var(--color-light);
}

/* Shadow utilities */
.shadow-left,
.shadow-right {
  position: relative;
}

.shadow-left::before,
.shadow-right::before {
  content: '';
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  background: var(--shadow-color, inherit);
  z-index: -1;
}

.shadow-left::before {
  right: 100%;
}

.shadow-right::before {
  left: 100%;
}

.shadow--orange {
  --shadow-color: #f5a070;
}

.shadow--gray {
  --shadow-color: #A8A8A8;
}

.shadow--dark {
  --shadow-color: #333;
}

@media (max-width: 768px) {
  .hero__container {
    grid-template-columns: 1fr;
  }

  .hero__content {
    padding: 80px 16px 32px;
  }

  .hero__visual {
    padding: 0 16px;
  }

  .hero__image-wrap {
    margin-left: 0;
    margin-bottom: 24px;
  }

  .hero__image {
    max-width: 100%;
  }

  .hero__card-wrap {
    position: static;
    max-width: 100%;
    width: 100%;
    margin-top: -1px;
  }
}
</style>
