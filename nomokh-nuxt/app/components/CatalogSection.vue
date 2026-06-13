<template>
  <section class="catalog" id="catalog">
    <div class="l-wrapper">
      <div class="catalog__header">
        <h2 class="catalog__title">Наш каталог</h2>
      </div>
      <div class="catalog__inner">
        <div class="catalog__grid">
          <a href="#" class="catalog__card">
            <img src="https://images.unsplash.com/photo-1584670747417-594a9412fba5?auto=format&fit=crop&q=80" alt="Ножи" class="catalog__card-img" loading="lazy" />
            <div class="catalog__card-overlay">
              <h3>Ножи сувенирные и практичные</h3>
              <p>В арсенале любого мужчины — охотника, рыбака или туриста.</p>
              <span class="catalog__card-line"></span>
            </div>
          </a>
          <a href="#" class="catalog__card">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80" alt="Термопосуда" class="catalog__card-img" loading="lazy" />
            <div class="catalog__card-overlay catalog__card-overlay--light">
              <h3>Термопосуда<br />цена = качество</h3>
              <p>Надёжная посуда — незаменимый атрибут для долгих походов.</p>
              <span class="catalog__card-line"></span>
            </div>
          </a>
          <a href="#" class="catalog__card">
            <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80" alt="Якутская одежда" class="catalog__card-img" loading="lazy" />
            <div class="catalog__card-overlay catalog__card-overlay--light">
              <h3>Якутская одежда</h3>
              <p>На каждый день и праздники. Утеплённая и стильная.</p>
              <span class="catalog__card-line"></span>
            </div>
          </a>
          <a href="#" class="catalog__card">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80" alt="Украшения" class="catalog__card-img" loading="lazy" />
            <div class="catalog__card-overlay">
              <h3>Якутские украшения</h3>
              <p>Ручная работа, бусины, дэйбиир — традиция в каждой детали.</p>
              <span class="catalog__card-line"></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  background: var(--color-light);
}

.catalog__header {
  background: var(--color-orange);
  padding: 24px 48px;
}

.catalog__title {
  font-size: clamp(22px, 2.5vw, 32px);
  font-weight: 700;
  color: var(--color-white);
}

.catalog__inner {
  padding: 0 48px;
  border-left: 1px solid var(--color-light);
  border-right: 1px solid var(--color-light);
}

.catalog__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.catalog__card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  display: flex;
}

.catalog__card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s, opacity 0.7s;
}

.catalog__card:hover .catalog__card-img {
  transform: scale(1.05);
}

.catalog__card-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: var(--color-white);
}

.catalog__card-overlay--light {
  background: rgba(255, 255, 255, 0.85);
  color: var(--color-dark);
}

.catalog__card-overlay h3 {
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.catalog__card-overlay p {
  font-size: 11px;
  line-height: 1.5;
  max-width: 240px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.catalog__card-line {
  display: block;
  width: 40px;
  height: 2px;
  background: var(--color-orange);
}

@media (max-width: 768px) {
  .catalog__inner {
    padding: 0 16px 24px;
  }

  .catalog__grid {
    grid-template-columns: 1fr;
  }

  .catalog__card-overlay {
    padding: 24px;
  }
}
</style>
