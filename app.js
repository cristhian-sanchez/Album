// ── 1. IMPORTAR SDK DE FIREBASE DESDE EL CDN OFICIAL ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// ── 2. CONFIGURACIÓN DE TU PROYECTO (PANINI-2026) ──
const firebaseConfig = {
  apiKey: "AIzaSyDZMaDjeRO4V2yGZIsFNE8c4E4vSHdqVos",
  authDomain: "panini-2026-4b480.firebaseapp.com",
  databaseURL: "https://panini-2026-4b480-default-rtdb.firebaseio.com",
  projectId: "panini-2026-4b480",
  storageBucket: "panini-2026-4b480.firebasestorage.app",
  messagingSenderId: "921401065996",
  appId: "1:921401065996:web:eaa55814f1b193e96ee429",
  measurementId: "G-MR4J82TYL6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/* ═══════════ DATOS ESTRUCTURALES DEL ÁLBUM ═══════════ */
const GRUPOS = [
  { id: 'A', label: 'Grupo A', teams: [{ name: 'Chequia', code: 'CZE', flag: '🇨🇿' }, { name: 'México', code: 'MEX', flag: '🇲🇽' }, { name: 'Sudáfrica', code: 'RSA', flag: '🇿🇦' }, { name: 'Corea del Sur', code: 'KOR', flag: '🇰🇷' }] },
  { id: 'B', label: 'Grupo B', teams: [{ name: 'Bosnia y Herzegovina', code: 'BIH', flag: '🇧🇦' }, { name: 'Canadá', code: 'CAN', flag: '🇨🇦' }, { name: 'Catar', code: 'QAT', flag: '🇶🇦' }, { name: 'Suiza', code: 'SUI', flag: '🇨🇭' }] },
  { id: 'C', label: 'Grupo C', teams: [{ name: 'Brasil', code: 'BRA', flag: '🇧🇷' }, { name: 'Haití', code: 'HAI', flag: '🇭🇹' }, { name: 'Marruecos', code: 'MAR', flag: '🇲🇦' }, { name: 'Escocia', code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' }] },
  { id: 'D', label: 'Grupo D', teams: [{ name: 'Australia', code: 'AUS', flag: '🇦🇺' }, { name: 'Paraguay', code: 'PAR', flag: '🇵🇾' }, { name: 'Turquía', code: 'TUR', flag: '🇹🇷' }, { name: 'Estados Unidos', code: 'USA', flag: '🇺🇸' }] },
  { id: 'E', label: 'Grupo E', teams: [{ name: 'Curazao', code: 'CUW', flag: '🇨🇼' }, { name: 'Ecuador', code: 'ECU', flag: '🇪🇨' }, { name: 'Alemania', code: 'GER', flag: '🇩🇪' }, { name: 'Costa de Marfil', code: 'CIV', flag: '🇨🇮' }] },
  { id: 'F', label: 'Grupo F', teams: [{ name: 'Japón', code: 'JAP', flag: '🇯🇵' }, { name: 'Países Bajos', code: 'NED', flag: '🇳🇱' }, { name: 'Suecia', code: 'SWE', flag: '🇸🇪' }, { name: 'Túnez', code: 'TUN', flag: '🇹🇳' }] },
  { id: 'G', label: 'Grupo G', teams: [{ name: 'Bélgica', code: 'BEL', flag: '🇧🇪' }, { name: 'Egipto', code: 'EGY', flag: '🇪🇬' }, { name: 'Irán', code: 'IRN', flag: '🇮🇷' }, { name: 'Nueva Zelanda', code: 'NZL', flag: '🇳🇿' }] },
  { id: 'H', label: 'Grupo H', teams: [{ name: 'Cabo Verde', code: 'CPV', flag: '🇨🇻' }, { name: 'Arabia Saudita', code: 'KSA', flag: '🇸🇦' }, { name: 'España', code: 'ESP', flag: '🇪🇸' }, { name: 'Uruguay', code: 'URU', flag: '🇺🇾' }] },
  { id: 'I', label: 'Grupo I', teams: [{ name: 'Francia', code: 'FRA', flag: '🇫🇷' }, { name: 'Irak', code: 'IRQ', flag: '🇮🇶' }, { name: 'Noruega', code: 'NOR', flag: '🇳🇴' }, { name: 'Senegal', code: 'SEN', flag: '🇸🇳' }] },
  { id: 'J', label: 'Grupo J', teams: [{ name: 'Argelia', code: 'ALG', flag: '🇩🇿' }, { name: 'Argentina', code: 'ARG', flag: '🇦🇷' }, { name: 'Austria', code: 'AUT', flag: '🇦🇹' }, { name: 'Jordania', code: 'JOR', flag: '🇯🇴' }] },
  { id: 'K', label: 'Grupo K', teams: [{ name: 'Colombia', code: 'COL', flag: '🇨🇴' }, { name: 'RD del Congo', code: 'COD', flag: '🇨🇩' }, { name: 'Portugal', code: 'POR', flag: '🇵🇹' }, { name: 'Uzbekistán', code: 'UZB', flag: '🇺🇿' }] },
  { id: 'L', label: 'Grupo L', teams: [{ name: 'Croacia', code: 'CRO', flag: '🇭🇷' }, { name: 'Inglaterra', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, { name: 'Ghana', code: 'GHA', flag: '🇬🇭' }, { name: 'Panamá', code: 'PAN', flag: '🇵🇦' }] },
];

const CC = [
  { n: 1, name: 'Lamine Yamal', team: 'España', flag: '🇪🇸' }, { n: 2, name: 'Joshua Kimmich', team: 'Alemania', flag: '🇩🇪' },
  { n: 3, name: 'Harry Kane', team: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, { n: 4, name: 'Santiago Giménez', team: 'México', flag: '🇲🇽' },
  { n: 5, name: 'Josko Gvardiol', team: 'Croacia', flag: '🇭🇷' }, { n: 6, name: 'Federico Valverde', team: 'Uruguay', flag: '🇺🇾' },
  { n: 7, name: 'Jefferson Lerma', team: 'Colombia', flag: '🇨🇴' }, { n: 8, name: 'Enner Valencia', team: 'Ecuador', flag: '🇪🇨' },
  { n: 9, name: 'Gabriel Magalhães', team: 'Brasil', flag: '🇧🇷' }, { n: 10, name: 'Virgil van Dijk', team: 'Países Bajos', flag: '🇳🇱' },
  { n: 11, name: 'Alphonso Davies', team: 'Canadá', flag: '🇨🇦' }, { n: 12, name: 'Emiliano Martínez', team: 'Argentina', flag: '🇦🇷' },
  { n: 13, name: 'Raúl Jiménez', team: 'México', flag: '🇲🇽' }, { n: 14, name: 'Lautaro Martínez', team: 'Argentina', flag: '🇦🇷' },
];

const FPT = 20, TOTAL = 994;

/* ═══════════ VARIABLES DE ESTADO ═══════════ */
let currentUser = null;
let album = { sobres: 0, stickers: {} };
let saveTimer = null;
let activeFilter = 'all';

/* ═══════════ INTERFAZ VISUAL DE AUTENTICACIÓN ═══════════ */
function showMsg(msg, type) {
  const el = document.getElementById('authMsg');
  el.className = 'auth-msg ' + (type || 'error');
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('tabLoginBtn').classList.toggle('active', isLogin);
  document.getElementById('tabRegBtn').classList.toggle('active', !isLogin);
  document.getElementById('loginForm').style.display = isLogin ? '' : 'none';
  document.getElementById('registerForm').style.display = isLogin ? 'none' : '';
  showMsg('');
}

// Vinculación de funciones al entorno global necesarias por los 'onclick' inline del HTML
window.switchTab = switchTab;
window.setFilter = setFilter;
window.applyFilter = applyFilter;
window.showTab = showTab;
window.changeSobres = changeSobres;

/* ═══════════ CONTROL DE USUARIOS (FIREBASE AUTH) ═══════════ */
function doRegister() {
  const user = document.getElementById('rUser').value.trim().toLowerCase();
  const pass = document.getElementById('rPass').value;
  const pass2 = document.getElementById('rPass2').value;

  if (!user || user.length < 3) return showMsg('El usuario debe tener al menos 3 caracteres.');
  if (pass.length < 6) return showMsg('La contraseña debe tener al menos 6 caracteres.');
  if (pass !== pass2) return showMsg('Las contraseñas no coinciden.');

  const fakeEmail = `${user}@panini2026.com`;

  createUserWithEmailAndPassword(auth, fakeEmail, pass)
    .then((userCredential) => {
      return set(ref(db, 'users_metadata/' + userCredential.user.uid), { username: user });
    })
    .then(() => {
      showMsg('✓ ¡Cuenta creada con éxito!', 'success');
      document.getElementById('rUser').value = '';
      document.getElementById('rPass').value = '';
      document.getElementById('rPass2').value = '';
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        showMsg('Ese nombre de usuario ya está registrado.');
      } else {
        showMsg('Error en registro: ' + error.message);
      }
    });
}

function doLogin() {
  const user = document.getElementById('lUser').value.trim().toLowerCase();
  const pass = document.getElementById('lPass').value;
  if (!user || !pass) return showMsg('Por favor completa todos los campos.');

  const fakeEmail = `${user}@panini2026.com`;

  signInWithEmailAndPassword(auth, fakeEmail, pass)
    .catch(() => {
      showMsg('Usuario o contraseña incorrectos.');
    });
}

function doLogout() {
  signOut(auth).then(() => {
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('groupsContainer').innerHTML = '';
    document.getElementById('lUser').value = '';
    document.getElementById('lPass').value = '';
    showMsg('');
  });
}

window.doRegister = doRegister;
window.doLogin = doLogin;
window.doLogout = doLogout;

// Escucha reactiva: Se dispara al loguearse, desloguearse o recargar la página
onAuthStateChanged(auth, (user) => {
  if (user) {
    get(ref(db, 'users_metadata/' + user.uid)).then((snapshot) => {
      let username = user.email.split('@')[0];
      if (snapshot.exists()) {
        username = snapshot.val().username;
      }
      currentUser = username;
      document.getElementById('hUser').textContent = currentUser;

      // Escuchar y sincronizar el álbum desde Realtime Database en tiempo real
      const albumRef = ref(db, 'albums/' + user.uid);
      onValue(albumRef, (albumSnapshot) => {
        const data = albumSnapshot.val();
        album = data ? data : { sobres: 0, stickers: {} };
        if (!album.stickers) album.stickers = {};
        enterApp();
      });
    });
  } else {
    currentUser = null;
    album = { sobres: 0, stickers: {} };
  }
});

// Capturar el botón Enter en los formularios
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (document.getElementById('loginForm').style.display !== 'none') doLogin();
  else doRegister();
});

/* ═══════════ GUARDADO EN TIEMPO REAL (DEBOUNCE) ═══════════ */
function enterApp() {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('appScreen').style.display = 'block';

  const scrollPos = window.scrollY;
  buildAlbum();
  updateStats();
  updateSobresUI();
  window.scrollTo(0, scrollPos);
}

function saveAlbum() {
  if (!auth.currentUser) return;
  clearTimeout(saveTimer);

  // Espera 500ms tras el último clic para no saturar la base de datos
  saveTimer = setTimeout(() => {
    set(ref(db, 'albums/' + auth.currentUser.uid), album)
      .then(() => {
        const t = document.getElementById('toast');
        if (t) {
          t.classList.add('show');
          setTimeout(() => t.classList.remove('show'), 1400);
        }
      });
  }, 500);
}

/* ═══════════ LÓGICA DEL ÁLBUM ═══════════ */
function fid(code, n) { return code + '_' + n; }
function st(id) { return album.stickers[id] || 0; }

window.cycleSticker = function (id, el) {
  const n = st(id) >= 2 ? 0 : st(id) + 1;
  if (n === 0) delete album.stickers[id]; else album.stickers[id] = n;
  el.className = 'fig ' + ['', 'have', 'repeated'][n];
  updateStats();
  saveAlbum();
  updateTeamCard(el.closest('.team-card'));
};

window.cycleSpecial = function (id, el) {
  const n = st(id) >= 2 ? 0 : st(id) + 1;
  if (n === 0) delete album.stickers[id]; else album.stickers[id] = n;
  el.className = 'spec-fig ' + ['', 'have', 'repeated'][n];
  updateStats();
  saveAlbum();
};

window.cycleCoca = function (id, el) {
  const n = st(id) >= 2 ? 0 : st(id) + 1;
  if (n === 0) delete album.stickers[id]; else album.stickers[id] = n;
  el.className = 'coca-card ' + ['', 'have', 'repeated'][n];
  updateStats();
  saveAlbum();
  let h = 0; CC.forEach(p => { if (st('CC_' + p.n) >= 1) h++; });
  const b = document.getElementById('cocaBar'), c = document.getElementById('cocaCount');
  if (b) b.style.width = Math.round(h / 14 * 100) + '%';
  if (c) c.textContent = h + '/14';
};

function updateTeamCard(card) {
  if (!card) return;
  const code = card.dataset.code;
  let have = 0, reps = 0;
  for (let i = 1; i <= FPT; i++) {
    const v = st(fid(code, i));
    if (v >= 1) have++;
    if (v === 2) reps++;
  }
  const pct = Math.round(have / FPT * 100);
  const fill = card.querySelector('.team-bar-fill');
  const i1 = card.querySelector('.team-bar-info span:first-child');
  const i2 = card.querySelector('.team-bar-info span:last-child');
  const badge = card.querySelector('.team-pct-badge');
  if (fill) fill.style.width = pct + '%';
  if (i1) i1.textContent = have + '/' + FPT;
  if (i2) i2.textContent = reps + ' rep.';
  if (badge) {
    badge.className = 'team-pct-badge' + (pct === 100 ? ' done' : pct >= 50 ? ' good' : '');
    badge.textContent = pct + '%';
  }
  updateGroupHeader(card.closest('.group-section'));
}

function updateGroupHeader(sec) {
  if (!sec) return;
  const g = GRUPOS.find(x => x.id === sec.dataset.group);
  if (!g) return;
  let h = 0, t = g.teams.length * FPT;
  g.teams.forEach(tm => {
    for (let i = 1; i <= FPT; i++) { if (st(fid(tm.code, i)) >= 1) h++; }
  });
  const pill = sec.querySelector('.group-progress-pill');
  if (pill) pill.innerHTML = '<b>' + h + '/' + t + '</b> · ' + Math.round(h / t * 100) + '%';
}

function calcAll() {
  let have = 0, rep = 0;
  Object.values(album.stickers).forEach(v => {
    if (v === 1) have++;
    else if (v === 2) { have++; rep++; }
  });
  return { have, rep, miss: TOTAL - have };
}

function updateStats() {
  const { have, rep, miss } = calcAll();
  const pct = Math.round(have / TOTAL * 100);
  ['bigPct', 'hPct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = pct + '%';
  });
  if (document.getElementById('mainBar')) document.getElementById('mainBar').style.width = pct + '%';
  if (document.getElementById('mainBarText')) document.getElementById('mainBarText').textContent = have + ' de ' + TOTAL;
  if (document.getElementById('sHave')) document.getElementById('sHave').textContent = have;
  if (document.getElementById('sMiss')) document.getElementById('sMiss').textContent = miss;
  if (document.getElementById('sRep')) document.getElementById('sRep').textContent = rep;
  let done = 0;
  GRUPOS.forEach(g => {
    let h = 0;
    g.teams.forEach(t => { for (let i = 1; i <= FPT; i++) { if (st(fid(t.code, i)) >= 1) h++; } });
    if (h === g.teams.length * FPT) done++;
  });
  if (document.getElementById('sGroups')) document.getElementById('sGroups').textContent = done + '/12';
}

function changeSobres(d) {
  album.sobres = Math.max(0, (album.sobres || 0) + d);
  updateSobresUI();
  saveAlbum();
}

function updateSobresUI() {
  const s = album.sobres || 0;
  if (document.getElementById('sobresDisp')) document.getElementById('sobresDisp').textContent = s;
  if (document.getElementById('sSobres')) document.getElementById('sSobres').textContent = s;
  if (document.getElementById('sSobresInfo')) document.getElementById('sSobresInfo').textContent = '≈' + (s * 7) + ' figuritas';
}

/* ═══════════ CONSTRUCCIÓN DINÁMICA DEL ÁLBUM ═══════════ */
function buildAlbum() {
  const cnt = document.getElementById('groupsContainer');
  if (!cnt) return;
  cnt.innerHTML = '';
  GRUPOS.forEach(g => {
    const sec = document.createElement('div');
    sec.className = 'group-section';
    sec.dataset.group = g.id;
    const tot = g.teams.length * FPT;
    sec.innerHTML = `
      <div class="group-header">
        <div class="group-badge">GRUPO ${g.id}</div>
        <div class="group-name">${g.label}</div>
        <div class="group-progress-pill"><b>0/${tot}</b> · 0%</div>
      </div>
      <div class="teams-grid" id="tg-${g.id}"></div>
    `;
    cnt.appendChild(sec);
    const tg = sec.querySelector('.teams-grid');
    g.teams.forEach(tm => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.dataset.code = tm.code;
      card.dataset.name = tm.name.toLowerCase();
      card.dataset.group = g.id;
      let figs = '';
      for (let i = 1; i <= FPT; i++) {
        const id = fid(tm.code, i), v = st(id), cls = ['', 'have', 'repeated'][v];
        figs += `<div class="fig ${cls}" title="${tm.code}-${i}" onclick="cycleSticker('${id}',this)">${i}</div>`;
      }
      card.innerHTML = `
        <div class="team-header">
          <div class="team-flag">${tm.flag}</div>
          <div class="team-info">
            <div class="team-name">${tm.name}</div>
            <div class="team-code">${tm.code} · ${FPT} fig.</div>
          </div>
          <div class="team-pct-badge">0%</div>
        </div>
        <div class="team-bar-wrap">
          <div class="team-bar-track"><div class="team-bar-fill" style="width:0%"></div></div>
          <div class="team-bar-info"><span>0/${FPT}</span><span>0 rep.</span></div>
        </div>
        <div class="figuritas-grid">${figs}</div>
      `;
      tg.appendChild(card);
      updateTeamCard(card);
    });
    updateGroupHeader(sec);
  });
  buildSpecials(cnt);
  buildCocaCola(cnt);
}

function buildSpecials(cnt) {
  const sec = document.createElement('div');
  sec.className = 'specials-section';
  let f = '';
  for (let i = 0; i <= 19; i++) {
    const id = 'SPEC_' + i, v = st(id), cls = ['', 'have', 'repeated'][v];
    f += `<div class="spec-fig ${cls}" onclick="cycleSpecial('${id}',this)"><span>${i === 0 ? '⭐' : '★'}</span><span class="snum">${i === 0 ? '00' : 'FW' + i}</span></div>`;
  }
  sec.innerHTML = `
    <div class="specials-header">
      <div class="specials-badge">SPECIALS</div>
      <div style="font-size:14px;font-weight:700;color:var(--text)">Figuritas especiales FIFA</div>
      <div style="margin-left:auto;font-size:11px;color:var(--text3)">20 figuritas</div>
    </div>
    <div class="specials-figs">${f}</div>
  `;
  cnt.appendChild(sec);
}

function buildCocaCola(cnt) {
  const sec = document.createElement('div');
  sec.className = 'coca-section';
  let h = 0;
  CC.forEach(p => { if (st('CC_' + p.n) >= 1) h++; });
  let cards = CC.map(p => {
    const id = 'CC_' + p.n, v = st(id), cls = ['', 'have', 'repeated'][v];
    return `<div class="coca-card ${cls}" onclick="cycleCoca('${id}',this)">
      <div class="cc-num">CC${p.n}</div>
      <div class="cc-flag">${p.flag}</div>
      <div class="cc-name">${p.name}</div>
      <div class="cc-team">${p.team}</div>
    </div>`;
  }).join('');
  sec.innerHTML = `
    <div class="coca-header">
      <div class="coca-badge">COCA-COLA</div>
      <div class="coca-header-title">Figuritas especiales Coca-Cola × Panini</div>
      <div class="coca-header-sub">14 estampas · CC1–CC14</div>
    </div>
    <div class="coca-body">
      <div class="coca-note">⚠️ No salen en sobres normales. Solo en la promo especial Coca-Cola.</div>
      <div class="coca-progress">
        <span class="cp-lbl">Progreso</span>
        <div class="coca-bar-track"><div class="coca-bar-fill" id="cocaBar" style="width:${Math.round(h / 14 * 100)}%"></div></div>
        <span class="cp-val" id="cocaCount">${h}/14</span>
      </div>
      <div class="coca-grid">${cards}</div>
    </div>
  `;
  cnt.appendChild(sec);
}

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter();
}

function applyFilter() {
  const q = (document.getElementById('searchInput').value || '').toLowerCase();
  document.querySelectorAll('.team-card').forEach(card => {
    const ms = card.dataset.name.includes(q);
    let mf = true;
    if (activeFilter !== 'all') {
      let haveStickers = 0;
      for (let i = 1; i <= FPT; i++) { if (st(fid(card.dataset.code, i)) >= 1) haveStickers++; }
      mf = activeFilter === 'complete' ? haveStickers === FPT : haveStickers < FPT;
    }
    card.style.display = (ms && mf) ? '' : 'none';
  });
  document.querySelectorAll('.group-section').forEach(s => {
    const v = Array.from(s.querySelectorAll('.team-card')).some(c => c.style.display !== 'none');
    s.style.display = v ? '' : 'none';
  });
}

function showTab(tab, btn) {
  document.querySelectorAll('.page-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-album').style.display = tab === 'album' ? '' : 'none';
  document.getElementById('tab-duplicates').style.display = tab === 'duplicates' ? '' : 'none';
  if (tab === 'duplicates') buildDups();
}

function buildDups() {
  const tbody = document.getElementById('dupBody');
  const empty = document.getElementById('dupEmpty');
  const cnt = document.getElementById('dupCount');
  const reps = [];
  GRUPOS.forEach(g => g.teams.forEach(t => {
    for (let i = 1; i <= FPT; i++) {
      const id = fid(t.code, i);
      if (st(id) === 2) reps.push({ id, team: t.flag + ' ' + t.name, sec: 'Grupo ' + g.id });
    }
  }));
  for (let i = 0; i <= 19; i++) {
    const id = 'SPEC_' + i;
    if (st(id) === 2) reps.push({ id, team: '⭐ Especiales FIFA', sec: 'Specials' });
  }
  CC.forEach(p => {
    const id = 'CC_' + p.n;
    if (st(id) === 2) reps.push({ id, team: p.flag + ' ' + p.name, sec: 'Coca-Cola' });
  });
  cnt.textContent = '(' + reps.length + ')';
  if (!reps.length) { tbody.innerHTML = ''; empty.style.display = ''; return; }
  empty.style.display = 'none';
  tbody.innerHTML = reps.map(r =>
    `<tr>
      <td><code style="background:var(--surface2);color:var(--accent2);padding:2px 7px;border-radius:4px;font-size:12px;border:1px solid var(--border2)">${r.id}</code></td>
      <td>${r.team}</td>
      <td style="color:var(--text2)">${r.sec}</td>
      <td><span class="dup-pill">Repetida</span></td>
    </tr>`
  ).join('');
}
