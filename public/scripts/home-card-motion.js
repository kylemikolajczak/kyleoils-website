(() => {
  'use strict';
  // Progressive enhancement; links are always present and accessible.
  if (document.documentElement.dataset.homeCardsInitialized === 'true') return;
  const grids = [...document.querySelectorAll('.intent-grid, .next-paths-grid')];
  if (!grids.length) return;
  document.documentElement.dataset.homeCardsInitialized = 'true';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = grids.flatMap(grid => [...grid.querySelectorAll('.intent-card, .next-path-card')]);
  if (reduced || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  // Register every card before enabling the enter animation.
  for (const grid of grids) {
    const elements = [...grid.querySelectorAll('.intent-card, .next-path-card')];
    elements.forEach((card, i) => {
      card.dataset.cardMotion = 'true';
      card.style.setProperty('--card-offset', (i % 2 === 0 ? -45 : 45) + 'px');
      card.style.setProperty('--card-delay', (Math.min(i, 3) * 115) + 'ms');
    });
  }
  root.classList.add('home-cards-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -4% 0px', threshold: .12 });
  cards.forEach(card => observer.observe(card));
  // Never strand links hidden when the document returns from back/forward cache.
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      cards.forEach(card => {
        if (card.getBoundingClientRect().top < innerHeight && card.getBoundingClientRect().bottom > 0) {
          card.classList.add('is-in-view');
          observer.unobserve(card);
        }
      });
    }
  });
})();
