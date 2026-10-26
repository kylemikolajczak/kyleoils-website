(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.knowledge-world-entrance')];
  if (!cards.length || document.documentElement.dataset.hubWorldsInitialized === 'true') return;
  document.documentElement.dataset.hubWorldsInitialized = 'true';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  for (const [index, card] of cards.entries()) {
    card.dataset.knowledgeFly = 'true';
    card.style.setProperty('--hub-card-x', (index % 2 ? 42 : -42) + 'px');
    card.style.setProperty('--hub-delay', ((index % 4) * 100) + 'ms');
  }
  document.documentElement.classList.add('hub-worlds-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    }
  }, {rootMargin: '0px 0px -4% 0px', threshold: .1});
  cards.forEach(card => observer.observe(card));
  addEventListener('pageshow', e => {
    if (!e.persisted) return;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        card.classList.add('is-in-view');
        observer.unobserve(card);
      }
    }
  });
})();
