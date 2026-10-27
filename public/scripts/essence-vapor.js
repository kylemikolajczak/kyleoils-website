/* Kyle Oils — scroll-driven, pixel-registered botanical essence vapor.
   The existing image and CSS positioning remain the source of truth.
   No pointer input and no changes to the reveal mask or other hero layers. */
(() => {
  'use strict';
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = x => { x = clamp(x); return x*x*(3-2*x); };
  const seeded = n => { const z = Math.sin(n * 127.17 + 51.3) * 43758.5453; return z - Math.floor(z); };
  const mix = (a, b, t) => a + (b-a)*t;
  function noise(x, y, seed) {
    const ix=Math.floor(x), iy=Math.floor(y), fx=smooth(x-ix), fy=smooth(y-iy);
    const v=(xx, yy) => seeded(xx*61.7 + yy*197.3 + seed*29.3);
    return mix(mix(v(ix,iy),v(ix+1,iy),fx),mix(v(ix,iy+1),v(ix+1,iy+1),fx),fy);
  }

  window.KyleEssenceVapor = function initEssenceVapor(hero) {
    const scene=hero.querySelector('.botanical-hero__scene--essence');
    const frame=scene?.querySelector('.botanical-hero__portrait-frame--essence');
    const image=frame?.querySelector('img');
    const canvas=frame?.querySelector('[data-essence-vapor]');
    const wispsCanvas=scene?.querySelector('[data-essence-vapor-wisps]');
    const ctx=canvas?.getContext('2d', {alpha:true});
    const wispsCtx=wispsCanvas?.getContext('2d', {alpha:true});
    if (!scene || !frame || !image || !ctx || !wispsCtx) return null;

    const mask=document.createElement('canvas');
    const mctx=mask.getContext('2d', {alpha:true});
    const probe=document.createElement('canvas');
    probe.width=120;probe.height=90;
    const pctx=probe.getContext('2d',{willReadFrequently:true});
    const mist=document.createElement('canvas');
    mist.width=128;mist.height=128;
    const g=mist.getContext('2d');
    const grad=g.createRadialGradient(64,64,2,64,64,63);
    grad.addColorStop(0,'rgba(228,242,218,.42)');
    grad.addColorStop(.19,'rgba(198,222,192,.26)');
    grad.addColorStop(.42,'rgba(192,217,192,.14)');
    grad.addColorStop(.76,'rgba(203,225,202,.035)');
    grad.addColorStop(1,'rgba(203,225,202,0)');
    g.fillStyle=grad;g.fillRect(0,0,128,128);

    const model={ready:false,width:0,height:0,sceneWidth:0,sceneHeight:0,
      offsetX:0,offsetY:0,dpr:1,points:[],threshold:null,maskData:null,last:-1};
    const dissolveAt=(x,y)=>{
      const n=(noise(x*4.4,y*5.1,6)*.50 + noise(x*12.7,y*11.2,11)*.30 + noise(x*29.2,y*21.1,18)*.20);
      // Irregular cloud-shaped breakup, higher parts first, with a soft trailing edge.
      // Finish before scroll progress reaches 1 so no visible pixels snap off.
      return clamp(.085 + y*.79 + (n-.5)*.46, .025,.855);
    };

    function size(){
      if(!model.ready)return;
      const box=frame.getBoundingClientRect();
      const sceneBox=scene.getBoundingClientRect();
      if(box.width<1||box.height<1||sceneBox.width<1||sceneBox.height<1)return;
      const w=Math.round(box.width),h=Math.round(box.height);
      const sceneWidth=Math.round(sceneBox.width),sceneHeight=Math.round(sceneBox.height);
      model.offsetX=box.left-sceneBox.left;
      model.offsetY=box.top-sceneBox.top;
      if(w===model.width && h===model.height &&
         sceneWidth===model.sceneWidth && sceneHeight===model.sceneHeight)return;
      model.width=w;model.height=h;
      model.sceneWidth=sceneWidth;model.sceneHeight=sceneHeight;
      model.dpr=Math.min(window.devicePixelRatio||1,1.35);
      canvas.width=Math.max(1,Math.round(w*model.dpr));
      canvas.height=Math.max(1,Math.round(h*model.dpr));
      ctx.setTransform(model.dpr,0,0,model.dpr,0,0);
      // Full hero-scene canvas lets smoke reach the header without a mid-air crop.
      wispsCanvas.width=Math.max(1,Math.round(sceneWidth*model.dpr));
      wispsCanvas.height=Math.max(1,Math.round(sceneHeight*model.dpr));
      wispsCtx.setTransform(model.dpr,0,0,model.dpr,0,0);
      // A softly interpolated field, not visible squares or hard streaks.
      mask.width=280;mask.height=Math.max(150,Math.round(280*h/w));
      model.threshold=new Float32Array(mask.width*mask.height);
      model.maskData=mctx.createImageData(mask.width,mask.height);
      for(let y=0;y<mask.height;y++){
        for(let x=0;x<mask.width;x++){
          model.threshold[y*mask.width+x]=dissolveAt(x/(mask.width-1),y/(mask.height-1));
        }
      }
      pctx.clearRect(0,0,probe.width,probe.height);
      pctx.drawImage(image,0,0,probe.width,probe.height);
      const pixels=pctx.getImageData(0,0,probe.width,probe.height).data;
      const pick=(x,y)=>pixels[(Math.floor(y*probe.height)*probe.width+Math.floor(x*probe.width))*4+3]||0;
      model.points=[];
      // Smoke emerges only from inside the actual PNG silhouette, including shoulders.
      for(let k=0;k<720 && model.points.length<230;k++){
        const x=.065+seeded(k*13.13+3)*.87;
        const y=.085+seeded(k*8.37+7)*.79;
        if(pick(x,y)<115)continue;
        model.points.push({
          x,y,birth:dissolveAt(x,y),
          radius:28+seeded(k*16.7+1)*60,
          drift:(seeded(k*11.2+4)-.5)*110,
          rise:80+seeded(k*19.9+6)*130,
          strength:.35+seeded(k*3.73+9)*.48,
          phase:seeded(k*2.01+8)*6.28
        });
      }
      model.last=-1;
    }

    function draw(d) {
      if(!model.ready)return false;
      size();
      d=clamp(d);
      if(Math.abs(model.last-d)<.0025)return true;
      model.last=d;
      const w=model.width,h=model.height;
      ctx.clearRect(0,0,w,h);
      wispsCtx.clearRect(0,0,model.sceneWidth,model.sceneHeight);
      if(d<=.001)return true;
      if(d>=.999)return true;

      ctx.save();
      ctx.drawImage(image,0,0,w,h);
      // The silhouette is slowly eroded by a turbulent, feathered mask.
      const values=model.threshold,data=model.maskData.data;
      for(let i=0;i<values.length;i++){
        const remaining=1-smooth((d-values[i]+.075)/.16);
        const j=i*4;
        data[j]=255;data[j+1]=255;data[j+2]=255;
        data[j+3]=Math.round(clamp(remaining)*255);
      }
      mctx.putImageData(model.maskData,0,0);
      ctx.globalCompositeOperation='destination-in';
      ctx.imageSmoothingEnabled=true;
      ctx.drawImage(mask,0,0,w,h);
      ctx.restore();

      // Unconnected, soft wisps float away from portions that have just dissolved.
      // They never form a worm/trail or a straight horizontal scanning edge.
      for(const p of model.points){
        const age=(d-p.birth)/Math.min(.30,Math.max(.10,.97-p.birth));
        if(age<=0||age>=1)continue;
        const presence=Math.sin(Math.PI*age);
        const alpha=presence*presence*p.strength*.75;
        if(alpha<.009)continue;
        const x=model.offsetX+(p.x*w)+p.drift*age+Math.sin(p.phase+age*7)*9*age;
        const y=model.offsetY+(p.y*h)-p.rise*age;
        const r=p.radius*(.6+age*.85);
        wispsCtx.globalAlpha=alpha;
        wispsCtx.save();
        wispsCtx.translate(x,y);
        wispsCtx.rotate(Math.sin(p.phase+age*3)*.22);
        wispsCtx.scale(.52,1.8+age*.7);
        wispsCtx.drawImage(mist,-r,-r,r*2,r*2);
        wispsCtx.restore();
      }
      wispsCtx.globalAlpha=1;
      return true;
    }

    function ready(){
      if(!image.naturalWidth)return;
      model.ready=true;
      size();
      hero.dispatchEvent(new Event('essence-vapor-ready'));
    }
    if(image.complete&&image.naturalWidth)ready();
    else image.addEventListener('load',ready,{once:true});

    return {
      isReady:()=>model.ready,
      resize:()=>{size(); if(model.last>=0){const old=model.last;model.last=-1;draw(old);} },
      setProgress:d=>{
        if(!model.ready)return false;
        const active=d>.002&&d<.999;
        draw(d);
        hero.style.setProperty('--essence-original-opacity',active?'0':d>=.999?'0':'1');
        hero.style.setProperty('--essence-vapor-opacity',active?'1':'0');
        return true;
      },
      reset:()=>{
        hero.style.removeProperty('--essence-original-opacity');
        hero.style.removeProperty('--essence-vapor-opacity');
      }
    };
  };
})();
