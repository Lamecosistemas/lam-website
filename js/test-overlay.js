(() => {
  const overlay = document.getElementById('testOverlay');
  if (!overlay) return;

  const panelTitle = overlay.querySelector('#testOverlayTitle');
  const panelSubtitle = overlay.querySelector('[data-test-subtitle]');
  const stepsEl = overlay.querySelector('[data-test-steps]');
  const optionsEl = overlay.querySelector('[data-test-options]');
  const rightEl = overlay.querySelector('[data-test-right]');
  const backBtn = overlay.querySelector('[data-test-back]');

  const TOTAL_QUESTIONS = 3;

  const nodes = {
    q1: {
      type: 'question',
      step: 1,
      title: '¿CUAL ES TU PERFIL?',
      subtitle: 'Esto nos ayudará a entender mejor tus necesidades y experiencia en el sector',
      options: [
        { label: 'Constructor independiente', next: 'q2_constructor' },
        { label: 'Entusiasta de la Construcción', next: 'q2_entusiasta' },
        { label: 'Inversionista inmobiliario', next: 'q2_inversionista' },
        { label: 'Propietario de terreno', next: 'q2_propietario' }
      ]
    },
    q2_constructor: {
      type: 'question',
      step: 2,
      title: '¿EN QUE ETAPA ESTA TU PROYECTO?',
      subtitle: 'Identifiquemos el punto de partida de tu desarrollo inmobiliario',
      options: [
        { label: 'Necesito predio para desarrollar mi proyecto', next: 'r_evaluacion', italic: true },
        {
          label: 'Tengo el predio pero necesito saber que puedo hacer en él rápidamente',
          next: 'r_preliminar',
          italic: true
        },
        {
          label: 'Ya tengo la estructura de mi proyecto pero necesito profundizar en lo técnico',
          next: 'q3_constructor',
          italic: true
        },
        {
          label: 'Estoy listo para construir, solo necesito diseños y/o licencias',
          next: 'r_disenos',
          italic: true
        }
      ]
    },
    q3_constructor: {
      type: 'question',
      step: 3,
      title: '¿CUAL ES TU PRINCIPAL PREOCUPACIÓN?',
      subtitle: 'Enfoquemonos en resolver tu principal inquietud.',
      options: [
        { label: 'Identificar y minimizar riesgos futuros', next: 'r_avanzada', italic: true },
        { label: 'Lograr el aprovechamiento mas eficiente del proyecto', next: 'r_preliminar', italic: true },
        { label: 'Revisar la viabilidad del proyecto', next: 'r_evaluacion', italic: true },
        { label: 'Diseños tecnicos confiables y licenciamiento ágil', next: 'r_disenos', italic: true }
      ]
    },

    q2_entusiasta: {
      type: 'question',
      step: 2,
      title: '¿COMO VA TU PROYECTO?',
      subtitle: 'Conozcamos tu punto de partida para ofrecerte el servicio mas adecuado',
      options: [
        { label: 'Quiero comenzar pero no se por donde', next: 'q3_entusiasta', italic: true },
        {
          label: 'Tengo una idea inicial pero deseo saber si mi proyecto es viable',
          next: 'r_preliminar',
          italic: true
        },
        {
          label: 'Ya tengo el proyecto estructurado, solo necesito diseños y licenciamiento para poder construir.',
          next: 'r_disenos',
          italic: true
        },
        { label: 'Tengo un análisis adelantado pero deseo profundizar', next: 'r_avanzada', italic: true }
      ]
    },
    q3_entusiasta: {
      type: 'question',
      step: 3,
      title: '¿CUAL ES TU SITUACIÓN?',
      subtitle: 'Esto nos ayuda a dimensionar el alcance del servicio',
      options: [
        { label: 'Ya tengo el predio en mi poder, negociado o visto', next: 'r_preliminar', italic: true },
        { label: 'No tengo aun un predio para mi idea', next: 'r_evaluacion', italic: true }
      ]
    },

    q2_inversionista: {
      type: 'question',
      step: 2,
      title: '¿CUAL ES TU NECESIDAD?',
      subtitle: 'Esto nos ayudará a entenderte mejor, para encontrar el servicio mas adecuado.',
      options: [
        { label: 'Quiero invertir en un proyecto o predio para desarrollar', next: 'r_evaluacion', italic: true },
        {
          label: 'Invertí en un lote para desarrollarlo pero no se por donde empezar',
          next: 'r_preliminar',
          italic: true
        },
        {
          label: 'Invertí en un proyecto que ya se sabe que es viable, pero necesito profundizar en lo técnico.',
          next: 'r_avanzada',
          italic: true
        },
        { label: 'Tengo una idea de proyecto estructurada y deseo hacerla realidad', next: 'q3_inversionista', italic: true }
      ]
    },
    q3_inversionista: {
      type: 'question',
      step: 3,
      title: '¿CUAL ES TU SITUACIÓN?',
      subtitle: 'Esto nos ayuda a dimensionar el alcance del servicio',
      options: [
        {
          label: 'Ya tengo casi todo estructurado, necesito diseños confiables y licenciamiento ágil',
          next: 'r_disenos',
          italic: true
        },
        { label: 'Tengo la idea básica pero deseo profundizar', next: 'r_avanzada', italic: true }
      ]
    },

    q2_propietario: {
      type: 'question',
      step: 2,
      title: '¿QUE ES LO QUE MAS TE PREOCUPA?',
      subtitle: 'Queremos asegurarnos de resolver tu necesidad mas importante',
      options: [
        { label: 'Deseo desarrollar mi predio pero no se por donde empezar', next: 'r_preliminar', italic: true },
        {
          label: 'Quiero vender mi predio al precio correcto para desarrolladores',
          next: 'r_evaluacion',
          italic: true
        },
        {
          label: 'Ya tengo la idea de desarrollo de mi predio pero necesito profundizar en algunos aspectos',
          next: 'r_avanzada',
          italic: true
        },
        { label: 'Solo necesito los diseños y/o licencias para construir', next: 'r_disenos', italic: true }
      ]
    },

    r_preliminar: {
      type: 'result',
      title: 'RECOMENDACIÓN PERSONALIZADA',
      subtitle: 'Este puede ser el servicio ideal para tu proyecto o necesidad.',
      image: 'images/servicios/card-estructuracion-preliminar.jpg',
      imageAlt: 'Estructuración Preliminar',
      href: '#estructuracion-preliminar',
      imageLabel: 'ESTRUCTURACIÓN\nPRELIMINAR'
    },
    r_avanzada: {
      type: 'result',
      title: 'RECOMENDACIÓN PERSONALIZADA',
      subtitle: 'Este puede ser el servicio ideal para tu proyecto o necesidad.',
      image: 'images/servicios/card-estructuracion-avanzada.jpg',
      imageAlt: 'Estructuración Avanzada',
      href: '#estructuracion-avanzada',
      imageLabel: 'ESTRUCTURACIÓN\nAVANZADA'
    },
    r_evaluacion: {
      type: 'result',
      title: 'RECOMENDACIÓN PERSONALIZADA',
      subtitle: 'Este puede ser el servicio ideal para tu proyecto o necesidad.',
      image: 'images/servicios/card-evaluacion-predios.jpg',
      imageAlt: 'Evaluación de Predios',
      href: '#evaluacion-predios',
      imageLabel: 'EVALUACIÓN\nDE PREDIOS'
    },
    r_disenos: {
      type: 'result',
      title: 'RECOMENDACIÓN PERSONALIZADA',
      subtitle: 'Este puede ser el servicio ideal para tu proyecto o necesidad.',
      image: 'images/servicios/card-disenos-licenciamiento.jpg',
      imageAlt: 'Diseños y Licenciamiento',
      href: '#disenos-licenciamiento',
      imageLabel: 'DISEÑOS Y\nLICENCIAMIENTO'
    }
  };

  const state = {
    currentId: 'q1',
    history: []
  };

  function isOpen() {
    return overlay.classList.contains('is-open');
  }

  function setHash(open) {
    const url = new URL(window.location.href);
    if (open) {
      if (url.hash !== '#test') {
        url.hash = 'test';
        history.replaceState(null, '', url.toString());
      }
      return;
    }

    if (url.hash === '#test') {
      url.hash = '';
      history.replaceState(null, '', url.toString());
    }
  }

  function openOverlay() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setHash(true);
    render();
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    setHash(false);
  }

  function resetTest() {
    state.currentId = 'q1';
    state.history = [];
    render();
  }

  function goBack() {
    const currentNode = nodes[state.currentId];

    if (currentNode?.type === 'result') {
      resetTest();
      return;
    }

    const prev = state.history.pop();
    if (!prev) {
      closeOverlay();
      return;
    }

    state.currentId = prev;
    render();
  }

  function renderSteps(activeStep, isResult) {
    stepsEl.innerHTML = '';

    const total = TOTAL_QUESTIONS + 1;
    for (let i = 1; i <= total; i += 1) {
      const isCheck = i === total;
      const stepEl = document.createElement('div');
      stepEl.className = 'test-step';

      if (isResult) {
        if (isCheck) {
          stepEl.classList.add('active');
        } else {
          stepEl.classList.add('done');
        }
      } else {
        if (i < activeStep) stepEl.classList.add('done');
        if (i === activeStep) stepEl.classList.add('active');
      }

      stepEl.textContent = isCheck ? '✓' : String(i);
      stepsEl.appendChild(stepEl);

      if (i !== total) {
        const connector = document.createElement('div');
        connector.className = 'test-connector';
        stepsEl.appendChild(connector);
      }
    }
  }

  function renderQuestion(node) {
    panelTitle.textContent = node.title;
    panelSubtitle.textContent = node.subtitle;

    backBtn.textContent = '← Regresar';

    renderSteps(node.step, false);

    rightEl.innerHTML = '<div class="test-options" data-test-options></div>';
    const container = rightEl.querySelector('[data-test-options]');

    node.options.forEach((option) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'test-option';
      if (option.italic) btn.classList.add('is-italic');
      btn.textContent = option.label;

      btn.addEventListener('click', () => {
        state.history.push(state.currentId);
        state.currentId = option.next;
        render();
      });

      container.appendChild(btn);
    });
  }

  function renderResult(node) {
    panelTitle.textContent = node.title;
    panelSubtitle.textContent = node.subtitle;

    backBtn.textContent = '← Volver a responder el Test';

    renderSteps(TOTAL_QUESTIONS, true);

    const labelHtml = (node.imageLabel || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join('<br>');

    // Reutiliza exactamente el markup/clases de las tarjetas de servicios.
    rightEl.innerHTML = `
      <a href="${node.href || '#'}" class="servicio-card" data-test-result-link>
        <img src="${node.image}" alt="${node.imageAlt || labelHtml.replace(/<br>/g, ' ')}">
        <div class="servicio-card-overlay"></div>
        <div class="servicio-card-content">
          <h3>${labelHtml}</h3>
        </div>
      </a>
    `;

    const resultLink = rightEl.querySelector('[data-test-result-link]');
    if (resultLink instanceof HTMLAnchorElement) {
      resultLink.addEventListener('click', (e) => {
        const href = node.href || '#';
        if (typeof href !== 'string') return;

        // Cierra el overlay para que el usuario vea la navegación/scroll.
        e.preventDefault();
        closeOverlay();

        // Si es un ancla (como en servicios.html), desde otras páginas redirige a servicios.html.
        if (href.startsWith('#')) {
          const path = window.location.pathname.toLowerCase();
          const inServiciosPage = path.endsWith('/servicios.html') || path.endsWith('servicios.html');

          if (inServiciosPage) {
            window.location.hash = href;
          } else {
            window.location.href = `servicios.html${href}`;
          }

          return;
        }

        window.location.href = href;
      });
    }
  }

  function render() {
    const node = nodes[state.currentId];
    if (!node) {
      resetTest();
      return;
    }

    if (node.type === 'question') {
      renderQuestion(node);
      return;
    }

    renderResult(node);
  }

  // Triggers
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const opener = target.closest('[data-open-test]');
    if (!opener) return;

    e.preventDefault();
    if (!isOpen()) openOverlay();
  });

  backBtn.addEventListener('click', goBack);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeOverlay();
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#test') {
      if (!isOpen()) openOverlay();
      return;
    }

    if (isOpen()) closeOverlay();
  });

  // Auto-open
  if (window.location.hash === '#test') {
    openOverlay();
  }
})();
