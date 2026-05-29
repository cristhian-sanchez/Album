// ── FIREBASE IMPORTS ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZMaDjeRO4V2yGZIsFNE8c4E4vSHdqVos",
  authDomain: "panini-2026-4b480.firebaseapp.com",
  databaseURL: "https://panini-2026-4b480-default-rtdb.firebaseio.com",
  projectId: "panini-2026-4b480",
  storageBucket: "panini-2026-4b480.firebasestorage.app",
  messagingSenderId: "921401065996",
  appId: "1:921401065996:web:eaa55814f1b193e96ee429"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/* ══════════ DATOS ══════════ */
const GRUPOS = [
  { id:'A', label:'Grupo A', teams:[{name:'Chequia',code:'CZE',flag:'🇨🇿'},{name:'México',code:'MEX',flag:'🇲🇽'},{name:'Sudáfrica',code:'RSA',flag:'🇿🇦'},{name:'Corea del Sur',code:'KOR',flag:'🇰🇷'}] },
  { id:'B', label:'Grupo B', teams:[{name:'Bosnia y Herzegovina',code:'BIH',flag:'🇧🇦'},{name:'Canadá',code:'CAN',flag:'🇨🇦'},{name:'Catar',code:'QAT',flag:'🇶🇦'},{name:'Suiza',code:'SUI',flag:'🇨🇭'}] },
  { id:'C', label:'Grupo C', teams:[{name:'Brasil',code:'BRA',flag:'🇧🇷'},{name:'Haití',code:'HAI',flag:'🇭🇹'},{name:'Marruecos',code:'MAR',flag:'🇲🇦'},{name:'Escocia',code:'SCO',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'}] },
  { id:'D', label:'Grupo D', teams:[{name:'Australia',code:'AUS',flag:'🇦🇺'},{name:'Paraguay',code:'PAR',flag:'🇵🇾'},{name:'Turquía',code:'TUR',flag:'🇹🇷'},{name:'Estados Unidos',code:'USA',flag:'🇺🇸'}] },
  { id:'E', label:'Grupo E', teams:[{name:'Curazao',code:'CUW',flag:'🇨🇼'},{name:'Ecuador',code:'ECU',flag:'🇪🇨'},{name:'Alemania',code:'GER',flag:'🇩🇪'},{name:'Costa de Marfil',code:'CIV',flag:'🇨🇮'}] },
  { id:'F', label:'Grupo F', teams:[{name:'Japón',code:'JAP',flag:'🇯🇵'},{name:'Países Bajos',code:'NED',flag:'🇳🇱'},{name:'Suecia',code:'SWE',flag:'🇸🇪'},{name:'Túnez',code:'TUN',flag:'🇹🇳'}] },
  { id:'G', label:'Grupo G', teams:[{name:'Bélgica',code:'BEL',flag:'🇧🇪'},{name:'Egipto',code:'EGY',flag:'🇪🇬'},{name:'Irán',code:'IRN',flag:'🇮🇷'},{name:'Nueva Zelanda',code:'NZL',flag:'🇳🇿'}] },
  { id:'H', label:'Grupo H', teams:[{name:'Cabo Verde',code:'CPV',flag:'🇨🇻'},{name:'Arabia Saudita',code:'KSA',flag:'🇸🇦'},{name:'España',code:'ESP',flag:'🇪🇸'},{name:'Uruguay',code:'URU',flag:'🇺🇾'}] },
  { id:'I', label:'Grupo I', teams:[{name:'Francia',code:'FRA',flag:'🇫🇷'},{name:'Irak',code:'IRQ',flag:'🇮🇶'},{name:'Noruega',code:'NOR',flag:'🇳🇴'},{name:'Senegal',code:'SEN',flag:'🇸🇳'}] },
  { id:'J', label:'Grupo J', teams:[{name:'Argelia',code:'ALG',flag:'🇩🇿'},{name:'Argentina',code:'ARG',flag:'🇦🇷'},{name:'Austria',code:'AUT',flag:'🇦🇹'},{name:'Jordania',code:'JOR',flag:'🇯🇴'}] },
  { id:'K', label:'Grupo K', teams:[{name:'Colombia',code:'COL',flag:'🇨🇴'},{name:'RD del Congo',code:'COD',flag:'🇨🇩'},{name:'Portugal',code:'POR',flag:'🇵🇹'},{name:'Uzbekistán',code:'UZB',flag:'🇺🇿'}] },
  { id:'L', label:'Grupo L', teams:[{name:'Croacia',code:'CRO',flag:'🇭🇷'},{name:'Inglaterra',code:'ENG',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},{name:'Ghana',code:'GHA',flag:'🇬🇭'},{name:'Panamá',code:'PAN',flag:'🇵🇦'}] },
];

const CC = [
  {n:1,name:'Lamine Yamal',team:'España',flag:'🇪🇸'},{n:2,name:'Joshua Kimmich',team:'Alemania',flag:'🇩🇪'},
  {n:3,name:'Harry Kane',team:'Inglaterra',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},{n:4,name:'Santiago Giménez',team:'México',flag:'🇲🇽'},
  {n:5,name:'Josko Gvardiol',team:'Croacia',flag:'🇭🇷'},{n:6,name:'Federico Valverde',team:'Uruguay',flag:'🇺🇾'},
  {n:7,name:'Jefferson Lerma',team:'Colombia',flag:'🇨🇴'},{n:8,name:'Enner Valencia',team:'Ecuador',flag:'🇪🇨'},
  {n:9,name:'Gabriel Magalhães',team:'Brasil',flag:'🇧🇷'},{n:10,name:'Virgil van Dijk',team:'Países Bajos',flag:'🇳🇱'},
  {n:11,name:'Alphonso Davies',team:'Canadá',flag:'🇨🇦'},{n:12,name:'Emiliano Martínez',team:'Argentina',flag:'🇦🇷'},
  {n:13,name:'Raúl Jiménez',team:'México',flag:'🇲🇽'},{n:14,name:'Lautaro Martínez',team:'Argentina',flag:'🇦🇷'},
];

const SITE_URL = 'https://panini2026.web.app'; // ← cambia a tu URL real
const FPT = 20, TOTAL = 994;
let currentUser = null;
let album = { sobres:0, stickers:{} };
let saveTimer = null;
let activeFilter = 'all';
let completedGroups = new Set();

/* ══════════ UTILS ══════════ */
const $ = id => document.getElementById(id);
const fid = (code, n) => code + '_' + n;
const st = id => album.stickers[id] || 0;

function showMsg(msg, type) {
  const el = $('authMsg');
  el.className = 'auth-msg ' + (type || 'error');
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function showToast(msg = '✓ Guardado', color = 'var(--green)') {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.borderColor = color;
  t.style.color = color;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1600);
}

/* ══════════ AUTH UI ══════════ */
window.switchTab = function(tab) {
  const isLogin = tab === 'login';
  $('tabLoginBtn').classList.toggle('active', isLogin);
  $('tabRegBtn').classList.toggle('active', !isLogin);
  $('loginForm').style.display = isLogin ? '' : 'none';
  $('registerForm').style.display = isLogin ? 'none' : '';
  showMsg('');
};

window.togglePw = function(inputId, btn) {
  const inp = $(inputId);
  const isText = inp.type === 'text';
  inp.type = isText ? 'password' : 'text';
  btn.textContent = isText ? '👁' : '🙈';
};

/* ══════════ AUTH LOGIC ══════════ */
window.doRegister = function() {
  const user = $('rUser').value.trim().toLowerCase();
  const pass = $('rPass').value;
  const pass2 = $('rPass2').value;
  if (!user || user.length < 3) return showMsg('El usuario debe tener al menos 3 caracteres.');
  if (!/^[a-z0-9_]+$/.test(user)) return showMsg('Solo letras, números y guión bajo.');
  if (pass.length < 6) return showMsg('La contraseña debe tener al menos 6 caracteres.');
  if (pass !== pass2) return showMsg('Las contraseñas no coinciden.');
  const btn = $('registerBtn');
  btn.classList.add('loading');
  createUserWithEmailAndPassword(auth, `${user}@panini2026.com`, pass)
    .then(uc => set(ref(db, 'users_metadata/' + uc.user.uid), { username: user }))
    .then(() => {
      showMsg('✓ ¡Cuenta creada! Inicia sesión.', 'success');
      $('rUser').value = ''; $('rPass').value = ''; $('rPass2').value = '';
      setTimeout(() => window.switchTab('login'), 1200);
    })
    .catch(e => showMsg(e.code === 'auth/email-already-in-use' ? 'Ese usuario ya existe.' : 'Error: ' + e.message))
    .finally(() => btn.classList.remove('loading'));
};

window.doLogin = function() {
  const user = $('lUser').value.trim().toLowerCase();
  const pass = $('lPass').value;
  if (!user || !pass) return showMsg('Por favor completa todos los campos.');
  const btn = $('loginBtn');
  btn.classList.add('loading');
  signInWithEmailAndPassword(auth, `${user}@panini2026.com`, pass)
    .catch(() => showMsg('Usuario o contraseña incorrectos.'))
    .finally(() => btn.classList.remove('loading'));
};

window.doLogout = function() {
  signOut(auth).then(() => {
    $('appScreen').style.display = 'none';
    $('authScreen').style.display = 'flex';
    $('groupsContainer').innerHTML = '';
    $('lUser').value = ''; $('lPass').value = '';
    completedGroups.clear();
    showMsg('');
  });
};

document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if ($('loginForm').style.display !== 'none') window.doLogin();
  else window.doRegister();
});

/* ══════════ AUTH STATE ══════════ */
onAuthStateChanged(auth, user => {
  if (user) {
    get(ref(db, 'users_metadata/' + user.uid)).then(snap => {
      currentUser = snap.exists() ? snap.val().username : user.email.split('@')[0];
      $('hUser').textContent = currentUser;
      onValue(ref(db, 'albums/' + user.uid), snap => {
        const data = snap.val();
        album = data ? data : { sobres:0, stickers:{} };
        if (!album.stickers) album.stickers = {};
        enterApp();
      });
    });
  } else {
    currentUser = null;
    album = { sobres:0, stickers:{} };
  }
});

/* ══════════ APP ══════════ */
function enterApp() {
  $('authScreen').style.display = 'none';
  $('appScreen').style.display = 'block';
  const scrollPos = window.scrollY;
  buildAlbum();
  updateStats();
  updateSobresUI();
  window.scrollTo(0, scrollPos);
}

function saveAlbum() {
  if (!auth.currentUser) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    set(ref(db, 'albums/' + auth.currentUser.uid), album)
      .then(() => showToast('✓ Guardado'));
  }, 500);
}

/* ══════════ STICKER LOGIC ══════════ */
window.cycleSticker = function(id, el) {
  const n = st(id) >= 2 ? 0 : st(id) + 1;
  if (n === 0) delete album.stickers[id]; else album.stickers[id] = n;
  el.className = 'fig ' + ['','have','repeated'][n];
  updateStats();
  saveAlbum();
  const card = el.closest('.team-card');
  updateTeamCard(card);
  checkGroupCompletion(card.closest('.group-section'));
};

window.cycleSpecial = function(id, el) {
  const n = st(id) >= 2 ? 0 : st(id) + 1;
  if (n === 0) delete album.stickers[id]; else album.stickers[id] = n;
  el.className = 'spec-fig ' + ['','have','repeated'][n];
  updateStats(); saveAlbum();
};

window.cycleCoca = function(id, el) {
  const n = st(id) >= 2 ? 0 : st(id) + 1;
  if (n === 0) delete album.stickers[id]; else album.stickers[id] = n;
  el.className = 'coca-card ' + ['','have','repeated'][n];
  updateStats(); saveAlbum();
  let h = 0; CC.forEach(p => { if (st('CC_'+p.n) >= 1) h++; });
  const b = $('cocaBar'), c = $('cocaCount');
  if (b) b.style.width = Math.round(h/14*100) + '%';
  if (c) c.textContent = h + '/14';
};

/* ══════════ CARD / GROUP UPDATES ══════════ */
function updateTeamCard(card) {
  if (!card) return;
  const code = card.dataset.code;
  let have = 0, reps = 0;
  for (let i = 1; i <= FPT; i++) {
    const v = st(fid(code, i));
    if (v >= 1) have++;
    if (v === 2) reps++;
  }
  const pct = Math.round(have/FPT*100);
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
  card.classList.toggle('card-complete', pct === 100);
}

function updateGroupHeader(sec) {
  if (!sec) return;
  const g = GRUPOS.find(x => x.id === sec.dataset.group);
  if (!g) return;
  let h = 0, t = g.teams.length * FPT;
  g.teams.forEach(tm => { for (let i = 1; i <= FPT; i++) { if (st(fid(tm.code, i)) >= 1) h++; } });
  const pill = sec.querySelector('.group-progress-pill');
  if (pill) pill.innerHTML = '<b>' + h + '/' + t + '</b> · ' + Math.round(h/t*100) + '%';
}

function checkGroupCompletion(sec) {
  if (!sec) return;
  updateGroupHeader(sec);
  const g = GRUPOS.find(x => x.id === sec.dataset.group);
  if (!g) return;
  let total = 0, have = 0;
  g.teams.forEach(tm => { for (let i = 1; i <= FPT; i++) { total++; if (st(fid(tm.code, i)) >= 1) have++; } });
  const done = have === total;
  sec.classList.toggle('completed', done);
  if (done && !completedGroups.has(g.id)) {
    completedGroups.add(g.id);
    showCelebration('🏆', '¡Grupo completado!', g.label + ' tiene todas sus figuritas.');
    const trophy = $('heroTrophy');
    if (trophy) { trophy.classList.add('shine'); setTimeout(() => trophy.classList.remove('shine'), 700); }
  } else if (!done) {
    completedGroups.delete(g.id);
  }
}

/* ══════════ STATS ══════════ */
function calcAll() {
  let have = 0, rep = 0;
  Object.values(album.stickers).forEach(v => { if (v >= 1) have++; if (v === 2) rep++; });
  return { have, rep, miss: TOTAL - have };
}

function updateStats() {
  const { have, rep, miss } = calcAll();
  const pct = Math.round(have/TOTAL*100);

  const hPct = $('hPct'); if (hPct) hPct.textContent = pct + '%';
  const bigPct = $('bigPct'); if (bigPct) bigPct.textContent = pct + '%';

  const bar = $('mainBar'); if (bar) bar.style.width = pct + '%';
  const barTxt = $('mainBarText'); if (barTxt) barTxt.textContent = have + ' / ' + TOTAL;

  document.querySelectorAll('.milestone').forEach(m => {
    m.classList.toggle('reached', pct >= parseInt(m.dataset.pct));
  });

  if ($('sHave')) $('sHave').textContent = have;
  if ($('sMiss')) $('sMiss').textContent = miss;
  if ($('sRep')) $('sRep').textContent = rep;

  let done = 0;
  GRUPOS.forEach(g => {
    let h = 0;
    g.teams.forEach(t => { for (let i = 1; i <= FPT; i++) { if (st(fid(t.code, i)) >= 1) h++; } });
    if (h === g.teams.length * FPT) done++;
  });
  if ($('sGroups')) $('sGroups').textContent = done + '/12';

  if (bigPct) {
    bigPct.style.color = pct === 100 ? '#fbbf24' : pct >= 75 ? '#4ade80' : pct >= 50 ? '#22c55e' : 'var(--green)';
  }
}

window.changeSobres = function(d) {
  album.sobres = Math.max(0, (album.sobres || 0) + d);
  updateSobresUI(); saveAlbum();
};

function updateSobresUI() {
  const s = album.sobres || 0;
  if ($('sobresDisp')) $('sobresDisp').textContent = s;
  if ($('sSobres')) $('sSobres').textContent = s;
  if ($('sSobresInfo')) $('sSobresInfo').textContent = '≈' + (s*7) + ' fig.';
}

/* ══════════ BUILD ALBUM ══════════ */
function buildAlbum() {
  const cnt = $('groupsContainer');
  if (!cnt) return;
  cnt.innerHTML = '';
  completedGroups.clear();

  GRUPOS.forEach(g => {
    const sec = document.createElement('div');
    sec.className = 'group-section';
    sec.dataset.group = g.id;
    const tot = g.teams.length * FPT;
    sec.innerHTML = `
      <div class="group-header">
        <div class="group-badge">GRUPO ${g.id}</div>
        <div class="group-name">${g.label}</div>
        <div class="group-complete-badge">✓ Completo</div>
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
        const id = fid(tm.code, i), v = st(id), cls = ['','have','repeated'][v];
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
    let h = 0, t = g.teams.length * FPT;
    g.teams.forEach(tm => { for (let i = 1; i <= FPT; i++) { if (st(fid(tm.code, i)) >= 1) h++; } });
    if (h === t) { sec.classList.add('completed'); completedGroups.add(g.id); }
  });

  buildSpecials(cnt);
  buildCocaCola(cnt);
}

function buildSpecials(cnt) {
  const sec = document.createElement('div');
  sec.className = 'specials-section';
  let f = '';
  for (let i = 0; i <= 19; i++) {
    const id = 'SPEC_' + i, v = st(id), cls = ['','have','repeated'][v];
    f += `<div class="spec-fig ${cls}" onclick="cycleSpecial('${id}',this)">
      <span>${i === 0 ? '⭐' : '★'}</span>
      <span class="snum">${i === 0 ? '00' : 'FW' + i}</span>
    </div>`;
  }
  sec.innerHTML = `
    <div class="specials-header">
      <div class="specials-badge">SPECIALS</div>
      <div style="font-size:14px;font-weight:800;color:var(--text)">Figuritas especiales FIFA</div>
      <div style="margin-left:auto;font-size:11px;color:var(--text3)">20 figuritas</div>
    </div>
    <div class="specials-figs">${f}</div>
  `;
  cnt.appendChild(sec);
}

function buildCocaCola(cnt) {
  const sec = document.createElement('div');
  sec.className = 'coca-section';
  let h = 0; CC.forEach(p => { if (st('CC_'+p.n) >= 1) h++; });
  const cards = CC.map(p => {
    const id = 'CC_'+p.n, v = st(id), cls = ['','have','repeated'][v];
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
        <div class="coca-bar-track"><div class="coca-bar-fill" id="cocaBar" style="width:${Math.round(h/14*100)}%"></div></div>
        <span class="cp-val" id="cocaCount">${h}/14</span>
      </div>
      <div class="coca-grid">${cards}</div>
    </div>
  `;
  cnt.appendChild(sec);
}

/* ══════════ FILTERS ══════════ */
window.setFilter = function(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter();
};

window.applyFilter = function() {
  const q = ($('searchInput').value || '').toLowerCase();
  const clear = $('searchClear');
  if (clear) clear.style.display = q ? '' : 'none';
  document.querySelectorAll('.team-card').forEach(card => {
    const ms = card.dataset.name.includes(q);
    let mf = true;
    if (activeFilter !== 'all') {
      let have = 0;
      for (let i = 1; i <= FPT; i++) { if (st(fid(card.dataset.code, i)) >= 1) have++; }
      mf = activeFilter === 'complete' ? have === FPT : have < FPT;
    }
    card.style.display = (ms && mf) ? '' : 'none';
  });
  document.querySelectorAll('.group-section').forEach(s => {
    const v = Array.from(s.querySelectorAll('.team-card')).some(c => c.style.display !== 'none');
    s.style.display = v ? '' : 'none';
  });
};

window.clearSearch = function() {
  $('searchInput').value = '';
  window.applyFilter();
};

/* ══════════ TABS ══════════ */
window.showTab = function(tab, btn) {
  document.querySelectorAll('.page-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $('tab-album').style.display = tab === 'album' ? '' : 'none';
  $('tab-duplicates').style.display = tab === 'duplicates' ? '' : 'none';
  $('tab-stats').style.display = tab === 'stats' ? '' : 'none';
  if (tab === 'duplicates') buildDups();
  if (tab === 'stats') buildStats();
};

/* ══════════ DUPLICATES ══════════ */
function buildDups() {
  const tbody = $('dupBody'), empty = $('dupEmpty'), cnt = $('dupCount'), table = $('dupTable');
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

  cnt.textContent = reps.length;
  if (!reps.length) { tbody.innerHTML = ''; empty.style.display = ''; table.style.display = 'none'; return; }
  empty.style.display = 'none'; table.style.display = '';
  tbody.innerHTML = reps.map(r =>
    `<tr>
      <td><span class="dup-id">${r.id}</span></td>
      <td>${r.team}</td>
      <td style="color:var(--text2)">${r.sec}</td>
      <td><span class="dup-pill">Repetida</span></td>
    </tr>`
  ).join('');
}

window.copyDups = function() {
  const reps = [];
  GRUPOS.forEach(g => g.teams.forEach(t => {
    for (let i = 1; i <= FPT; i++) {
      if (st(fid(t.code, i)) === 2) reps.push(t.flag + ' ' + t.name + ' #' + i + ' (Grupo ' + g.id + ')');
    }
  }));
  for (let i = 0; i <= 19; i++) {
    if (st('SPEC_' + i) === 2) reps.push('⭐ Especial FW' + i);
  }
  CC.forEach(p => {
    if (st('CC_' + p.n) === 2) reps.push(p.flag + ' ' + p.name + ' CC' + p.n);
  });

  if (!reps.length) return showToast('No hay repetidas', 'var(--amber)');

  const { have } = calcAll();
  const pct = Math.round(have / TOTAL * 100);
  const msg = `⚽ Mis repetidas del Álbum Mundial 2026 (${pct}% completado):\n\n${reps.join('\n')}\n\n¿Me las cambias? Lleva el tuyo en: ${SITE_URL}`;

  navigator.clipboard.writeText(msg)
    .then(() => showToast('📋 Lista copiada con enlace', 'var(--blue)'));
};

window.shareDupsWhatsApp = function() {
  const reps = [];
  GRUPOS.forEach(g => g.teams.forEach(t => {
    for (let i = 1; i <= FPT; i++) {
      if (st(fid(t.code, i)) === 2) reps.push(t.flag + ' ' + t.name + ' #' + i);
    }
  }));
  for (let i = 0; i <= 19; i++) {
    if (st('SPEC_' + i) === 2) reps.push('⭐ Especial FW' + i);
  }
  CC.forEach(p => {
    if (st('CC_' + p.n) === 2) reps.push(p.flag + ' ' + p.name + ' CC' + p.n);
  });

  if (!reps.length) return showToast('No hay repetidas aún', 'var(--amber)');

  const { have } = calcAll();
  const pct = Math.round(have / TOTAL * 100);
  const msg = `⚽ Mis *repetidas* del Álbum Mundial 2026 (tengo el ${pct}%)\n\n${reps.join('\n')}\n\n¿Me las cambias? 👉 ${SITE_URL}`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
};

/* ══════════ STATS PAGE ══════════ */
function buildStats() {
  const page = $('statsPage');
  if (!page) return;
  const { have, rep, miss } = calcAll();
  const pct = Math.round(have/TOTAL*100);

  const teamData = [];
  GRUPOS.forEach(g => g.teams.forEach(t => {
    let h = 0;
    for (let i = 1; i <= FPT; i++) { if (st(fid(t.code, i)) >= 1) h++; }
    teamData.push({ ...t, have: h, pct: Math.round(h/FPT*100) });
  }));
  teamData.sort((a,b) => b.pct - a.pct);
  const top5 = teamData.slice(0, 5);

  const groupBars = GRUPOS.map(g => {
    let h = 0, t = g.teams.length * FPT;
    g.teams.forEach(tm => { for (let i = 1; i <= FPT; i++) { if (st(fid(tm.code, i)) >= 1) h++; } });
    return { id: g.id, have: h, total: t, pct: Math.round(h/t*100) };
  });

  const pieData = [
    { label: 'Tengo', val: have, color: '#22c55e' },
    { label: 'Faltan', val: miss, color: '#1a2438' },
    { label: 'Repetidas', val: rep, color: '#f59e0b' },
  ];
  const pieSVG = buildPie(pieData, 80);

  const ranks = ['🥇','🥈','🥉','4','5'];
  const rankClasses = ['gold','silver','bronze','',''];

  page.innerHTML = `
    <div class="stats-card full">
      <h3>🥧 Distribución de figuritas</h3>
      <div class="pie-wrap">
        ${pieSVG}
        <div class="pie-legend">
          ${pieData.map(d => `<div class="pie-leg-item"><div class="pie-dot" style="background:${d.color}"></div>${d.label}: <b style="color:var(--text);margin-left:4px">${d.val}</b></div>`).join('')}
          <div class="pie-leg-item" style="margin-top:4px;font-size:11px">Total: <b style="color:var(--text);margin-left:4px">${TOTAL}</b></div>
        </div>
      </div>
    </div>

    <div class="stats-card">
      <h3>🏅 Top equipos más completos</h3>
      ${top5.map((t,i) => `
        <div class="top-team-item">
          <div class="top-rank ${rankClasses[i]}">${ranks[i]}</div>
          <div class="top-flag">${t.flag}</div>
          <div class="top-info">
            <div class="top-name">${t.name}</div>
            <div class="top-pct">${t.have}/${FPT} figuritas</div>
          </div>
          <div class="top-badge">${t.pct}%</div>
        </div>
      `).join('')}
    </div>

    <div class="stats-card">
      <h3>📊 Progreso por grupo</h3>
      ${groupBars.map(g => `
        <div class="group-bar-item">
          <div class="gbi-top"><b>Grupo ${g.id}</b><span>${g.have}/${g.total}</span></div>
          <div class="gbi-track"><div class="gbi-fill" style="width:${g.pct}%"></div></div>
        </div>
      `).join('')}
    </div>
  `;
}

function buildPie(data, r) {
  const total = data.reduce((s,d) => s+d.val, 0);
  if (!total) return `<svg class="pie-svg" width="${r*2+20}" height="${r*2+20}" viewBox="0 0 ${r*2+20} ${r*2+20}"><circle cx="${r+10}" cy="${r+10}" r="${r}" fill="var(--surface3)"/></svg>`;
  let angle = -Math.PI/2;
  const cx = r+10, cy = r+10;
  let paths = '';
  data.forEach(d => {
    if (!d.val) return;
    const a = (d.val/total)*Math.PI*2;
    const x1 = cx + r*Math.cos(angle), y1 = cy + r*Math.sin(angle);
    angle += a;
    const x2 = cx + r*Math.cos(angle), y2 = cy + r*Math.sin(angle);
    const lg = a > Math.PI ? 1 : 0;
    paths += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${lg},1 ${x2},${y2} Z" fill="${d.color}" stroke="var(--bg)" stroke-width="2"/>`;
  });
  return `<svg class="pie-svg" width="${r*2+20}" height="${r*2+20}" viewBox="0 0 ${r*2+20} ${r*2+20}">${paths}</svg>`;
}

/* ══════════ CELEBRATION ══════════ */
function showCelebration(emoji, title, sub) {
  $('celebEmoji').textContent = emoji;
  $('celebTitle').textContent = title;
  $('celebSub').textContent = sub;
  const ov = $('celebrationOverlay');
  ov.classList.add('show');
}
window.closeCelebration = function() {
  $('celebrationOverlay').classList.remove('show');
};

/* ══════════ SHARE ══════════ */
window.shareProgress = function() {
  const { have, rep, miss } = calcAll();
  const pct = Math.round(have / TOTAL * 100);
  let done = 0;
  GRUPOS.forEach(g => {
    let h = 0;
    g.teams.forEach(t => { for (let i = 1; i <= FPT; i++) { if (st(fid(t.code, i)) >= 1) h++; } });
    if (h === g.teams.length * FPT) done++;
  });

  const bar = '█'.repeat(Math.round(pct / 10)) + '░'.repeat(10 - Math.round(pct / 10));
  const text = `⚽ ¡Ya tengo el ${pct}% del álbum del Mundial 2026!\n\n${bar} ${pct}%\n\n✅ Tengo: ${have}  ❌ Faltan: ${miss}\n🔄 Repetidas: ${rep}  🏆 Grupos: ${done}/12\n\n¿Puedes superarme? 👇\n${SITE_URL}`;

  $('shareText').textContent = text;
  $('shareOverlay').classList.add('show');

  window._shareText = text;
  window._sharePct = pct;
};

window.closeShare = function() { $('shareOverlay').classList.remove('show'); };

window.copyShare = function() {
  navigator.clipboard.writeText(window._shareText)
    .then(() => { showToast('📋 ¡Copiado!', 'var(--blue)'); window.closeShare(); });
};

window.shareWhatsApp = function() {
  window.open('https://wa.me/?text=' + encodeURIComponent(window._shareText), '_blank');
};

window.shareTwitter = function() {
  const tweet = `⚽ ¡Ya tengo el ${window._sharePct}% del álbum del Mundial 2026! ¿Puedes superarme? ${SITE_URL} #Panini2026 #Mundial2026`;
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet), '_blank');
};
