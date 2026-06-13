<template>
  <footer class="footer">
    <div class="l-wrapper footer__inner">
      <div class="footer__left shadow-left">
        <a href="tel:+79244640888" class="footer__phone">8 (924) 464-08-88</a>
        <nav class="footer__nav">
          <a href="#about">О нас</a>
          <a href="#catalog">Каталог</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <a href="#" class="footer__policy">Политика конфиденциальности</a>
      </div>
      <div class="footer__right shadow-right">
        <div class="footer__brand">НОМОХ</div>
        <p class="footer__address">Лермонтова 62/2г, Якутск</p>
        <a href="https://wa.me/+79244640888" target="_blank" rel="noreferrer" class="footer__link">wa.me/+79244640888</a>
        <div class="footer__social">
          <a href="https://wa.me/+79244640888" target="_blank" rel="noreferrer" class="footer__social-icon" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
          <a href="#" class="footer__social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
        <p class="footer__credit">Разработка сайта</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-dark);
  color: var(--color-white);
  padding: 64px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.footer__left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer__phone {
  font-size: 28px;
  font-weight: 800;
  transition: color 0.2s;
}

.footer__phone:hover {
  color: var(--color-orange);
}

.footer__nav {
  display: flex;
  gap: 24px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gray);
}

.footer__nav a:hover {
  color: var(--color-white);
}

.footer__policy {
  font-size: 12px;
  color: #555;
  text-decoration: underline;
  cursor: pointer;
}

.footer__policy:hover {
  color: var(--color-white);
}

.footer__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.footer__brand {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 0.2em;
}

.footer__address {
  font-size: 12px;
  color: var(--color-gray);
}

.footer__link {
  font-size: 14px;
  color: var(--color-gray);
  transition: color 0.2s;
}

.footer__link:hover {
  color: var(--color-white);
}

.footer__social {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.footer__social-icon {
  width: 44px;
  height: 44px;
  background: #242424;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  transition: all 0.2s;
}

.footer__social-icon:hover {
  background: var(--color-orange);
  color: var(--color-white);
}

.footer__social-icon svg {
  width: 20px;
  height: 20px;
}

.footer__credit {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #555;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0;
  }

  .footer__inner {
    flex-direction: column;
    gap: 32px;
  }

  .footer__right {
    align-items: flex-start;
  }
}
</style>
