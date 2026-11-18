// ==========================================
// 1. LÓGICA DE VOCABULARIO
// ==========================================

window.appLoaded = true;

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');
}


let tipoFiltroActivo = 'todos';

function setFiltroTipo(tipo, btn) {
  tipoFiltroActivo = tipo;
  // Actualizar estilos de los botones
  document.querySelectorAll('.vocab-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Volver a renderizar
  renderVocabulario();
}

function renderVocabulario() {
  const listContainer = document.getElementById('vocabList');
  if (!listContainer) return;

  if (typeof VOCABULARIO === 'undefined') {
    listContainer.innerHTML = `<div class="construction-msg"><h2>Error</h2><p>No se encontró datos_vocabulario.js</p></div>`;
    return;
  }

  const query = norm(document.getElementById('searchInput').value || '').trim();
  const levelFilter = document.getElementById('levelFilter').value;

  // Mostrar/ocultar botón de borrar búsqueda
  const clearBtn = document.getElementById('vocabClearBtn');
  if (clearBtn) clearBtn.style.display = query.length > 0 ? 'block' : 'none';

  const filtrados = VOCABULARIO.filter(item => {
    // Filtro de nivel
    if (levelFilter && !item.lecturas.some(l => l.nivel === levelFilter)) return false;

    // Filtro de tipo
    if (tipoFiltroActivo !== 'todos' && item.tipo !== tipoFiltroActivo) return false;

    // Filtro de búsqueda
    if (query) {
      const matchWord = norm(item.palabra).includes(query);
      const matchReadings = item.lecturas.some(l =>
      norm(l.lectura).includes(query) ||
      norm(l.traduccion).includes(query)
      );
      if (!matchWord && !matchReadings) return false;
    }
    return true;
  });

  if (filtrados.length === 0) {
    listContainer.innerHTML = `<div class="construction-msg"><h2>Sin resultados</h2></div>`;
    return;
  }

  let html = '';
  window.VOCAB_FILTRADO = filtrados;

  filtrados.forEach((item, index) => {
    const isVerb = item.tipo === 'verbo';
    const typeLabel = item.tipo.replace('_', ' ').toUpperCase();
    const mainReading = (levelFilter && item.lecturas.find(l => l.nivel === levelFilter)) || item.lecturas[0];

    html += `
    <div class="vocab-item">
    <div class="vocab-info">
    <span class="vocab-word">${item.palabra}</span>
    <span class="vocab-reading">${mainReading.lectura}</span>
    <span class="vocab-trans">${mainReading.traduccion}</span>
    </div>
    <div class="vocab-meta">
    <span class="vocab-type ${isVerb ? 'type-verb' : ''}">${typeLabel} ${isVerb && item.grupo ? '(G' + item.grupo + ')' : ''}</span>
    <span class="vocab-level">${mainReading.nivel}</span>
    ${isVerb ? `<button class="verb-btn" onclick="abrirModal(${index})">Ver formas ↗</button>` : ''}
    </div>
    </div>
    `;
  });

  listContainer.innerHTML = html;
}

function abrirModal(index) {
  const verbo = window.VOCAB_FILTRADO[index];
  if (!verbo || !verbo.conjugaciones) return;

  const modalId = `modal-dinamico`;
  const oldModal = document.getElementById(modalId);
  if (oldModal) oldModal.remove();

  const mainReading = verbo.lecturas[0];

  const modalHTML = `
  <div class="modal-overlay active" id="${modalId}" onclick="if(event.target===this) cerrarModal('${modalId}')">
  <div class="modal-content" role="dialog" aria-modal="true">
  <div class="modal-header">
  <div>
  <div class="modal-title">${verbo.palabra} (${mainReading.lectura})</div>
  <div class="modal-subtitle">${mainReading.traduccion} — ${verbo.transitivo ? 'Transitivo' : 'Intransitivo'}</div>
  </div>
  <button class="modal-close" aria-label="Cerrar" onclick="cerrarModal('${modalId}')">✕</button>
  </div>
  <div class="modal-body">
  <table class="conj-table">
  <tr><td class="conj-label">Indicativa:</td><td class="conj-val">${verbo.conjugaciones.indicativa}</td></tr>
  <tr><td class="conj-label">Progresiva:</td><td class="conj-val">${verbo.conjugaciones.progresiva}</td></tr>
  <tr><td class="conj-label">Pasada:</td><td class="conj-val">${verbo.conjugaciones.pasada}</td></tr>
  <tr><td class="conj-label">Negativa:</td><td class="conj-val">${verbo.conjugaciones.negativa}</td></tr>
  <tr><td class="conj-label">Imperativa:</td><td class="conj-val">${verbo.conjugaciones.imperativa}</td></tr>
  <tr><td class="conj-label">Potencial:</td><td class="conj-val">${verbo.conjugaciones.potencial}</td></tr>
  <tr><td class="conj-label">Condicional:</td><td class="conj-val">${verbo.conjugaciones.condicional}</td></tr>
  <tr><td class="conj-label">Volitiva:</td><td class="conj-val">${verbo.conjugaciones.volitiva}</td></tr>
  ${verbo.pareja ? `<tr><td class="conj-label conj-label-accent">Pareja:</td><td class="conj-val">${verbo.pareja}</td></tr>` : ''}
  </table>
  </div>
  </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.addEventListener('keydown', escModal);
  document.body.style.overflow = 'hidden';
}

function escModal(e) {
  if (e.key === 'Escape') cerrarModal('modal-dinamico');
}

function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
    document.removeEventListener('keydown', escModal);
    document.body.style.overflow = '';
  }
}

const EXC_G1_COMO_G2 = [
  ['帰る', 'かえる'], ['入る', 'はいる'], ['切る', 'きる'], ['走る', 'はしる'],
['知る', 'しる'], ['減る', 'へる'], ['要る', 'いる']
];
const EXC_PAREJAS = [
  { g1: ['帰る', 'かえる'], g2: ['変える'] },
{ g1: ['切る', 'きる'],   g2: ['着る'] }
];
const EXC_FORMAS = {
  te:         { titulo: 'forma て',     g1: s => s + 'って',   g2: s => s + 'て' },
  masu:       { titulo: 'forma ます',   g1: s => s + 'ります', g2: s => s + 'ます' },
  masuPasado: { titulo: 'forma ました', g1: s => s + 'りました', g2: s => s + 'ました' },
  nai:        { titulo: 'forma ない',   g1: s => s + 'らない', g2: s => s + 'ない' },
  ta:         { titulo: 'forma た',     g1: s => s + 'った',   g2: s => s + 'た' }
};
const stem = v => v.slice(0, -1);

function abrirExcepciones(clave) {
  const cfg = EXC_FORMAS[clave];
  if (!cfg) return;
  const modalId = 'modal-dinamico';
  const old = document.getElementById(modalId);
  if (old) old.remove();

  const fila = (a, b) => `<tr><td class="conj-label">${a}</td><td class="conj-val">${b}</td></tr>`;
  const verbos = EXC_G1_COMO_G2.map(([k, r]) => fila(`${k} (${r})`, cfg.g1(stem(k)))).join('');
  const parejas = EXC_PAREJAS.map(p => fila(
    `${p.g1[0]} / ${p.g2[0]} (${p.g1[1]})`,
                                            `${cfg.g1(stem(p.g1[0]))} / ${cfg.g2(stem(p.g2[0]))}`
  )).join('');

  document.body.insertAdjacentHTML('beforeend', `
  <div class="modal-overlay active" id="${modalId}" onclick="if(event.target===this) cerrarModal('${modalId}')">
  <div class="modal-content" role="dialog" aria-modal="true">
  <div class="modal-header">
  <div>
  <div class="modal-title">Excepciones · ${cfg.titulo}</div>
  <div class="modal-subtitle">Parecen Grupo 2, pero son Grupo 1: aplica la regla del Grupo 1</div>
  </div>
  <button class="modal-close" aria-label="Cerrar" onclick="cerrarModal('${modalId}')">✕</button>
  </div>
  <div class="modal-body">
  <table class="conj-table">
  ${verbos}
  <tr><td colspan="2" class="conj-label conj-section">Parejas que se confunden (Grupo 1 / Grupo 2)</td></tr>
  ${parejas}
  </table>
  </div>
  </div>
  </div>`);
  document.addEventListener('keydown', escModal);
  document.body.style.overflow = 'hidden';
}

function filterVocab() {
  renderVocabulario();
}

// ==========================================
// 2. LÓGICA DE GRAMÁTICA (Acordeón + Buscador)
// ==========================================

let catActiva = 0;
let subcatActiva = 0;
let modoBusqueda = false;
let estadoPrevioBusqueda = null;

function renderGramaticaSidebar() {
  const sidebar = document.getElementById('gramSidebar');
  if (!sidebar) return;

  if (typeof GRAMATICA === 'undefined') {
    sidebar.innerHTML = '<div class="side-msg side-error">Error: datos_gramatica.js no cargado.</div>';
    return;
  }

  let html = '';

  GRAMATICA.forEach((cat, catIndex) => {
    html += `
    <div class="main-cat" id="cat-title-${catIndex}" onclick="toggleCategoria(${catIndex})">
    <span>${cat.categoria}</span>
    <span class="cat-icon">▶</span>
    </div>`;

    html += `<div class="subcat-container" id="subcat-container-${catIndex}">`;

    cat.subcategorias.forEach((subcat, subIndex) => {
      html += `
      <div class="sub-cat" id="subcat-${catIndex}-${subIndex}"
      onclick="mostrarSubcategoria(${catIndex}, ${subIndex}); entrarDetalle()">
      ${subcat.nombre}
      </div>`;
    });
    html += `</div>`;
  });
  sidebar.innerHTML = html;
}

function toggleCategoria(catIndex) {
  const container = document.getElementById(`subcat-container-${catIndex}`);
  const title = document.getElementById(`cat-title-${catIndex}`);

  const isHidden = !container.classList.contains('open');

  // Cerrar todas
  GRAMATICA.forEach((_, i) => {
    document.getElementById(`subcat-container-${i}`).classList.remove('open');
    document.getElementById(`cat-title-${i}`).classList.remove('open');
  });

  if (isHidden) {
    container.classList.add('open');
    title.classList.add('open');
    catActiva = catIndex;

    if (GRAMATICA[catIndex].subcategorias.length > 0) {
      mostrarSubcategoria(catIndex, 0);
    }
  } else {
    catActiva = -1;
    subcatActiva = -1;
    document.getElementById('gramHeader').style.display = 'none';
    document.getElementById('gramRulesList').innerHTML = '<div class="construction-msg"><h2>Selecciona un tema</h2><p>A la izquierda tienes los conceptos gramaticales.</p></div>';
  }
}

function mostrarSubcategoria(catIndex, subIndex) {
  if (!modoBusqueda && catActiva !== catIndex) {
    toggleCategoria(catIndex);
  }

  catActiva = catIndex;
  subcatActiva = subIndex;

  // Resaltar en sidebar
  document.querySelectorAll('.sub-cat').forEach(el => el.classList.remove('active'));

  const activeBtn = document.getElementById(`subcat-${catIndex}-${subIndex}`) || document.getElementById(`search-subcat-${catIndex}-${subIndex}`);
  if (activeBtn) activeBtn.classList.add('active');

  const cat = GRAMATICA[catIndex];
  const subcat = cat.subcategorias[subIndex];

  document.getElementById('gramHeader').style.display = 'block';
  document.getElementById('gramSubcategoryTitle').textContent = subcat.nombre;

  const content = document.getElementById('gramRulesList');
  let html = '';

  const query = document.getElementById('gramSearchInput').value.toLowerCase().trim();

  subcat.usos.forEach(uso => {
    if (modoBusqueda && query !== '') {
      const coincide = uso.patron.toLowerCase().includes(query) ||
      uso.significado.toLowerCase().includes(query) ||
      uso.forma.toLowerCase().includes(query) ||
      (uso.explicacion && uso.explicacion.toLowerCase().includes(query));
      if (!coincide) return;
    }

    html += `
    <div class="rule-card">
    <h3 class="rule-pattern">${uso.patron}</h3>
    <div class="rule-meaning">${uso.significado}</div>

    <div class="rule-form"><strong>Forma:</strong> <span>${uso.forma}</span></div>
    <div class="rule-explain">${uso.explicacion}</div>

    <div class="rule-examples">
    <div class="rule-examples-title">Ejemplos</div>
    ${uso.ejemplos.map(e => `
      <div class="rule-example">
      <div class="rule-example-jp">${e.jp}</div>
      <div class="rule-example-es">${e.es}</div>
      </div>`).join('')}
      </div>

      ${uso.excepciones ? `<div class="rule-note"><strong>Excepciones:</strong> ${uso.excepciones}</div>` : ''}
      ${uso.errores ? `<div class="rule-note"><strong>Errores típicos:</strong> ${uso.errores}</div>` : ''}
      </div>`;
  });

  if (html === '') {
    html = '<div class="rules-empty">No hay reglas que coincidan con la búsqueda.</div>';
  }

  content.innerHTML = html;
}

function filtrarGramatica() {
  const query = document.getElementById('gramSearchInput').value.toLowerCase().trim();
  const clearBtn = document.getElementById('gramClearBtn');
  const sidebar = document.getElementById('gramSidebar');

  clearBtn.style.display = query.length > 0 ? 'block' : 'none';

  if (!query) {
    modoBusqueda = false;
    renderGramaticaSidebar();
    const prev = estadoPrevioBusqueda;
    estadoPrevioBusqueda = null;
    if (prev && prev.cat !== -1) {
      toggleCategoria(prev.cat);
      mostrarSubcategoria(prev.cat, prev.sub);
    } else if (catActiva !== -1) toggleCategoria(catActiva);
    return;
  }

  if (!modoBusqueda) estadoPrevioBusqueda = { cat: catActiva, sub: subcatActiva };
  modoBusqueda = true;
  let html = '';
  let primerResultadoCat = -1;
  let primerResultadoSub = -1;

  GRAMATICA.forEach((cat, catIndex) => {
    let catHtml = '';
    let catHasResults = false;

    cat.subcategorias.forEach((subcat, subIndex) => {
      const usosFiltrados = subcat.usos.filter(uso =>
      uso.patron.toLowerCase().includes(query) ||
      uso.significado.toLowerCase().includes(query) ||
      uso.forma.toLowerCase().includes(query) ||
      (uso.explicacion && uso.explicacion.toLowerCase().includes(query))
      );

      if (usosFiltrados.length > 0) {
        catHasResults = true;
        if (primerResultadoCat === -1) {
          primerResultadoCat = catIndex;
          primerResultadoSub = subIndex;
        }

        if (catHtml === '') {
          catHtml += `<div class="search-cat">${cat.categoria}</div>`;
        }

        catHtml += `
        <div class="sub-cat" id="search-subcat-${catIndex}-${subIndex}"
        onclick="mostrarSubcategoria(${catIndex}, ${subIndex}); entrarDetalle()">
        ${subcat.nombre} <span class="sub-count">(${usosFiltrados.length})</span>
        </div>
        `;
      }
    });

    if (catHasResults) html += catHtml;
  });

    if (html === '') {
      sidebar.innerHTML = '<div class="side-msg">No se encontraron reglas.</div>';
      document.getElementById('gramHeader').style.display = 'none';
      document.getElementById('gramRulesList').innerHTML = '';
      return;
    }

    sidebar.innerHTML = html;

    if (primerResultadoCat !== -1) {
      mostrarSubcategoria(primerResultadoCat, primerResultadoSub);
    }
}

function limpiarBusquedaGramatica() {
  document.getElementById('gramSearchInput').value = '';
  filtrarGramatica();
}

function entrarDetalle() {
  document.getElementById('gramLayout').classList.add('detalle');
  document.getElementById('gramContent').scrollTop = 0;
}

function volverALista() {
  document.getElementById('gramLayout').classList.remove('detalle');
}

function cambiarTema(valor) {
  const root = document.documentElement;
  if (valor === 'light' || valor === 'dark') root.dataset.theme = valor;
  else delete root.dataset.theme;
  try {
    if (valor === 'light' || valor === 'dark') localStorage.setItem('tema', valor);
    else localStorage.removeItem('tema');
  } catch (e) {}
}

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  try { const t = localStorage.getItem('tema'); document.getElementById('themeSelect').value = (t === 'light' || t === 'dark') ? t : 'system'; } catch (e) {}
  renderVocabulario();
  renderGramaticaSidebar();
  // Abrir la primera categoría por defecto
  if (typeof GRAMATICA !== 'undefined' && GRAMATICA.length > 0) {
    toggleCategoria(0);
  }
});
