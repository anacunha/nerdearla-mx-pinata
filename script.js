// ===== HNR LABS — JAILBREAK THE PIÑATA =====
// Icosaedro interactivo: 20 caras triangulares

// Premios dentro del icosaedro
const dulces = [
  '🎟️', '🎫', '🎸', '🤘',
  '🥭', '🍊', '🍍', '🍉',
  '🍬', '🍭', '🍫', '🥜',
  '🍪', '🍡', '🍬', '🍭',
  '🎟️', '🎸', '🥭', '🍊'
];

// Configuración
const resistenciaInicial = 20;
const travesura = 3;
const ESCALA = 72;
const RADIO = 155;

// Elementos del DOM
const patio = document.querySelector('#patio');
const colgante = document.querySelector('#colgante');
const cuerda = document.querySelector('#cuerda');
const pinata = document.querySelector('#pinata');
const dibujo = document.querySelector('#dibujo');
const verso = document.querySelector('#verso');
const marcador = document.querySelector('#marcador');
const final = document.querySelector('#final');
const resumen = document.querySelector('#resumen');
const otra = document.querySelector('#otra');
const capa = document.querySelector('#capa');
const palo = document.querySelector('#palo');
const bolsa = document.querySelector('#bolsa');
const contadorBolsa = document.querySelector('#contador-bolsa');

// Estado del juego
let resistencia = resistenciaInicial;
let golpes = 0;
let dulcesRecogidos = 0;
let juegoTerminado = false;
let golpeando = false;
let moviendo = false;
let posicionPalo = { x: 0, y: 0 };
let angulo = 0;
let direccion = 1;
let animacionPalo = null;
let animacionPinata = null;
let carasIcosaedro = [];

// Versos del juego
const versos = [
  '¡Dale con ganas!',
  '¡Que caigan los dulces!',
  '¡Más fuerte!',
  '¡La piñata no se rinde!',
  '¡Ya casi, ya casi!',
  '¡Un golpe más!',
  '¡Que viva la fiesta!'
];

// ===== CREAR VÉRTICES DEL ICOSAEDRO =====

function crearVerticesIcosaedro() {
  const phi = (1 + Math.sqrt(5)) / 2;

  const vertices = [
    [-1,  phi,  0],
    [ 1,  phi,  0],
    [-1, -phi,  0],
    [ 1, -phi,  0],

    [ 0, -1,  phi],
    [ 0,  1,  phi],
    [ 0, -1, -phi],
    [ 0,  1, -phi],

    [ phi,  0, -1],
    [ phi,  0,  1],
    [-phi,  0, -1],
    [-phi,  0,  1]
  ];

  return vertices.map(([x, y, z]) => {
    const factor = ESCALA;

    let px = x * factor;
    let py = y * factor;
    let pz = z * factor;

    // Rotación sobre el eje X
    const rotX = 0.35;

    const y1 = py * Math.cos(rotX) - pz * Math.sin(rotX);
    const z1 = py * Math.sin(rotX) + pz * Math.cos(rotX);

    py = y1;
    pz = z1;

    // Rotación sobre el eje Y
    const rotY = 0.45;

    const x2 = px * Math.cos(rotY) + pz * Math.sin(rotY);
    const z2 = -px * Math.sin(rotY) + pz * Math.cos(rotY);

    px = x2;
    pz = z2;

    return {
      x: px,
      y: py,
      z: z2
    };
  });
}

// ===== DISTANCIA ENTRE VÉRTICES =====

function distancia(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;

  return dx * dx + dy * dy + dz * dz;
}

// ===== DETECTAR LAS 20 CARAS =====

function crearCaras(vertices) {
  const caras = [];

  // Las aristas originales miden 2 unidades.
  // Después de escalar por ESCALA, su distancia al cuadrado
  // es 4 * ESCALA * ESCALA.
  const distanciaArista = 4 * ESCALA * ESCALA;

  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      for (let k = j + 1; k < vertices.length; k++) {
        const a = vertices[i];
        const b = vertices[j];
        const c = vertices[k];

        const ab = distancia(a, b);
        const ac = distancia(a, c);
        const bc = distancia(b, c);

        if (
          Math.abs(ab - distanciaArista) < 0.01 &&
          Math.abs(ac - distanciaArista) < 0.01 &&
          Math.abs(bc - distanciaArista) < 0.01
        ) {
          const centro = {
            x: (a.x + b.x + c.x) / 3,
            y: (a.y + b.y + c.y) / 3,
            z: (a.z + b.z + c.z) / 3
          };

          caras.push({
            vertices: [a, b, c],
            centro,
            grupo: null
          });
        }
      }
    }
  }

  // Dibujar primero las caras más alejadas
  caras.sort((a, b) => a.centro.z - b.centro.z);

  return caras;
}

// ===== DIBUJAR EL ICOSAEDRO =====

function dibujarIcosaedro() {
  const vertices = crearVerticesIcosaedro();
  const caras = crearCaras(vertices);

  dibujo.innerHTML = '';

  const colores = [
    'relleno-1',
    'relleno-2',
    'relleno-3'
  ];

  caras.forEach((cara, index) => {
    const grupo = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );

    grupo.setAttribute('class', 'cara-icosaedro');

    const poligono = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );

    const puntos = cara.vertices
      .map(v => `${v.x},${v.y}`)
      .join(' ');

    poligono.setAttribute('points', puntos);
    poligono.setAttribute(
      'class',
      colores[index % colores.length]
    );

    grupo.appendChild(poligono);

    const centro = cara.centro;

    const detalle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    detalle.setAttribute('cx', centro.x);
    detalle.setAttribute('cy', centro.y);
    detalle.setAttribute('r', '3');
    detalle.setAttribute('fill', '#C7B182');
    detalle.setAttribute('opacity', '0.65');

    grupo.appendChild(detalle);

    dibujo.appendChild(grupo);

    cara.grupo = grupo;
  });

  carasIcosaedro = caras;

  if (caras.length !== 20) {
    console.error(
      `Error: se esperaban 20 caras y se generaron ${caras.length}.`
    );
  }
}

// ===== MOVIMIENTO DEL PÉNDULO =====

function moverPinata() {
  if (juegoTerminado || !colgante) return;

  angulo += 0.025 * direccion;

  if (angulo > 0.25 || angulo < -0.25) {
    direccion *= -1;
  }

  colgante.style.transform = `rotate(${angulo}rad)`;

  animacionPinata = requestAnimationFrame(moverPinata);
}

// ===== GOLPEAR LA PIÑATA =====

function golpear() {
  if (juegoTerminado || golpeando || resistencia <= 0) {
    return;
  }

  golpeando = true;
  golpes++;

  resistencia--;

  if (marcador) {
    marcador.textContent = resistencia;
  }

  if (verso) {
    verso.textContent =
      versos[Math.floor(Math.random() * versos.length)];
  }

  if (palo) {
    palo.classList.add('golpe');
  }

  if (pinata) {
    pinata.classList.add('impacto');
  }

  if (resistencia <= 0) {
    setTimeout(() => {
      romper();
    }, 250);
  } else {
    crearGrieta();
  }

  setTimeout(() => {
    golpeando = false;

    if (palo) {
      palo.classList.remove('golpe');
    }

    if (pinata) {
      pinata.classList.remove('impacto');
    }
  }, 300);
}

// ===== CREAR GRIETAS =====

function crearGrieta() {
  const grieta = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );

  const x = (Math.random() - 0.5) * RADIO;
  const y = (Math.random() - 0.5) * RADIO;

  const x2 = x + (Math.random() - 0.5) * 55;
  const y2 = y + (Math.random() - 0.5) * 55;

  const x3 = x2 + (Math.random() - 0.5) * 40;
  const y3 = y2 + (Math.random() - 0.5) * 40;

  grieta.setAttribute(
    'd',
    `M ${x} ${y} L ${x2} ${y2} L ${x3} ${y3}`
  );

  grieta.setAttribute('class', 'grieta');

  dibujo.appendChild(grieta);
}

// ===== ROMPER LA PIÑATA =====

function romper() {
  if (juegoTerminado) return;

  juegoTerminado = true;

  cancelAnimationFrame(animacionPinata);

  if (verso) {
    verso.textContent = '¡LA PIÑATA SE ROMPIÓ!';
  }

  if (pinata) {
    pinata.style.opacity = '0';
  }

  crearFragmentos();
  lanzarConfeti();
  lanzarDulces();

  setTimeout(() => {
    if (final) {
      final.classList.add('visible');
    }

    if (resumen) {
      resumen.textContent =
        `¡La rompiste en ${golpes} golpes! Recoge los dulces.`;
    }
  }, 800);
}

// ===== FRAGMENTOS DEL ICOSAEDRO =====

function crearFragmentos() {
  const tam = dibujo.offsetWidth || 400;

  carasIcosaedro.forEach((cara, index) => {
    if (!cara.grupo) return;

    const fragmento = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );

    fragmento.setAttribute(
      'viewBox',
      '-200 -200 400 400'
    );

    fragmento.setAttribute('width', tam);
    fragmento.setAttribute('height', tam);
    fragmento.setAttribute('class', 'fragmento');

    const copia = cara.grupo.cloneNode(true);

    fragmento.appendChild(copia);

    if (capa) {
      capa.appendChild(fragmento);
    }

    const centroX = cara.centro.x + 200;
    const centroY = cara.centro.y + 200;

    fragmento.style.position = 'absolute';
    fragmento.style.left = '50%';
    fragmento.style.top = '50%';
    fragmento.style.width = `${tam}px`;
    fragmento.style.height = `${tam}px`;
    fragmento.style.overflow = 'visible';
    fragmento.style.pointerEvents = 'none';

    fragmento.style.transformOrigin =
      `${centroX / 400 * 100}% ${centroY / 400 * 100}%`;

    const anguloFragmento =
      (Math.random() - 0.5) * 100;

    const distanciaFragmento =
      120 + Math.random() * 180;

    const destinoX =
      Math.cos(index * 2.4) * distanciaFragmento;

    const destinoY =
      Math.sin(index * 2.4) * distanciaFragmento;

    fragmento.animate(
      [
        {
          transform: 'translate(0, 0) rotate(0deg)',
          opacity: 1
        },
        {
          transform:
            `translate(${destinoX}px, ${destinoY}px) rotate(${anguloFragmento}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 900 + Math.random() * 500,
        easing: 'cubic-bezier(.2,.7,.3,1)',
        fill: 'forwards'
      }
    );
  });
}

// ===== CONFETI =====

function lanzarConfeti() {
  if (!capa) return;

  const colores = [
    '#C7B182',
    '#634F5F',
    '#E4007C',
    '#FFC21A',
    '#00A6A6',
    '#FFFFFF'
  ];

  for (let i = 0; i < 70; i++) {
    const pieza = document.createElement('div');

    pieza.className = 'confeti';

    pieza.style.position = 'absolute';
    pieza.style.left = `${Math.random() * 100}%`;
    pieza.style.top = `${Math.random() * 30}%`;
    pieza.style.width = `${5 + Math.random() * 7}px`;
    pieza.style.height = `${5 + Math.random() * 10}px`;
    pieza.style.background =
      colores[Math.floor(Math.random() * colores.length)];

    capa.appendChild(pieza);

    const destinoX =
      (Math.random() - 0.5) * 500;

    const destinoY =
      250 + Math.random() * 300;

    pieza.animate(
      [
        {
          transform: 'translate(0, 0) rotate(0deg)',
          opacity: 1
        },
        {
          transform:
            `translate(${destinoX}px, ${destinoY}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 1800 + Math.random() * 1500,
        easing: 'ease-out',
        fill: 'forwards'
      }
    );
  }
}

// ===== LANZAR DULCES =====

function lanzarDulces() {
  if (!capa) return;

  const cantidad = 28;

  for (let i = 0; i < cantidad; i++) {
    const dulce = document.createElement('button');

    dulce.type = 'button';
    dulce.className = 'dulce';

    dulce.textContent =
      dulces[Math.floor(Math.random() * dulces.length)];

    dulce.setAttribute('aria-label', 'Recoger dulce');

    dulce.style.position = 'absolute';
    dulce.style.left = '50%';
    dulce.style.top = '50%';
    dulce.style.border = '0';
    dulce.style.background = 'transparent';
    dulce.style.fontSize = `${22 + Math.random() * 12}px`;
    dulce.style.cursor = 'pointer';
    dulce.style.zIndex = '10';

    const destinoX =
      (Math.random() - 0.5) * 350;

    const destinoY =
      (Math.random() - 0.5) * 280;

    dulce.animate(
      [
        {
          transform: 'translate(-50%, -50%) scale(.3)',
          opacity: 0
        },
        {
          transform:
            `translate(calc(-50% + ${destinoX}px), calc(-50% + ${destinoY}px)) scale(1)`,
          opacity: 1
        }
      ],
      {
        duration: 700 + Math.random() * 500,
        easing: 'cubic-bezier(.2,.7,.3,1)',
        fill: 'forwards'
      }
    );

    dulce.addEventListener('click', () => {
      if (dulce.classList.contains('recogido')) return;

      dulce.classList.add('recogido');
      dulce.style.pointerEvents = 'none';

      dulce.animate(
        [
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(0)', opacity: 0 }
        ],
        {
          duration: 250,
          fill: 'forwards'
        }
      );

      dulcesRecogidos++;

      if (contadorBolsa) {
        contadorBolsa.textContent = dulcesRecogidos;
      }

      setTimeout(() => {
        dulce.remove();
      }, 260);
    });

    capa.appendChild(dulce);
  }
}

// ===== CONTROL DEL PALO =====

function iniciarMovimiento(event) {
  if (juegoTerminado || moviendo) return;

  moviendo = true;

  const punto = obtenerPunto(event);

  posicionPalo = punto;

  if (palo) {
    palo.style.left = `${punto.x}px`;
    palo.style.top = `${punto.y}px`;
  }
}

function moverPalo(event) {
  if (!moviendo || juegoTerminado) return;

  const punto = obtenerPunto(event);

  posicionPalo = punto;

  if (palo) {
    palo.style.left = `${punto.x}px`;
    palo.style.top = `${punto.y}px`;
  }
}

function terminarMovimiento() {
  if (!moviendo) return;

  moviendo = false;

  golpear();
}

function obtenerPunto(event) {
  const rect = patio.getBoundingClientRect();

  const touch =
    event.touches && event.touches.length
      ? event.touches[0]
      : event.changedTouches && event.changedTouches.length
        ? event.changedTouches[0]
        : event;

  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

// ===== EVENTOS DEL JUEGO =====

if (patio) {
  patio.addEventListener('pointerdown', event => {
    if (
      event.target.closest('button') ||
      event.target.closest('#otra')
    ) {
      return;
    }

    iniciarMovimiento(event);
  });

  patio.addEventListener('pointermove', moverPalo);
  patio.addEventListener('pointerup', terminarMovimiento);
  patio.addEventListener('pointercancel', terminarMovimiento);
}

// Golpe con teclado
document.addEventListener('keydown', event => {
  if (
    event.code === 'Space' ||
    event.code === 'Enter'
  ) {
    if (
      event.target.tagName === 'BUTTON' ||
      event.target.tagName === 'INPUT'
    ) {
      return;
    }

    event.preventDefault();
    golpear();
  }
});

// ===== REINICIAR JUEGO =====

function reiniciarJuego() {
  resistencia = resistenciaInicial;
  golpes = 0;
  dulcesRecogidos = 0;
  juegoTerminado = false;
  golpeando = false;
  moviendo = false;
  angulo = 0;
  direccion = 1;

  cancelAnimationFrame(animacionPinata);
  cancelAnimationFrame(animacionPalo);

  if (marcador) {
    marcador.textContent = resistencia;
  }

  if (contadorBolsa) {
    contadorBolsa.textContent = '0';
  }

  if (final) {
    final.classList.remove('visible');
  }

  if (capa) {
    capa.innerHTML = '';
  }

  if (pinata) {
    pinata.style.opacity = '1';
    pinata.style.transform = '';
    pinata.classList.remove('impacto');
  }

  if (colgante) {
    colgante.style.transform = 'rotate(0rad)';
  }

  if (palo) {
    palo.classList.remove('golpe');
  }

  if (verso) {
    verso.textContent = '¡Dale con ganas!';
  }

  dibujarIcosaedro();
  moverPinata();
}

if (otra) {
  otra.addEventListener('click', reiniciarJuego);
}

// ===== INICIAR =====

function iniciarJuego() {
  if (!dibujo || !patio || !pinata) {
    console.error(
      'HNR Labs: faltan elementos necesarios en index.html.'
    );
    return;
  }

  dibujarIcosaedro();

  if (marcador) {
    marcador.textContent = resistencia;
  }

  if (contadorBolsa) {
    contadorBolsa.textContent = '0';
  }

  moverPinata();
}

iniciarJuego();
