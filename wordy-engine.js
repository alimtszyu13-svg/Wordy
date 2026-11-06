/* Wordy for the landing page — generated from the app by build_engine.py, do not edit by hand */
/* ================= SOUND v3 =================
   Soft, musical sounds tuned to one key (C major pentatonic) so everything fits together.
   Variety: every sound has several variants + small random pitch/timing, never the same variant twice in a row.
   Correct answers in a row climb up the scale (combo), a mistake resets it. */
window.Sfx=(function(){
  let ctx=null, out=null, dry=null, wet=null, noiseBuf=null, enabled=true, volume=.65, combo=0;
  const lastPick={};
  function ensure(){
    if(!ctx){
      try{
        const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return null;
        ctx=new AC();
        out=ctx.createGain(); out.gain.value=volume;
        const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=7000; lp.Q.value=.5;
        const shelf=ctx.createBiquadFilter(); shelf.type='highshelf'; shelf.frequency.value=3500; shelf.gain.value=-7;
        const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-18; comp.ratio.value=3; comp.attack.value=.005; comp.release.value=.25;
        out.connect(lp); lp.connect(shelf); shelf.connect(comp); comp.connect(ctx.destination);
        dry=ctx.createGain(); dry.connect(out);
        const len=Math.floor(ctx.sampleRate*1.6), ir=ctx.createBuffer(2,len,ctx.sampleRate);
        for(let ch=0;ch<2;ch++){ const d=ir.getChannelData(ch); for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.6); }
        const conv=ctx.createConvolver(); conv.buffer=ir;
        const damp=ctx.createBiquadFilter(); damp.type='lowpass'; damp.frequency.value=3200;
        wet=ctx.createGain(); wet.gain.value=.28; wet.connect(damp); damp.connect(conv); conv.connect(out);
        noiseBuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);
        const nd=noiseBuf.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
      }catch(e){ ctx=null; return null; }
    }
    if(ctx.state==='suspended'){ try{ ctx.resume(); }catch(e){} }
    return ctx;
  }
  addEventListener('pointerdown',ensure,{passive:true,capture:true});
  addEventListener('keydown',ensure,{capture:true});
  const ok=()=>enabled && ensure() && ctx.state==='running';
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const cents=c=>Math.pow(2,c/1200);
  function variant(name,n){ let v; do{ v=Math.floor(Math.random()*n); }while(n>1 && v===lastPick[name]); lastPick[name]=v; return v; }
  // C major pentatonic, several octaves
  const P=[]; [262,294,330,392,440].forEach(b=>[1,2,4,8].forEach(m=>P.push(b*m))); P.sort((a,b)=>a-b);
  const near=f=>P.reduce((a,b)=>Math.abs(b-f)<Math.abs(a-f)?b:a);
  const step=(f,k)=>{ const i=P.indexOf(near(f)); return P[Math.max(0,Math.min(P.length-1,i+k))]; };

  function route(node,rev,pan){
    let n=node;
    if(pan&&ctx.createStereoPanner){ const p=ctx.createStereoPanner(); p.pan.value=pan; node.connect(p); n=p; }
    n.connect(dry); if(rev){ const s=ctx.createGain(); s.gain.value=rev; n.connect(s); s.connect(wet); }
  }
  function env(t0,vol,a,dur){ const g=ctx.createGain(); g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(vol,t0+a); g.gain.setTargetAtTime(0,t0+a,dur/4.5); return g; }
  function osc(type,f,t0,dur,f2,glide){ const o=ctx.createOscillator(); o.type=type; o.frequency.setValueAtTime(f,t0); if(f2) o.frequency.exponentialRampToValueAtTime(f2,t0+(glide||dur)); o.start(t0); o.stop(t0+dur+.4); return o; }
  // marimba / kalimba-like pluck: warm, round, short
  function pluck(f,{delay=0,dur=.5,vol=.1,rev=.5,pan=0}={}){
    if(!ok()) return; const t0=ctx.currentTime+delay; f*=cents(rnd(-6,6));
    const g=env(t0,vol,.004,dur);
    [[1,1,'sine'],[4.0,.08,'sine'],[2,.12,'triangle']].forEach(([m,a,ty])=>{ const o=osc(ty,f*m,t0,dur*(m>1?.35:1)); const og=ctx.createGain(); og.gain.setValueAtTime(a,t0); og.gain.setTargetAtTime(0,t0,dur*(m>1?.06:.25)); o.connect(og); og.connect(g); });
    route(g,rev,pan);
  }
  // glassy bell: for rewards
  function bell(f,{delay=0,dur=1.2,vol=.08,rev=.8,pan=0}={}){
    if(!ok()) return; const t0=ctx.currentTime+delay; f*=cents(rnd(-4,4));
    const g=env(t0,vol,.003,dur);
    [[1,1],[2,.25],[3.01,.08],[5.4,.03]].forEach(([m,a])=>{ const o=osc('sine',f*m,t0,dur/m); const og=ctx.createGain(); og.gain.value=a; o.connect(og); og.connect(g); });
    route(g,rev,pan);
  }
  function tone(f,{delay=0,dur=.15,vol=.08,type='sine',f2=null,glide=null,lp=null,rev=.25,attack=.008,pan=0}={}){
    if(!ok()) return; const t0=ctx.currentTime+delay;
    const o=osc(type,f,t0,dur,f2,glide), g=env(t0,vol,attack,dur);
    if(lp){ const fl=ctx.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=lp; o.connect(fl); fl.connect(g); } else o.connect(g);
    route(g,rev,pan);
  }
  function noise({delay=0,dur=.12,vol=.04,f=1200,f2=null,q=1,type='bandpass',rev=.12,attack=.004}={}){
    if(!ok()) return; const t0=ctx.currentTime+delay;
    const s=ctx.createBufferSource(); s.buffer=noiseBuf;
    const fl=ctx.createBiquadFilter(); fl.type=type; fl.Q.value=q; fl.frequency.setValueAtTime(f,t0); if(f2) fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    const g=env(t0,vol,attack,dur); s.connect(fl); fl.connect(g); route(g,rev); s.start(t0,Math.random()*.6); s.stop(t0+dur+.4);
  }
  // Wordy's voice: soft triangle source through vowel formants
  const VOW={a:[780,1200],o:[520,880],u:[360,800],i:[330,2200],e:[480,1800]};
  function voice(f,{delay=0,dur=.12,vol=.06,f2=null,v='a',v2=null,rev=.3,vib=0}={}){
    if(!ok()) return; const t0=ctx.currentTime+delay; f*=cents(rnd(-30,30)); if(f2) f2*=cents(rnd(-30,30));
    const g=env(t0,vol,.018,dur);
    const mix=ctx.createGain();
    const o1=osc('triangle',f,t0,dur,f2), o2=osc('sawtooth',f,t0,dur,f2), g2=ctx.createGain(); g2.gain.value=.22;
    o1.connect(mix); o2.connect(g2); g2.connect(mix);
    if(vib){ [o1,o2].forEach(o=>{ const l=ctx.createOscillator(), lg=ctx.createGain(); l.frequency.value=vib; lg.gain.value=f*.025; l.connect(lg); lg.connect(o.frequency); l.start(t0); l.stop(t0+dur+.3); }); }
    const [a1,a2]=VOW[v], [b1,b2]=VOW[v2||v];
    [[a1,b1,1],[a2,b2,.4]].forEach(([fa,fb,amp])=>{
      const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.Q.value=4; bp.frequency.setValueAtTime(fa,t0); bp.frequency.linearRampToValueAtTime(fb,t0+dur);
      const ag=ctx.createGain(); ag.gain.value=amp*2.6; mix.connect(bp); bp.connect(ag); ag.connect(g);
    });
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2400; g.connect(lp); route(lp,rev);
  }
  const VS='aoieu', anyV=()=>VS[Math.floor(Math.random()*5)];

  return {
    setEnabled(v){ enabled=!!v; },
    setVolume(v){ volume=v; if(out) out.gain.value=v; },
    // ---------- arcade (games) ----------
    laser(){ tone(rnd(1500,1800),{dur:.08,vol:.045,type:'square',f2:340,glide:.08,lp:3200,rev:.12}); },
    lock(){ tone(1046,{dur:.05,vol:.03,type:'triangle',rev:.1}); tone(1568,{delay:.04,dur:.05,vol:.025,type:'triangle',rev:.1}); },
    boom(big){ noise({dur:big?.7:.34,vol:big?.18:.11,f:big?1000:1500,f2:110,q:.7,type:'lowpass',rev:.35}); tone(big?85:130,{dur:big?.55:.26,vol:.12,f2:40,glide:big?.55:.26,rev:.2}); },
    shield(){ tone(170,{dur:.38,vol:.13,type:'sawtooth',f2:55,glide:.38,lp:900,rev:.2}); noise({dur:.28,vol:.09,f:600,type:'lowpass',rev:.2}); },
    keyerr(){ tone(190,{dur:.07,vol:.05,type:'square',lp:1100,rev:.05}); },
    wave(){ [523,659,784,1046].forEach((f,i)=>bell(f,{delay:i*.08,dur:.8,vol:.045})); },
    jump(){ tone(380,{dur:.14,vol:.06,type:'triangle',f2:900,glide:.12,rev:.1}); },
    boss(){ tone(98,{dur:1,vol:.1,type:'sawtooth',f2:196,glide:1,lp:1100,rev:.3}); tone(147,{delay:.15,dur:.9,vol:.06,type:'sawtooth',f2:294,glide:.9,lp:1100,rev:.3}); },
    combo(n){ const f=step(523,Math.min(12,n)); pluck(f,{dur:.3,vol:.07}); pluck(f*1.5,{delay:.05,dur:.3,vol:.05}); },
    // ---------- Wordy ----------
    blip(){ voice(rnd(300,470),{dur:rnd(.06,.1),vol:.04,f2:rnd(280,500),v:anyV(),rev:.2}); },
    squeak(){ const v=variant('squeak',4);
      if(v===0) voice(480,{dur:.16,vol:.06,f2:820,v:'u',v2:'i'});
      if(v===1) voice(620,{dur:.14,vol:.055,f2:420,v:'i',v2:'o'});
      if(v===2){ voice(440,{dur:.09,vol:.05,f2:560,v:'o'}); voice(560,{delay:.1,dur:.12,vol:.05,f2:760,v:'e',v2:'i'}); }
      if(v===3) voice(520,{dur:.2,vol:.055,f2:700,v:'a',v2:'i',vib:9}); },
    giggle(){ const base=rnd(560,680), n=4+variant('giggle',3);
      for(let i=0;i<n;i++) voice(base+(i%2?70:0)+i*rnd(10,30),{delay:i*rnd(.075,.095),dur:.08,vol:.045,f2:base-40+i*20,v:i%2?'e':'i'}); },
    hop(){ const v=variant('hop',3); voice([300,340,280][v],{dur:.13,vol:.04,f2:[540,620,500][v],v:'u',v2:['o','i','a'][v]}); noise({dur:.08,vol:.012,f:900,f2:2400}); },
    jump(){ voice(260,{dur:.2,vol:.045,f2:rnd(560,660),v:'o',v2:'i'}); noise({dur:.2,vol:.015,f:500,f2:2400}); },
    land(p){ p=Math.min(1.2,p||1); tone(rnd(120,150),{dur:.16,vol:.12*p,f2:58,rev:.08}); noise({dur:.08,vol:.025*p,type:'lowpass',f:380,rev:.04}); },
    plop(){ tone(rnd(200,240),{dur:.13,vol:.1,f2:95,rev:.12}); noise({dur:.05,vol:.015,type:'lowpass',f:500}); },
    yawn(){ const v=variant('yawn',2); voice(v?380:340,{dur:1.1,vol:.05,f2:v?220:200,v:'a',v2:v?'o':'u',vib:4.5,rev:.45}); },
    snore(){ noise({dur:1.2,vol:.014,type:'lowpass',f:300,attack:.45,rev:.15}); },
    wake(){ voice(330,{dur:.13,vol:.055,f2:700,v:'o',v2:'i'}); voice(680,{delay:.13,dur:.15,vol:.05,f2:500,v:'i'}); },
    aww(){ const v=variant('aww',3); voice([500,460,540][v],{dur:.5,vol:.05,f2:[320,300,360][v],v:['a','o','e'][v],v2:'u',vib:5.5}); },
    hi(){ const v=variant('hi',3);
      if(v===0){ voice(440,{dur:.1,vol:.055,f2:580,v:'a',v2:'i'}); voice(540,{delay:.12,dur:.14,vol:.05,f2:720,v:'i'}); }
      if(v===1){ voice(400,{dur:.18,vol:.055,f2:640,v:'e',v2:'i',vib:6}); }
      if(v===2){ voice(520,{dur:.09,vol:.05,f2:600,v:'o'}); voice(600,{delay:.1,dur:.09,vol:.05,f2:680,v:'e'}); voice(680,{delay:.2,dur:.12,vol:.045,f2:760,v:'i'}); } },
    hmm(){ voice(rnd(230,270),{dur:.42,vol:.04,f2:rnd(260,300),v:'u',vib:4.5}); },
    hum(){ const mel=[[523,587,659,587,523,659,784],[659,587,523,587,659,659,659],[392,440,523,440,523,587,523]][variant('hum',3)];
      mel.forEach((f,i)=>voice(f/2,{delay:i*.24,dur:.22,vol:.035,v:'u',v2:'o',vib:4.5})); },
    flutter(){ for(let i=0;i<6;i++) noise({delay:i*.075,dur:.05,vol:.025,f:1300+i*80,q:1.4}); },
    dodge(){ voice(400,{dur:.1,vol:.04,f2:620,v:'o',v2:'e'}); },
    // ---------- interface ----------
    tap(){ tone(near(rnd(1300,1700)),{dur:.05,vol:.035,rev:.08}); noise({dur:.018,vol:.025,f:3000,q:2,rev:0}); },
    pop(){ const f=near(rnd(500,700)); tone(f*.6,{dur:.12,vol:.07,f2:f*1.4,glide:.07,rev:.2}); },
    flip(){ noise({dur:.24,vol:.035,f:rnd(600,800),f2:rnd(2600,3400),q:.7,rev:.18}); },
    whoosh(){ noise({dur:.38,vol:.03,f:350,f2:2000,q:.6,rev:.3}); },
    correct(){
      const base=step(523,Math.min(combo,6)); combo++;
      const v=variant('correct',3);
      const shapes=[[0,2],[0,1,3],[0,3]][v];
      shapes.forEach((k,i)=>pluck(step(base,k),{delay:i*.085,vol:.11,pan:(i-.5)*.25}));
      if(combo>=3) bell(step(base,5),{delay:shapes.length*.085,vol:.035,dur:.8});
    },
    wrong(){ combo=0; const v=variant('wrong',2);
      tone(v?208:196,{dur:.3,vol:.09,type:'triangle',f2:v?165:147,lp:700,rev:.2});
      tone(v?156:147,{delay:.13,dur:.35,vol:.07,type:'triangle',f2:v?131:123,lp:600,rev:.25}); },
    coin(){ const f=step(1568,Math.floor(rnd(0,3))); bell(f,{dur:.4,vol:.04,rev:.45}); bell(step(f,2),{delay:.055,dur:.55,vol:.035,rev:.5}); },
    star(i){ const f=[784,988,1175][i||0]; bell(f,{dur:1.3,vol:.09}); pluck(f/2,{vol:.04,dur:.6}); },
    fanfare(){ const v=variant('fanfare',3);
      const runs=[[523,659,784,1047],[392,523,659,784,1047],[523,587,659,784,1047]][v];
      runs.forEach((f,i)=>pluck(f,{delay:i*.1,vol:.08,pan:(i/(runs.length-1)-.5)*.5}));
      const t=runs.length*.1+.05; [523,659,784,1047].forEach(f=>bell(f,{delay:t,dur:1.8,vol:.03,rev:1}));
      tone(131,{delay:t,dur:1.6,vol:.05,type:'triangle',attack:.05,rev:.6}); },
    fail(){ combo=0; [440,392,330,294].forEach((f,i)=>pluck(f,{delay:i*.18,vol:.06,dur:.6,rev:.6})); },
    unlock(){ [784,988,1175,1568].forEach((f,i)=>bell(f,{delay:i*.08,dur:.9,vol:.045})); },
    levelup(){ const run=[392,523,659,784,1047,1319,1568];
      run.forEach((f,i)=>pluck(f,{delay:i*.085,vol:.085,pan:(i/6-.5)*.6}));
      noise({delay:.05,dur:.7,vol:.02,f:500,f2:5000,q:.6,rev:.5});
      const t=run.length*.085+.1; [523,659,784,1047].forEach((f,i)=>bell(f,{delay:t+i*.03,dur:2.4,vol:.05,rev:1}));
      tone(131,{delay:t,dur:2.2,vol:.07,type:'triangle',attack:.06,rev:.7}); tone(196,{delay:t,dur:2.2,vol:.04,type:'triangle',attack:.06,rev:.7});
      [1568,1760,2093].forEach((f,i)=>bell(f,{delay:t+.5+i*.16,dur:1,vol:.03,rev:1})); },
    type(){ tone(near(rnd(900,1400)),{dur:.03,vol:.015,rev:0}); noise({dur:.015,vol:.018,f:rnd(2600,3600),q:3,rev:0}); }
  };
})();

/* ================= VISUAL EFFECTS ================= */
window.Fx=(function(){
  let RM=false; try{ RM=matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  const cv=document.createElement('canvas'); cv.id='fx-canvas'; cv.setAttribute('aria-hidden','true'); document.body.appendChild(cv);
  const g=cv.getContext('2d'); let W=0,H=0;
  function size(){ const d=Math.min(2,window.devicePixelRatio||1); W=innerWidth; H=innerHeight; cv.width=W*d; cv.height=H*d; cv.style.width=W+'px'; cv.style.height=H+'px'; g.setTransform(d,0,0,d,0,0); }
  size(); addEventListener('resize',size);
  const COLORS=['#FF7A12','#FFC23D','#3FC489','#7C5CFF','#FF5F8A','#4CC3FF'];
  let parts=[], running=false, last=0;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  function star(x,y,r){ g.beginPath(); for(let i=0;i<8;i++){ const a=i*Math.PI/4, rr=i%2?r*.38:r; g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr); } g.closePath(); g.fill(); }
  function loop(now){
    const dt=Math.min(.033,(now-last)/1000||.016); last=now;
    g.clearRect(0,0,W,H);
    for(const p of parts){
      p.vy+=p.grav*dt; p.vx*=Math.pow(p.drag,dt*60); p.vy*=Math.pow(p.drag,dt*60);
      p.x+=p.vx*dt; p.y+=p.vy*dt; p.rot+=p.vr*dt; p.flip+=p.vf*dt; p.age+=dt;
      const a=Math.max(0,Math.min(1,(p.life-p.age)/.4));
      g.globalAlpha=a; g.fillStyle=p.c;
      if(p.kind==='star'){ star(p.x,p.y,p.r*(1-p.age/p.life*.5)); }
      else { g.save(); g.translate(p.x,p.y); g.rotate(p.rot); g.scale(1,Math.cos(p.flip)); g.fillRect(-p.w/2,-p.h/2,p.w,p.h); g.restore(); }
    }
    g.globalAlpha=1;
    parts=parts.filter(p=>p.age<p.life&&p.y<H+60);
    if(parts.length) requestAnimationFrame(loop); else { running=false; g.clearRect(0,0,W,H); }
  }
  function kick(){ if(!running){ running=true; last=performance.now(); requestAnimationFrame(loop); } }
  function center(el){ if(!el) return {x:W/2,y:H/2}; const r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }
  function bump(el){ if(!el) return; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  return {
    confetti(el,n){
      if(RM) return; const c=center(el); n=n||70;
      for(let i=0;i<n;i++){ const a=-Math.PI/2+rnd(-1.1,1.1), s=rnd(380,880);
        parts.push({kind:'rect',x:c.x,y:c.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,grav:1100,drag:.975,rot:rnd(0,6),vr:rnd(-12,12),flip:rnd(0,6),vf:rnd(6,14),w:rnd(6,11),h:rnd(4,7),c:COLORS[i%COLORS.length],age:0,life:rnd(1.6,2.6)}); }
      kick();
    },
    rain(n){
      if(RM) return; n=n||140;
      for(let i=0;i<n;i++) parts.push({kind:'rect',x:rnd(0,W),y:rnd(-H*.4,-10),vx:rnd(-60,60),vy:rnd(120,320),grav:260,drag:.995,rot:rnd(0,6),vr:rnd(-8,8),flip:rnd(0,6),vf:rnd(5,12),w:rnd(6,11),h:rnd(4,7),c:COLORS[i%COLORS.length],age:0,life:rnd(2.8,4)});
      kick();
    },
    sparkle(el,color){
      if(RM) return; const c=center(el);
      for(let i=0;i<16;i++){ const a=i/16*Math.PI*2+rnd(-.2,.2), s=rnd(140,320);
        parts.push({kind:'star',x:c.x,y:c.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,grav:240,drag:.93,rot:0,vr:0,flip:0,vf:0,r:rnd(3,6),c:color||(i%2?'#FFC23D':'#3FC489'),age:0,life:rnd(.5,.8)}); }
      kick();
    },
    coinFly(el,n,onEach){
      const target=document.getElementById('coin-pill');
      if(!el||!target){ if(onEach) onEach(); return; }
      const a=center(el), b=center(target); n=n||3;
      for(let i=0;i<n;i++){
        const c=document.createElement('div'); c.className='fx-coin'; document.body.appendChild(c);
        const mx=(a.x+b.x)/2+rnd(-60,60), my=Math.min(a.y,b.y)-rnd(40,110);
        const done=()=>{ c.remove(); bump(target); if(onEach) onEach(i); };
        if(RM||!c.animate){ setTimeout(done,i*80); continue; }
        const an=c.animate([
          {transform:`translate(${a.x-10}px,${a.y-10}px) scale(.4)`,opacity:0},
          {transform:`translate(${a.x-10+rnd(-24,24)}px,${a.y-30}px) scale(1.1)`,opacity:1,offset:.18},
          {transform:`translate(${mx-10}px,${my-10}px) scale(1)`,opacity:1,offset:.55},
          {transform:`translate(${b.x-10}px,${b.y-10}px) scale(.6)`,opacity:.9}
        ],{duration:780,delay:i*90,easing:'cubic-bezier(.45,0,.3,1)',fill:'both'});
        an.onfinish=done;
      }
    },
    floatText(el,text,cls){
      if(!el) return; const c=center(el), d=document.createElement('div');
      d.className='fx-float '+(cls||''); d.textContent=text; d.style.left=c.x+'px'; d.style.top=(c.y-10)+'px';
      document.body.appendChild(d); setTimeout(()=>d.remove(),1100);
    },
    bump
  };
})();

/* ================= WORDY'S WARDROBE =================
   Coordinates: hat = relative to the top of the head (body y -64), face = face group (eyes at ±10.5,-43), neck = body.
   .swing / .tail / .wob parts get physics in the engine (rotation around data-px,data-py). */
window.WORDY_ITEMS=[
 {id:'beanie',slot:'hat',name:'Шапка-бини',price:60,svg:`<path d="M-30 9 C-31 -24 31 -24 30 9 Z" fill="#3B82F6"/><path d="M-19 -12 L-17 6 M-7 -16 L-6.5 7 M5 -16 L5 7 M17 -12 L16 6" stroke="#2F6FE0" stroke-width="2.4" stroke-linecap="round"/><rect x="-33" y="2" width="66" height="12" rx="6" fill="#2563EB"/><g class="swing" data-px="0" data-py="-16" data-k="1.1"><circle cx="0" cy="-22" r="7.5" fill="#F1F5F9"/><circle cx="-2" cy="-24" r="2.5" fill="#fff"/></g>`},
 {id:'cap',slot:'hat',name:'Кепка',price:80,svg:`<path d="M-29 9 C-30 -22 30 -22 29 9 Z" fill="#E11D48"/><path d="M0 -14 V7" stroke="#BE123C" stroke-width="2"/><path d="M8 4 Q30 -1 47 8 Q30 14 8 11 Z" fill="#9F1239"/><circle cx="0" cy="-14" r="3" fill="#BE123C"/>`},
 {id:'party',slot:'hat',name:'Праздничный колпак',price:100,svg:`<path d="M-17 8 L0 -36 L17 8 Z" fill="#A855F7"/><path d="M-11 -8 L9 -2 M-6 -22 L5 -18 M-14 2 L13 7" stroke="#F0ABFC" stroke-width="3" stroke-linecap="round"/><path d="M-18 8 Q0 13 18 8" stroke="#7E22CE" stroke-width="3" fill="none" stroke-linecap="round"/><g class="swing" data-px="0" data-py="-35" data-k="1.6"><circle cx="0" cy="-40" r="6" fill="#FDE047"/></g>`},
 {id:'headphones',slot:'hat',name:'Наушники',price:150,svg:`<path d="M-36 22 C-38 -26 38 -26 36 22" stroke="#1F2937" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="-48" y="15" width="15" height="25" rx="7" fill="#EF4444"/><rect x="33" y="15" width="15" height="25" rx="7" fill="#EF4444"/><rect x="-45" y="20" width="5" height="15" rx="2.5" fill="#B91C1C"/><rect x="40" y="20" width="5" height="15" rx="2.5" fill="#B91C1C"/>`},
 {id:'grad',slot:'hat',name:'Шапочка выпускника',price:200,svg:`<path d="M-22 9 Q0 15 22 9 L20 -4 L-20 -4 Z" fill="#1F2937"/><path d="M-37 -6 L0 -18 L37 -6 L0 6 Z" fill="#111827"/><path d="M-37 -6 L0 6 L37 -6" stroke="#374151" stroke-width="1.5" fill="none"/><path d="M0 -6 L25 -2" stroke="#F59E0B" stroke-width="2"/><circle cx="0" cy="-6" r="2.8" fill="#F59E0B"/><g class="swing" data-px="25" data-py="-2" data-k="1.8"><path d="M25 -2 L25 14" stroke="#F59E0B" stroke-width="2"/><path d="M22 13 h6 l1.5 9 h-9z" fill="#F59E0B"/></g>`},
 {id:'crown',slot:'hat',name:'Корона',price:400,svg:`<path d="M-24 9 L-27 -18 L-13 -6 L0 -25 L13 -6 L27 -18 L24 9 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2" stroke-linejoin="round"/><path d="M-24 4 H24" stroke="#F59E0B" stroke-width="2"/><circle cx="0" cy="-1" r="3.6" fill="#EF4444"/><circle cx="-14" cy="0" r="2.6" fill="#3B82F6"/><circle cx="14" cy="0" r="2.6" fill="#22C55E"/><circle cx="-27" cy="-19" r="2.6" fill="#FDE68A"/><circle cx="0" cy="-26" r="2.9" fill="#FDE68A"/><circle cx="27" cy="-19" r="2.6" fill="#FDE68A"/>`},
 {id:'glasses',slot:'face',name:'Круглые очки',price:70,svg:`<circle cx="-10.5" cy="-43" r="10" fill="rgba(255,255,255,.18)" stroke="#2B1A12" stroke-width="2.6"/><circle cx="10.5" cy="-43" r="10" fill="rgba(255,255,255,.18)" stroke="#2B1A12" stroke-width="2.6"/><path d="M-1 -45 Q0 -47 1 -45" stroke="#2B1A12" stroke-width="2.6" fill="none"/><path d="M-20.5 -45 L-31 -48 M20.5 -45 L31 -48" stroke="#2B1A12" stroke-width="2.4" stroke-linecap="round"/>`},
 {id:'shades',slot:'face',name:'Тёмные очки',price:120,svg:`<path d="M-23 -51 H-1.5 V-44 Q-1.5 -34 -12 -34 Q-23 -34 -23 -44 Z" fill="#111827"/><path d="M23 -51 H1.5 V-44 Q1.5 -34 12 -34 Q23 -34 23 -44 Z" fill="#111827"/><path d="M-2 -49 H2" stroke="#111827" stroke-width="3"/><path d="M-19 -47 L-13 -47 M5 -47 L11 -47" stroke="rgba(255,255,255,.55)" stroke-width="2" stroke-linecap="round"/><path d="M-23 -49 L-32 -51 M23 -49 L32 -51" stroke="#111827" stroke-width="2.4" stroke-linecap="round"/>`},
 {id:'bowtie',slot:'neck',name:'Бабочка',price:50,svg:`<g class="wob" data-px="0" data-py="-11"><path d="M0 -11 L-14 -19 Q-17 -11 -14 -3 Z" fill="#8B5CF6"/><path d="M0 -11 L14 -19 Q17 -11 14 -3 Z" fill="#8B5CF6"/><rect x="-4" y="-15" width="8" height="8" rx="3" fill="#6D28D9"/></g>`},
 {id:'scarf',slot:'neck',name:'Полосатый шарф',price:90,svg:`<path d="M-33 -18 Q0 -4 33 -18 L32 -8 Q0 6 -32 -8 Z" fill="#EF4444"/><path d="M-20 -12 L-18.5 -3 M-6.5 -8.5 L-6 1 M7 -8.5 L7 1 M20 -12 L19 -3" stroke="#FECACA" stroke-width="3" stroke-linecap="round"/><g class="tail" data-px="17" data-py="-6"><path d="M12 -8 L22 -8 L24 18 L14 18 Z" fill="#DC2626"/><path d="M13 5 L23 5" stroke="#FECACA" stroke-width="3"/><path d="M15 18 v4 M18 18 v4 M21 18 v4 M23.5 18 v4" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></g>`}
];

WORDY_ITEMS.push(
 {id:'beret',slot:'hat',name:'Берет художника',price:90,svg:`<g transform="rotate(-9)"><ellipse cx="-4" cy="-1" rx="35" ry="13" fill="#B91C1C"/><ellipse cx="-8" cy="-5" rx="20" ry="6" fill="#DC2626" opacity=".6"/><path d="M-30 6 Q0 13 27 6" stroke="#7F1D1D" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-3 -13 l2 -7" stroke="#7F1D1D" stroke-width="3" stroke-linecap="round"/></g>`},
 {id:'chef',slot:'hat',name:'Колпак шефа',price:110,svg:`<rect x="-23" y="-6" width="46" height="16" rx="3" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/><path d="M-25 -4 C-40 -10 -34 -36 -17 -31 C-15 -46 15 -46 17 -31 C34 -36 40 -10 25 -4 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/><path d="M-10 -8 V-20 M0 -8 V-24 M10 -8 V-20" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>`},
 {id:'wizard',slot:'hat',name:'Шляпа волшебника',price:250,svg:`<path d="M-34 9 Q0 19 34 9 Q0 1 -34 9Z" fill="#3730A3"/><g class="swing" data-px="0" data-py="4" data-k=".45"><path d="M-21 7 Q-8 -18 2 -42 Q8 -50 17 -46 Q8 -40 6 -30 L21 7 Z" fill="#4F46E5"/><circle cx="-4" cy="-12" r="2.2" fill="#FDE047"/><circle cx="7" cy="-2" r="1.6" fill="#FDE047"/><circle cx="3" cy="-26" r="1.6" fill="#FDE047"/><path d="M-15 2 Q0 6 15 2" stroke="#FDE047" stroke-width="3" fill="none" stroke-linecap="round"/></g>`},
 {id:'cowboy',slot:'hat',name:'Ковбойская шляпа',price:180,svg:`<path d="M-50 6 Q-42 15 0 13 Q42 15 50 6 Q38 -2 25 4 L21 -18 Q10 -27 0 -19 Q-10 -27 -21 -18 L-25 4 Q-38 -2 -50 6Z" fill="#A16207"/><path d="M-23 -1 Q0 4 23 -1 L24 4 Q0 9 -24 4Z" fill="#78350F"/><path d="M-12 -20 Q0 -14 12 -20" stroke="#854D0E" stroke-width="2" fill="none"/>`},
 {id:'viking',slot:'hat',name:'Шлем викинга',price:300,svg:`<path d="M-28 -2 C-46 -6 -50 -26 -41 -37 C-39 -24 -33 -16 -24 -13Z" fill="#F5F0DC" stroke="#D6CFA8" stroke-width="1.5"/><path d="M28 -2 C46 -6 50 -26 41 -37 C39 -24 33 -16 24 -13Z" fill="#F5F0DC" stroke="#D6CFA8" stroke-width="1.5"/><path d="M-30 9 C-31 -24 31 -24 30 9 Z" fill="#9CA3AF"/><path d="M-18 -14 Q-10 -20 0 -21" stroke="#D1D5DB" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-32" y="2" width="64" height="9" rx="4" fill="#6B7280"/><path d="M0 -17 V9" stroke="#6B7280" stroke-width="4"/><circle cx="-20" cy="6.5" r="1.8" fill="#D1D5DB"/><circle cx="20" cy="6.5" r="1.8" fill="#D1D5DB"/>`},
 {id:'wreath',slot:'hat',name:'Цветочный венок',price:130,svg:`<path d="M-32 9 Q0 -6 32 9" stroke="#16A34A" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="#F472B6"><circle cx="-26" cy="5" r="5.5"/><circle cx="13" cy="2" r="5.5"/></g><g fill="#FFFFFF" stroke="#E5E7EB"><circle cx="-13" cy="2" r="5.5"/><circle cx="26" cy="5" r="5.5"/></g><circle cx="0" cy="1" r="6.5" fill="#A78BFA"/><g fill="#FDE047"><circle cx="-26" cy="5" r="2"/><circle cx="-13" cy="2" r="2"/><circle cx="0" cy="1" r="2.4"/><circle cx="13" cy="2" r="2"/><circle cx="26" cy="5" r="2"/></g><path d="M-20 4 l-3 -4 M7 0 l3 -4 M20 3 l3 -4" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round"/>`},
 {id:'hearts',slot:'face',name:'Очки-сердечки',price:140,svg:`<path d="M-10.5 -34 C-24 -42 -20 -55 -10.5 -49 C-1 -55 3 -42 -10.5 -34Z" fill="rgba(244,63,94,.85)" stroke="#BE123C" stroke-width="2"/><path d="M10.5 -34 C-3 -42 1 -55 10.5 -49 C20 -55 24 -42 10.5 -34Z" fill="rgba(244,63,94,.85)" stroke="#BE123C" stroke-width="2"/><path d="M-2 -46 H2" stroke="#BE123C" stroke-width="2.4"/><path d="M-20 -46 L-31 -49 M20 -46 L31 -49" stroke="#BE123C" stroke-width="2.2" stroke-linecap="round"/><path d="M-15 -47 l2 -2 M6 -47 l2 -2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`},
 {id:'monocle',slot:'face',name:'Монокль',price:160,svg:`<circle cx="10.5" cy="-43" r="10.5" fill="rgba(255,255,255,.2)" stroke="#D4A017" stroke-width="2.6"/><path d="M19 -37 Q26 -24 22 -10" stroke="#D4A017" stroke-width="1.6" fill="none" stroke-dasharray="2 2"/><path d="M-18 -51 Q-11 -55 -4 -51" stroke="#3B2314" stroke-width="2.6" fill="none" stroke-linecap="round"/>`},
 {id:'stache',slot:'face',name:'Усы джентльмена',price:75,svg:`<g class="wob" data-px="0" data-py="-31"><path d="M0 -31 C-6 -37 -16 -35 -21 -28 C-15 -30 -9 -27 0 -29.5 C9 -27 15 -30 21 -28 C16 -35 6 -37 0 -31Z" fill="#3B2314"/></g>`},
 {id:'tie',slot:'neck',name:'Галстук',price:70,svg:`<g class="wob" data-px="0" data-py="-16"><path d="M-6 -17 L6 -17 L4 -10 L-4 -10Z" fill="#1D4ED8"/><path d="M-4 -10 L4 -10 L7 12 L0 19 L-7 12Z" fill="#2563EB"/><path d="M-3 -2 L5 4 M-5 6 L5 12" stroke="#93C5FD" stroke-width="2"/></g>`},
 {id:'medal',slot:'neck',name:'Золотая медаль',price:220,svg:`<path d="M-15 -19 L-3 -3 M15 -19 L3 -3" stroke="#2563EB" stroke-width="6" stroke-linecap="round"/><path d="M-13 -19 L-2 -4" stroke="#EF4444" stroke-width="2"/><path d="M13 -19 L2 -4" stroke="#EF4444" stroke-width="2"/><g class="swing" data-px="0" data-py="-4" data-k=".7"><circle cx="0" cy="5" r="9" fill="#FBBF24" stroke="#D97706" stroke-width="2"/><path d="M0 0.5 l1.6 3.2 3.5.5 -2.5 2.4.6 3.5L0 8.4l-3.2 1.7.6-3.5-2.5-2.4 3.5-.5z" fill="#FEF3C7"/></g>`},
 {id:'bandana',slot:'neck',name:'Бандана',price:60,svg:`<path d="M-31 -17 Q0 -5 31 -17 L28 -10 L0 16 L-28 -10 Z" fill="#0EA5E9"/><g fill="#E0F2FE"><circle cx="-14" cy="-7" r="1.8"/><circle cx="0" cy="-3" r="1.8"/><circle cx="14" cy="-7" r="1.8"/><circle cx="-6" cy="4" r="1.6"/><circle cx="6" cy="4" r="1.6"/><circle cx="0" cy="10" r="1.4"/></g>`}
);
WORDY_ITEMS.forEach(i=>{ if(i.slot==='face') i.slot=i.id==='stache'?'mouth':'eyes'; });
WORDY_ITEMS.push(
 {"id": "tophat", "slot": "hat", "name": "Цилиндр", "price": 220, "svg": "<rect x=\"-17\" y=\"-34\" width=\"34\" height=\"39\" rx=\"3\" fill=\"#1F2937\"/><rect x=\"-17\" y=\"-7\" width=\"34\" height=\"7\" fill=\"#B91C1C\"/><path d=\"M-12 -30 V-10\" stroke=\"#4B5563\" stroke-width=\"3\" stroke-linecap=\"round\"/><ellipse cx=\"0\" cy=\"5\" rx=\"31\" ry=\"6\" fill=\"#111827\"/>"},
 {"id": "bunny", "slot": "hat", "name": "Ушки зайки", "price": 120, "svg": "<g class=\"wob\" data-px=\"0\" data-py=\"4\"><path d=\"M-13 4 C-24 -20 -22 -47 -12 -49 C-3 -47 -3 -20 -5 4Z\" fill=\"#F8FAFC\" stroke=\"#E2E8F0\" stroke-width=\"1.5\"/><path d=\"M-11 -2 C-17 -19 -16 -39 -12 -41 C-8 -39 -8 -19 -8 -2Z\" fill=\"#FBCFE8\"/><path d=\"M13 4 C24 -20 22 -47 12 -49 C3 -47 3 -20 5 4Z\" fill=\"#F8FAFC\" stroke=\"#E2E8F0\" stroke-width=\"1.5\"/><path d=\"M11 -2 C17 -19 16 -39 12 -41 C8 -39 8 -19 8 -2Z\" fill=\"#FBCFE8\"/></g><path d=\"M-29 9 Q0 -17 29 9\" stroke=\"#F472B6\" stroke-width=\"4.5\" fill=\"none\" stroke-linecap=\"round\"/>"},
 {"id": "catears", "slot": "hat", "name": "Кошачьи ушки", "price": 100, "svg": "<path d=\"M-25 3 L-21 -23 L-6 -6Z\" fill=\"#1F2937\"/><path d=\"M-20.5 -1 L-18.5 -16 L-10 -6.5Z\" fill=\"#F9A8D4\"/><path d=\"M25 3 L21 -23 L6 -6Z\" fill=\"#1F2937\"/><path d=\"M20.5 -1 L18.5 -16 L10 -6.5Z\" fill=\"#F9A8D4\"/><path d=\"M-29 9 Q0 -17 29 9\" stroke=\"#1F2937\" stroke-width=\"4.5\" fill=\"none\" stroke-linecap=\"round\"/>"},
 {"id": "santa", "slot": "hat", "name": "Новогодний колпак", "price": 150, "svg": "<g class=\"swing\" data-px=\"0\" data-py=\"2\" data-k=\".5\"><path d=\"M-27 5 Q-20 -28 6 -36 Q28 -41 38 -21 L31 -17 Q24 -28 12 -24 Q2 -16 26 5Z\" fill=\"#DC2626\"/><path d=\"M-14 -4 Q0 -24 14 -26\" stroke=\"#B91C1C\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"36\" cy=\"-18\" r=\"6.5\" fill=\"#F8FAFC\"/></g><rect x=\"-31\" y=\"-1\" width=\"62\" height=\"12\" rx=\"6\" fill=\"#F8FAFC\"/>"},
 {"id": "bow", "slot": "hat", "name": "Бантик", "price": 60, "svg": "<g transform=\"translate(15 -1) rotate(18)\"><g class=\"wob\" data-px=\"0\" data-py=\"0\"><path d=\"M0 0 L-14 -10 Q-18 0 -14 10Z\" fill=\"#EC4899\"/><path d=\"M0 0 L14 -10 Q18 0 14 10Z\" fill=\"#EC4899\"/><path d=\"M-12 -6 Q-9 0 -12 6 M12 -6 Q9 0 12 6\" stroke=\"#F9A8D4\" stroke-width=\"1.6\" fill=\"none\"/><circle r=\"4.2\" fill=\"#BE185D\"/></g></g>"},
 {"id": "propeller", "slot": "hat", "name": "Кепка с пропеллером", "price": 170, "svg": "<path d=\"M-29 9 C-30 -22 30 -22 29 9Z\" fill=\"#FACC15\"/><path d=\"M-29 9 C-30 -8 -20 -17 -9 -19 L-9 9Z\" fill=\"#EF4444\"/><path d=\"M9 -19 C20 -17 30 -8 29 9 L9 9Z\" fill=\"#3B82F6\"/><path d=\"M8 5 Q30 1 45 9 Q30 14 8 10Z\" fill=\"#1D4ED8\"/><path d=\"M0 -15 V-26\" stroke=\"#374151\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><g class=\"w-prop\"><ellipse cx=\"-10\" cy=\"-27\" rx=\"10\" ry=\"2.8\" fill=\"#22C55E\"/><ellipse cx=\"10\" cy=\"-27\" rx=\"10\" ry=\"2.8\" fill=\"#16A34A\"/></g><circle cx=\"0\" cy=\"-27\" r=\"2.6\" fill=\"#374151\"/>"},
 {"id": "halo", "slot": "hat", "name": "Нимб", "price": 280, "svg": "<g class=\"wob\" data-px=\"0\" data-py=\"-20\"><ellipse cx=\"0\" cy=\"-20\" rx=\"22\" ry=\"6\" fill=\"none\" stroke=\"#FACC15\" stroke-width=\"5\"/><ellipse cx=\"0\" cy=\"-20\" rx=\"22\" ry=\"6\" fill=\"none\" stroke=\"#FEF9C3\" stroke-width=\"1.6\"/></g>"},
 {"id": "pirate", "slot": "hat", "name": "Пиратская треуголка", "price": 230, "svg": "<path d=\"M-44 4 Q-30 -6 -20 -20 Q0 -30 20 -20 Q30 -6 44 4 Q22 12 0 6 Q-22 12 -44 4Z\" fill=\"#1F2937\"/><path d=\"M-40 4 Q-20 9 0 4 Q20 9 40 4\" stroke=\"#FACC15\" stroke-width=\"2.2\" fill=\"none\"/><circle cx=\"0\" cy=\"-10\" r=\"5.5\" fill=\"#F8FAFC\"/><path d=\"M-3.5 -6 L3.5 -2 M3.5 -6 L-3.5 -2\" stroke=\"#F8FAFC\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><circle cx=\"-2\" cy=\"-11\" r=\"1.1\" fill=\"#1F2937\"/><circle cx=\"2\" cy=\"-11\" r=\"1.1\" fill=\"#1F2937\"/>"},
 {"id": "square", "slot": "eyes", "name": "Квадратные очки", "price": 80, "svg": "<rect x=\"-21.5\" y=\"-51\" width=\"19\" height=\"16\" rx=\"3\" fill=\"rgba(255,255,255,.15)\" stroke=\"#1E3A8A\" stroke-width=\"2.8\"/><rect x=\"2.5\" y=\"-51\" width=\"19\" height=\"16\" rx=\"3\" fill=\"rgba(255,255,255,.15)\" stroke=\"#1E3A8A\" stroke-width=\"2.8\"/><path d=\"M-2.5 -45 H2.5 M-21.5 -46 L-33 -49 M21.5 -46 L33 -49\" stroke=\"#1E3A8A\" stroke-width=\"2.6\" stroke-linecap=\"round\"/>"},
 {"id": "stars", "slot": "eyes", "name": "Очки-звёзды", "price": 150, "svg": "<path d=\"M-10.5 -56.0 L-7.0 -47.9 L1.9 -47.0 L-4.8 -41.1 L-2.9 -32.5 L-10.5 -37.0 L-18.1 -32.5 L-16.2 -41.1 L-22.9 -47.0 L-14.0 -47.9Z\" fill=\"rgba(250,204,21,.55)\" stroke=\"#CA8A04\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M10.5 -56.0 L14.0 -47.9 L22.9 -47.0 L16.2 -41.1 L18.1 -32.5 L10.5 -37.0 L2.9 -32.5 L4.8 -41.1 L-1.9 -47.0 L7.0 -47.9Z\" fill=\"rgba(250,204,21,.55)\" stroke=\"#CA8A04\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><path d=\"M-1.5 -44 H1.5\" stroke=\"#CA8A04\" stroke-width=\"2.4\"/>"},
 {"id": "glasses3d", "slot": "eyes", "name": "3D-очки", "price": 110, "svg": "<path d=\"M-25 -52 H25 V-37 Q13 -34 3 -38 H-3 Q-13 -34 -25 -37Z\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\"1.5\"/><rect x=\"-21.5\" y=\"-49\" width=\"17\" height=\"10\" rx=\"2.5\" fill=\"rgba(239,68,68,.78)\"/><rect x=\"4.5\" y=\"-49\" width=\"17\" height=\"10\" rx=\"2.5\" fill=\"rgba(59,130,246,.78)\"/><path d=\"M-25 -48 L-34 -50 M25 -48 L34 -50\" stroke=\"#CBD5E1\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>"},
 {"id": "patch", "slot": "eyes", "name": "Повязка пирата", "price": 90, "svg": "<path d=\"M-35 -56 L33 -38\" stroke=\"#111827\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><path d=\"M-0.5 -48 Q10.5 -57 21.5 -48 Q22 -34 10.5 -31.5 Q-1 -34 -0.5 -48Z\" fill=\"#111827\"/><path d=\"M4 -46 Q10 -51 16 -47\" stroke=\"#374151\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"/>"},
 {"id": "goggles", "slot": "eyes", "name": "Очки пилота", "price": 190, "svg": "<path d=\"M-36 -46 H36\" stroke=\"#78350F\" stroke-width=\"4\"/><circle cx=\"-11\" cy=\"-44\" r=\"10.5\" fill=\"rgba(125,211,252,.45)\" stroke=\"#A16207\" stroke-width=\"3.6\"/><circle cx=\"11\" cy=\"-44\" r=\"10.5\" fill=\"rgba(125,211,252,.45)\" stroke=\"#A16207\" stroke-width=\"3.6\"/><path d=\"M-15 -49 Q-11 -52 -7 -50 M7 -50 Q11 -52 15 -49\" stroke=\"#F0F9FF\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/>"},
 {"id": "curl", "slot": "mouth", "name": "Усы-завитки", "price": 110, "svg": "<g class=\"wob\" data-px=\"0\" data-py=\"-31\"><path d=\"M0 -31.5 C-5 -36 -12 -35.5 -16 -31 C-19 -28 -23 -28.5 -24 -31.5 C-24.5 -34.5 -21.5 -35.5 -20.5 -33.5 C-21.5 -31.5 -19 -30.5 -17 -32 C-13 -28.8 -6 -28.8 0 -29.8 C6 -28.8 13 -28.8 17 -32 C19 -30.5 21.5 -31.5 20.5 -33.5 C21.5 -35.5 24.5 -34.5 24 -31.5 C23 -28.5 19 -28 16 -31 C12 -35.5 5 -36 0 -31.5Z\" fill=\"#2B1A12\"/></g>"},
 {"id": "walrus", "slot": "mouth", "name": "Пышные усы", "price": 90, "svg": "<g class=\"wob\" data-px=\"0\" data-py=\"-31\"><path d=\"M0 -33 C-8 -37 -18 -35 -20 -27 C-20 -22 -16 -21 -15 -25 C-13 -22 -10 -22 -9 -25 C-7 -22 -4 -22 -3 -25 C-2 -23 2 -23 3 -25 C4 -22 7 -22 9 -25 C10 -22 13 -22 15 -25 C16 -21 20 -22 20 -27 C18 -35 8 -37 0 -33Z\" fill=\"#7C4A1E\"/></g>"},
 {"id": "beard", "slot": "mouth", "name": "Борода", "price": 160, "svg": "<path d=\"M-31 -33 Q-33 -4 0 1 Q33 -4 31 -33 Q25 -21 14 -22 Q7 -17 0 -18.5 Q-7 -17 -14 -22 Q-25 -21 -31 -33Z\" fill=\"#6B3A1E\"/><path d=\"M-20 -14 Q-17 -9 -19 -5 M-8 -11 Q-6 -6 -8 -2 M8 -11 Q6 -6 8 -2 M20 -14 Q17 -9 19 -5\" stroke=\"#4A2711\" stroke-width=\"1.8\" fill=\"none\" stroke-linecap=\"round\"/>"},
 {"id": "goatee", "slot": "mouth", "name": "Бородка", "price": 70, "svg": "<path d=\"M-7 -21.5 Q0 -18.5 7 -21.5 Q6.5 -9 0 -5 Q-6.5 -9 -7 -21.5Z\" fill=\"#3B2314\"/>"},
 {"id": "blush", "slot": "cheeks", "name": "Румянец", "price": 40, "svg": "<ellipse cx=\"-22\" cy=\"-30\" rx=\"6.5\" ry=\"4\" fill=\"#F43F5E\" opacity=\".4\"/><ellipse cx=\"22\" cy=\"-30\" rx=\"6.5\" ry=\"4\" fill=\"#F43F5E\" opacity=\".4\"/>"},
 {"id": "freckles", "slot": "cheeks", "name": "Веснушки", "price": 40, "svg": "<g fill=\"#9A3412\" opacity=\".6\"><circle cx=\"-24\" cy=\"-33\" r=\"1.3\"/><circle cx=\"-20\" cy=\"-30\" r=\"1.2\"/><circle cx=\"-27\" cy=\"-29.5\" r=\"1.1\"/><circle cx=\"-22\" cy=\"-35.5\" r=\"1\"/><circle cx=\"-17.5\" cy=\"-33\" r=\"1\"/><circle cx=\"24\" cy=\"-33\" r=\"1.3\"/><circle cx=\"20\" cy=\"-30\" r=\"1.2\"/><circle cx=\"27\" cy=\"-29.5\" r=\"1.1\"/><circle cx=\"22\" cy=\"-35.5\" r=\"1\"/><circle cx=\"17.5\" cy=\"-33\" r=\"1\"/></g>"},
 {"id": "clown", "slot": "cheeks", "name": "Клоунский нос", "price": 80, "svg": "<circle cx=\"0\" cy=\"-34\" r=\"5.2\" fill=\"#EF4444\"/><circle cx=\"-1.7\" cy=\"-35.8\" r=\"1.6\" fill=\"#FCA5A5\"/>"},
 {"id": "sticker", "slot": "cheeks", "name": "Звёздочка на щеке", "price": 60, "svg": "<path d=\"M22.0 -36.5 L23.4 -32.9 L27.2 -32.7 L24.3 -30.3 L25.2 -26.6 L22.0 -28.6 L18.8 -26.6 L19.7 -30.3 L16.8 -32.7 L20.6 -32.9Z\" fill=\"#FACC15\" stroke=\"#EAB308\" stroke-width=\"1\" stroke-linejoin=\"round\"/>"},
 {"id": "hearts2", "slot": "cheeks", "name": "Сердечки на щеках", "price": 60, "svg": "<path d=\"M-22 -27 C-28 -30.5 -26 -36 -22 -33.5 C-18 -36 -16 -30.5 -22 -27Z\" fill=\"#F43F5E\" opacity=\".75\"/><path d=\"M22 -27 C16 -30.5 18 -36 22 -33.5 C26 -36 28 -30.5 22 -27Z\" fill=\"#F43F5E\" opacity=\".75\"/>"},
 {"id": "pearls", "slot": "neck", "name": "Жемчужные бусы", "price": 120, "svg": "<g class=\"wob\" data-px=\"0\" data-py=\"-14\"><circle cx=\"-25.0\" cy=\"-17.0\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"-20.0\" cy=\"-13.6\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"-15.0\" cy=\"-10.9\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"-10.0\" cy=\"-9.0\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"-5.0\" cy=\"-7.9\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"0.0\" cy=\"-7.5\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"5.0\" cy=\"-7.9\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"10.0\" cy=\"-9.0\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"15.0\" cy=\"-10.9\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"20.0\" cy=\"-13.6\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"25.0\" cy=\"-17.0\" r=\"2.9\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle cx=\"0\" cy=\"-5.5\" r=\"4.2\" fill=\"#FDF2F8\" stroke=\"#F9A8D4\" stroke-width=\"1\"/></g>"},
 {"id": "lei", "slot": "neck", "name": "Гавайские бусы", "price": 100, "svg": "<g class=\"wob\" data-px=\"0\" data-py=\"-14\"><circle cx=\"-23.8\" cy=\"-18.0\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"-26.0\" cy=\"-15.0\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"-29.6\" cy=\"-16.1\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"-29.6\" cy=\"-19.9\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"-26.0\" cy=\"-21.0\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"-27.0\" cy=\"-18.0\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"-17.1\" cy=\"-13.2\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"-19.3\" cy=\"-10.1\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"-22.8\" cy=\"-11.3\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"-22.8\" cy=\"-15.1\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"-19.3\" cy=\"-16.2\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"-20.2\" cy=\"-13.2\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"-10.3\" cy=\"-9.8\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"-12.5\" cy=\"-6.7\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"-16.1\" cy=\"-7.9\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"-16.1\" cy=\"-11.6\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"-12.5\" cy=\"-12.8\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"-13.5\" cy=\"-9.8\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"-3.5\" cy=\"-7.7\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"-5.8\" cy=\"-4.6\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"-9.3\" cy=\"-5.8\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"-9.3\" cy=\"-9.6\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"-5.8\" cy=\"-10.7\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"-6.8\" cy=\"-7.7\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"3.2\" cy=\"-7.0\" r=\"2.6\" fill=\"#34D399\"/><circle cx=\"1.0\" cy=\"-4.0\" r=\"2.6\" fill=\"#34D399\"/><circle cx=\"-2.6\" cy=\"-5.1\" r=\"2.6\" fill=\"#34D399\"/><circle cx=\"-2.6\" cy=\"-8.9\" r=\"2.6\" fill=\"#34D399\"/><circle cx=\"1.0\" cy=\"-10.0\" r=\"2.6\" fill=\"#34D399\"/><circle cx=\"0.0\" cy=\"-7.0\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"9.9\" cy=\"-7.7\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"7.7\" cy=\"-4.6\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"4.2\" cy=\"-5.8\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"4.2\" cy=\"-9.6\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"7.7\" cy=\"-10.7\" r=\"2.6\" fill=\"#F472B6\"/><circle cx=\"6.8\" cy=\"-7.7\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"16.7\" cy=\"-9.8\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"14.5\" cy=\"-6.7\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"10.9\" cy=\"-7.9\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"10.9\" cy=\"-11.6\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"14.5\" cy=\"-12.8\" r=\"2.6\" fill=\"#FACC15\"/><circle cx=\"13.5\" cy=\"-9.8\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"23.4\" cy=\"-13.2\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"21.2\" cy=\"-10.1\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"17.7\" cy=\"-11.3\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"17.7\" cy=\"-15.1\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"21.2\" cy=\"-16.2\" r=\"2.6\" fill=\"#FB923C\"/><circle cx=\"20.2\" cy=\"-13.2\" r=\"1.6\" fill=\"#FEF3C7\"/><circle cx=\"30.2\" cy=\"-18.0\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"28.0\" cy=\"-15.0\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"24.4\" cy=\"-16.1\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"24.4\" cy=\"-19.9\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"28.0\" cy=\"-21.0\" r=\"2.6\" fill=\"#A78BFA\"/><circle cx=\"27.0\" cy=\"-18.0\" r=\"1.6\" fill=\"#FEF3C7\"/></g>"},
 {"id": "sailor", "slot": "suit", "name": "Тельняшка", "price": 120, "svg": "<rect x=\"-40\" y=\"-20\" width=\"80\" height=\"24\" fill=\"#F8FAFC\"/><path d=\"M-40 -15 H40 M-40 -9 H40 M-40 -3 H40\" stroke=\"#1D4ED8\" stroke-width=\"3\"/><path d=\"M-40 -20 H40\" stroke=\"#1E3A8A\" stroke-width=\"2\"/>"},
 {"id": "tux", "slot": "suit", "name": "Смокинг", "price": 260, "svg": "<rect x=\"-40\" y=\"-21\" width=\"80\" height=\"25\" fill=\"#111827\"/><path d=\"M-11 -21 L0 1 L11 -21Z\" fill=\"#F8FAFC\"/><path d=\"M-11 -21 L-3 -6 L-15 -13Z M11 -21 L3 -6 L15 -13Z\" fill=\"#374151\"/><circle cx=\"0\" cy=\"-10\" r=\"1.3\" fill=\"#111827\"/><circle cx=\"0\" cy=\"-5\" r=\"1.3\" fill=\"#111827\"/><path d=\"M-24 -11 h6\" stroke=\"#F8FAFC\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>"},
 {"id": "hero", "slot": "suit", "name": "Костюм героя", "price": 240, "svg": "<rect x=\"-40\" y=\"-21\" width=\"80\" height=\"25\" fill=\"#2563EB\"/><rect x=\"-40\" y=\"-6\" width=\"80\" height=\"4.5\" fill=\"#FACC15\"/><rect x=\"-4\" y=\"-7\" width=\"8\" height=\"6.5\" rx=\"1.5\" fill=\"#EAB308\"/><path d=\"M-7 -19.5 H7 L5.5 -12.5 L0 -9.5 L-5.5 -12.5Z\" fill=\"#FACC15\" stroke=\"#DC2626\" stroke-width=\"1.3\" stroke-linejoin=\"round\"/><path d=\"M-4 -17.5 L-2.2 -12.8 L0 -15.5 L2.2 -12.8 L4 -17.5\" stroke=\"#DC2626\" stroke-width=\"1.4\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>"},
 {"id": "overalls", "slot": "suit", "name": "Комбинезон", "price": 150, "svg": "<path d=\"M-31 -27 L-12 -19 M31 -27 L12 -19\" stroke=\"#2563EB\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect x=\"-13\" y=\"-21\" width=\"26\" height=\"12\" rx=\"2\" fill=\"#3B82F6\"/><rect x=\"-40\" y=\"-11\" width=\"80\" height=\"15\" fill=\"#3B82F6\"/><circle cx=\"-9.5\" cy=\"-18\" r=\"1.7\" fill=\"#FACC15\"/><circle cx=\"9.5\" cy=\"-18\" r=\"1.7\" fill=\"#FACC15\"/><path d=\"M-7 -16 H7 V-11 H-7Z\" fill=\"none\" stroke=\"#93C5FD\" stroke-width=\"1\" stroke-dasharray=\"2 1.5\"/><path d=\"M-40 -11 H40\" stroke=\"#1D4ED8\" stroke-width=\"1.5\"/>"},
 {"id": "sweater", "slot": "suit", "name": "Свитер с узором", "price": 130, "svg": "<rect x=\"-40\" y=\"-21\" width=\"80\" height=\"25\" fill=\"#B91C1C\"/><path d=\"M-40 -14 l5 -4 5 4 5 -4 5 4 5 -4 5 4 5 -4 5 4 5 -4 5 4 5 -4 5 4 5 -4 5 4 5 -4 5 4\" stroke=\"#FEF2F2\" stroke-width=\"2\" fill=\"none\"/><g fill=\"#FEF2F2\"><circle cx=\"-14\" cy=\"-8\" r=\"1.5\"/><circle cx=\"0\" cy=\"-8\" r=\"1.5\"/><circle cx=\"14\" cy=\"-8\" r=\"1.5\"/></g><path d=\"M-40 -3 H40\" stroke=\"#7F1D1D\" stroke-width=\"3\"/>"},
 {"id": "jersey", "slot": "suit", "name": "Футболка №10", "price": 100, "svg": "<rect x=\"-40\" y=\"-21\" width=\"80\" height=\"25\" fill=\"#16A34A\"/><path d=\"M-9 -21 L0 -13 L9 -21\" stroke=\"#F8FAFC\" stroke-width=\"3\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"0\" y=\"-1.5\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#F8FAFC\" font-family=\"Onest,Arial,sans-serif\">10</text>"},
 {"id": "labcoat", "slot": "suit", "name": "Халат учёного", "price": 140, "svg": "<rect x=\"-40\" y=\"-21\" width=\"80\" height=\"25\" fill=\"#F8FAFC\"/><path d=\"M-8 -21 L0 -9 L8 -21\" fill=\"#93C5FD\"/><path d=\"M-12 -21 L-2 -4 M12 -21 L2 -4\" stroke=\"#CBD5E1\" stroke-width=\"2\"/><path d=\"M0 -4 V4\" stroke=\"#CBD5E1\" stroke-width=\"1.6\"/><rect x=\"13\" y=\"-13\" width=\"9\" height=\"8\" rx=\"1\" fill=\"none\" stroke=\"#CBD5E1\" stroke-width=\"1.4\"/><path d=\"M15.5 -16 V-11 M19 -15 V-11\" stroke=\"#EF4444\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><path d=\"M19 -15 V-11\" stroke=\"#2563EB\" stroke-width=\"1.6\" stroke-linecap=\"round\"/>"},
 {"id": "raincoat", "slot": "suit", "name": "Дождевик", "price": 110, "svg": "<rect x=\"-40\" y=\"-21\" width=\"80\" height=\"25\" fill=\"#FACC15\"/><path d=\"M0 -21 V4\" stroke=\"#CA8A04\" stroke-width=\"1.6\"/><g fill=\"#CA8A04\"><circle cx=\"-3.5\" cy=\"-14\" r=\"1.4\"/><circle cx=\"-3.5\" cy=\"-7\" r=\"1.4\"/><circle cx=\"-3.5\" cy=\"0\" r=\"1.4\"/></g><path d=\"M-40 -20 Q-20 -16 0 -21 Q20 -16 40 -20\" stroke=\"#EAB308\" stroke-width=\"2.5\" fill=\"none\"/>"},
 {"id": "cape", "slot": "back", "name": "Плащ героя", "price": 200, "svg": "<g class=\"swing\" data-px=\"0\" data-py=\"-42\" data-k=\".6\"><path d=\"M-30 -44 Q-48 -10 -42 15 Q0 24 42 15 Q48 -10 30 -44Z\" fill=\"#DC2626\"/><path d=\"M-42 15 Q0 24 42 15\" stroke=\"#991B1B\" stroke-width=\"2.4\" fill=\"none\"/></g>"},
 {"id": "wings", "slot": "back", "name": "Крылья ангела", "price": 260, "svg": "<g class=\"flap\" data-px=\"-24\" data-py=\"-42\" data-s=\"-1\"><path d=\"M-24 -42 C-44 -64 -66 -64 -72 -52 C-66 -50 -64 -46 -66 -42 C-60 -41 -58 -37 -60 -33 C-54 -33 -50 -29 -52 -25 C-44 -26 -34 -30 -24 -34Z\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/></g><g class=\"flap\" data-px=\"24\" data-py=\"-42\" data-s=\"1\"><path d=\"M24 -42 C44 -64 66 -64 72 -52 C66 -50 64 -46 66 -42 C60 -41 58 -37 60 -33 C54 -33 50 -29 52 -25 C44 -26 34 -30 24 -34Z\" fill=\"#F8FAFC\" stroke=\"#CBD5E1\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/></g>"},
 {"id": "butterfly", "slot": "back", "name": "Крылья бабочки", "price": 180, "svg": "<g class=\"flap\" data-px=\"-22\" data-py=\"-38\" data-s=\"-1\"><path d=\"M-22 -40 C-40 -72 -70 -66 -64 -46 C-60 -36 -40 -36 -22 -38Z\" fill=\"#A855F7\"/><path d=\"M-22 -34 C-44 -34 -62 -26 -54 -14 C-46 -6 -32 -18 -22 -30Z\" fill=\"#EC4899\"/><circle cx=\"-50\" cy=\"-52\" r=\"5\" fill=\"#F5D0FE\"/><circle cx=\"-44\" cy=\"-20\" r=\"3.5\" fill=\"#FBCFE8\"/></g><g class=\"flap\" data-px=\"22\" data-py=\"-38\" data-s=\"1\"><path d=\"M22 -40 C40 -72 70 -66 64 -46 C60 -36 40 -36 22 -38Z\" fill=\"#A855F7\"/><path d=\"M22 -34 C44 -34 62 -26 54 -14 C46 -6 32 -18 22 -30Z\" fill=\"#EC4899\"/><circle cx=\"50\" cy=\"-52\" r=\"5\" fill=\"#F5D0FE\"/><circle cx=\"44\" cy=\"-20\" r=\"3.5\" fill=\"#FBCFE8\"/></g>"},
 {"id": "dragon", "slot": "back", "name": "Крылья дракончика", "price": 220, "svg": "<g class=\"flap\" data-px=\"-24\" data-py=\"-44\" data-s=\"-1\"><path d=\"M-24 -44 L-50 -70 L-56 -60 Q-66 -58 -70 -46 Q-60 -48 -58 -40 Q-50 -42 -48 -34 Q-38 -36 -26 -32Z\" fill=\"#7C3AED\"/><path d=\"M-50 -70 L-48 -38 M-56 -60 L-38 -36\" stroke=\"#5B21B6\" stroke-width=\"1.6\" fill=\"none\"/></g><g class=\"flap\" data-px=\"24\" data-py=\"-44\" data-s=\"1\"><path d=\"M24 -44 L50 -70 L56 -60 Q66 -58 70 -46 Q60 -48 58 -40 Q50 -42 48 -34 Q38 -36 26 -32Z\" fill=\"#7C3AED\"/><path d=\"M50 -70 L48 -38 M56 -60 L38 -36\" stroke=\"#5B21B6\" stroke-width=\"1.6\" fill=\"none\"/></g>"}
);

/* ================= WORDY ENGINE v2 =================
   Physics + behaviour + rendering of the mascot, outside React.
   - Surfaces: any element with [data-perch="name"]; Wordy stands on its top edge.
   - Walk: acceleration-limited velocity, planted feet that step when they lag, weight shift per step.
   - Sit: spring on hip height (overshoot = "plop"), legs blend into pendulum swing over the edge.
   - Jump: crouch + lean back, ballistic arc, legs tuck at apex and reach before landing, squash + dust.
   - Life: jelly body and noodle arms driven by real acceleration, head turn, blinking, talking mouth,
     idle actions (look around, stretch/yawn, foot tap, bounce, humming), curiosity toward the cursor.
*/
window.Wordy = (function(){
  const G = 2000;
  const f = n => (+n).toFixed(2);
  const clamp=(v,a,b)=>v<a?a:v>b?b:v, mix=(a,b,t)=>a+(b-a)*t, rnd=(a,b)=>a+Math.random()*(b-a), pick=a=>a[Math.floor(Math.random()*a.length)];
  const smooth=(a,b,x)=>{ x=clamp((x-a)/(b-a),0,1); return x*x*(3-2*x); };
  let RM=false;
  try{ const m=matchMedia('(prefers-reduced-motion: reduce)'); RM=m.matches; m.addEventListener && m.addEventListener('change',e=>{RM=e.matches}); }catch(e){}

  const BODY='#FF7A12', SHADE='#E5600A', DARK='#24130A';
  const layer=document.getElementById('wordy-layer');
  layer.innerHTML = `<div id="w-bubble" class="w-bubble" role="status" aria-live="polite"></div>
<div id="w-dust">${'<i></i>'.repeat(14)}</div>
<div id="w-root" style="opacity:0"><svg viewBox="-80 -150 160 190" width="160" height="190">
<defs><clipPath id="w-clip"><ellipse cx="0" cy="-34" rx="38" ry="34"/></clipPath></defs>
<ellipse id="w-shadow" cx="0" cy="1.5" rx="25" ry="4.2" fill="#5a2a08" opacity=".16"/>
<g id="w-back"></g>
<g stroke="${BODY}" stroke-width="15" stroke-linecap="round" fill="none"><path id="w-legL" d="M0 0"/><path id="w-legR" d="M0 0"/></g>
<ellipse id="w-footL" rx="10" ry="6" fill="${BODY}"/><ellipse id="w-footR" rx="10" ry="6" fill="${BODY}"/>
<g id="w-body">
 <g stroke="${BODY}" stroke-width="10.5" stroke-linecap="round" fill="none"><path id="w-armL" d="M0 0"/><path id="w-armR" d="M0 0"/></g>
 <circle id="w-handL" r="6.2" fill="${BODY}"/><circle id="w-handR" r="6.2" fill="${BODY}"/>
 <ellipse cx="0" cy="-34" rx="38" ry="34" fill="${BODY}"/>
 <path d="M-33.5 -18 A38 34 0 0 0 33.5 -18 A46 40 0 0 1 -33.5 -18Z" fill="${SHADE}" opacity=".32"/>
 <g id="w-suit" clip-path="url(#w-clip)"></g>
 <path id="w-sshade" d="M-33.5 -18 A38 34 0 0 0 33.5 -18 A46 40 0 0 1 -33.5 -18Z" fill="#000" opacity=".16" display="none"/>
 <g id="w-face">
  <g id="w-eyeL"><ellipse rx="7.4" ry="10.2" fill="#fff"/><ellipse id="w-pupL" rx="5.6" ry="8" fill="${DARK}"/><circle id="w-hlL" r="2.1" fill="#fff"/></g>
  <g id="w-eyeR"><ellipse rx="7.4" ry="10.2" fill="#fff"/><ellipse id="w-pupR" rx="5.6" ry="8" fill="${DARK}"/><circle id="w-hlR" r="2.1" fill="#fff"/></g>
  <g id="w-closed" stroke="${DARK}" stroke-width="2.8" fill="none" stroke-linecap="round" opacity="0"><path d="M-17 -43 Q-10.5 -38 -4 -43"/><path d="M4 -43 Q10.5 -38 17 -43"/></g>
  <g id="w-joy" stroke="${DARK}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0"><path d="M-17 -41 Q-10.5 -50 -4 -41"/><path d="M4 -41 Q10.5 -50 17 -41"/></g>
  <g fill="none" stroke="#A9440A" stroke-width="2.6" stroke-linecap="round" id="w-brows" opacity="0"><path id="w-browL" d="M0 0"/><path id="w-browR" d="M0 0"/></g>
  <g id="w-cheeks"></g>
  <path id="w-mouth" fill="#4A1E0C" stroke="#4A1E0C" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" d="M0 0"/>
  <g id="w-mouthacc"></g>
  <g id="w-faceacc"></g>
 </g>
 <g id="w-neck"></g>
 <g id="w-hat"></g>
 <ellipse id="w-hit" cx="0" cy="-34" rx="42" ry="38" fill="transparent"><title>Ворди</title></ellipse>
</g>
<g id="w-zz" fill="#C25507" font-family="'Baloo 2',sans-serif" font-weight="800"><text>z</text><text>z</text><text>z</text></g>
</svg></div>`;
  const $=id=>document.getElementById(id);
  const N={root:$('w-root'),bubble:$('w-bubble'),body:$('w-body'),face:$('w-face'),legL:$('w-legL'),legR:$('w-legR'),footL:$('w-footL'),footR:$('w-footR'),shadow:$('w-shadow'),
    armL:$('w-armL'),armR:$('w-armR'),handL:$('w-handL'),handR:$('w-handR'),eyeL:$('w-eyeL'),eyeR:$('w-eyeR'),pupL:$('w-pupL'),pupR:$('w-pupR'),hlL:$('w-hlL'),hlR:$('w-hlR'),
    closed:$('w-closed'),joy:$('w-joy'),brows:$('w-brows'),browL:$('w-browL'),browR:$('w-browR'),mouth:$('w-mouth'),hit:$('w-hit'),hat:$('w-hat'),faceacc:$('w-faceacc'),neck:$('w-neck'),back:$('w-back'),suit:$('w-suit'),sshade:$('w-sshade'),cheeks:$('w-cheeks'),mouthacc:$('w-mouthacc'),zz:[...$('w-zz').children],dust:[...$('w-dust').children]};

  // mouth = {w: half-width, a: upper-lip dip, b: lower-lip dip}; a===b draws a line, b>a opens it
  const MOUTH={neutral:{w:5.5,a:2.6,b:2.6},happy:{w:7.5,a:1,b:7.5},joy:{w:8.5,a:.6,b:10},sad:{w:5,a:-2.6,b:-2.6},
    surprised:{w:3.2,a:-4,b:4},dizzy:{w:4.6,a:-1.6,b:3.4},love:{w:7,a:.8,b:6},sleepy:{w:3,a:.8,b:.8},think:{w:4,a:-.8,b:-.8},yawn:{w:4.5,a:-5,b:6.5}};
  const BROW={sad:['M-15 -56 Q-10 -57 -5 -61','M15 -56 Q10 -57 5 -61'],surprised:['M-15 -60 Q-10 -63.5 -5 -60','M15 -60 Q10 -63.5 5 -60'],
    think:['M-15 -59 Q-10 -62.5 -5 -59.5','M15 -57 L5 -57']};

  const snd=(n,a)=>{ try{ window.Sfx&&window.Sfx[n](a); }catch(e){} };
  const HOME={surface:'home',anchor:true};
  const S={started:false,x:-200,y:0,vx:0,vy:0,mode:'ground',surface:'home',local:-70,goal:HOME,wander:null,wanderT:rnd(16,24),nudge:null,
    pending:null,crouch:0,crouchDir:0,air:null,hops:0,hopDelay:0,hopApex:30,
    s:1,sv:0,h:0,hv:0,sitTarget:0,plopped:false,atGoalT:0,lean:0,leanV:0,tilt:0,shake:0,
    jx:0,jxv:0,jy:0,jyv:0,bpx:null,bpy:0,bvx:0,bvy:0,ax:0,ay:0,shift:0,
    hands:[{x:-43,y:-18,vx:0,vy:0},{x:43,y:-18,vx:0,vy:0}],armPose:null,armPoseUntil:0,phase:0,
    feet:[{lx:-13,ly:0,step:null,end:0},{lx:13,ly:0,step:null,end:0}],fr:[{x:-13,y:0},{x:13,y:0}],bob:0,hipY:-24,swingAmp:0,swingT:0,swingBoost:1,
    emotion:'neutral',emoUntil:0,emoNext:null,shownEmo:'',mouth:{w:5.5,a:2.6,b:2.6},open:1,blinkT:rnd(1.5,4),blinkP:-1,pupil:1,
    lookX:0,lookY:0,lookOverride:null,glance:{x:0,y:0,until:0},pointer:{x:0,y:0,t:-99},curious:0,
    idle:0,sleeping:false,t:0,greeted:false,dodgeCD:0,dodgeCheck:0,dodgedOnce:false,clicks:[],
    cfg:{sleep:true,talk:true},K:(innerWidth<520?.78:1),lastSay:-99,hatAng:0,hatV:0,lift:0,liftV:0,dang:0,dangV:0,tail:0,tailV:0,wob:0,wobV:0,acc:[],sitSeq:null,wig:0,prevH:0,shadowO:.16,bubbleUntil:0,talkUntil:0,act:null,actT:rnd(5,9),dust:[],pets:0,petCD:0,pressT:null,hugged:false,taps:[],dizzyUntil:0,okRun:0,badRun:0,hiddenAt:0,scrollY:0,scrollT:0,sayCD:{}};

  // ---------- surfaces ----------
  function surf(name){
    const e=document.querySelector('[data-perch="'+name+'"]'); if(!e) return null;
    const r=e.getBoundingClientRect(); if(r.width<40||r.height<4) return null;
    return {left:r.left,right:r.right,top:r.top,width:r.width};
  }
  function onScreen(name,sf){
    if(name==='home') return true;
    const h=surf('home'); const bottom=h? h.top-40 : innerHeight-110;
    return sf.top>96 && sf.top<bottom && sf.right>60 && sf.left<innerWidth-60;
  }
  function anchorLocal(sf){
    const a=document.querySelector('[data-home-anchor]');
    if(a){ const r=a.getBoundingClientRect(); return clamp(r.left+r.width/2-sf.left,30,sf.width-30); }
    return sf.width-50;
  }
  function goalLocal(sf,g){
    if(g.localAbs!=null) return clamp(g.localAbs,30,sf.width-30);
    if(g.anchor) return anchorLocal(sf);
    return clamp((g.frac==null?.5:g.frac)*sf.width,36,sf.width-36);
  }
  function currentGoal(){
    if(S.nudge){ if(S.t<S.nudge.until && S.nudge.surface===S.surface) return {surface:S.surface,localAbs:S.nudge.local}; S.nudge=null; }
    return S.wander || S.goal;
  }

  // ---------- helpers ----------
  function emote(name,dur,next){ S.emotion=name; S.emoUntil=S.t+dur; S.emoNext=next||null; }
  function arm(pose,dur){ S.armPose=pose; S.armPoseUntil=S.t+dur; }
  function hop(apex){ if(S.mode!=='ground'||S.pending) return; S.hopApex=apex; S.pending={surface:S.surface,local:S.local,apex}; }
  function say(text,ms,important){
    if(!S.cfg.talk||!text) return;
    if(!important && (S.t-S.lastSay<14 || Math.random()>.4)) return;
    S.lastSay=S.t;
    N.bubble.textContent=text; N.bubble.classList.add('show');
    S.bubbleUntil=S.t+(ms?ms/1000:2.2+text.length*.045);
    S.talkUntil=S.t+Math.min(2.6,.3+text.length*.05); S.babbleUntil=S.talkUntil;
  }
  function spawnDust(n,power){
    if(RM) return;
    for(let k=0;k<n;k++){
      const side=k%2?1:-1;
      S.dust.push({x:S.x+side*rnd(6,16),y:S.y-2,vx:side*rnd(50,130)*power,vy:-rnd(15,45)*power,life:rnd(.35,.6),age:0,r:rnd(3,5.5)*(.6+.4*power)});
    }
    while(S.dust.length>N.dust.length) S.dust.shift();
  }
  function plantFeet(){ S.feet.forEach((ft,i)=>{ ft.lx=S.local+(i?13:-13); ft.ly=0; ft.step=null; ft.end=S.t; }); }
  function teleport(surface,local){
    const sf=surf(surface); if(!sf) return;
    S.mode='ground'; S.air=null; S.surface=surface; S.local=clamp(local,10,sf.width-10); S.vx=0; S.pending=null; S.crouch=0; plantFeet();
  }
  function launch(surface,local,apex){
    const ts=surf(surface); if(!ts) return;
    if(RM){ teleport(surface,local); return; }
    const tx=ts.left+local, ty=ts.top, sx=S.x, sy=S.y;
    const top=Math.min(sy,ty)-(apex||46);
    const vy0=-Math.sqrt(2*G*Math.max(1,sy-top));
    const T=(-vy0/G)+Math.sqrt(2*Math.max(1,ty-top)/G);
    S.air={sx,sy,tx0:tx,ty0:ty,vx:(tx-sx)/T,vy0,T,t:0,surface,local};
    S.mode='air'; S.sv+=3.6; S.sitTarget=0; S.atGoalT=0; S.act=null; snd((apex||46)>38?'jump':'hop');
  }
  function land(ts){
    const a=S.air; S.air=null; S.mode='ground';
    if(ts){ S.surface=a.surface; S.local=clamp(a.local,10,ts.width-10); }
    else { const h=surf('home'); S.surface='home'; S.local=h?anchorLocal(h):100; }
    const impact=clamp(S.vy/700,.4,1.6); snd('land',impact);
    S.sv-=2.4+impact*2.6; S.vx*=.12; S.vy=0;
    plantFeet(); S.x=(ts?ts.left:S.x)+S.local; spawnDust(Math.round(4+impact*3),impact);
    if(S.hops>0) S.hopDelay=.1;
  }

  // ---------- simulation ----------
  function ground(dt){
    const sf=surf(S.surface);
    if(!sf || !onScreen(S.surface,sf)){
      if(S.surface!=='home'){ const h=surf('home'); if(h){ S.pending=null; S.crouch=0; S.h=0; S.hv=0; launch('home',anchorLocal(h),40); return true; } }
      return false;
    }
    // the surface itself moving (scroll, mobile address bar, resize) must not shake the body: move the inertia frame with it
    if(S.sfName===S.surface&&S.sfTop!=null&&S.bpx!=null){ S.bpx+=sf.left-S.sfLeft; S.bpy+=sf.top-S.sfTop; }
    S.sfName=S.surface; S.sfTop=sf.top; S.sfLeft=sf.left;
    S.x=sf.left+S.local; S.y=sf.top;

    if(S.hops>0 && !S.pending && S.crouch===0){ S.hopDelay-=dt; if(S.hopDelay<=0){ S.hops--; S.pending={surface:S.surface,local:S.local,apex:S.hopApex}; } }

    let g=currentGoal(), gs=g.surface===S.surface?sf:surf(g.surface);
    if(!gs || !onScreen(g.surface,gs)){ g=HOME; gs=S.surface==='home'?sf:surf('home'); }
    let target, jump=null;
    if(g.surface===S.surface) target=goalLocal(sf,g);
    else { const gl=goalLocal(gs,g); target=clamp(gs.left+gl-sf.left,30,sf.width-30); if(Math.abs(target-S.local)<12) jump={surface:g.surface,local:gl,apex:46}; }

    const dx=target-S.local;
    const wantsMove=Math.abs(dx)>3 || !!jump || !!S.pending;
    if(wantsMove){ S.sitTarget=0; S.atGoalT=0; S.sitSeq=null; if(S.act&&!S.act.lock&&Math.abs(dx)>3) S.act=null; }
    const locked=S.act&&S.act.lock; if(locked){ S.vx*=Math.exp(-dt*12); }
    const canMove=S.h<.25 && S.crouch===0 && !locked;
    const fast=g.fast&&g.surface===S.surface, maxV=fast?1200:Math.abs(dx)>220?170:110;
    const desired=canMove&&Math.abs(dx)>1.5?clamp(dx*(fast?14:3),-maxV,maxV):0;
    S.vx+=clamp(desired-S.vx,-(fast?7000:650)*dt,(fast?7000:650)*dt);
    if(RM && canMove){ S.local=target; S.vx=0; } else S.local+=S.vx*dt;

    if(jump && !S.pending && S.crouch===0) S.pending=jump;
    if(S.pending && canMove && Math.abs(S.vx)<60 && S.crouch===0){
      if(RM){ const p=S.pending; S.pending=null; if(p.surface!==S.surface) teleport(p.surface,p.local); return true; }
      S.crouch=1e-4; const ps=surf(S.pending.surface);
      S.crouchDir=ps?Math.sign(ps.left+S.pending.local-S.x):0;
    }
    if(S.crouch>0){
      S.vx*=Math.exp(-dt*14); S.crouch+=dt;
      if(S.crouch>.21){ const p=S.pending; S.pending=null; S.crouch=0; if(p) launch(p.surface,p.local,p.apex); return true; }
    }
    if(!wantsMove && Math.abs(S.vx)<6){ S.atGoalT+=dt; arrived(g,dt); }
    feetGround(dt);
    return true;
  }
  function arrived(g,dt){
    const looking=S.wander && g===S.wander && S.wander.look<1.8;
    if(S.atGoalT>1.1 && S.hops===0 && !S.pending && !looking && !(S.act&&(S.act.type==='tap'||S.act.lock||S.act.type==='fly')) && S.sitTarget===0 && !S.sitSeq){ S.sitSeq={t:0,side:Math.random()<.5?-1:1}; S.act=null; }
    if(!S.greeted && S.surface==='home' && S.atGoalT>.3){
      S.greeted=true; snd('hi'); emote('happy',2.2); arm('wave',2); say('Привет! Я Ворди. Давай учить слова!',3200,true);
    }
    if(S.wander && g===S.wander){
      S.wander.look+=dt;
      if(S.wander.look<1.8){ const k=S.wander.look<.9?-1:1; S.lookOverride={x:S.x+k*260,y:S.y-40,until:S.t+.1}; }
      if(S.wander.look>S.wander.dur){ S.wander=null; S.wanderT=rnd(18,32); }
    }
  }
  function feetGround(dt){
    const fast=Math.abs(S.vx); let bob=0, shift=0;
    for(let i=0;i<2;i++){
      const ft=S.feet[i], o=S.feet[1-i], off=i?13:-13;
      const lead=clamp(S.vx*.06,-7,7), rest=S.local+off+lead;
      if(RM){ ft.lx=rest; ft.ly=0; ft.step=null; continue; }
      if(ft.step){
        const st=ft.step; st.t+=dt; const p=Math.min(1,st.t/st.dur);
        const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
        st.to=rest+clamp(S.vx*.05,-5,5);
        ft.lx=mix(st.from,st.to,e); ft.ly=-Math.sin(Math.PI*p)*st.h;
        bob=Math.max(bob,Math.sin(Math.PI*p)*2);
        shift=-(i?1:-1)*2.2*Math.sin(Math.PI*p);
        if(p>=1){ ft.step=null; ft.ly=0; ft.end=S.t; S.sv-=.55; }
      } else if(S.act && S.act.type==='tap' && i===1 && S.h<.2){
        const tp=S.act.t; ft.ly=tp>.15&&tp<1.15?-Math.max(0,Math.sin((tp-.15)*Math.PI*3))*5:0;
      } else if(S.h<.25 && S.crouch===0){
        const err=Math.abs(ft.lx-rest), oerr=Math.abs(o.lx-(S.local-off+lead));
        const thr=fast>25?6:2.5, free=!o.step && S.t-o.end>.02;
        if((free && err>thr && err>=oerr-.01) || err>20) ft.step={from:ft.lx,to:rest,t:0,dur:clamp(.2-fast/900,.1,.2),h:3.5+Math.min(fast*.025,4.5)};
      }
    }
    S.bob=bob; S.shift=mix(S.shift,shift,1-Math.exp(-dt*14));
  }
  function air(dt){
    const a=S.air; a.t+=dt; const t=Math.min(a.t,a.T);
    let x=a.sx+a.vx*t, y=a.sy+a.vy0*t+.5*G*t*t;
    const ts=surf(a.surface);
    if(ts){ const k=t/a.T; x+=(ts.left+a.local-a.tx0)*k; y+=(ts.top-a.ty0)*k; }
    S.vy=a.vy0+G*t; S.x=x; S.y=y; S.vx=a.vx;
    const rem=a.T-a.t;
    const fy=rem<.14?1:(S.vy<-280?0:-7), spread=rem<.14?13:10;
    const k=1-Math.exp(-dt*16);
    S.fr.forEach((p,i)=>{ p.x=mix(p.x,(i?1:-1)*spread,k); p.y=mix(p.y,fy,k); });
    S.shift=mix(S.shift,0,k);
    if(a.t>=a.T) land(ts);
  }
  function common(dt){
    if(S.emoUntil && S.t>S.emoUntil){ const n=S.emoNext; S.emoNext=null; S.emoUntil=0; S.emotion=S.sleeping?'sleepy':'neutral'; if(n) n(); }
    // real acceleration of the hips in screen space drives jelly + arm inertia
    const bx=S.x, by=S.y+S.hipY;
    if(S.bpx==null){ S.bpx=bx; S.bpy=by; }
    const nvx=(bx-S.bpx)/dt, nvy=(by-S.bpy)/dt; S.bpx=bx; S.bpy=by;
    S.ax=clamp((nvx-S.bvx)/dt,-5000,5000); S.ay=clamp((nvy-S.bvy)/dt,-5000,5000); S.bvx=nvx; S.bvy=nvy;
    // squash & stretch
    let sT=1;
    if(S.crouch>0) sT=.74;
    else if(S.sitSeq&&S.sitSeq.t>.32&&S.sitSeq.t<.6) sT=.84;
    else if(S.mode==='air') sT=1+clamp(-S.vy/2200,-.07,.13);
    else if(S.act&&S.act.type==='stretch'&&S.act.t>.25&&S.act.t<1.25) sT=1.1;
    else if(S.emotion==='sad') sT=.94;
    S.sv+=(500*(sT-S.s)-15*S.sv)*dt; S.s=clamp(S.s+S.sv*dt,.6,1.35);
    // sitting: spring with a little overshoot = plop
    S.hv+=((S.sitTarget?125:135)*(S.sitTarget-S.h)-(S.sitTarget?11:14)*S.hv)*dt; S.h=clamp(S.h+S.hv*dt,-.15,1.12);
    if(S.sitSeq){
      const q=S.sitSeq; q.t+=dt;
      if(q.t<.55) S.lookOverride={x:S.x+q.side*30,y:S.y+90,until:S.t+.1};
      if(q.t>=.55 && S.sitTarget===0) S.sitTarget=1;
      if(q.t>1.1 && !q.settled){ q.settled=true; S.wig=.5; }
      if(q.t>1.45 && !q.sighed){ q.sighed=true; if(S.emotion==='neutral') emote('happy',1); }
      if(q.t>1.8) S.sitSeq=null;
    }
    if(S.sitTarget===0 && S.prevH>=.5 && S.h<.5){ S.sv+=2; }
    S.prevH=S.h;
    if(RM){ S.h=S.sitTarget; S.hv=0; }
    if(S.sitTarget===1 && !S.plopped && S.h>.92){ S.plopped=true; S.sv-=2.4; snd('plop'); spawnDust(3,.5); }
    if(S.sitTarget===0) S.plopped=false;
    // jelly body
    S.jxv+=(-170*S.jx-11*S.jxv-S.ax*.55)*dt; S.jx=clamp(S.jx+S.jxv*dt,-8,8);
    S.jyv+=(-210*S.jy-12*S.jyv-S.ay*.22)*dt; S.jy=clamp(S.jy+S.jyv*dt,-6,6);
    // accessories: hat lags behind body acceleration, pompoms/tassels dangle, scarf tail trails in the wind
    { const hT=clamp(-S.ax*.006,-14,14)+(S.sleeping?10:0);
      S.hatV+=(150*(hT-S.hatAng)-9*S.hatV)*dt; S.hatAng=clamp(S.hatAng+S.hatV*dt,-28,28);
      S.liftV+=(-S.ay*.05-320*S.lift-13*S.liftV)*dt; S.lift=clamp(S.lift+S.liftV*dt,-12,6);
      const walkF=Math.abs(S.vx)>20?Math.sin(S.t*11)*Math.min(1,Math.abs(S.vx)/150)*14:0;
      S.dangV+=(-S.ax*.03-S.ay*.0+(walkF-S.dang)*40-4*S.dangV)*dt; S.dang=clamp(S.dang+S.dangV*dt,-55,55);
      const tT=clamp(S.vx*.22,-55,55)+(Math.abs(S.vx)>20?Math.sin(S.t*15)*7:Math.sin(S.t*1.6)*2);
      S.tailV+=(60*(tT-S.tail)-5*S.tailV-S.ax*.02)*dt; S.tail=clamp(S.tail+S.tailV*dt,-70,70);
      S.wobV+=(-S.ax*.01-120*S.wob-7*S.wobV)*dt; S.wob=clamp(S.wob+S.wobV*dt,-25,25); }
    // lean
    let lT=S.mode==='air'?clamp(S.vx*.02,-8,8):clamp(S.vx*.045,-7,7);
    if(S.crouch>0) lT=-S.crouchDir*6;
    if(S.shake>0){ S.shake-=dt; lT+=Math.sin(S.t*20)*7*Math.min(1,S.shake*2); }
    if(S.wig>0){ S.wig-=dt; lT+=Math.sin(S.t*12)*9*S.wig; S.jxv+=Math.sin(S.t*12)*30*S.wig*dt*60; }
    lT+=S.tilt+(S.fxLean||0);
    S.leanV+=(200*(lT-S.lean)-16*S.leanV)*dt; S.lean+=S.leanV*dt;
    // arms (noodle arms on springs)
    const walking=Math.abs(S.vx)>15&&S.mode==='ground';
    if(walking) S.phase+=Math.abs(S.vx)*dt/15;
    const pose=S.t<S.armPoseUntil?S.armPose:null;
    for(let i=0;i<2;i++){
      const side=i?1:-1, hd=S.hands[i];
      let ang=24+Math.sin(S.t*1.6+i*1.3)*6+Math.sin(S.t*.7+i)*4, len=24+Math.sin(S.t*2.2+i)*1.5;
      if(walking) ang=26+Math.sin(S.phase+(i?Math.PI:0))*Math.min(34,10+Math.abs(S.vx)*.15);
      if(S.emotion==='happy') ang+=14+Math.sin(S.t*9+i*3)*8;
      if(S.t<S.talkUntil && S.mode==='ground' && !walking) ang+=(i?1:.55)*(26+Math.sin(S.t*6.5+i*2.1)*24);
      if(S.mode==='air') ang=S.vy<0?150:95;
      if(S.crouch>0){ ang=48; len=26; }
      if(S.h>.5){ ang=mix(ang,56+Math.sin(S.swingT*.5+i*1.7)*10,smooth(.5,1,S.h)); len=22; }
      if(S.sitSeq&&S.sitSeq.t>.15&&S.sitSeq.t<.95){ ang=mix(ang,6,smooth(.15,.45,S.sitSeq.t)); len=29; }
      if(S.sitTarget===0&&S.h>.3&&S.mode==='ground'){ ang=5; len=30; }
      if(S.emotion==='sad'){ ang=7; len=25; }
      if(S.sleeping){ ang=14; }
      if(S.curious>.5 && !walking && S.mode==='ground' && i===(S.pointer.x>S.x?1:0)) ang+=18*S.curious;
      if(pose==='aim'&&S.aimAt){ const sd=S.aimAt.x>S.x?1:-1; if(side===sd){ const dx=S.aimAt.x-(S.x+side*33*S.K), dy=S.aimAt.y-(S.y-40*S.K); ang=clamp(Math.atan2(side*dx,dy)*180/Math.PI,20,178); len=30; } }
      if(pose==='up'){ ang=162+Math.sin(S.t*10+i*2)*10; len=26; }
      if(pose==='flap'){ ang=95+Math.sin(S.t*17+(i?0:.4))*38; len=25; }
      if(pose==='stretch'){ ang=172; len=28; }
      if(pose==='wave' && i===1){ ang=148+Math.sin(S.t*12)*26; len=25; }
      if(pose==='wave' && i===0){ ang=20; }
      const r=ang*Math.PI/180, sx=side*33, sy=-40;
      const tx=sx+side*Math.sin(r)*len, ty=sy+Math.cos(r)*len;
      hd.vx+=(260*(tx-hd.x)-15*hd.vx-S.ax*.32)*dt; hd.vy+=(260*(ty-hd.y)-15*hd.vy-S.ay*.32)*dt;
      hd.x+=hd.vx*dt; hd.y+=hd.vy*dt;
      const dx=hd.x-sx, dy=hd.y-sy, d=Math.hypot(dx,dy), maxL=len*1.3;
      if(d>maxL){ hd.x=sx+dx/d*maxL; hd.y=sy+dy/d*maxL; }
    }
    // blink & eye openness
    S.blinkT-=dt; let blinkV=0;
    if(S.blinkT<=0 && S.blinkP<0) S.blinkP=0;
    if(S.blinkP>=0){ S.blinkP+=dt/.14; blinkV=S.blinkP<.5?S.blinkP*2:2-S.blinkP*2; if(S.blinkP>=1){ S.blinkP=-1; S.blinkT=Math.random()<.2?.15:rnd(2,5); } }
    const oT=S.sleeping?.05:S.emotion==='yawn'?.15:S.emotion==='sleepy'?.5:S.emotion==='sad'?.8:S.emotion==='surprised'?1.12:1;
    S.open=mix(S.open,oT,1-Math.exp(-dt*(S.sleeping?3:14)));
    S.eye=Math.max(.04,S.open*(1-blinkV*.96));
    // gaze, head turn, curiosity
    let tx=null,ty=null; const ex=S.x, ey=S.y+(S.hipY+6-44*S.s)*S.K;
    const ptrFresh=S.t-S.pointer.t<4;
    if(S.lookOverride && S.t<S.lookOverride.until){ tx=S.lookOverride.x; ty=S.lookOverride.y; }
    else if(ptrFresh){ tx=S.pointer.x; ty=S.pointer.y; }
    const pd=ptrFresh?Math.hypot(S.pointer.x-ex,S.pointer.y-ey):999;
    S.curious=mix(S.curious,pd<170&&!S.sleeping?1:0,1-Math.exp(-dt*4));
    let lx=0,ly=0;
    if(tx!=null && !S.sleeping){
      const vx=tx-ex, vy=ty-ey, d=Math.hypot(vx,vy)||1, m=Math.min(3.4,d/25);
      lx=vx/d*m; ly=vy/d*m*.9;
      S.tilt=walking?0:clamp(vx/140,-1,1)*(2+4*S.curious);
    } else {
      S.tilt=S.sleeping?5:0;
      if(walking){ lx=Math.sign(S.vx)*2.8; ly=.4; }
      else { if(S.t>S.glance.until){ S.glance=Math.random()<.4?{x:0,y:0}:{x:rnd(-3,3),y:rnd(-2.2,1.5)}; S.glance.until=S.t+rnd(1.2,3.5); } lx=S.glance.x; ly=S.glance.y; }
    }
    if(S.emotion==='sad') ly=Math.max(ly,2.4);
    if(S.emotion==='think'){ lx=2.6; ly=-3; }
    if(S.t<S.dizzyUntil){ lx=Math.cos(S.t*12)*3.1; ly=Math.sin(S.t*12)*2.6; S.tilt=Math.sin(S.t*6)*6; }
    if(S.emotion==='love'){ ly=-1.2; }
    const k=1-Math.exp(-dt*12); S.lookX=mix(S.lookX,clamp(lx,-3.4,3.4),k); S.lookY=mix(S.lookY,clamp(ly,-3.4,3.4),k);
    S.pupil=mix(S.pupil,1+S.curious*.1-(S.emotion==='surprised'?.22:0),1-Math.exp(-dt*8));
    // mouth: blend toward the emotion's shape, flap while talking
    const base=MOUTH[S.emotion]||MOUTH.neutral, mk=1-Math.exp(-dt*14);
    let mw=base.w, ma=base.a, mb=base.b;
    if(S.emotion==='neutral'){ mw+=S.curious*1.2; ma-=S.curious*.6; mb+=S.curious*1.6; }
    if(S.t<S.talkUntil){ const o=.35+.65*Math.abs(Math.sin(S.t*16+Math.sin(S.t*4.3)*2)); ma=Math.min(ma,1); mb=Math.max(mb,ma)+o*5.5; mw=Math.max(mw,5.5); }
    S.mouth.w=mix(S.mouth.w,mw,mk); S.mouth.a=mix(S.mouth.a,ma,mk); S.mouth.b=mix(S.mouth.b,mb,mk);
    if(S.t<(S.babbleUntil||0) && S.t>(S.nextBlip||0)){ snd('blip'); S.nextBlip=S.t+rnd(.075,.13); }
    // sitting leg swing
    const swingT=S.h>.6?(S.sleeping?.2:S.swingBoost):0;
    S.swingAmp=mix(S.swingAmp,swingT,1-Math.exp(-dt*1.6));
    S.swingT+=dt*2.3*(S.swingBoost>1?1.4:1);
    // dust
    S.dust.forEach(p=>{ p.age+=dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.vx*=Math.exp(-dt*5); p.vy*=Math.exp(-dt*4); });
    S.dust=S.dust.filter(p=>p.age<p.life);
  }
  function brain(dt){
    S.pets*=Math.exp(-dt*.9);
    if(S.pressT!=null&&!S.hugged&&S.t-S.pressT>.65) hug();
    if(S.mode!=='ground') return;
    const atHome=S.goal.surface==='home' && S.surface==='home';
    if(atHome && S.cfg.sleep && !S.sleeping && !S.wander && S.idle>40 && S.atGoalT>1){ S.act=null; fallAsleep(); }
    if(S.goal.surface==='home' && !S.sleeping && !S.wander && !S.act && S.atGoalT>3){ S.wanderT-=dt; if(S.wanderT<=0) startWander(); }
    if(S.wander){ S.wander.age=(S.wander.age||0)+dt; if(S.wander.age>16){ S.wander=null; S.wanderT=rnd(18,30); } }
    S.swingBoost=1;
    if(!S.act){ S.fxLean=0; if(S.flyEl){ try{ S.flyEl.remove(); }catch(e){} S.flyEl=null; } }
    if(S.act&&S.act.el) S.flyEl=S.act.el;
    if(!S.act&&!RM&&!S.sleeping&&S.mode==='ground'&&Math.abs(S.vx)>75&&S.t-(S.lastTrip||-60)>75&&Math.random()<dt*.014){ S.lastTrip=S.t; S.act={type:'trip',t:0,fired:0,dur:2.1,lock:true,dir:Math.sign(S.vx)||1}; }
    if(S.sleeping){ S.snoreT=(S.snoreT||0)-dt; if(S.snoreT<=0){ snd('snore'); S.snoreT=3.4; } }
    if(!S.act){
      if(!S.sleeping && S.atGoalT>1.6 && S.emotion==='neutral' && !S.pending && S.hops===0){ S.actT-=dt; if(S.actT<=0) startAct(); }
    } else {
      const A=S.act; A.t+=dt;
      if(A.type==='look'){ const k=A.t<1?-1:A.t<2?1:0; if(k) S.lookOverride={x:S.x+k*260,y:S.y-70,until:S.t+.1}; }
      if(A.type==='stretch' && !A.fired && A.t>.15){ A.fired=true; snd('yawn'); arm('stretch',1.15); emote('yawn',1.2); }
      if(A.type==='bounce' && !A.fired){ A.fired=true; S.sv-=2.8; emote('happy',1); }
      if(A.type==='swing') S.swingBoost=1.7;
      if(A.type==='flap' && !A.fired){ A.fired=true; snd('flutter'); arm('flap',.95); emote('happy',1.1); }
      if(A.type==='hum'){ S.swingBoost=1.5; if(!A.fired){ A.fired=true; emote('happy',2.4); S.talkUntil=S.t+2; snd('hum'); } }
      if(A.type==='trip'){ const d=A.dir||1;
        if(A.t<.16){ S.fxLean=d*78*(A.t/.16); if(!A.fired){ A.fired=1; emote('surprised',.5); } }
        else if(A.t<1.35){ S.fxLean=d*(80+Math.sin(A.t*30)*Math.max(0,.5-A.t)*6); if(A.fired===1){ A.fired=2; spawnDust(10,1.3); S.sv-=3.2; S.shake=.18; snd('hop'); emote('sad',1.2); try{ navigator.vibrate&&navigator.vibrate(25); }catch(e){} } }
        else { S.fxLean=d*80*Math.max(0,1-(A.t-1.35)/.45); if(A.fired===2){ A.fired=3; emote('happy',1.4); arm('wave',.7); S.sv-=1.6; } if(A.fired===3&&A.t>1.6){ A.fired=4; say(pick(['Ой! Никто не видел?','Всё в порядке, я специально!','Пол сегодня скользкий…','Упс! Встаю-встаю.'])); } } }
      if(A.type==='sneeze'){ if(A.t<.75){ S.fxLean=-Math.sin(A.t/.75*Math.PI/2)*9; if(!A.fired){ A.fired=1; emote('surprised',.8); } }
        else { if(A.fired===1){ A.fired=2; S.leanV+=520; S.sv-=3; S.shake=.12; snd('hop'); say('Апчхи!',900,true); spawnDust(4,.6); } S.fxLean=mix(S.fxLean||0,0,.12); if(A.t>1.1&&A.fired===2){ A.fired=3; emote('happy',1); } } }
      if(A.type==='hiccup'){ const k=[.25,1.0,1.75].findIndex(x=>A.t>=x&&A.t<x+.05); if(k>=0&&A.fired!==k+1){ A.fired=k+1; S.sv-=2.4; emote('surprised',.35); snd('blip'); if(k===0) say('Ик!',700,true); } }
      if(A.type==='spin'){ if(!A.fired){ A.fired=1; S.sv-=2.4; emote('joy',1.2); snd('giggle'); } S.fxLean=Math.min(1,A.t/.8)*360*(A.dir||1); if(A.t>=.8&&A.fired===1){ A.fired=2; S.fxLean=0; S.leanV=0; S.lean=0; arm('up',.5); hearts(2); } if(A.t>=.8) S.fxLean=0; }
      if(A.type==='whistle'){ if(!A.fired){ A.fired=1; emote('happy',2.4); S.talkUntil=S.t+2.2; snd('hum'); } S.tilt=Math.sin(A.t*4)*5; }
      if(A.type==='fly'){ const el=A.el, t=A.t, fx=A.ox+Math.sin(t*1.3)*90*S.K+(t>4?(t-4)*260:0), fy=A.oy+Math.cos(t*2.1)*28*S.K-(t>4?(t-4)*220:0);
        if(el){ el.style.transform='translate('+(fx-11)+'px,'+(fy-9)+'px) scaleX('+(Math.cos(t*1.3)>0?1:-1)+')'; el.style.opacity=t<.3?t/.3:t>4.6?Math.max(0,(5-t)/.4):1; }
        S.lookOverride={x:fx,y:fy,until:S.t+.15};
        if(t>1.2&&A.fired===0){ A.fired=1; emote('love',2); say(pick(['Ой, бабочка!','Какая красивая!','Привет, бабочка!'])); }
        if(t>2.4&&A.fired===1){ A.fired=2; arm('up',.8); S.sv-=2; }
        if(t>4.2&&A.fired===2){ A.fired=3; emote('sad',.8); } }
      if(A.t>A.dur){ if(A.el) try{ A.el.remove(); }catch(e){} S.fxLean=0; S.act=null; S.actT=rnd(5,10); }
    }
  }
  function startAct(){
    const sitting=S.h>.6;
    const r=Math.random();
    if(!sitting&&!RM&&r<.05){ S.act={type:'sneeze',t:0,fired:0,dur:1.5}; return; }
    if(r<.09){ S.act={type:'hiccup',t:0,fired:0,dur:2.4}; return; }
    if(!sitting&&!RM&&r<.12){ S.act={type:'spin',t:0,fired:0,dur:1.1,lock:true}; return; }
    if(!RM&&r<.16){ butterfly(); return; }
    if(!sitting&&r<.19){ S.act={type:'whistle',t:0,fired:0,dur:2.6}; return; }
    const type=pick(sitting?['look','swing','stretch','hum','flap','look']:['look','stretch','tap','bounce','flap','look']);
    S.act={type,t:0,fired:false,dur:{look:2.4,stretch:1.8,tap:1.3,bounce:.9,swing:2.8,hum:2.6,flap:1.1}[type]};
  }
  function butterfly(){
    const el=document.createElement('div'); el.className='w-fly'; el.innerHTML='<svg viewBox="0 0 24 20" width="22" height="18"><path d="M12 10 C6 0 0 2 2 8 C3 12 8 12 12 10Z M12 10 C18 0 24 2 22 8 C21 12 16 12 12 10Z" fill="#A855F7"/><path d="M12 10 C7 14 4 19 8 19 C10 19 11 15 12 10Z M12 10 C17 14 20 19 16 19 C14 19 13 15 12 10Z" fill="#F472B6"/><rect x="11.2" y="5" width="1.6" height="11" rx=".8" fill="#3B2A1A"/></svg>';
    layer.appendChild(el); S.act={type:'fly',t:0,fired:0,dur:5,el,ox:S.x,oy:S.y-110*S.K}; }
  function startWander(){
    const h=surf('home'); if(!h) return;
    const hero=surf('hero');
    if(hero && onScreen('hero',hero) && Math.random()<.5) S.wander={surface:'hero',frac:rnd(.2,.85),look:0,dur:rnd(4,7)};
    else S.wander={surface:'home',localAbs:clamp(anchorLocal(h)-rnd(70,220),36,h.width-36),look:0,dur:rnd(2.5,4)};
    S.wanderT=rnd(18,32);
  }
  function fallAsleep(){ snd('yawn'); S.snoreT=2.5; S.sleeping=true; S.emotion='sleepy'; S.emoUntil=0; say('Зева-а-аю… немного вздремну.',2400); }
  function wake(){
    if(!S.sleeping) return;
    S.sleeping=false; S.open=.3; snd('wake');
    emote('surprised',.7,()=>emote('happy',1.4)); S.sv-=2;
    say(pick(['Ой! Я не спал… честно.','А? Я здесь! Учимся дальше?']));
  }
  function activity(){ S.idle=0; if(S.sleeping) wake(); }
  function maybeDodge(px,py){
    if(S.mode!=='ground'||S.sleeping||S.t<S.dodgeCD||S.t<S.dodgeCheck) return;
    S.dodgeCheck=S.t+.1;
    const bx=S.x, by=S.y+(S.hipY-30*S.s)*S.K;
    if(Math.abs(px-bx)>40||Math.abs(py-by)>44) return;
    const els=document.elementsFromPoint(px,py);
    const ui=els.find(e=>!layer.contains(e) && e.closest && e.closest('button,a,input,select,textarea,[role="button"]'));
    if(!ui) return;
    const sf=surf(S.surface); if(!sf) return;
    let dir=px<S.x?1:-1, nl=S.local+dir*80;
    if(nl>sf.width-30||nl<30) nl=S.local-dir*80;
    S.nudge={surface:S.surface,local:clamp(nl,30,sf.width-30),until:S.t+4};
    S.dodgeCD=S.t+1.2; emote('surprised',.5); snd('dodge');
    if(!S.dodgedOnce){ S.dodgedOnce=true; say('Ой, мешаю? Отойду!',1600); }
  }
  // one line per "topic" with its own cooldown, so new reactions never spam the bubble
  function line(topic,cd,arr,important){ if((S.sayCD[topic]||-99)>S.t) return false; S.sayCD[topic]=S.t+cd; say(pick(arr),0,important); return true; }
  function hearts(n){
    if(RM) return; const K=S.K, x0=S.x, y0=S.y+(S.hipY-62)*K;
    for(let k=0;k<n;k++){ const d=document.createElement('i'); d.className='w-heart';
      d.innerHTML='<svg viewBox="0 0 20 18" width="16" height="15"><path d="M10 17 C2 11 0 7 2.5 3.5 C5 0 9 1.5 10 4.5 C11 1.5 15 0 17.5 3.5 C20 7 18 11 10 17Z" fill="#F43F5E"/></svg>';
      layer.appendChild(d); const dx=rnd(-34,34)*K, rise=rnd(46,80)*K;
      const an=d.animate([{transform:`translate(${x0-8}px,${y0}px) scale(.4)`,opacity:0},{transform:`translate(${x0-8+dx*.5}px,${y0-rise*.45}px) scale(1)`,opacity:1,offset:.35},{transform:`translate(${x0-8+dx}px,${y0-rise}px) scale(.8)`,opacity:0}],{duration:1300+k*120,delay:k*130,easing:'cubic-bezier(.3,.7,.4,1)',fill:'both'});
      an.onfinish=()=>d.remove(); }
  }
  function petted(){ S.pets=0; S.petCD=S.t+7; S.idle=0; if(S.sleeping){ wake(); return; } snd('giggle'); emote('love',2.4); arm('up',.8); S.sv-=1.4; hearts(3);
    line('pet',10,['Мурр… приятно!','Ещё погладь!','Хи-хи, щекотно!','Я тебя тоже люблю!'],true); }
  function hug(){ S.hugged=true; S.idle=0; snd('giggle'); emote('love',2.6); arm('up',1.6); S.sv-=2.2; hearts(5); line('hug',8,['Обнимашки!','Тёплые обнимашки!','Ура, обнимашки!'],true); }
  function dizzy(){ S.taps=[]; S.clicks=[]; S.dizzyUntil=S.t+2.6; emote('dizzy',2.6,()=>emote('happy',1)); S.shake=.8; snd('aww');
    line('dizzy',6,['Ой-ой, голова кружится!','Всё плывёт… Дай отдышаться!','Карусель! Хватит-хватит!'],true); }
  function poke(){
    S.idle=0;
    if(S.sleeping){ wake(); return; }
    S.sv-=2.6; S.jyv+=40; snd('squeak');
    S.taps=S.taps.filter(t=>S.t-t<5); S.taps.push(S.t); if(S.taps.length>=7){ dizzy(); return; }
    const dbl=S.clicks.length===1&&S.t-S.clicks[0]<.33;
    S.clicks=S.clicks.filter(t=>S.t-t<1.6); S.clicks.push(S.t);
    if(dbl&&S.mode==='ground'){ emote('surprised',.4,()=>emote('joy',1.2)); arm('up',1); S.hopApex=62; hop(62); line('flip',12,['Опа!','Высоко!','Смотри, как умею!'],true); return; }
    if(S.clicks.length>=3){ S.clicks=[]; snd('giggle'); emote('joy',1.6); arm('up',1.2); S.hopApex=34; S.hops=1; hop(34); say('Хи-хи! Щекотно!'); }
    else { emote('joy',1.1); hop(24); }
  }

  // ---------- rendering ----------
  function render(ok){
    N.root.style.opacity=ok?1:0;
    const h=clamp(S.h,0,1.12);
    let hs=S.s<1?-24+(1-S.s)*50:-24-(S.s-1)*16; hs=Math.min(hs,-9);
    const hipY=mix(hs-S.bob,4,h)+(h>1?(h-1)*20:0); S.hipY=hipY;
    const idleSway=S.mode==='ground'&&Math.abs(S.vx)<10&&!S.sleeping?Math.sin(S.t*1.7)*1.1*(1-h):0;
    const breath=1+Math.sin(S.t*(S.sleeping?1.3:2.2))*(S.sleeping?.025:.012);
    const sy=S.s*breath, sx=clamp(1+(1-S.s)*.8,.86,1.3);
    N.root.style.transform=`translate3d(${f(S.x-80*S.K)}px,${f(S.y-150*S.K)}px,0) scale(${S.K})`;
    const bx=S.jx+S.shift+idleSway;
    { const bt=`translate(${f(bx)} ${f(hipY+6+S.jy)}) rotate(${f(S.lean)}) scale(${f(sx)} ${f(sy)})`; N.body.setAttribute('transform',bt); N.back.setAttribute('transform',bt); }
    // legs: straight stubby legs, feet planted or swinging over the edge
    const k=smooth(.2,.85,h);
    [[N.legL,N.footL,0],[N.legR,N.footR,1]].forEach(([leg,foot,i])=>{
      const side=i?1:-1;
      const phi=Math.sin(S.swingT+(i?Math.PI:0))*.62*S.swingAmp;
      const dX=side*12+Math.max(0,phi)*side*2, dY=hipY+23*Math.cos(phi), dS=1+.42*Math.sin(phi);
      const fx=mix(S.fr[i].x,dX,k), fy=mix(S.fr[i].y,dY,k), fs=mix(1,dS,k);
      const hx=side*13*sx+bx*.5;
      leg.setAttribute('d',`M${f(hx)} ${f(hipY)}L${f(fx)} ${f(fy-5)}`);
      foot.setAttribute('cx',f(fx+side*2)); foot.setAttribute('cy',f(fy-4.6));
      foot.setAttribute('rx',f(9*fs)); foot.setAttribute('ry',f(5.6*fs));
    });
    S.shadowO=mix(S.shadowO,S.mode==='air'?0:.16*(1-.75*h),.2);
    N.shadow.setAttribute('opacity',f(S.shadowO));
    // arms
    [[N.armL,N.handL,0],[N.armR,N.handR,1]].forEach(([a,hand,i])=>{
      const side=i?1:-1, hd=S.hands[i], sx0=side*33, sy0=-40;
      const dx=hd.x-sx0, dy=hd.y-sy0, d=Math.hypot(dx,dy)||1;
      let px=-dy/d, py=dx/d; if(px*side<0){ px=-px; py=-py; }
      const bend=5+Math.max(0,24-d)*.3;
      const cx=sx0+dx/2+px*bend, cy=sy0+dy/2+py*bend;
      a.setAttribute('d',`M${sx0} ${sy0}Q${f(cx)} ${f(cy)} ${f(hd.x)} ${f(hd.y)}`);
      hand.setAttribute('cx',f(hd.x)); hand.setAttribute('cy',f(hd.y));
    });
    N.hat.setAttribute('transform',`translate(0 -64) rotate(${f(S.hatAng)}) translate(0 ${f(S.lift)})`);
    S.acc.forEach(a=>{
      const ang=a.kind==='flap'?a.s*((RM?0:6*Math.sin(S.t*4.2))+Math.abs(S.wob)*.6-S.dang*.15):a.kind==='swing'?S.dang*a.k:a.kind==='tail'?S.tail:S.wob;
      a.el.setAttribute('transform',`rotate(${f(ang)} ${a.px} ${a.py})`);
    });
    // face: whole face slides on the ball = head turn
    const fx=S.lookX*1.8, fy=S.lookY*1.1;
    N.face.setAttribute('transform',`translate(${f(fx)} ${f(fy)})`);
    const joy=S.emotion==='joy'||S.emotion==='love';
    [[N.eyeL,N.pupL,N.hlL,-1],[N.eyeR,N.pupR,N.hlR,1]].forEach(([eg,pu,hl,side])=>{
      const turn=Math.max(0,side*S.lookX)*.05;
      eg.setAttribute('transform',`translate(${f(side*10.5*(1-Math.abs(S.lookX)*.02))} -43) scale(${f(1-turn)} ${f(S.eye)})`);
      const px=S.lookX*.6, py=S.lookY*.65;
      pu.setAttribute('cx',f(px)); pu.setAttribute('cy',f(py));
      pu.setAttribute('rx',f(5.6*S.pupil)); pu.setAttribute('ry',f(8*S.pupil));
      hl.setAttribute('cx',f(px-1.9)); hl.setAttribute('cy',f(py-4));
    });
    N.eyeL.setAttribute('opacity',joy?0:1); N.eyeR.setAttribute('opacity',joy?0:1);
    N.joy.setAttribute('opacity',joy?1:0);
    N.closed.setAttribute('opacity',!joy&&S.eye<.22?1:0);
    if(S.shownEmo!==S.emotion){
      S.shownEmo=S.emotion; const b=BROW[S.emotion];
      N.brows.setAttribute('opacity',b?1:0);
      if(b){ N.browL.setAttribute('d',b[0]); N.browR.setAttribute('d',b[1]); }
    }
    const m=S.mouth, my=-27, ox=S.emotion==='think'?2:0;
    N.mouth.setAttribute('d',`M${f(ox-m.w)} ${my}Q${ox} ${f(my+2*m.a)} ${f(ox+m.w)} ${my}Q${ox} ${f(my+2*Math.max(m.b,m.a))} ${f(ox-m.w)} ${my}Z`);
    // sleep z's
    N.zz.forEach((z,j)=>{
      const p=((S.t*.42)+j/3)%1;
      z.setAttribute('x',f(24+p*16)); z.setAttribute('y',f(hipY+6-68-p*28));
      z.setAttribute('font-size',f(10+p*9)); z.setAttribute('opacity',S.sleeping?f(Math.sin(Math.PI*p)*.9):0);
    });
    // dust puffs
    N.dust.forEach((el,i)=>{
      const p=S.dust[i];
      if(!p){ el.style.opacity=0; return; }
      const q=p.age/p.life, sc=p.r/5*(1+q*1.2);
      el.style.opacity=f((1-q)*.55);
      el.style.transform=`translate(${f(p.x-5)}px,${f(p.y-5)}px) scale(${f(sc)})`;
    });
    // speech bubble
    if(S.t>S.bubbleUntil) N.bubble.classList.remove('show');
    if(N.bubble.classList.contains('show')){
      const w=N.bubble.offsetWidth||120;
      const bxp=clamp(S.x,w/2+8,innerWidth-w/2-8), byp=S.y+(hipY+6-76*S.s-10)*S.K;
      N.bubble.style.transform=`translate(${f(bxp)}px,${f(Math.max(byp,N.bubble.offsetHeight+10))}px) translate(-50%,-100%)`;
      N.bubble.style.setProperty('--tail',f(clamp(S.x-bxp,-w/2+18,w/2-18))+'px');
    }
  }

  // ---------- loop ----------
  let last=0;
  function loop(now){
    const dt=Math.min(.033,(now-last)/1000)||.016; last=now;
    S.t+=dt; S.idle+=dt;
    let ok=true;
    if(S.mode==='air') air(dt); else ok=ground(dt);
    if(S.mode==='ground'&&ok) S.feet.forEach((ft,i)=>{ S.fr[i].x=ft.lx-S.local; S.fr[i].y=ft.ly; });
    common(dt); brain(dt); render(ok||S.mode==='air');
    requestAnimationFrame(loop);
  }
  addEventListener('resize',()=>{ S.K=innerWidth<520?.78:1; },{passive:true});
  document.addEventListener('visibilitychange',()=>{ last=performance.now(); S.bpx=null; S.bvx=0; S.bvy=0; });

  addEventListener('pointermove',e=>{
    if(S.t-S.pointer.t>8 && S.started && S.mode==='ground' && !S.sleeping && S.emotion==='neutral' && Math.random()<.6){ snd('hi'); arm('wave',1.2); emote('happy',1.3); }
    S.pointer={x:e.clientX,y:e.clientY,t:S.t}; activity(); maybeDodge(e.clientX,e.clientY);
  },{passive:true});
  ['keydown','wheel','touchstart','pointerdown'].forEach(ev=>addEventListener(ev,activity,{passive:true}));
  N.hit.addEventListener('pointerdown',e=>{ e.stopPropagation(); S.pressT=S.t; S.hugged=false; poke(); });
  ['pointerup','pointercancel'].forEach(ev=>addEventListener(ev,()=>{ S.pressT=null; },{passive:true}));
  N.hit.addEventListener('contextmenu',e=>e.preventDefault());
  // petting: moving the pointer back and forth over Wordy
  let ppx=null,ppy=0; addEventListener('pointermove',e=>{ const mv=ppx==null?0:Math.hypot(e.clientX-ppx,e.clientY-ppy); ppx=e.clientX; ppy=e.clientY; if(!S.started||S.mode!=='ground'||S.t<S.petCD) return; const K=S.K, bx=S.x, by=S.y+(S.hipY-30*S.s)*K;
    if(Math.abs(e.clientX-bx)<38*K&&Math.abs(e.clientY-by)<40*K){ S.pets+=Math.min(60,mv); if(S.pets>320) petted(); } },{passive:true});
  // coming back after a while
  document.addEventListener('visibilitychange',()=>{ if(document.hidden){ S.hiddenAt=Date.now(); return; } const away=S.hiddenAt?Date.now()-S.hiddenAt:0; S.hiddenAt=0;
    if(away>120000&&S.started){ setTimeout(()=>{ if(S.sleeping) wake(); snd('hi'); emote('happy',2); arm('wave',1.8); hop(26);
      say(away>3*3600000?pick(['Ты вернулся! Я скучал.','Наконец-то! Продолжим?']):pick(['С возвращением!','О, привет снова!','Я тебя ждал!']),0,true); },500); } });
  // fast scrolling shakes him a little
  addEventListener('scroll',()=>{ const y=scrollY, now=performance.now(), dt=Math.max(16,now-S.scrollT), v=Math.abs(y-S.scrollY)/dt*1000; S.scrollY=y; S.scrollT=now;
    if(!S.started||S.sleeping||S.mode!=='ground') return; if(v>5200&&S.surface!=='home'&&line('scroll',40,['Уф, быстро листаешь!','Держусь крепче!','Вжух! Куда спешим?'])) emote('surprised',.8); },{passive:true});
  // typing: he watches the field and sometimes cheers you on
  let typed=0;
  addEventListener('keydown',e=>{ const t=e.target; if(!t||!t.closest||!t.closest('input,textarea')||!S.started||S.sleeping) return; typed++;
    if(typed%6===1){ const r=t.getBoundingClientRect(); S.lookOverride={x:r.left+Math.min(r.width,40+typed*4),y:r.top+r.height/2,until:S.t+1.2}; }
    if(typed>80&&line('type',50,['Пиши-пиши, я читаю!','Красиво пишешь!','Сколько слов! Ты молодец.'])){ typed=0; emote('happy',1.4); } },{passive:true});
  // pointer leaves the window
  document.addEventListener('mouseout',e=>{ if(e.relatedTarget||!S.started||S.sleeping||S.mode!=='ground') return; if(Math.random()<.35&&line('leave',90,['Ты куда?','Не уходи далеко!'])) emote('sad',1.2); });

  return {
    start(){
      if(S.started) return; S.started=true;
      const h=surf('home');
      S.local=RM&&h?anchorLocal(h):-70; plantFeet();
      last=performance.now(); requestAnimationFrame(loop);
    },
    goTo(surface,opts){
      opts=opts||{};
      const g={surface,anchor:surface==='home'&&opts.frac==null,frac:opts.frac,fast:!!opts.fast};
      if(S.goal.surface===g.surface && S.goal.frac===g.frac && !!S.goal.fast===g.fast) return;
      S.goal=g; S.wander=null; S.nudge=null; S.atGoalT=0; if(!(S.act&&S.act.lock)) S.act=null;
      if(S.sleeping) wake();
    },
    react(kind){
      if(S.sleeping) wake();
      if(!(S.act&&S.act.lock)) S.act=null;
      switch(kind){
        case 'correct': { try{ navigator.vibrate&&navigator.vibrate(18); }catch(e){} emote('joy',1.4); arm('up',.9); hop(34); S.okRun++; S.badRun=0; const r=S.okRun;
          const L={3:['Три подряд!','Три из трёх — так держать!'],5:['Пять подряд! Ты в ударе!','Пять верных подряд!'],10:['Десять подряд! Невероятно!','Десятка без ошибок!'],15:['Пятнадцать подряд! Ты гений?'],20:['Двадцать подряд! Я в восторге!']}[r];
          if(L) setTimeout(()=>{ say(pick(L),0,true); if(r>=5){ arm('up',1.6); hearts(r>=10?5:3); snd('giggle'); } },650); break; }
        case 'wrong': { try{ navigator.vibrate&&navigator.vibrate([30,40,30]); }catch(e){} emote('sad',2.1); S.shake=.55; S.sv-=1.2; setTimeout(()=>snd('aww'),250); const had=S.okRun; S.okRun=0; S.badRun++;
          setTimeout(()=>{ if(had>=5) say(pick(['Ничего, серия была отличная: '+had+' подряд!','Эх! Но '+had+' подряд — это сильно.']),0,true);
            else if(S.badRun===2) line('bad2',30,['Ошибки — это нормально, так и учатся.','Ничего страшного, разберёмся!']);
            else if(S.badRun===4) line('bad4',60,['Давай помедленнее: перечитай вопрос.','Не спеши, подумай ещё раз — у тебя получится.'],true); },700); break; }
        case 'cheer': snd('giggle'); emote('joy',2.8); arm('up',2.4); S.hopApex=44; S.hops=2; hop(44); break;
        case 'happy': emote('happy',2); arm('wave',1.4); hop(22); break;
        case 'encourage': emote('happy',1.8); arm('wave',1.3); break;
        case 'wave': snd('hi'); emote('happy',1.8); arm('wave',1.6); break;
        case 'think': snd('hmm'); emote('think',1.6); break;
        case 'nod': emote('happy',.9); S.sv-=2; break;
        case 'dance': if(RM){ emote('joy',2); arm('up',1.4); break; } S.act={type:'spin',t:0,fired:0,dur:1.1,lock:true,dir:Math.random()<.5?-1:1}; setTimeout(()=>{ if(!S.act) { S.act={type:'spin',t:0,fired:0,dur:1.1,lock:true,dir:-1}; } },1150); break;
        case 'trip': if(!RM){ S.act={type:'trip',t:0,fired:0,dur:2.1,lock:true,dir:Math.random()<.5?-1:1}; } break;
        case 'sneeze': S.act={type:'sneeze',t:0,fired:0,dur:1.5}; break;
      }
    },
    say,
    talk(sec){ S.talkUntil=S.t+(sec||0); },
    wear(eq){
      eq=eq||{}; S.acc=[];
      const all=window.WORDY_ITEMS||[], by={};
      Object.values(eq).forEach(id=>{ const it=all.find(x=>x.id===id); if(it) by[it.slot]=it; });
      const put=(g,it)=>{ g.innerHTML=it?it.svg:'';
        g.querySelectorAll('.swing,.tail,.wob,.flap').forEach(el=>{ const c=el.classList; S.acc.push({el,kind:c.contains('flap')?'flap':c.contains('swing')?'swing':c.contains('tail')?'tail':'wob',
          px:+el.dataset.px||0,py:+el.dataset.py||0,k:+(el.dataset.k||1),s:+(el.dataset.s||1)}); }); };
      put(N.hat,by.hat); put(N.faceacc,by.eyes); put(N.mouthacc,by.mouth); put(N.cheeks,by.cheeks); put(N.neck,by.neck); put(N.suit,by.suit); put(N.back,by.back);
      N.sshade.setAttribute('display',by.suit?'inline':'none');
      S.liftV-=40; S.dangV+=120;
    },
    aim(x,y,sec){ if(S.sleeping) wake(); S.aimAt={x,y}; arm('aim',sec||.4); S.lookOverride={x,y,until:S.t+(sec||.4)+.2}; S.sv-=.5; },
    where(){ return {x:S.x,y:S.y,k:S.K,mode:S.mode,surface:S.surface,started:S.started}; },
    lookAtEl(el,sec){ if(!el) return; const r=el.getBoundingClientRect(); S.lookOverride={x:r.left+r.width/2,y:r.top+r.height/2,until:S.t+(sec||1)}; },
    config(c){ Object.assign(S.cfg,c); if(!S.cfg.talk) N.bubble.classList.remove('show'); if(!S.cfg.sleep&&S.sleeping) wake(); }
  };
})();
