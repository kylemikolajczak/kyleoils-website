(() => {
  'use strict';
  const groups = [...document.querySelectorAll('[data-consultation-cards]')];
  if (!groups.length || document.documentElement.dataset.consultationMotionReady) return;
  document.documentElement.dataset.consultationMotionReady = '1';
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = groups.flatMap(group => [...group.querySelectorAll('[data-consultation-card]')]);
  groups.forEach(group => {
    [...group.querySelectorAll('[data-consultation-card]')].forEach((card, i) => {
      card.style.setProperty('--consultation-offset', (i % 2 === 0 ? '-36px' : '36px'));
      card.style.setProperty('--consultation-delay', (Math.min(i % 3, 2) * 110) + 'ms');
    });
  });
  document.documentElement.classList.add('consultation-cards-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    }
  }, {rootMargin:'0px 0px -4% 0px', threshold:.12});
  cards.forEach(card => observer.observe(card));
  addEventListener('pageshow', e => {
    if (!e.persisted) return;
    cards.forEach(card => {
      const box = card.getBoundingClientRect();
      if (box.top < innerHeight && box.bottom > 0) {
        card.classList.add('is-in-view');
        observer.unobserve(card);
      }
    });
  });
})();
