<template>
  <section class="features">
    <div class="features__inner">
      <div class="l-wrapper">
        <div class="features__grid shadow-left shadow-right shadow--gray">
          <h2 class="features__title">Уникальность нашей продукции:</h2>
          <div class="features__cards">
            <div class="features__card features__card--accent">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              <h4>Традиционные ремесленные техники</h4>
            </div>
            <div class="features__card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              <h4>Качество материалов</h4>
            </div>
            <div class="features__card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <h4>Авторский дизайн</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features__inner {
  padding: 80px 0;
  background: var(--color-dark);
}

.features__grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  gap: 48px;
  padding: 48px;
  padding-bottom: 0;
  background: var(--color-dark);
}

.features__title {
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 700;
  color: var(--color-white);
}

.features__cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
}

.features__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  color: var(--color-gray);
}

.features__card svg {
  color: var(--color-white);
}

.features__card h4 {
  font-size: 14px;
  font-weight: 500;
  color: #D1D5DB;
  line-height: 1.4;
}

.features__card--accent {
  background: var(--color-orange);
  padding: 32px 28px;
  align-items: flex-start;
}

.features__card--accent .features__card-icon {
  background: var(--color-dark);
}

.features__card--accent .features__card-icon svg {
  color: var(--color-white);
}

.features__card--accent h4 {
  color: var(--color-white);
  font-weight: 600;
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
  .features__inner {
    padding: 48px 0;
  }

  .features__grid {
    padding: 24px;
  }

  .features__cards {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
