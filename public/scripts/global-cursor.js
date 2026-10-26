(() => {
  'use strict';
  const cursor = document.querySelector('[data-ko-cursor]');
  if (!cursor || document.documentElement.dataset.koCursorReady === 'true') return;
  document.documentElement.dataset.koCursorReady = 'true';
  const root = document.documentElement;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const targets = 'a[href], button:not(:disabled), summary, select:not(:disabled), input:not(:disabled), textarea:not(:disabled), label[for], [role="button"], [role="link"], [role="tab"], [role="menuitem"], [data-cursor-interactive]';
  let lastX = -100, lastY = -100, lastClickable = false, active = false;
  function enable() {
    if (!fine.matches) {
      root.classList.remove('ko-cursor-enabled', 'ko-cursor-visible', 'ko-cursor-clickable', 'ko-cursor-pulse');
      active = false;
      return false;
    }
    root.classList.add('ko-cursor-enabled');
    return true;
  }
  function updateClickable(hit) {
    const clickable = Boolean(hit instanceof Element && hit.closest(targets));
    root.classList.toggle('ko-cursor-clickable', clickable);
    if (clickable && !lastClickable && !reduced.matches) {
      root.classList.remove('ko-cursor-pulse');
      // Starting the pulse on entry, not on every pointermove.
      void cursor.offsetWidth;
      root.classList.add('ko-cursor-pulse');
    } else if (!clickable) {
      root.classList.remove('ko-cursor-pulse');
    }
    lastClickable = clickable;
  }
  function move(e) {
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    if (!enable()) return;
    active = true;
    lastX = e.clientX;
    lastY = e.clientY;
    cursor.style.left = lastX + 'px';
    cursor.style.top = lastY + 'px';
    root.classList.add('ko-cursor-visible');
    updateClickable(e.target);
  }
  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerover', e => {
    if (!active || !fine.matches) return;
    updateClickable(e.target);
  }, { passive: true });
  document.addEventListener('pointerout', e => {
    if (e.relatedTarget !== null) return;
    active = false;
    root.classList.remove('ko-cursor-visible', 'ko-cursor-clickable', 'ko-cursor-pulse');
    lastClickable = false;
  }, { passive: true });
  // Scrolling can replace the hit target under a stationary pointer.
  window.addEventListener('scroll', () => {
    if (!active || !fine.matches) return;
    updateClickable(document.elementFromPoint(lastX, lastY));
  }, { passive: true });
  window.addEventListener('blur', () => {
    active = false;
    root.classList.remove('ko-cursor-visible', 'ko-cursor-clickable', 'ko-cursor-pulse');
  });
  fine.addEventListener?.('change', enable);
  enable();
})();
