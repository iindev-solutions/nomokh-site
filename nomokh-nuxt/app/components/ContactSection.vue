<template>
  <section class="contacts" id="contacts">
    <div class="l-wrapper contacts__inner">
      <div class="contacts__form">
        <h2 class="contacts__form-title">Хотите эксклюзивное изделие?</h2>
        <p class="contacts__form-desc">Оставьте заявку — мы перезвоним через 5 минут!</p>
        <form class="contacts__form-body" id="contactForm" novalidate @submit.prevent="handleSubmit">
          <label class="sr-only" for="contactName">Ваше имя</label>
          <input type="text" id="contactName" placeholder="Ваше имя" required autocomplete="name" v-model="form.name" />
          <label class="sr-only" for="contactPhone">Ваш телефон</label>
          <input type="tel" id="contactPhone" placeholder="Ваш телефон" required autocomplete="tel" pattern="[\+0-9\s\-\(\)]+" v-model="form.phone" />
          <label class="contacts__checkbox">
            <input type="checkbox" required v-model="form.agreed" />
            <span>Согласен на обработку <a href="#">персональных данных</a></span>
          </label>
          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Отправка...' : 'Оставить заявку' }}
          </button>
        </form>
        <p v-if="submitted" class="contacts__success">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
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

<script setup>
const form = reactive({
  name: '',
  phone: '',
  agreed: false
})

const isSubmitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  if (!form.name || !form.phone || !form.agreed) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  isSubmitting.value = false
  submitted.value = true
  form.name = ''
  form.phone = ''
  form.agreed = false

  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>

<style scoped>
.contacts {
  border-top: 1px solid #EEE;
  overflow: hidden;
}

.contacts__inner {
  display: flex;
}

.contacts__form {
  width: 50%;
  padding: 80px 8% 80px 0;
  border-right: 1px solid #EEE;
}

.contacts__form-title {
  font-size: clamp(22px, 2.5vw, 32px);
  font-weight: 700;
  margin-bottom: 8px;
  padding-right: 40px;
}

.contacts__form-desc {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 40px;
}

.contacts__form-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contacts__form-body input[type="text"],
.contacts__form-body input[type="tel"] {
  border: none;
  border-bottom: 1px solid var(--color-light);
  padding: 12px 0;
  background: transparent;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.contacts__form-body input[type="text"]:focus,
.contacts__form-body input[type="tel"]:focus {
  border-bottom-color: var(--color-orange);
}

.contacts__form-body input::placeholder {
  color: var(--color-gray);
}

.contacts__checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  margin-top: 8px;
}

.contacts__checkbox input[type="checkbox"] {
  margin-top: 3px;
  accent-color: var(--color-orange);
}

.contacts__checkbox span {
  font-size: 12px;
  color: var(--color-gray);
}

.contacts__checkbox a {
  text-decoration: underline;
}

.contacts__checkbox a:hover {
  color: var(--color-dark);
}

.contacts__form-body button[type="submit"] {
  background: var(--color-orange);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 16px 32px;
  width: fit-content;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(239, 126, 49, 0.3);
}

.contacts__form-body button[type="submit"]:hover:not(:disabled) {
  background: #d96a23;
  box-shadow: 0 8px 24px rgba(239, 126, 49, 0.4);
}

.contacts__form-body button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contacts__success {
  margin-top: 16px;
  color: #10B981;
  font-weight: 500;
}

.contacts__map {
  width: 50%;
  position: relative;
  min-height: 400px;
  background: #e5e5e5;
}

.contacts__map-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  filter: grayscale(1);
  opacity: 0.8;
  transition: filter 0.7s, opacity 0.7s;
}

.contacts__map:hover .contacts__map-iframe {
  filter: grayscale(0);
  opacity: 1;
}

.contacts__map-address {
  position: absolute;
  top: 48px;
  left: 48px;
  background: var(--color-white);
  padding: 20px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 2;
  max-width: 280px;
}

.contacts__map-pin {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
}

.contacts__map-detail {
  font-size: 12px;
  color: #6B7280;
  line-height: 1.5;
  padding-left: 24px;
}

/* Shadow utilities */
.shadow-right {
  position: relative;
}

.shadow-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 100%;
  width: 100vw;
  height: 100%;
  background: var(--shadow-color, inherit);
  z-index: -1;
}

@media (max-width: 768px) {
  .contacts__inner {
    flex-direction: column;
  }

  .contacts__form {
    width: 100%;
    padding: 48px 0;
    border-right: none;
  }

  .contacts__map {
    width: 100%;
    height: 350px;
    order: -1;
  }

  .contacts__map-address {
    top: 24px;
    left: 24px;
  }
}
</style>
