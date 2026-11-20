<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>THE MOSH PIT PIÑATA</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono&display=swap" rel="stylesheet">
<style>
:root{color-scheme:dark;--oro:#C7B182;--rosa:#634F5F;--negro:#0d0d0d;--div:#634F5F2E;--oro-claro:#E6DABB;--rosa-claro:#9A7F94;--t:min(58vw,290px)}
*{box-sizing:border-box}
html,body{height:100%;margin:0;background:var(--negro);color:var(--oro);font-family:'DM Mono',ui-monospace,monospace;touch-action:manipulation;user-select:none}
#patio{position:relative;height:100%;overflow:hidden;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);background:radial-gradient(ellipse at 50% 38%,#634F5F40,transparent 62%),var(--negro)}
#patio::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,#634F5F10 0 1px,transparent 1px 4px);pointer-events:none}
header{position:absolute;top:env(safe-area-inset-top,0px);left:0;right:0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--div);background:#0d0d0dcc;backdrop-filter:blur(6px)}
.titulo{font:400 clamp(20px,5vw,30px)/1 'Bebas Neue',Impact,sans-serif;letter-spacing:.12em;margin:0;color:var(--oro)}
.titulo b{color:var(--rosa-claro);font-weight:400}
#terminal-message{font-size:11px;letter-spacing:.08em;color:var(--rosa-claro);text-align:right}
#colgante{position:absolute;top:56px;left:50%;width:0;transform-origin:50% 0}
#cuerda{position:absolute;left:-1px;top:0;width:2px;height:12vh;background:linear-gradient(var(--rosa),var(--oro));transform-origin:50% 0}
#pinata{position:absolute;top:12vh;left:calc(var(--t) / -2);width:var(--t);height:var(--t);padding:0;border:0;background:none;cursor:crosshair;-webkit-tap-highlight-color:transparent}
#pinata:focus-visible{outline:2px dashed var(--oro);outline-offset:6px}
#dibujo{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 12px 24px #000)}
.relleno-1{fill:var(--oro)}.relleno-2{fill:var(--rosa)}.relleno-3{fill:var(--oro-claro)}
.contorno{stroke:var(--negro);stroke-width:3;stroke-linejoin:round}
.borla{fill:none;stroke-width:3;stroke-linecap:round}
.trazo-1{stroke:var(--oro)}.trazo-2{stroke:var(--rosa-claro)}.trazo-3{stroke:var(--oro-claro)}
.grieta{fill:none;stroke:var(--oro-claro);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:0;transition:opacity .2s}
.grieta.visible{opacity:1}
#dibujo.golpe{animation:golpe .25s}
@keyframes golpe{30%{transform:scale(.93,1.06) rotate(-2deg)}60%{transform:scale(1.04,.96) rotate(1.5deg)}}
.fragmento{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.confeti{position:absolute;left:0;top:0;width:8px;height:13px;pointer-events:none}
.dulce{position:absolute;left:0;top:0;font-size:2rem;cursor:pointer;line-height:1}
#capa{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden}
#capa .dulce{pointer-events:auto}
.palo{position:fixed;z-index:8;width:12px;height:150px;border-radius:6px;background:linear-gradient(var(--oro-claro),var(--oro) 60%,var(--rosa));border:1px solid var(--negro);transform-origin:50% 100%;translate:-50% -100%;opacity:0;pointer-events:none}
.palo.izquierda{--a:55deg}.palo.derecha{--a:-55deg}
.palo.activo{animation:bate .35s ease-out}
@keyframes bate{0%{opacity:1;rotate:calc(var(--a) * -1)}55%{opacity:1;rotate:var(--a)}100%{opacity:0;rotate:var(--a)}}
.pum{position:fixed;z-index:9;margin:0;translate:-50% -50%;font:400 34px 'Bebas Neue',Impact,sans-serif;color:var(--oro-claro);text-shadow:2px 2px 0 var(--rosa);pointer-events:none;animation:sube .7s forwards}
.pum.aire{font-size:22px;color:var(--rosa-claro);text-shadow:none}
@keyframes sube{to{opacity:0;transform:translateY(-60px) rotate(-6deg)}}
.hud{position:absolute;left:0;right:0;bottom:0;z-index:5;padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:6px;border-top:1px solid var(--div);background:linear-gradient(transparent,#0d0d0df2 40%)}
#verso{margin:0;min-height:1.4em;font-size:13px;color:var(--oro-claro);text-align:center}
#verso.nuevo{animation:aparece .3s}
@keyframes aparece{from{opacity:0;transform:translateY(6px)}}
.fila{display:flex;align-items:center;gap:14px;width:min(440px,100%)}
#marcador{font:400 18px 'Bebas Neue',sans-serif;letter-spacing:.08em;min-width:56px}
#marcador span{color:var(--rosa-claro);font-size:12px}
.barra{flex:1}
.barra small{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.14em;color:var(--rosa-claro);margin-bottom:4px}
#integrity-track{height:8px;border:1px solid var(--div);background:#634F5F2E;border-radius:4px;overflow:hidden}
#integrity-fill{height:100%;background:linear-gradient(90deg,var(--rosa),var(--oro));transform-origin:0 50%;transition:transform .2s}
button.accion,#otra{font:400 18px 'Bebas Neue',sans-serif;letter-spacing:.14em;color:var(--negro);background:var(--oro);border:0;border-radius:4px;padding:7px 20px;cursor:pointer}
button.accion:active,#otra:active{background:var(--oro-claro)}
button:focus-visible{outline:2px solid var(--oro-claro);outline-offset:3px}
#bolsa{position:fixed;z-index:6;right:14px;top:calc(64px + env(safe-area-inset-top,0px));padding:8px 14px;border:1px solid var(--rosa);border-radius:999px;background:#0d0d0de6;font-size:18px}
#bolsa.lleno{animation:golpe .25s}
.final{position:absolute;z-index:7;left:50%;top:44%;translate:-50% -50%;width:min(340px,86vw);padding:20px;text-align:center;border:1px solid var(--oro);border-radius:8px;background:#0d0d0def;box-shadow:0 0 0 6px var(--div)}
.final h2{margin:0 0 8px;font:400 30px 'Bebas Neue',sans-serif;letter-spacing:.1em;color:var(--oro)}
.final p{margin:0 0 16px;font-size:13px;line-height:1.5;color:var(--oro-claro)}
[hidden]{display:none!important}
</style>
</head>
<body>
<main id="patio">
  <header>
    <h1 class="titulo">THE MOSH PIT <b>PIÑATA</b></h1>
    <div id="terminal-message" role="status">[HNR] CHAOS PROTOCOL ACTIVATED</div>
  </header>

  <div id="colgante">
    <div id="cuerda"></div>
    <button id="pinata" aria-label="Piñata: tócala para pegarle"><svg id="dibujo" viewBox="-200 -200 400 400" aria-hidden="true"></svg></button>
  </div>

  <div id="capa"></div>
  <div id="palo" class="palo"></div>
  <div id="bolsa" hidden>🛍️ <span id="contador-bolsa">0</span></div>

  <section class="final" id="final" hidden>
    <h2>¡SE ROMPIÓ!</h2>
    <p id="resumen"></p>
    <button id="otra">OTRA RONDA</button>
  </section>

  <div class="hud">
    <p id="verso" aria-live="polite">Toca la piñata para pegarle</p>
    <div class="fila">
      <div id="marcador"></div>
      <div class="barra">
        <small><span>INTEGRIDAD</span><span id="integrity-value">100%</span></small>
        <div id="integrity-track" role="progressbar" aria-label="Integridad de la piñata" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div id="integrity-fill"></div></div>
      </div>
    </div>
    <button class="accion" id="hit-action">¡GOLPEAR!</button>
  </div>
</main>

<script>
const dulces = ['🎟️','🎫','🎸','🤘','🥭','🍊','🍍','🍉','🍬','🍭','🍫','🥜','🍯','🥥'];
const picos = 7, resistencia = 20, travesura = 3;
const letra = ['Dale, dale, dale,','no pierdas el tino,','porque si lo pierdes,','pierdes el camino.','Ya le diste uno,','ya le diste dos,','ya le diste tres','¡y tu tiempo se acabó!'];
const golpesFuertes = ['¡Pum!','¡Paf!','¡Zas!','¡Toing!','¡Cuas!'];
const niveles = [
  {mecer:0,subir:0,rapidez:1},{mecer:16,subir:30,rapidez:1.2},
  {mecer:26,subir:80,rapidez:1.5},{mecer:36,subir:140,rapidez:2.1}
];
const $ = (s) => document.querySelector(s);
const limitar = (n,a,b) => Math.min(b, Math.max(a, Math.round(Number(n) || 0)));
const golpesNecesarios = limitar(resistencia,1,999);
const numeroDePicos = limitar(picos,3,12);
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const movimiento = sinMovimiento ? niveles[0] : niveles[limitar(travesura,0,3)];
const COLORES = ['#C7B182','#634F5F','#E6DABB','#9A7F94'];

const colgante=$('#colgante'), cuerda=$('#cuerda'), pinata=$('#pinata'), dibujo=$('#dibujo'),
  verso=$('#verso'), marcador=$('#marcador'), final=$('#final'), resumen=$('#resumen'),
  botonOtra=$('#otra'), capa=$('#capa'), palo=$('#palo'), bolsa=$('#bolsa'),
  contadorBolsa=$('#contador-bolsa'), patio=$('#patio');

let golpes=0, intentos=0, rota=false, juntados=0, linea=0, conos=[], grietas=[], piezas=[];
const SVG='http://www.w3.org/2000/svg', RADIO=62, LARGO=112;
const azar=(a,b)=>a+Math.random()*(b-a);
const polar=(r,a)=>[r*Math.cos(a), r*Math.sin(a)];
const entre=(p,q,f)=>[p[0]+(q[0]-p[0])*f, p[1]+(q[1]-p[1])*f];
const xy=(p)=>`${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

function crear(tag, attrs, padre){
  const el=document.createElementNS(SVG,tag);
  for(const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  padre.append(el); return el;
}
function reiniciar(el,clase){ el.classList.remove(clase); void el.offsetWidth; el.classList.add(clase); }

function dibujarPinata(){
  dibujo.replaceChildren(); conos=[];
  const paso=2*Math.PI/numeroDePicos, mitad=Math.min(paso*.42,.55);
  for(let i=0;i<numeroDePicos;i++){
    const ang=-Math.PI/2+paso/2+i*paso;
    const b1=polar(RADIO*.85,ang-mitad), b2=polar(RADIO*.85,ang+mitad), punta=polar(RADIO+LARGO,ang);
    const color=(i%3)+1, franja=((i+1)%3)+1;
    const g=crear('g',{},dibujo);
    for(let k=-2;k<=2;k++){
      crear('path',{d:`M${xy(punta)} L${xy(polar(RADIO+LARGO+22,ang+k*.06))}`,class:`borla trazo-${((i+k+3)%3)+1}`},g);
    }
    crear('path',{d:`M${xy(b1)} L${xy(punta)} L${xy(b2)} Z`,class:`relleno-${color} contorno`},g);
    for(const [d,h] of [[.3,.42],[.6,.69]]){
      const pts=[entre(b1,punta,d),entre(b1,punta,h),entre(b2,punta,h),entre(b2,punta,d)];
      crear('path',{d:`M${pts.map(xy).join(' L')} Z`,class:`relleno-${franja}`},g);
    }
    conos.push({grupo:g,angulo:ang,centro:polar(RADIO+LARGO*.45,ang)});
  }
  // Centro huichol
  const c=crear('g',{},dibujo);
  crear('circle',{r:RADIO,fill:'#0d0d0d',stroke:'#C7B182','stroke-width':3},c);
  crear('circle',{r:RADIO-6,fill:'none',stroke:'#634F5F','stroke-width':4},c);
  for(let i=0;i<12;i++){
    const a=i/12*Math.PI*2, cos=Math.cos(a), sin=Math.sin(a);
    crear('line',{x1:cos*RADIO*.35,y1:sin*RADIO*.35,x2:cos*RADIO*.82,y2:sin*RADIO*.82,stroke:i%2?'#9A7F94':'#C7B182','stroke-width':2.2,'stroke-linecap':'round'},c);
    crear('circle',{cx:cos*RADIO*.82,cy:sin*RADIO*.82,r:2.8,fill:'#C7B182'},c);
  }
  crear('circle',{r:RADIO*.28,fill:'#634F5F',stroke:'#C7B182','stroke-width':2},c);
  crear('circle',{r:RADIO*.12,fill:'#C7B182'},c);
  [RADIO-14,RADIO-28].forEach((r,i)=>crear('circle',{r,fill:'none',stroke:i?'#9A7F94':'#C7B182','stroke-width':1.5,'stroke-dasharray':'3 4',opacity:.7},c));
  // Grietas
  const cg=crear('g',{},dibujo); grietas=[];
  for(let i=0;i<6;i++){
    const ang=i/6*2*Math.PI+azar(-.3,.3); let r=azar(4,18), d=`M${xy(polar(r,ang))}`;
    while(r<RADIO+45){ r+=azar(14,24); d+=` L${xy(polar(r,ang+azar(-.35,.35)))}`; }
    grietas.push(crear('path',{d,class:'grieta'},cg));
  }
  grietas.sort(()=>Math.random()-.5);
}

const actualizarMarcador=()=>{ marcador.innerHTML=`${golpes} <span>/ ${golpesNecesarios}</span>`; };
function actualizarIntegridad(){
  const pct=Math.max(0,Math.round(100-golpes/golpesNecesarios*100));
  $('#integrity-value').textContent=`${pct}%`;
  $('#integrity-fill').style.transform=`scaleX(${pct/100})`;
  $('#integrity-track').setAttribute('aria-valuenow',pct);
}
const terminal=(t)=>{ $('#terminal-message').textContent=t; };

function cantar(){
  const t=letra[linea++%letra.length];
  verso.textContent=t; terminal(`[HNR] ${t}`); reiniciar(verso,'nuevo');
}
function batear(x,y){
  palo.className=`palo ${x<innerWidth/2?'izquierda':'derecha'}`;
  palo.style.left=`${x}px`; palo.style.top=`${y}px`; reiniciar(palo,'activo');
}
function texto(x,y,t,clase=''){
  const p=document.createElement('p'); p.className=`pum ${clase}`; p.textContent=t;
  p.style.left=`${x}px`; p.style.top=`${y}px`;
  p.addEventListener('animationend',()=>p.remove()); document.body.append(p);
}

const pendulo={angulo:0,velocidad:0};
function pegar(x,y){
  if(rota) return;
  golpes++; intentos++;
  cantar(); batear(x,y);
  texto(x,y,golpesFuertes[Math.floor(Math.random()*golpesFuertes.length)]);
  reiniciar(dibujo,'golpe');
  const caja=pinata.getBoundingClientRect();
  pendulo.velocidad+=(x<caja.left+caja.width/2?-1:1)*azar(70,120);
  const vis=Math.floor(golpes/golpesNecesarios*(grietas.length+1));
  grietas.forEach((g,i)=>g.classList.toggle('visible',i<vis));
  actualizarMarcador(); actualizarIntegridad();
  if(golpes>=golpesNecesarios) romper();
}
function fallar(x,y){
  if(rota) return;
  intentos++; cantar(); batear(x,y); texto(x,y,'¡Aire!','aire');
}
function golpeCentrado(){
  const c=pinata.getBoundingClientRect();
  pegar(c.left+c.width*azar(.35,.65), c.top+c.height*.5);
}
pinata.addEventListener('pointerdown',(e)=>{ e.stopPropagation(); pegar(e.clientX,e.clientY); });
pinata.addEventListener('click',(e)=>{ if(e.detail===0) golpeCentrado(); });
patio.addEventListener('pointerdown',(e)=>{ if(!e.target.closest('.final,.hud,header')) fallar(e.clientX,e.clientY); });
$('#hit-action').addEventListener('click',golpeCentrado);

function agregar(p){ capa.append(p.el); piezas.push({giro:0,vgiro:0,gravedad:1400,...p}); }

function romper(){
  rota=true;
  const o=capa.getBoundingClientRect(), c=dibujo.getBoundingClientRect(), tam=dibujo.offsetWidth;
  const cx=c.left+c.width/2-o.left, cy=c.top+c.height/2-o.top, esc=tam/400;
  if(!sinMovimiento){
    for(const cono of conos){
      const s=document.createElementNS(SVG,'svg');
      s.setAttribute('viewBox','-200 -200 400 400'); s.setAttribute('class','fragmento');
      s.style.width=s.style.height=`${tam}px`;
      s.style.transformOrigin=`${(cono.centro[0]+200)*esc}px ${(cono.centro[1]+200)*esc}px`;
      s.append(cono.grupo.cloneNode(true));
      const f=azar(220,420);
      agregar({el:s,tipo:'fragmento',x:cx-tam/2,y:cy-tam/2,vx:Math.cos(cono.angulo)*f,vy:Math.sin(cono.angulo)*f-250,vgiro:azar(-300,300),vida:1.6});
    }
    for(let i=0;i<45;i++){
      const s=document.createElement('span'); s.className='confeti'; s.style.background=COLORES[i%4];
      agregar({el:s,tipo:'confeti',x:cx+azar(-30,30),y:cy+azar(-30,30),vx:azar(-380,380),vy:azar(-650,-150),vgiro:azar(-720,720),gravedad:700,fase:azar(0,6),vida:azar(2.5,4)});
    }
  }
  for(let i=0;i<28;i++){
    const d=document.createElement('span'); d.className='dulce'; d.textContent=dulces[i%dulces.length];
    const p={el:d,tipo:'dulce',x:cx+azar(-20,20),y:cy+azar(-20,20),vx:azar(-280,280),vy:azar(-560,-120),vgiro:azar(-400,400),suelo:capa.clientHeight-azar(120,150)};
    d.addEventListener('pointerdown',()=>juntar(p)); agregar(p);
  }
  pinata.hidden=true; marcador.hidden=true; verso.textContent=''; bolsa.hidden=false;
  terminal('[HNR] PIÑATA DESTROYED — COLLECT REWARDS');
  setTimeout(()=>{
    resumen.textContent=`Le pegaste ${golpes} ${golpes===1?'vez':'veces'} en ${intentos} ${intentos===1?'intento':'intentos'}. Toca los dulces para juntarlos.`;
    final.hidden=false; botonOtra.focus({preventScroll:true});
  },700);
}
function juntar(p){
  if(p.juntado) return; p.juntado=true;
  const o=capa.getBoundingClientRect(), d=bolsa.getBoundingClientRect();
  p.el.style.transition='transform .45s cubic-bezier(.5,-.4,.7,1), opacity .45s ease';
  p.el.style.transform=`translate(${d.left+d.width/2-o.left}px, ${d.top+d.height/2-o.top}px) translate(-50%,-50%) scale(.4)`;
  p.el.style.opacity='0';
  setTimeout(()=>{
    p.el.remove(); piezas=piezas.filter((q)=>q!==p);
    contadorBolsa.textContent=++juntados; reiniciar(bolsa,'lleno');
  },450);
}
botonOtra.addEventListener('click',()=>{
  piezas.forEach((p)=>p.el.remove()); piezas=[];
  golpes=intentos=linea=juntados=0; rota=false;
  contadorBolsa.textContent='0'; bolsa.hidden=true;
  pendulo.angulo=pendulo.velocidad=0;
  dibujarPinata(); pinata.hidden=false; marcador.hidden=false;
  actualizarMarcador(); actualizarIntegridad();
  verso.textContent='Toca la piñata para pegarle'; terminal('[HNR] CHAOS PROTOCOL ACTIVATED');
  final.hidden=true; pinata.focus({preventScroll:true});
});

let tiempo=0, anterior=performance.now(), largoCuerda=cuerda.offsetHeight, jalon=0, siguienteJalon=azar(2,4);
addEventListener('resize',()=>{ largoCuerda=cuerda.offsetHeight; });

function moverPiezas(dt){
  for(const p of piezas){
    if(p.juntado||p.quieto) continue;
    p.vy+=p.gravedad*dt;
    if(p.tipo==='confeti'){ p.vx*=1-1.8*dt; p.vy=Math.min(p.vy,130); p.x+=Math.sin(tiempo*6+p.fase)*40*dt; }
    p.x+=p.vx*dt; p.y+=p.vy*dt; p.giro+=p.vgiro*dt;
    if(p.tipo==='dulce'){
      if(p.y>p.suelo){
        p.y=p.suelo; p.vy=Math.abs(p.vy)<90?0:p.vy*-.35; p.vx*=.6; p.vgiro*=.5;
        if(p.vy===0&&Math.abs(p.vx)<2) p.quieto=true;
      }
      const pared=capa.clientWidth-20;
      if(p.x<20||p.x>pared){ p.x=Math.min(pared,Math.max(20,p.x)); p.vx*=-.5; }
      p.el.style.transform=`translate(${p.x}px, ${p.y}px) translate(-50%,-50%) rotate(${p.giro}deg)`;
    }else{
      p.vida-=dt; p.el.style.opacity=Math.min(1,Math.max(0,p.vida));
      p.el.style.transform=`translate(${p.x}px, ${p.y}px)${p.tipo==='confeti'?' translate(-50%,-50%)':''} rotate(${p.giro}deg)`;
    }
  }
  piezas=piezas.filter((p)=>{ if(p.vida!==undefined&&p.vida<=0){ p.el.remove(); return false; } return true; });
}

function animar(ahora){
  const dt=Math.min(.05,(ahora-anterior)/1000); anterior=ahora; tiempo+=dt*movimiento.rapidez;
  const objetivo=movimiento.mecer*(.65*Math.sin(tiempo*1.3)+.35*Math.sin(tiempo*2.9+1));
  pendulo.velocidad+=(-(pendulo.angulo-objetivo)*28-pendulo.velocidad*2.2)*dt;
  pendulo.angulo+=pendulo.velocidad*dt;
  if(movimiento.subir>0){
    siguienteJalon-=dt;
    if(siguienteJalon<=0){ jalon=1; siguienteJalon=azar(1.5,4)/movimiento.rapidez; pendulo.velocidad+=azar(-3,3)*movimiento.mecer; }
    jalon=Math.max(0,jalon-dt*1.8);
  }
  const bajada=movimiento.subir*((1-Math.cos(tiempo*1.6))/2)*(.6+.4*Math.sin(tiempo*.5))*(1-Math.sin(jalon*Math.PI));
  colgante.style.transform=`rotate(${pendulo.angulo}deg)`;
  cuerda.style.transform=`scaleY(${(largoCuerda+bajada)/largoCuerda})`;
  pinata.style.transform=`translateY(${bajada}px)`;
  moverPiezas(dt); requestAnimationFrame(animar);
}
dibujarPinata(); actualizarMarcador(); actualizarIntegridad(); requestAnimationFrame(animar);
</script>
</body>
</html>
