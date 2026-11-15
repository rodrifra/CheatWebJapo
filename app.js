// ==========================================
// 1. LÓGICA DE VOCABULARIO
// ==========================================

window.appLoaded = true;

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

  const query = (document.getElementById('searchInput').value || '').toLowerCase().trim();
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
      const matchWord = item.palabra.toLowerCase().includes(query);
      const matchReadings = item.lecturas.some(l =>
      l.lectura.toLowerCase().includes(query) ||
      l.traduccion.toLowerCase().includes(query)
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
    const mainReading = item.lecturas[0];

    html += `
    <div class="vocab-item" style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 0.5rem;">
    <div class="vocab-info">
    <span class="vocab-word">${item.palabra}</span>
    <span class="vocab-reading">${mainReading.lectura}</span>
    <span class="vocab-trans">${mainReading.traduccion}</span>
    </div>
    <div style="display:flex; gap:1rem; align-items:center;">
    <span class="vocab-type ${isVerb ? 'type-verb' : ''}">${typeLabel} ${isVerb && item.grupo ? '(G' + item.grupo + ')' : ''}</span>
    <span style="font-size:0.75rem; color:var(--text-muted);">${mainReading.nivel}</span>
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
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <div class="modal-title">${verbo.palabra} (${mainReading.lectura})</div>
            <div class="modal-subtitle">${mainReading.traduccion} — ${verbo.transitivo ? 'Transitivo' : 'Intransitivo'}</div>
          </div>
          <button class="modal-close" onclick="cerrarModal('${modalId}')">✕</button>
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
            ${verbo.pareja ? `<tr><td class="conj-label" style="color:var(--accent-jp)">Pareja:</td><td class="conj-val">${verbo.pareja}</td></tr>` : ''}
          </table>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
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

function renderGramaticaSidebar() {
  const sidebar = document.getElementById('gramSidebar');
  if (!sidebar) return;

  if (typeof GRAMATICA === 'undefined') {
    sidebar.innerHTML = '<div style="padding: 1rem; color: red;">Error: datos_gramatica.js no cargado.</div>';
    return;
  }

  let html = '';

  GRAMATICA.forEach((cat, catIndex) => {
    html += `
    <div class="main-cat" id="cat-title-${catIndex}"
    style="padding: 1rem; font-weight: bold; color: var(--text-primary); border-bottom: 1px solid var(--border); cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
    onclick="toggleCategoria(${catIndex})">
    <span>${cat.categoria}</span>
    <span id="cat-icon-${catIndex}" style="font-size: 0.8rem; transition: transform 0.2s;">▶</span>
    </div>
    `;

    html += `<div id="subcat-container-${catIndex}" style="display: none; background: var(--surface); border-bottom: 1px solid var(--border);">`;

    cat.subcategorias.forEach((subcat, subIndex) => {
      html += `
      <div class="sub-cat" id="subcat-${catIndex}-${subIndex}"
      style="padding: 0.6rem 1rem 0.6rem 2rem; cursor: pointer; font-size: 0.9rem; color: var(--text-muted); border-left: 3px solid transparent; transition: all 0.2s;"
      onclick="mostrarSubcategoria(${catIndex}, ${subIndex})">
      ${subcat.nombre}
      </div>
      `;
    });

    html += `</div>`;
  });

  sidebar.innerHTML = html;
}

function toggleCategoria(catIndex) {
  const container = document.getElementById(`subcat-container-${catIndex}`);
  const icon = document.getElementById(`cat-icon-${catIndex}`);
  const title = document.getElementById(`cat-title-${catIndex}`);

  const isHidden = container.style.display === 'none';

  // Cerrar todas
  GRAMATICA.forEach((_, i) => {
    document.getElementById(`subcat-container-${i}`).style.display = 'none';
    document.getElementById(`cat-icon-${i}`).style.transform = 'rotate(0deg)';
    document.getElementById(`cat-title-${i}`).style.background = 'transparent';
    document.getElementById(`cat-title-${i}`).style.color = 'var(--text-primary)';
  });

  if (isHidden) {
    container.style.display = 'block';
    icon.style.transform = 'rotate(90deg)';
    title.style.background = 'var(--surface)';
    title.style.color = 'var(--accent-jp)';
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
  document.querySelectorAll('.sub-cat').forEach(el => {
    el.style.borderLeft = '3px solid transparent';
    el.style.color = 'var(--text-muted)';
    el.style.fontWeight = 'normal';
    el.style.background = 'transparent';
  });

  const activeBtn = document.getElementById(`subcat-${catIndex}-${subIndex}`) || document.getElementById(`search-subcat-${catIndex}-${subIndex}`);
  if (activeBtn) {
    activeBtn.style.borderLeft = '3px solid var(--accent-jp)';
    activeBtn.style.color = 'var(--accent-jp)';
    activeBtn.style.fontWeight = 'bold';
    activeBtn.style.background = 'var(--bg)';
  }

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
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
    <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: #fff;">${uso.patron}</h3>
    <div style="color: var(--accent-jp); font-weight: bold; font-size: 0.9rem; margin-bottom: 1rem;">${uso.significado}</div>

    <div style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Forma:</strong> <span style="background: var(--bg); padding: 2px 6px; border-radius: 4px; font-family: var(--font-jp);">${uso.forma}</span></div>
    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">${uso.explicacion}</div>

    <div style="background: var(--bg); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Ejemplos</div>
    ${uso.ejemplos.map((e, index) => `
      <div style="margin-bottom: 1rem; padding-bottom: 0.5rem; ${index < uso.ejemplos.length - 1 ? 'border-bottom: 1px dashed var(--border);' : ''}">
      <div style="font-family: var(--font-jp); font-size: 1.05rem; color: #9cdcfe; margin-bottom: 0.2rem;">${e.jp}</div>
      <div style="color: var(--text-secondary); font-size: 0.9rem;">${e.es}</div>
      </div>
      `).join('')}
      </div>

      ${uso.excepciones ? `<div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;"><strong>Excepciones:</strong> ${uso.excepciones}</div>` : ''}
      ${uso.errores ? `<div style="font-size: 0.85rem; color: var(--text-muted);"><strong>Errores típicos:</strong> ${uso.errores}</div>` : ''}
      </div>
      `;
  });

  if (html === '') {
    html = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No hay reglas que coincidan con la búsqueda.</div>';
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
    if (catActiva !== -1) toggleCategoria(catActiva); // Restaurar vista
    return;
  }

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
          catHtml += `<div style="padding: 1rem; font-weight: bold; color: var(--accent-jp); border-bottom: 1px solid var(--border); margin-top: 0.5rem; font-size: 0.9rem;">${cat.categoria}</div>`;
        }

        catHtml += `
        <div class="sub-cat" id="search-subcat-${catIndex}-${subIndex}"
        style="padding: 0.6rem 1rem 0.6rem 2rem; cursor: pointer; font-size: 0.9rem; color: var(--text-muted); border-left: 3px solid transparent;"
        onclick="mostrarSubcategoria(${catIndex}, ${subIndex})">
        ${subcat.nombre} <span style="font-size: 0.75rem; opacity: 0.7;">(${usosFiltrados.length})</span>
        </div>
        `;
      }
    });

    if (catHasResults) html += catHtml;
  });

  if (html === '') {
    sidebar.innerHTML = '<div style="padding: 1rem; color: var(--text-muted); text-align: center;">No se encontraron reglas.</div>';
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

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  renderVocabulario();
  renderGramaticaSidebar();
  // Abrir la primera categoría por defecto
  if (typeof GRAMATICA !== 'undefined' && GRAMATICA.length > 0) {
    toggleCategoria(0);
  }
});
