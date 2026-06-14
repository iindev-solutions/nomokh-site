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
        <div class="about__slider glide" id="aboutSlider">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide">
                <img src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=1000" alt="Булатная сталь" loading="lazy" />
              </li>
              <li class="glide__slide">
                <img src="https://images.unsplash.com/photo-1584670747417-594a9412fba5?auto=format&fit=crop&q=80&w=1000" alt="Якутские ножи" loading="lazy" />
              </li>
              <li class="glide__slide">
                <img src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1000" alt="Нож из булатной стали" loading="lazy" />
              </li>
            </ul>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]">
            <button class="glide__bullet" data-glide-dir="=0"></button>
            <button class="glide__bullet" data-glide-dir="=1"></button>
            <button class="glide__bullet" data-glide-dir="=2"></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
onMounted(() => {
  // @ts-ignore
  const Glide = window.Glide
  if (!Glide) return

  new Glide('#aboutSlider', {
    type: 'carousel',
    perView: 1,
    autoplay: 4000,
    hoverpause: true,
    animationDuration: 600,
  }).mount()
})
</script>
