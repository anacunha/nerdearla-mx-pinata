// ===== HNR LABS — THE MOSH PIT PIÑATA (ESTRELLA + HUICHOL) =====

const dulces = [
  '🎟️', '🎫', '🎸', '🤘',
  '🥭', '🍊', '🍍', '🍉',
  '🍬', '🍭', '🍫', '🥜',
  '🍯', '🥥'
];

const picos = 7;
const resistencia = 20;
const travesura = 3;

const letra = [
  'Dale, dale, dale,',
  'no pierdas el tino,',
  'porque si lo pierdes,',
  'pierdes el camino.',
  'Ya le diste uno,',
  'ya le diste dos,',
  'ya le diste tres',
  '¡y tu tiempo se acabó!',
];

const golpesFuertes = ['¡Pum!', '¡Paf!', '¡Zas!', '¡Toing!', '¡Cuas!'];

const niveles = [
  { mecer: 0, subir: 0, rapidez: 1 },
  { mecer: 16, subir: 30, rapidez: 1.2 },
  { mecer: 26, subir: 80, rapidez: 1.5 },
  { mecer: 36, subir: 140, rapidez: 2.1 },
];

const limitar = (n, min, max) => Math.min(max, Math.max(min, Math.round(Number(n) || 0)));
const golpesNecesarios = limitar(resistencia, 1, 999);
const numeroDePicos = limitar(picos, 3, 12);
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const movimiento = sinMovimiento ? niveles[0] : niveles[limitar(travesura, 0, 3)];
const contenido = dulces.length > 0 ? dulces : ['🍬'];

const patio = document.querySelector('#patio');
const colgante = document.querySelector('#colgante');
const cuerda = document.querySelector('#cuerda');
const pinata = document.querySelector('#pinata');
const dibujo = document.querySelector('#dibujo');
const verso = document.querySelector('#verso');
const marcador = document.querySelector('#marcador');
const final = document.querySelector('#final');
const resumen = document.querySelector('#resumen');
const botonOtra = document.querySelector('#otra');
const capa = document.querySelector('#capa');
const palo = document.querySelector('#palo');
const bolsa = document.querySelector('#bolsa');
const contadorBolsa = document.querySelector('#contador-bolsa');
const hitAction = document.querySelector('#hit-action');
const integrityValue = document.querySelector('#integrity-value');
const integrityFill = document.querySelector('#integrity-fill');
const integrityTrack = document.querySelector('#integrity-track');
const terminalMessage = document.querySelector('#terminal-message');

document.title = document.querySelector('.titulo')?.textContent.trim() || 'THE MOSH PIT PIÑATA';
patio?.style.setProperty('--subir', `${movimiento.subir}px`);

let golpes = 0;
let intentos = 0;
let rota = false;
let juntados = 0;
let linea = 0;
let conos = [];
let grietas = [];
let piezas = [];

const SVG = 'http://www.w3.org/2000/svg';
const RADIO = 62;
const LARGO = 112;

const azar = (min, max) => min + Math.random() * (max - min);
const polar = (r, a) => [r * Math.cos(a), r * Math.sin(a)];
const entre = (p, q, f) => [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f];
const xy = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

function crear(etiqueta, atributos, padre) {
  const el = document.createElementNS(SVG, etiqueta);
  for (const [k, v] of Object.entries(atributos)) el.setAttribute(k, v);
  padre.append(el);
  return el;
}

function dibujarPinata() {
  dibujo.replaceChildren();
  conos = [];

  const paso = (2 * Math.PI) / numeroDePicos;
  const mitad = Math.min(paso * 0.42, 0.55);

  for (let i = 0; i < numeroDePicos; i++) {
    const angulo = -Math.PI / 2 + paso / 2 + i * paso;
    const base1 = polar(RADIO * 0.85, angulo - mitad);
    const base2 = polar(RADIO * 0.85, angulo + mitad);
    const punta = polar(RADIO + LARGO, angulo);
    const color = (i % 3) + 1;
    const franja = ((i + 1) % 3) + 1;

    const grupo = crear('g', {}, dibujo);

    for (let k = -2; k <= 2; k++) {
      const fin = polar(RADIO + LARGO + 22, angulo + k * 0.06);
      crear('path', {
        d: `M${xy(punta)} L${xy(fin)}`,
        class: `borla trazo-${((i + k + 3) % 3) + 1}`,
      }, grupo);
    }

    crear('path', {
      d: `M${xy(base1)} L${xy(punta)} L${xy(base2)} Z`,
      class: `relleno-${color} contorno`,
    }, grupo);

    for (const [desde, hasta] of [[0.3, 0.42], [0.6, 0.69]]) {
      const puntos = [
        entre(base1, punta, desde),
        entre(base1, punta, hasta),
        entre(base2, punta, hasta),
        entre(base2, punta, desde),
      ];
      crear('path', {
        d: `M${puntos.map(xy).join(' L')} Z`,
        class: `relleno-${franja}`,
      }, grupo);
    }

    conos.push({
      grupo,
      angulo,
      centro: polar(RADIO + LARGO * 0.45, angulo),
    });
  }

  // ===== Centro Huichol =====
  const cuerpo = crear('g', {}, dibujo);

  crear('circle', {
    r: RADIO,
    fill: '#0d0d0d',
    stroke: '#C7B182',
    'stroke-width': '3',
  }, cuerpo);

  crear('circle', {
    r: RADIO - 6,
    fill: 'none',
    stroke: '#634F5F',
    'stroke-width': '4',
  }, cuerpo);

  const numRayos = 12;
  for (let i = 0; i < numRayos; i++) {
    const ang = (i / numRayos) * Math.PI * 2;
    const x1 = Math.cos(ang) * (RADIO * 0.35);
    const y1 = Math.sin(ang) * (RADIO * 0.35);
    const x2 = Math.cos(ang) * (RADIO * 0.82);
    const y2 = Math.sin(ang) * (RADIO * 0.82);

    crear('line', {
      x1, y1, x2, y2,
      stroke: i % 2 === 0 ? '#C7B182' : '#634F5F',
      'stroke-width': '2.2',
      'stroke-linecap': 'round',
    }, cuerpo);

    crear('circle', {
      cx: x2,
      cy: y2,
      r: 2.8,
      fill: '#C7B182',
    }, cuerpo);
  }

  crear('circle', {
    r: RADIO * 0.28,
    fill: '#634F5F',
    stroke: '#C7B182',
    'stroke-width': '2',
  }, cuerpo);

  crear('circle', {
    r: RADIO * 0.12,
    fill: '#C7B182',
  }, cuerpo);

  [RADIO - 14, RADIO - 28].forEach((r, i) => {
    crear('circle', {
      r,
      fill: 'none',
      stroke: i === 0 ? '#C7B182' : '#634F5F',
      'stroke-width': '1.5',
      'stroke-dasharray': '3 4',
      opacity: '0.7',
    }, cuerpo);
  });

  // Grietas
  const capaGrietas = crear('g', {}, dibujo);
  grietas = [];
  const total = 6;

  for (let i = 0; i < total; i++) {
    const angulo = (i / total) * 2 * Math.PI + azar(-0.3, 0.3);
    let r = azar(4, 18);
    let d = `M${xy(polar(r, angulo))}`;

    while (r < RADIO + 45) {
      r += azar(14, 24);
      d += ` L${xy(polar(r, angulo + azar(-0.35, 0.35)))}`;
    }
    grietas.push(crear('path', { d, class: 'grieta' }, capaGrietas));
  }

  grietas.sort(() => Math.random() - 0.5);
}

function actualizarMarcador() {
  marcador.innerHTML = `${golpes} <span>/ ${golpesNecesarios}</span>`;
}

function actualizarIntegridad() {
  const pct = Math.max(0, Math.round(100 - (golpes / golpesNecesarios) * 100));
  if (integrityValue) integrityValue.textContent = `${pct}%`;
  if (integrityFill) integrityFill.style.transform = `scaleX(${pct / 100})`;
  if (integrityTrack) integrityTrack.setAttribute('aria-valuenow', pct);
}

function actualizarTerminal(texto) {
  if (terminalMessage) terminalMessage.textContent = texto;
}

function cantar() {
  const texto = letra[linea % letra.length];
  verso.textContent = texto;
  actualizarTerminal(`[HNR] ${texto}`);
  linea++;
  reiniciarAnimacion(verso, 'nuevo');
}

function reiniciarAnimacion(el, clase) {
  el.classList.remove(clase);
  void el.offsetWidth;
  el.classList.add(clase);
}

function batear(x, y) {
  const lado = x < innerWidth / 2 ? 'izquierda' : 'derecha';
  palo.className = `palo ${lado}`;
  palo.style.left = `${x}px`;
  palo.style.top = `${y}px`;
  reiniciarAnimacion(palo, 'activo');
}

function mostrarTexto(x, y, texto, clase = '') {
  const p = document.createElement('p');
  p.className = `pum ${clase}`;
  p.textContent = texto;
  p.style.left = `${x}px`;
  p.style.top = `${y}px`;
  p.addEventListener('animationend', () => p.remove());
  document.body.append(p);
}

const pendulo = { angulo: 0, velocidad: 0 };

function pegar(x, y) {
  if (rota) return;

  golpes++;
  intentos++;

  cantar();
  batear(x, y);
  mostrarTexto(x, y, golpesFuertes[Math.floor(Math.random() * golpesFuertes.length)]);
  reiniciarAnimacion(dibujo, 'golpe');

  const caja = pinata.getBoundingClientRect();
  const dir = x < caja.left + caja.width / 2 ? -1 : 1;
  pendulo.velocidad += dir * azar(70, 120);

  const visibles = Math.floor((golpes / golpesNecesarios) * (grietas.length + 1));
  grietas.forEach((g, i) => g.classList.toggle('visible', i < visibles));

  actualizarMarcador();
  actualizarIntegridad();

  if (golpes >= golpesNecesarios) romper();
}

function fallar(x, y) {
  if (rota) return;
  intentos++;
  cantar();
  batear(x, y);
  mostrarTexto(x, y, '¡Aire!', 'aire');
}

pinata.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  pegar(e.clientX, e.clientY);
});

pinata.addEventListener('click', (e) => {
  if (e.detail !== 0) return;
  const caja = pinata.getBoundingClientRect();
  pegar(caja.left + caja.width * azar(0.3, 0.7), caja.top + caja.height * 0.5);
});

patio.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.final')) return;
  fallar(e.clientX, e.clientY);
});

hitAction?.addEventListener('click', () => {
  const caja = pinata.getBoundingClientRect();
  pegar(
    caja.left + caja.width * azar(0.35, 0.65),
    caja.top + caja.height * 0.5
  );
});

function agregarPieza(pieza) {
  capa.append(pieza.el);
  piezas.push({ giro: 0, vgiro: 0, gravedad: 1400, ...pieza });
}

function romper() {
  rota = true;

  const origen = capa.getBoundingClientRect();
  const caja = dibujo.getBoundingClientRect();
  const tam = dibujo.offsetWidth;
  const centroX = caja.left + caja.width / 2 - origen.left;
  const centroY = caja.top + caja.height / 2 - origen.top;
  const escala = tam / 400;

  if (!sinMovimiento) {
    for (const cono of conos) {
      const svg = document.createElementNS(SVG, 'svg');
      svg.setAttribute('viewBox', '-200 -200 400 400');
      svg.setAttribute('class', 'fragmento');
      svg.style.width = svg.style.height = `${tam}px`;
      svg.style.transformOrigin = `${(cono.centro[0] + 200) * escala}px ${(cono.centro[1] + 200) * escala}px`;
      svg.append(cono.grupo.cloneNode(true));

      const fuerza = azar(220, 420);
      agregarPieza({
        el: svg,
        tipo: 'fragmento',
        x: centroX - tam / 2,
        y: centroY - tam / 2,
        vx: Math.cos(cono.angulo) * fuerza,
        vy: Math.sin(cono.angulo) * fuerza - 250,
        vgiro: azar(-300, 300),
        vida: 1.6,
      });
    }

    for (let i = 0; i < 45; i++) {
      const confeti = document.createElement('span');
      confeti.className = 'confeti';
      confeti.style.background = `var(${['--color-1', '--color-2', '--color-3', '--cuerpo'][i % 4]})`;
      agregarPieza({
        el: confeti,
        tipo: 'confeti',
        x: centroX + azar(-30, 30),
        y: centroY + azar(-30, 30),
        vx: azar(-380, 380),
        vy: azar(-650, -150),
        vgiro: azar(-720, 720),
        gravedad: 700,
        fase: azar(0, 6),
        vida: azar(2.5, 4),
      });
    }
  }

  for (let i = 0; i < 28; i++) {
    const dulce = document.createElement('span');
    dulce.className = 'dulce';
    dulce.textContent = contenido[i % contenido.length];

    const pieza = {
      el: dulce,
      tipo: 'dulce',
      x: centroX + azar(-20, 20),
      y: centroY + azar(-20, 20),
      vx: azar(-280, 280),
      vy: azar(-560, -120),
      vgiro: azar(-400, 400),
      suelo: capa.clientHeight - azar(18, 46),
    };

    dulce.addEventListener('pointerdown', () => juntar(pieza));
    agregarPieza(pieza);
  }

  pinata.hidden = true;
  marcador.hidden = true;
  verso.textContent = '';
  bolsa.hidden = false;
  actualizarTerminal('[HNR] PIÑATA DESTROYED — COLLECT REWARDS');

  setTimeout(() => {
    resumen.textContent =
      `Le pegaste ${golpes} ${golpes === 1 ? 'vez' : 'veces'} ` +
      `en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}. ` +
      'Toca los dulces para juntarlos.';
    final.hidden = false;
    botonOtra.focus({ preventScroll: true });
  }, 700);
}

function juntar(pieza) {
  if (pieza.juntado) return;
  pieza.juntado = true;

  const origen = capa.getBoundingClientRect();
  const destino = bolsa.getBoundingClientRect();
  const x = destino.left + destino.width / 2 - origen.left;
  const y = destino.top + destino.height / 2 - origen.top;

  pieza.el.style.transition = 'transform 0.45s cubic-bezier(0.5, -0.4, 0.7, 1), opacity 0.45s ease';
  pieza.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(0.4)`;
  pieza.el.style.opacity = '0';

  setTimeout(() => {
    pieza.el.remove();
    piezas = piezas.filter((otra) => otra !== pieza);
    juntados++;
    contadorBolsa.textContent = juntados;
    reiniciarAnimacion(bolsa, 'lleno');
  }, 450);
}

botonOtra.addEventListener('click', () => {
  piezas.forEach((p) => p.el.remove());
  piezas = [];

  golpes = 0;
  intentos = 0;
  linea = 0;
  rota = false;
  juntados = 0;

  contadorBolsa.textContent = '0';
  bolsa.hidden = true;

  pendulo.angulo = 0;
  pendulo.velocidad = 0;

  dibujarPinata();

  pinata.hidden = false;
  marcador.hidden = false;
  actualizarMarcador();
  actualizarIntegridad();

  verso.textContent = 'Toca la piñata para pegarle';
  actualizarTerminal('[HNR] CHAOS PROTOCOL ACTIVATED');
  final.hidden = true;

  pinata.focus({ preventScroll: true });
});

let tiempo = 0;
let anterior = performance.now();
let largoCuerda = cuerda.offsetHeight;
let jalon = 0;
let siguienteJalon = azar(2, 4);

addEventListener('resize', () => {
  largoCuerda = cuerda.offsetHeight;
});

function moverPiezas(dt) {
  for (const p of piezas) {
    if (p.juntado || p.quieto) continue;

    p.vy += p.gravedad * dt;

    if (p.tipo === 'confeti') {
      p.vx *= 1 - 1.8 * dt;
      p.vy = Math.min(p.vy, 130);
      p.x += Math.sin(tiempo * 6 + p.fase) * 40 * dt;
    }

    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.giro += p.vgiro * dt;

    if (p.tipo === 'dulce') {
      if (p.y > p.suelo) {
        p.y = p.suelo;
        p.vy = Math.abs(p.vy) < 90 ? 0 : p.vy * -0.35;
        p.vx *= 0.6;
        p.vgiro *= 0.5;
        if (p.vy === 0 && Math.abs(p.vx) < 2) p.quieto = true;
      }

      const pared = capa.clientWidth - 20;
      if (p.x < 20 || p.x > pared) {
        p.x = Math.min(pared, Math.max(20, p.x));
        p.vx *= -0.5;
      }

      p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${p.giro}deg)`;
    } else {
      p.vida -= dt;
      p.el.style.opacity = Math.min(1, Math.max(0, p.vida));
      const centrar = p.tipo === 'confeti' ? ' translate(-50%, -50%)' : '';
      p.el.style.transform = `translate(${p.x}px, ${p.y}px)${centrar} rotate(${p.giro}deg)`;
    }
  }

  piezas = piezas.filter((p) => {
    if (p.vida !== undefined && p.vida <= 0) {
      p.el.remove();
      return false;
    }
    return true;
  });
}

function animar(ahora) {
  const dt = Math.min(0.05, (ahora - anterior) / 1000);
  anterior = ahora;
  tiempo += dt * movimiento.rapidez;

  const objetivo = movimiento.mecer * (0.65 * Math.sin(tiempo * 1.3) + 0.35 * Math.sin(tiempo * 2.9 + 1));

  pendulo.velocidad += (-(pendulo.angulo - objetivo) * 28 - pendulo.velocidad * 2.2) * dt;
  pendulo.angulo += pendulo.velocidad * dt;

  if (movimiento.subir > 0) {
    siguienteJalon -= dt;
    if (siguienteJalon <= 0) {
      jalon = 1;
      siguienteJalon = azar(1.5, 4) / movimiento.rapidez;
      pendulo.velocidad += azar(-3, 3) * movimiento.mecer;
    }
    jalon = Math.max(0, jalon - dt * 1.8);
  }

  const subida = 1 - Math.sin(jalon * Math.PI);
  const bajada = movimiento.subir * ((1 - Math.cos(tiempo * 1.6)) / 2) * (0.6 + 0.4 * Math.sin(tiempo * 0.5)) * subida;

  colgante.style.transform = `rotate(${pendulo.angulo}deg)`;
  cuerda.style.transform = `scaleY(${(largoCuerda + bajada) / largoCuerda})`;
  pinata.style.transform = `translateY(${bajada}px)`;

  moverPiezas(dt);
  requestAnimationFrame(animar);
}

dibujarPinata();
actualizarMarcador();
actualizarIntegridad();
requestAnimationFrame(animar);
