gsap.registerPlugin(ScrollTrigger);

const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .to('[data-anim="hero-text"]', {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
  })
  .to('[data-anim="hero-visual"]', {
    x: 0,
    opacity: 1,
    duration: 1,
  }, '-=0.4');

gsap.utils.toArray('[data-anim]').forEach((el) => {
  if (el.getAttribute('data-anim') === 'hero-text' || el.getAttribute('data-anim') === 'hero-visual') return;
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out',
  });
});

let lastScroll = 0;
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }
  lastScroll = currentScroll;
});

const burger = document.getElementById('burgerBtn');
const overlay = document.getElementById('mainNav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
});

overlay.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
});

new Glide('#aboutSlider', {
  type: 'carousel',
  perView: 1,
  autoplay: 4000,
  hoverpause: true,
  animationDuration: 600,
}).mount();