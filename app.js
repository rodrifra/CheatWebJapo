// ==========================================
// 1. LÓGICA DE VOCABULARIO
// ==========================================

window.appLoaded = true;

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');
}

// ==========================================
// 0. ROMAJI (búsqueda) — bloque completo
// ==========================================
const ROMAJI_BASE = {
  'あ':'a','い':'i','う':'u','え':'e','お':'o',
  'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
  'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
  'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
  'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
  'や':'ya','ゆ':'yu','よ':'yo',
  'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
  'わ':'wa','ゐ':'i','ゑ':'e','を':'o','ん':'n',
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
  'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
  'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po','ゔ':'vu'
};
const ROMAJI_YOON = {
  'きゃ':'kya','きゅ':'kyu','きょ':'kyo',
  'しゃ':'sha','しゅ':'shu','しょ':'sho','しぇ':'she',
  'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','ちぇ':'che',
  'にゃ':'nya','にゅ':'nyu','にょ':'nyo',
  'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo',
  'みゃ':'mya','みゅ':'myu','みょ':'myo',
  'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
  'ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
  'じゃ':'ja','じゅ':'ju','じょ':'jo','じぇ':'je',
  'ぢゃ':'ja','ぢゅ':'ju','ぢょ':'jo',
  'びゃ':'bya','びゅ':'byu','びょ':'byo',
  'ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo','ふゅ':'fyu',
  'てぃ':'ti','でぃ':'di','とぅ':'tu','どぅ':'du',
  'うぃ':'wi','うぇ':'we','うぉ':'wo',
  'ゔぁ':'va','ゔぃ':'vi','ゔぇ':'ve','ゔぉ':'vo'
};
const ROMAJI_SMALL = {'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o','ゃ':'ya','ゅ':'yu','ょ':'yo','ゎ':'wa'};

function kataToHira(s) {
  let out = '';
  for (const ch of String(s || '')) {
    const c = ch.codePointAt(0);
    out += (c >= 0x30A1 && c <= 0x30F6) ? String.fromCharCode(c - 0x60) : ch;
  }
  return out;
}

// Kana -> Hepburn. Kanji y signos se DESCARTAN (no se conservan).
function kanaToRomaji(input) {
  const s = kataToHira(input);
  let out = '', i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === 'っ') {
      const nxt = ROMAJI_YOON[s.substr(i + 1, 2)] || ROMAJI_BASE[s[i + 1]] || '';
      if (nxt && !'aiueo'.includes(nxt[0])) out += nxt.startsWith('ch') ? 't' : nxt[0];
      i++; continue;
    }
    if (ch === 'ー') {
      const last = out[out.length - 1];
      if (last && 'aiueo'.includes(last)) out += last;
      i++; continue;
    }
    const pair = s.substr(i, 2);
    if (ROMAJI_YOON[pair]) { out += ROMAJI_YOON[pair]; i += 2; continue; }
    if (ROMAJI_BASE[ch])   { out += ROMAJI_BASE[ch];   i++;   continue; }
    if (ROMAJI_SMALL[ch])  { out += ROMAJI_SMALL[ch];  i++;   continue; }
    i++; // desconocido: fuera
  }
  return out;
}

// Query ASCII del usuario: NO pasa por el conversor kana.
function claveQuery(s) {
  const r = String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return r.replace(/ou|oo|uu|aa|ii|ee/g, m => m[0]);
}

function claveCampo(s) {
  return claveQuery(kanaToRomaji(s));
}

function claveCampoGramatica(texto) {
  const kana = texto.replace(/[^\u3040-\u30ff\u31f0-\u31ff\u4e00-\u9faf]/g, '');
  return claveQuery(kanaToRomaji(kana));
}

function coincideGramatica(uso, query, qRomaji, usarRomaji) {
  const coincideTexto =
  norm(uso.patron).includes(query) ||
  norm(uso.significado).includes(query) ||
  norm(uso.forma).includes(query) ||
  (uso.explicacion && norm(uso.explicacion).includes(query));

  if (!usarRomaji) return coincideTexto;

  const idx = getGramIndex().find(i => i.uso === uso);
  return coincideTexto || (idx && idx.romaji.some(r => r.includes(qRomaji)));
}

let _gramIndex = null;
function getGramIndex() {
  if (_gramIndex) return _gramIndex;
  _gramIndex = [];

  GRAMATICA.forEach((cat, catIdx) => {
    cat.subcategorias.forEach((subcat, subIdx) => {
      subcat.usos.forEach(uso => {
        const romajiCampos = [];

        // Indexar patron
        const rPatron = claveCampoGramatica(uso.patron);
        if (rPatron) romajiCampos.push(rPatron);

        // Indexar forma
        const rForma = claveCampoGramatica(uso.forma);
        if (rForma && romajiCampos.indexOf(rForma) === -1) romajiCampos.push(rForma);

        // Indexar explicacion
        if (uso.explicacion) {
          const rExp = claveCampoGramatica(uso.explicacion);
          if (rExp && romajiCampos.indexOf(rExp) === -1) romajiCampos.push(rExp);
        }

        _gramIndex.push({
          uso: uso,
          catIdx: catIdx,
          subIdx: subIdx,
          romaji: romajiCampos,
          textoCompleto: norm([
            uso.patron,
            uso.significado,
            uso.forma,
            uso.explicacion || ''
          ].join(' '))
        });
      });
    });
  });

  return _gramIndex;
}

let _vocabIndex = null;
function getVocabIndex() {
  if (_vocabIndex && _vocabIndex.length === VOCABULARIO.length) return _vocabIndex;
  _vocabIndex = VOCABULARIO.map(item => {
    const lecturas = item.lecturas || [];
    const campos = [item.palabra].concat(lecturas.map(l => l.lectura));
    const romaji = [];
    campos.forEach(c => {
      const k = claveCampo(c);
      if (k && romaji.indexOf(k) === -1) romaji.push(k);
    });
      return {
        item: item,
        kana: norm(campos.filter(Boolean).join(' ')),
                                es: norm(lecturas.map(l => l.traduccion).filter(Boolean).join(' ')),
                                romaji: romaji
      };
  });
  return _vocabIndex;
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

  // Japonés escrito en kana: mínimo 2 caracteres (evita partícula suelta)
  const MIN_KANA = 2;
  const hayKana   = /[\u3040-\u30ff\u31f0-\u31ff]/.test(query);
  const asciiPuro = /^[a-z0-9]+$/.test(query);
  const qRomaji   = asciiPuro ? claveQuery(query) : '';
  // Romaji: basta UNA vocal (una mora). "ga" vale, "g" no.
  const usarKana   = hayKana && query.length >= MIN_KANA;
  const usarRomaji = asciiPuro && /[aeiou]/.test(qRomaji);

  const filtrados = getVocabIndex().filter(e => {
    const item = e.item;
    if (levelFilter && !item.lecturas.some(l => l.nivel === levelFilter)) return false;
    if (tipoFiltroActivo !== 'todos' && item.tipo !== tipoFiltroActivo) return false;
    if (!query) return true;

    if (e.es.includes(query)) return true;                 // español: 1 carácter
    if (norm(item.palabra).includes(query)) return true;   // kanji: 1 carácter
    if (usarKana && e.kana.includes(query)) return true;   // kana: >= 2
    if (usarRomaji && e.romaji.some(r => r.includes(qRomaji))) return true;
    return false;
  }).map(e => e.item);

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
  document.body.style.overflow = 'hidden';
}

function limpiarBusquedaVocabulario() {
  document.getElementById('searchInput').value = '';
  renderVocabulario();
}

function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

function manejarEscape(e) {
  if (e.key !== 'Escape') return;

  // 1. Si hay un modal abierto, lo cerramos
  const modalAbierto = document.getElementById('modal-dinamico');
  if (modalAbierto) {
    cerrarModal('modal-dinamico');
    return;
  }

  // 2. Si el foco está en el buscador de vocabulario y hay texto, lo limpiamos
  const inputVocab = document.getElementById('searchInput');
  if (document.activeElement === inputVocab && inputVocab.value.length > 0) {
    limpiarBusquedaVocabulario();
    return;
  }

  // 3. Si el foco está en el buscador de gramática y hay texto, lo limpiamos
  const inputGram = document.getElementById('gramSearchInput');
  if (document.activeElement === inputGram && inputGram.value.length > 0) {
    limpiarBusquedaGramatica();
    return;
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
      const asciiPuro = /^[a-z0-9]+$/.test(query);
      const qRomaji   = asciiPuro ? claveQuery(query) : '';
      const usarRomaji = asciiPuro && /[aeiou]/.test(qRomaji);
      if (!coincideGramatica(uso, query, qRomaji, usarRomaji)) return;
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
      <div class="rule-example-jp">${furigana(e.jp)}</div>
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
      const asciiPuro = /^[a-z0-9]+$/.test(query);
      const qRomaji   = asciiPuro ? claveQuery(query) : '';
      const usarRomaji = asciiPuro && /[aeiou]/.test(qRomaji);

      const usosFiltrados = subcat.usos.filter(uso =>
      coincideGramatica(uso, query, qRomaji, usarRomaji)
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

function furigana(texto) {
  return texto.replace(/([\u3400-\u9fff々]+)\[([^\]]+)\]/g, '<ruby>$1<rt>$2</rt></ruby>');
}

function aplicarFurigana(activo) {
  document.getElementById('panel-gramatica').classList.toggle('sin-furigana', !activo);
  const btn = document.getElementById('furiganaBtn');
  if (btn) btn.textContent = 'Furigana: ' + (activo ? 'sí' : 'no');
}

function cambiarFurigana() {
  const activo = document.getElementById('panel-gramatica').classList.contains('sin-furigana');
  aplicarFurigana(activo);
  try { localStorage.setItem('furigana', activo ? 'on' : 'off'); } catch (e) {}
}

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  try { const t = localStorage.getItem('tema'); document.getElementById('themeSelect').value = (t === 'light' || t === 'dark') ? t : 'system'; } catch (e) {}
  try { aplicarFurigana(localStorage.getItem('furigana') !== 'off'); } catch (e) { aplicarFurigana(true); }

  renderVocabulario();
  renderGramaticaSidebar();

  // Único escuchador para la tecla Escape
  document.addEventListener('keydown', manejarEscape);

  if (typeof GRAMATICA !== 'undefined' && GRAMATICA.length > 0) {
    toggleCategoria(0);
  }
});
