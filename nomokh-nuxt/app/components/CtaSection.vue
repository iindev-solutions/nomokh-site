<template>
  <section class="cta">
    <div class="l-wrapper">
      <div class="cta__inner">
        <div class="cta__content">
          <h2 class="cta__title">Хотите эксклюзивное изделие?</h2>
          <p class="cta__desc">Напишите нам, и мы разработаем дизайн специально для вас.</p>
        </div>
        <a href="#contacts" class="cta__btn">Написать</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 48px 0;
}

.cta__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 40px 0;
}

.cta__title {
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 700;
  margin-bottom: 8px;
}

.cta__desc {
  font-size: 14px;
  color: #6B7280;
}

.cta__btn {
  display: inline-flex;
  justify-self: end;
  background: var(--color-orange);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 16px 48px;
  transition: background 0.2s;
}

.cta__btn:hover {
  background: #d96a23;
}

@media (max-width: 768px) {
  .cta__inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 24px;
    padding: 0;
  }

  .cta__btn {
    width: 100%;
    justify-self: center;
    justify-content: center;
  }
}
</style>
