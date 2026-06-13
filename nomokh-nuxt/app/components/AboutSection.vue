<template>
  <section class="about" id="about">
    <div class="l-wrapper">
      <div class="about__inner">
        <div class="about__text">
          <h2 class="about__heading">
            НОМОХ магазин якутских изделий ручной работы
          </h2>
          <p class="about__paragraph">
            Якутские ножи, термопосуда, одежда и украшения. Всё, что создаётся в Якутии с душой и традициями.
          </p>
          <p class="about__paragraph">
            Доставка и отправка в любую точку мира. Приходите к нам по адресу Лермонтова 62/2г, Якутск.
          </p>
        </div>
        <div class="about__slider">
          <div class="about__slider-track">
            <img src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=1000" alt="Булатная сталь" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 80px 0;
}

.about__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  border-left: 1px solid #e8e8e8;
}

.about__text {
  padding: 48px;
}

.about__heading {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
}

.about__paragraph {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.7;
  margin-bottom: 16px;
}

.about__slider {
  overflow: hidden;
}

.about__slider-track img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .about {
    padding: 48px 0;
  }

  .about__inner {
    grid-template-columns: 1fr;
  }

  .about__text {
    padding: 24px 0;
  }

  .about__slider-track img {
    height: 400px;
  }
}
</style>
