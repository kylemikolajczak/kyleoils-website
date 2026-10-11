(() => {
  const root = document.querySelector('[data-essence-drop]');
  if (!root || root.dataset.initialized === 'true') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  let words;
  let anchorSelectors;
  try {
    words = JSON.parse(root.dataset.words || '[]');
    anchorSelectors = JSON.parse(root.dataset.anchors || '[]');
  } catch {
    return;
  }

  const word = root.querySelector('[data-essence-word]');
  if (!word || words.length < 2 || anchorSelectors.length !== words.length) return;

  root.dataset.initialized = 'true';
  root.dataset.direction = 'still';

  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const anchors = [];
  let stagePoints = [];
  let storyStart = 0;
  let storyEnd = 1;
  let motionEnd = 1;
  let fadeStart = 1;
  let fadeEnd = 1;
  let lastScrollY = window.scrollY;
  let lastMoveAt = performance.now();
  let activeStage = -1;
  let frame = 0;
  let settleTimer = 0;
  let mobileWordTimer = 0;
  let wordTransitionTimer = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const smoothstep = (value) => value * value * (3 - (2 * value));

  const collectAnchors = () => {
    anchors.length = 0;
    anchorSelectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) anchors.push(element);
    });
    return anchors.length === words.length;
  };

  const measure = () => {
    if (!collectAnchors()) {
      root.classList.remove('is-ready');
      return;
    }

    const viewport = window.innerHeight;
    const pageLimit = Math.max(1, document.documentElement.scrollHeight - viewport);
    const footer = document.querySelector(root.dataset.footerSelector || '.site-footer');
    storyStart = clamp(
      anchors[0].getBoundingClientRect().top + window.scrollY - (viewport * .18),
      0,
      pageLimit,
    );

    const footerTop = footer
      ? footer.getBoundingClientRect().top + window.scrollY
      : document.documentElement.scrollHeight;
    fadeStart = clamp(footerTop - (viewport * .78), storyStart + (viewport * .8), pageLimit);
    fadeEnd = clamp(footerTop - (viewport * .54), fadeStart + (viewport * .18), pageLimit);
    motionEnd = fadeStart;

    const availableSpan = Math.max(viewport, fadeStart - storyStart);
    const finalHold = Math.min(Math.max(viewport * .58, availableSpan * .14), viewport * 1.12);
    storyEnd = Math.max(storyStart + (viewport * .62), fadeStart - finalHold);
    storyEnd = Math.min(storyEnd, fadeStart - (viewport * .2));

    const span = storyEnd - storyStart;
    const evenGap = span / (words.length - 1);
    const minGap = Math.min(evenGap * .72, viewport * .55);
    const maxGap = Math.max(minGap, Math.min(evenGap * 1.38, viewport * 1.35));
    const raw = anchors.map((anchor, index) => {
      if (index === 0) return storyStart;
      if (index === anchors.length - 1) return storyEnd;
      const rect = anchor.getBoundingClientRect();
      const anchorPoint = rect.top + window.scrollY + (rect.height * .42) - (viewport * .46);
      const evenPoint = storyStart + (evenGap * index);
      return clamp((anchorPoint * .58) + (evenPoint * .42), storyStart, storyEnd);
    });

    stagePoints = [storyStart];
    for (let index = 1; index < raw.length - 1; index += 1) {
      const previous = stagePoints[index - 1];
      stagePoints.push(clamp(raw[index], previous + minGap, previous + maxGap));
    }
    stagePoints.push(storyEnd);

    for (let index = stagePoints.length - 2; index > 0; index -= 1) {
      stagePoints[index] = Math.min(stagePoints[index], stagePoints[index + 1] - minGap);
    }

    root.classList.add('is-ready');
    update(true);
  };

  const stageForScroll = (scrollY) => {
    for (let index = 0; index < stagePoints.length - 1; index += 1) {
      const boundary = (stagePoints[index] + stagePoints[index + 1]) / 2;
      if (scrollY < boundary) return index;
    }
    return stagePoints.length - 1;
  };

  const showStage = (stage, force) => {
    if (!force && stage === activeStage) return;
    activeStage = stage;
    window.clearTimeout(wordTransitionTimer);
    window.clearTimeout(mobileWordTimer);

    const revealWord = () => {
      word.textContent = words[stage] || '';
      word.classList.remove('is-exiting');
      requestAnimationFrame(() => word.classList.add('is-visible'));
      if (mobileQuery.matches) {
        mobileWordTimer = window.setTimeout(() => word.classList.remove('is-visible'), 1250);
      }
    };

    if (force || !word.textContent) {
      revealWord();
      return;
    }

    word.classList.remove('is-visible');
    word.classList.add('is-exiting');
    wordTransitionTimer = window.setTimeout(() => {
      if (activeStage === stage) revealWord();
    }, 180);
  };

  const update = (force = false) => {
    frame = 0;
    if (!stagePoints.length) return;

    const now = performance.now();
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    if (Math.abs(delta) > .5) {
      root.dataset.direction = delta > 0 ? 'down' : 'up';
      lastMoveAt = now;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        root.dataset.direction = 'still';
      }, 150);
    } else if (now - lastMoveAt > 150) {
      root.dataset.direction = 'still';
    }
    lastScrollY = currentScrollY;

    const progress = smoothstep(clamp((currentScrollY - storyStart) / (motionEnd - storyStart), 0, 1));
    const corridorTop = mobileQuery.matches ? 25 : 24;
    const corridorBottom = mobileQuery.matches ? 72 : 76;
    root.style.setProperty('--essence-y', `${corridorTop + ((corridorBottom - corridorTop) * progress)}vh`);
    showStage(stageForScroll(currentScrollY), force);

    const footerFade = smoothstep(clamp((currentScrollY - fadeStart) / Math.max(1, fadeEnd - fadeStart), 0, 1));
    root.style.opacity = String(1 - footerFade);
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(() => update(false));
  };

  let resizeTimer = 0;
  const requestMeasure = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(measure, 120);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestMeasure, { passive: true });
  window.addEventListener('load', measure, { once: true });
  mobileQuery.addEventListener('change', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(requestMeasure);
    const pageShell = document.querySelector('.page-shell');
    const footer = document.querySelector(root.dataset.footerSelector || '.site-footer');
    if (pageShell) resizeObserver.observe(pageShell);
    if (footer) resizeObserver.observe(footer);
  }
  measure();
})();
