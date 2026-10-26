(() => {
  'use strict';
  const hero = document.querySelector('[data-botanical-hero]');
  if (!hero || hero.dataset.initialized === 'true') return;
  hero.dataset.initialized = 'true';

  const stage = hero.querySelector('.botanical-hero__stage');
  const opening = document.querySelector('.botanical-followup');
  const header = document.querySelector('.site-header');
  const toggle = hero.querySelector('[data-hero-toggle]');
  const toggleText = hero.querySelector('[data-hero-toggle-label]');
  const leftWord = hero.querySelector('[data-hero-word="left"]');
  const rightWord = hero.querySelector('[data-hero-word="right"]');
  const svgDefs = hero.querySelector('.botanical-hero__wipe-defs');
  const svgEdge = hero.querySelector('.botanical-hero__wipe-edge');
  const mask = hero.querySelector('#kyle-fluid-mask');
  const feathers = hero.querySelector('[data-fluid-feather]');
  const bodies = hero.querySelector('[data-fluid-mask]');
  const edges = hero.querySelector('[data-fluid-edge]');
  const svgNS = 'http://www.w3.org/2000/svg';

  const desktop = matchMedia('(min-width: 801px) and (pointer:fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const disableMotion = () => reduced.matches || new URLSearchParams(location.search).has('reduced-motion');
  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
  const ease = t => {t=clamp(t);return t*t*(3-2*t);};
  const between = (v,a,b) => clamp((v-a)/(b-a));
  const set = (k,v) => hero.style.setProperty(k,v);
  const cfg = Object.freeze({
    calmEnd:.17, surfaceStart:.19,surfaceEnd:.46,
    wordStart:.28,wordEnd:.42,
    dissolveStart:.52,dissolveEnd:.67,
    trailMin:1250,trailMax:1750,
    radius:57,maxStrokes:5,maxSamples:150
  });
  const state = {raf:0,scrollRaf:0,visible:true,active:false,priority:false,
    strokes:[],activeStroke:null,serial:0,lastPoint:null,progress:0,
    lastFlowFrame:0,lastWipeFrame:0,curX:-200,curY:-200,tarX:-200,tarY:-200,
    width:0,height:0,freeze:false};

  const canvasLayers=[...hero.querySelectorAll('[data-flow-canvas]')].map((canvas,i)=>{
    const ctx=canvas.getContext('2d',{alpha:true});
    return {canvas,ctx,i,wisps:[]};
  });
  function fract(x){return x-Math.floor(x);}
  function rand(i,n){return fract(Math.sin((i+1)*127.1+n*311.7)*43758.5453);}
  function layout(){
    const r=stage.getBoundingClientRect();
    state.width=Math.round(r.width);state.height=Math.round(r.height);
    const dpr=Math.min(devicePixelRatio||1,1.5);
    for(const layer of canvasLayers){
      if(!layer.ctx)continue;
      layer.canvas.width=Math.round(state.width*dpr);
      layer.canvas.height=Math.round(state.height*dpr);
      layer.ctx.setTransform(dpr,0,0,dpr,0,0);
      layer.wisps=createAromaWisps(layer.i);
    }
    svgDefs.setAttribute('viewBox','0 0 '+state.width+' '+state.height);
    svgEdge.setAttribute('viewBox','0 0 '+state.width+' '+state.height);
    mask.setAttribute('x','0');mask.setAttribute('y','0');
    mask.setAttribute('width',String(state.width));
    mask.setAttribute('height',String(state.height));
    initSmoke();
    syncScroll();
  }
  // Soft aromatic mist: irregular rising wisps, never repeated oil-droplet icons.
  // Kept separate from the mouse-driven smoke reveal simulation below.
  function makeAromaSprite() {
    const sprite = document.createElement('canvas');
    sprite.width = 192;
    sprite.height = 192;
    const g = sprite.getContext('2d', { alpha: true });
    const halo = g.createRadialGradient(96, 96, 5, 96, 96, 94);
    halo.addColorStop(0, 'rgba(247, 249, 238, .33)');
    halo.addColorStop(.24, 'rgba(237, 245, 234, .23)');
    halo.addColorStop(.52, 'rgba(211, 228, 211, .095)');
    halo.addColorStop(.78, 'rgba(226, 237, 221, .026)');
    halo.addColorStop(1, 'rgba(226, 237, 221, 0)');
    g.fillStyle = halo;
    g.fillRect(0, 0, 192, 192);
    return sprite;
  }
  const aromaSprite = makeAromaSprite();
  const aromaSources = [.09, .235, .41, .605, .765, .91];
  const smoothFade = v => { v=clamp(v); return v*v*(3-2*v); };
  function createAromaWisps(layerIndex) {
    const wisps = [];
    // The masked peek and the sharp second layer share atmospheric motion.
    const seedLayer = layerIndex === 2 ? 0 : layerIndex;
    for (let e=0;e<aromaSources.length;e++) {
      const sourceSeed = rand(e+39, seedLayer+19);
      const baseX = clamp(aromaSources[e]+(sourceSeed-.5)*.09,.06,.95);
      const baseY = .71 + rand(e+63, seedLayer+35)*.25;
      const period = 14500 + rand(e+76,seedLayer+27)*9000;
      const sourcePhase = rand(e+51,seedLayer+25);
      for (let j=0;j<8;j++) {
        wisps.push({
          x: baseX, y: baseY, period,
          phase: sourcePhase+j*.057+rand(j+81,e+seedLayer)*.022,
          stream: e,
          spread: (rand(j+16,e+seedLayer*8)-.5)*46,
          drift: (rand(j+32,e+seedLayer*9)-.5)*23,
          speed: .78 + rand(j+77,e+seedLayer*4)*.52,
          size: .68 + rand(j+12,e+seedLayer*11)*.70,
          opacity: .54 + rand(j+25,e+seedLayer*7)*.45,
          curl: rand(j+64,e+seedLayer*5)*6.283
        });
      }
    }
    return wisps;
  }
  function drawAromaMist(now) {
    if(now-state.lastFlowFrame < 1000/26 || disableMotion()) return;
    state.lastFlowFrame=now;
    const time = now * .001;
    for(const {ctx,wisps,i} of canvasLayers) {
      if(!ctx)continue;
      ctx.clearRect(0,0,state.width,state.height);
      ctx.save();
      // The first layer should suggest scent in the air, not foreground fog.
      const strength = i === 1 ? .58 : .71;
      for(const wisp of wisps) {
        const t=((now / wisp.period+wisp.phase)%1+1)%1;
        const appearing=smoothFade(t/.17);
        const dissolving=1-smoothFade((t-.49)/.40);
        const envelope=appearing*dissolving;
        if(envelope<.018)continue;
        const travelled = t * (135+state.height*.075)*wisp.speed;
        const meander = Math.sin(t*8.4+wisp.curl)*13
          +Math.sin(t*15.8+wisp.curl*.64)*6.5
          + Math.sin(time*.15+wisp.stream*1.9)*7;
        const x=state.width*wisp.x+wisp.spread+meander+t*wisp.drift;
        const y=state.height*wisp.y-travelled;
        const size=(43+Math.min(state.width,1600)*.027)*wisp.size*(.67+.55*t);
        const alpha=envelope*wisp.opacity*strength;
        ctx.globalAlpha=alpha;
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(Math.sin(t*6+wisp.curl)*.11);
        ctx.scale(.48+.08*Math.sin(wisp.curl+t*5),1.30+.12*t);
        ctx.drawImage(aromaSprite,-size,-size,size*2,size*2);
        ctx.restore();
      }
      ctx.restore();
    }
  }
  // Time-decaying connected fluid ribbons. No permanent first-point anchor.
  // Low-resolution advected dye field rendered into a single soft SVG image mask.
  // Unlike stamped vector trails, the dye spreads, curls and dissipates as a field.
  // Each location fades regardless of later pointer direction or speed.
  const smoke = {
    width: 0, height: 0, values: null, next: null, pixels: null,
    surface: document.createElement('canvas'), ctx: null, image: null,
    deposits: [], lastTick: 0, serial: 0, activePixels: 0
  };
  smoke.ctx = smoke.surface.getContext('2d', { willReadFrequently: true });
  smoke.image = document.createElementNS(svgNS, 'image');
  smoke.image.setAttribute('preserveAspectRatio', 'none');
  smoke.image.setAttribute('width', String(state.width || 1440));
  smoke.image.setAttribute('height', String(state.height || 850));
  bodies.appendChild(smoke.image);
  function initSmoke() {
    smoke.width = Math.max(64, Math.round(state.width / 4.3));
    smoke.height = Math.max(48, Math.round(state.height / 4.3));
    smoke.values = new Float32Array(smoke.width * smoke.height);
    smoke.next = new Float32Array(smoke.values.length);
    smoke.surface.width = smoke.width;
    smoke.surface.height = smoke.height;
    smoke.pixels = smoke.ctx.createImageData(smoke.width, smoke.height);
    smoke.image.setAttribute('width', String(state.width));
    smoke.image.setAttribute('height', String(state.height));
    smoke.deposits.length = 0;
    smoke.lastTick = 0;
  }
  function addSmoke(x, y, now) {
    const prev = state.lastPoint;
    const dist = prev ? Math.hypot(x - prev.x, y - prev.y) : 0;
    const dt = prev ? Math.max(0, now - prev.time) : 0;
    const pieces = prev && dt < 130 ? Math.min(50, Math.max(1, Math.ceil(dist/17))) : 1;
    for (let i=1; i<=pieces; i++) {
      const u=i/pieces;
      smoke.deposits.push({
        x:pieces===1?x:prev.x+(x-prev.x)*u,
        y:pieces===1?y:prev.y+(y-prev.y)*u,
        variation:++smoke.serial*1.61803398875,
      });
    }
    if (smoke.deposits.length > 110) smoke.deposits.splice(0, smoke.deposits.length - 110);
    state.lastPoint={x,y,time:now};
  }
  function smoothNoise(x,y,t) {
    return Math.sin(x*.021 + Math.sin(y*.018+t)*1.3-t)*Math.cos(y*.026+Math.sin(x*.028-t*.72)*.95);
  }
  function putDye(x,y,seed){
    const W=smoke.width,H=smoke.height,F=smoke.values;
    const sx=x*(W/state.width),sy=y*(H/state.height);
    const R=77*(W/state.width);
    const ax=Math.max(1,Math.floor(sx-R*1.4)),bx=Math.min(W-2,Math.ceil(sx+R*1.4));
    const ay=Math.max(1,Math.floor(sy-R*1.4)),by=Math.min(H-2,Math.ceil(sy+R*1.4));
    for(let iy=ay;iy<=by;iy++){
      const yy=(iy-sy)/R;
      for(let ix=ax;ix<=bx;ix++){
        const xx=(ix-sx)/R;
        const theta=Math.atan2(yy,xx);
        const r=Math.hypot(xx,yy);
        const ripple=1+.14*Math.sin(3*theta+seed)+.10*Math.sin(6*theta-seed*.6)+.065*Math.sin(11*theta+seed*.3);
        const qr=r/ripple;
        if(qr>=1.25)continue;
        const v=Math.max(0,1-qr*qr);
        const profile=v*v*(3-2*v);
        const idx=iy*W+ix;
        // Paint gradually instead of a permanent opaque disc; repeated passes blend.
        F[idx]=Math.min(1.12,F[idx]+profile*.48);
      }
    }
  }
  function paint(now){
    if(disableMotion() || now-state.lastWipeFrame<1000/26 || !smoke.values)return;
    const dt=smoke.lastTick?Math.min(65,now-smoke.lastTick):38;
    smoke.lastTick=now; state.lastWipeFrame=now;
    const W=smoke.width,H=smoke.height,F=smoke.values,N=smoke.next;
    const fade=Math.exp(-dt/380);
    const t=now*.00037;
    let live=0;
    // Semi-Lagrangian advection: every texel follows a local whirling flow,
    // with diffusion and natural dissipation. There is no tether to the cursor.
    for(let y=1;y<H-1;y++){
      for(let x=1;x<W-1;x++){
        const k=y*W+x;
        const curlX=(smoothNoise(x,y+2,t)-smoothNoise(x,y-2,t))*.7;
        const curlY=-(smoothNoise(x+2,y,t)-smoothNoise(x-2,y,t))*.7;
        const eddyX=Math.sin(y*.073+t*3+Math.sin(x*.04))*.95;
        const eddyY=Math.cos(x*.059-t*3+Math.sin(y*.045))*.95;
        const vx=(curlX*11+eddyX)*dt/36;
        const vy=(curlY*11+eddyY)*dt/36;
        const px=Math.max(1,Math.min(W-2.001,x-vx));
        const py=Math.max(1,Math.min(H-2.001,y-vy));
        const xx=Math.floor(px),yy=Math.floor(py);
        const fx=px-xx,fy=py-yy;
        const a=F[yy*W+xx]*(1-fx)+F[yy*W+xx+1]*fx;
        const b=F[(yy+1)*W+xx]*(1-fx)+F[(yy+1)*W+xx+1]*fx;
        const adv=a*(1-fy)+b*fy;
        const diff=(F[k-1]+F[k+1]+F[k-W]+F[k+W])*.25;
        const value=Math.max(0,(adv*.89+diff*.11)*fade-.0015);
        N[k]=value;
        if(value>.008)live++;
      }
    }
    smoke.values=N; smoke.next=F;
    const dep=smoke.deposits.splice(0);
    for(const d of dep)putDye(d.x,d.y,d.variation);
    smoke.activePixels=live;
    const data=smoke.pixels.data;
    const values=smoke.values;
    for(let i=0;i<values.length;i++){
      const v=Math.min(1,Math.max(0,values[i]));
      // Soft curved transmission; no visible border or line work.
      const alpha=Math.max(0,Math.min(1,(v-.018)*2.35));
      const j=i*4;
      data[j]=255;data[j+1]=255;data[j+2]=255;
      data[j+3]=Math.round(255*alpha);
    }
    smoke.ctx.putImageData(smoke.pixels,0,0);
    // Keep the same SVG image element: no DOM node churn.
    smoke.image.setAttribute('href',smoke.surface.toDataURL('image/png'));
  }
  function sample(x,y,time) { addSmoke(x,y,time); }
  function animate(now){
    state.raf=requestAnimationFrame(animate);
    if(!state.visible||document.hidden)return;
    drawAromaMist(now);
    if(!state.priority)paint(now);
  }
  function headerHeight(){return header?.offsetHeight||88;}
  function syncScroll(){
    if(!hero||!opening)return;
    const h=headerHeight(),heroRect=hero.getBoundingClientRect();
    document.documentElement.style.setProperty('--kyle-home-header-height',h+'px');
    const desktopStory=desktop.matches&&!disableMotion();
    if(desktopStory){
      const travel=Math.max(1,hero.offsetHeight-stage.offsetHeight);
      const p=clamp((h-heroRect.top)/travel);
      state.progress=p;
      const surface=ease(between(p,cfg.surfaceStart,cfg.surfaceEnd));
      const figFade=1-ease(between(p,cfg.dissolveStart,cfg.dissolveEnd));
      const rect=stage.getBoundingClientRect();
      const roll=clamp((rect.bottom-opening.getBoundingClientRect().top)/Math.max(1,rect.height));
      set('--hero-surface-cut',(surface*100).toFixed(2)+'%');
      set('--hero-stage-cut',(roll*100).toFixed(2)+'%');
      set('--hero-figure-fade',figFade.toFixed(3));
      set('--hero-scroll-opacity',(ease(between(p,cfg.wordStart,cfg.wordEnd))*(1-ease(roll))).toFixed(3));
      set('--hero-liquid-opacity',(.6*Math.sin(Math.PI*surface)).toFixed(3));
      set('--hero-scan-y',(-68+surface*172).toFixed(1)+'%');
      state.priority=p>=cfg.calmEnd;
      hero.dataset.scrollPriority=String(state.priority);
      hero.dataset.stageRoll=String(roll>.001);
      hero.dataset.surfaceReveal=String(surface>.003);
      hero.style.pointerEvents=roll>.012?'none':'';
      if(state.priority){
        state.lastPoint=null;state.activeStroke=null;state.lastHeading=null;
      }
    } else {
      state.progress=0;state.priority=true;hero.dataset.scrollPriority='true';hero.dataset.stageRoll='false';hero.dataset.surfaceReveal='false';
      hero.style.pointerEvents='';
      for(const k of ['--hero-surface-cut','--hero-stage-cut','--hero-liquid-opacity','--hero-scroll-opacity']){
        hero.style.removeProperty(k);
      }
      set('--hero-figure-fade','1');
    }
    // Exactly like DarkBrain: header exits only as the opening reaches it.
    const headExit=ease(between(h-opening.getBoundingClientRect().top,0,h));
    document.body.style.setProperty('--kyle-home-header-y',(-h*headExit).toFixed(2)+'px');
    header.style.pointerEvents=headExit>.96?'none':'';
  }
  function onScroll(){
    if(state.scrollRaf)return;
    state.scrollRaf=requestAnimationFrame(()=>{state.scrollRaf=0;syncScroll();});
  }
  function pointer(e) {
    if (!desktop.matches || disableMotion()) return;
    const target = e.target;
    const isStage = target instanceof Element && Boolean(target.closest('.botanical-hero__stage'));
    if (!isStage || state.priority) {
      state.lastPoint = null;
      return;
    }
    const interactive = Boolean(target.closest('a, button, [role="button"], summary'));
    if (!interactive) {
      const r = stage.getBoundingClientRect();
      const x = clamp(e.clientX - r.left, 0, r.width);
      const y = clamp(e.clientY - r.top, 0, r.height);
      sample(x, y, performance.now());
    } else {
      state.lastPoint = null;
    }
  }
  document.addEventListener('pointermove', pointer, { passive: true });
  document.addEventListener('pointerleave', () => {
    state.lastPoint = null;
  }, { passive: true });
  toggle?.addEventListener('click',()=>{
    const on=hero.dataset.mobileEssence!=='true';
    hero.dataset.mobileEssence=String(on);
    toggle.setAttribute('aria-pressed',String(on));
    toggle.setAttribute('aria-label',on?toggle.dataset.backLabel:toggle.dataset.revealLabel);
    if(toggleText)toggleText.textContent=on?toggle.dataset.backLabel:toggle.dataset.revealLabel;
  });
  if('IntersectionObserver' in window){
    new IntersectionObserver(([entry])=>{state.visible=Boolean(entry?.isIntersecting);},{rootMargin:'150px'}).observe(hero);
  }
  if('ResizeObserver' in window) new ResizeObserver(layout).observe(stage);
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',layout,{passive:true});
  desktop.addEventListener?.('change',layout);
  reduced.addEventListener?.('change',layout);
  layout();
  state.raf=requestAnimationFrame(animate);
})();