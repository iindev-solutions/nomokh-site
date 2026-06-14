<template>
  <section class="catalog" id="catalog">
    <div class="l-wrapper">
      <div class="catalog__inner">
        <div class="features__cards">
          <div class="catalog__header">
            <h2 class="catalog__title">Наш каталог</h2>
          </div>
          <div class="features__card" style="opacity: 0;">
            <h4>Качество материалов</h4>
          </div>
          <div class="features__card" style="opacity: 0;">
            <h4>Авторский дизайн</h4>
          </div>
        </div>

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

        <AppCta />
      </div>
    </div>
  </section>
</template>
