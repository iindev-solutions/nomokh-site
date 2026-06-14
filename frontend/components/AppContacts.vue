<template>
  <section class="contacts" id="contacts">
    <div class="l-wrapper contacts__inner">
      <div class="contacts__form">
        <h2 class="contacts__form-title">Хотите эксклюзивное изделие?</h2>
        <p class="contacts__form-desc">Оставьте заявку — мы перезвоним через 5 минут!</p>
        <form class="contacts__form-body" id="contactForm">
          <input type="text" placeholder="Ваше имя" required />
          <input type="tel" placeholder="Ваш телефон" required />
          <label class="contacts__checkbox">
            <input type="checkbox" required />
            <span>Согласен на обработку <a href="#">персональных данных</a></span>
          </label>
          <button type="submit">Оставить заявку</button>
        </form>
      </div>
      <div class="contacts__map shadow-right">
        <iframe src="https://yandex.ru/map-widget/v1/?ll=129.715367%2C62.030588&z=15" class="contacts__map-iframe" allowfullscreen loading="lazy" title="Карта"></iframe>
        <div class="contacts__map-address">
          <span class="contacts__map-pin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF7E31" stroke="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
            Лермонтова 62/2г
          </span>
          <p class="contacts__map-detail">
            Якутск, Россия, 677000<br />
            Магазин якутских изделий
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
onMounted(() => {
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
  })
})
</script>
