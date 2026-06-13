<template>
  <section class="services">
    <div class="l-wrapper">
      <div class="services__inner">
        <div class="services__header">
          <div class="shadow-left shadow--orange">
            <h2 class="services__title">Дополнительные услуги</h2>
          </div>
          <div class="services__feature shadow-left shadow--dark"></div>
        </div>
        <div class="services__list">
          <div class="services__item shadow-right">
            <div class="services__item-text">
              Гравировка на ножах и изделиях
            </div>
            <div class="services__item-img" style="background-image: url('https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80')"></div>
          </div>
          <div class="services__item shadow-right">
            <div class="services__item-text">
              Заточка ножей
            </div>
            <div class="services__item-img" style="background-image: url('https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80')"></div>
          </div>
          <div class="services__item shadow-right">
            <div class="services__item-text">
              Коврики от Gelixmax
            </div>
            <div class="services__item-img" style="background-image: url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80')"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  overflow: hidden;
}

.services__inner {
  display: flex;
}

.services__header {
  width: 40%;
  flex-shrink: 0;
}

.services__title {
  background: var(--color-orange);
  height: 192px;
  display: flex;
  align-items: center;
  padding: 0 64px;
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 700;
  color: var(--color-white);
}

.services__feature {
  height: 368px;
  background: #333;
  background-image: url('/img/hero-bg.png');
  background-size: cover;
  background-position: center;
}

.services__list {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.services__item {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.services__item:nth-child(1) {
  background: #666;
  height: 200px;
}

.services__item:nth-child(2) {
  background: #444;
  height: 160px;
}

.services__item:nth-child(3) {
  background: var(--color-gray);
  height: 200px;
  border-bottom: none;
}

.services__item-text {
  width: 60%;
  display: flex;
  align-items: center;
  padding: 0 48px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-white);
  line-height: 1.4;
}

.services__item-img {
  width: 40%;
  background-size: cover;
  background-position: center;
  transition: transform 0.7s;
}

.services__item:hover .services__item-img {
  transform: scale(1.05);
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
  .services__inner {
    flex-direction: column;
  }

  .services__header {
    width: 100%;
  }

  .services__title {
    height: 96px;
    padding: 0 24px;
  }

  .services__list {
    width: 100%;
  }

  .services__feature {
    display: none;
  }

  .services__item {
    flex-direction: column;
    height: auto;
  }

  .services__item-text {
    width: 100%;
    padding: 24px;
    font-size: 12px;
  }

  .services__item-img {
    width: 100%;
    height: 160px;
  }
}
</style>
