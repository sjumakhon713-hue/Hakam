'use strict';
/* Ҳакам — барномаи олимпиада: тест, чоп, скан, санҷиш, натиҷа */
const KEY = 'hakam-v1';
const LET = ['А', 'Б', 'В', 'Г'];
const SUBJ = ['Математика', 'Физика', 'Химия', 'Биология', 'Информатика', 'Забони тоҷикӣ', 'Адабиёти тоҷик', 'Забони русӣ', 'Забони англисӣ', 'Таърих', 'Ҷуғрофия', 'Ҳуқуқ'];
const MAXQ = 60;

/* ---------- намунаи саволҳо (ҷавоби дуруст: индекси 0..3) ---------- */
const SAMPLE = [
  ['Математика', 9, 'Решаи муодилаи 2x + 6 = 0 кадом аст?', ['3', '−3', '6', '−6'], 1],
  ['Математика', 9, 'Қимати ифодаи 3² + 4² ба чанд баробар аст?', ['7', '12', '25', '49'], 2],
  ['Математика', 9, '√144 = ?', ['12', '14', '72', '11'], 0],
  ['Математика', 9, 'Решаҳои муодилаи x² − 5x + 6 = 0:', ['−2 ва −3', '1 ва 6', '−1 ва 6', '2 ва 3'], 3],
  ['Математика', 9, 'Суммаи кунҷҳои дохилии секунҷа ба чанд баробар аст?', ['90°', '180°', '270°', '360°'], 1],
  ['Математика', 9, '15% аз адади 200 чанд аст?', ['30', '15', '20', '35'], 0],
  ['Математика', 9, 'Масоҳати росткунҷа бо тарафҳои 5 см ва 8 см:', ['13 см²', '26 см²', '40 см²', '80 см²'], 2],
  ['Математика', 9, 'Агар y = 2x − 1 бошад, қимати y ҳангоми x = 3 чанд аст?', ['4', '6', '7', '5'], 3],
  ['Математика', 9, 'Гипотенузаи секунҷаи росткунҷа бо катетҳои 6 ва 8:', ['10', '12', '14', '9'], 0],
  ['Математика', 9, '2⁵ = ?', ['10', '32', '25', '64'], 1],
  ['Математика', 9, 'Миёнаи арифметикии ададҳои 4, 6, 8, 10:', ['6', '8', '7', '28'], 2],
  ['Математика', 9, 'Кадоме аз ин ададҳо адади сода аст?', ['21', '27', '33', '17'], 3],
  ['Математика', 9, 'Дарозии давра бо радиуси 5 см (π ≈ 3,14):', ['31,4 см', '15,7 см', '78,5 см', '25 см'], 0],
  ['Математика', 9, 'Ҳалли нобаробарии 3x − 6 > 0:', ['x < 2', 'x > 2', 'x > −2', 'x < −2'], 1],
  ['Математика', 9, '(a + b)² = ?', ['a² + b²', 'a² − 2ab + b²', 'a² + 2ab + b²', '2a + 2b'], 2],
  ['Математика', 7, '7 · 8 = ?', ['56', '54', '64', '48'], 0],
  ['Математика', 7, '3/4 + 1/4 = ?', ['4/8', '1', '1/2', '3/16'], 1],
  ['Математика', 7, 'Периметри квадрат бо тарафи 6 см:', ['12 см', '36 см', '24 см', '18 см'], 2],
  ['Математика', 7, '−5 + 8 = ?', ['−3', '13', '−13', '3'], 3],
  ['Математика', 7, '0,5 · 10 = ?', ['5', '0,05', '50', '15'], 0],
  ['Математика', 7, 'Решаи муодилаи x : 3 = 4:', ['7', '12', '1', '4/3'], 1],
  ['Математика', 7, '1 соат чанд дақиқа аст?', ['100', '30', '60', '3600'], 2],
  ['Математика', 7, 'Кунҷи рост ба чанд дараҷа баробар аст?', ['45°', '60°', '180°', '90°'], 3],
  ['Математика', 7, '25% ин кадом ҳисса аст?', ['1/4', '1/2', '1/5', '2/5'], 0],
  ['Математика', 7, 'Хурдтарин каратии умумии 4 ва 6:', ['24', '12', '2', '10'], 1],
  ['Физика', 9, 'Воҳиди қувва дар системаи СИ:', ['Ҷоул', 'Ватт', 'Нютон', 'Паскал'], 2],
  ['Физика', 9, 'Суръати рӯшноӣ дар вакуум тақрибан ба чанд баробар аст?', ['300 км/с', '3000 км/с', '30 000 км/с', '300 000 км/с'], 3],
  ['Физика', 9, 'Формулаи суръат ҳангоми ҳаракати мунтазам:', ['v = s / t', 'v = s · t', 'v = t / s', 'v = m · a'], 0],
  ['Физика', 9, 'Қонуни Ом барои қитъаи занҷир:', ['I = U · R', 'I = U / R', 'I = R / U', 'U = I / R'], 1],
  ['Физика', 9, 'Воҳиди кор дар системаи СИ:', ['Нютон', 'Ватт', 'Ҷоул', 'Ампер'], 2],
  ['Физика', 9, 'Шитоби афтиши озод дар Замин тақрибан:', ['1,6 м/с²', '98 м/с²', '0,98 м/с²', '9,8 м/с²'], 3],
  ['Физика', 9, 'Қуввае, ки ҳамаи ҷисмҳоро ба Замин мекашад:', ['қувваи вазнинӣ', 'қувваи эластикӣ', 'қувваи соиш', 'қувваи Архимед'], 0],
  ['Физика', 9, 'Об дар фишори муқаррарии атмосферӣ дар чанд °C меҷӯшад?', ['90 °C', '100 °C', '80 °C', '120 °C'], 1],
  ['Физика', 9, 'Воҳиди тавоноӣ:', ['Ҷоул', 'Нютон', 'Ватт', 'Волт'], 2],
  ['Физика', 9, 'Формулаи импулси ҷисм:', ['p = m / v', 'p = m · a', 'p = m · g', 'p = m · v'], 3],
  ['Информатика', 9, '1 байт ба чанд бит баробар аст?', ['8', '2', '10', '16'], 0],
  ['Информатика', 9, 'Адади дуии 101 дар системаи даҳӣ:', ['3', '5', '6', '101'], 1],
  ['Информатика', 9, 'Кадомаш дастгоҳи вуруд аст?', ['Монитор', 'Принтер', 'Клавиатура', 'Баландгӯяк'], 2],
  ['Информатика', 9, '1 Кбайт ба чанд байт баробар аст?', ['1000', '100', '8', '1024'], 3],
  ['Информатика', 9, 'Кадом қисми компютер маълумотро коркард мекунад?', ['Протсессор', 'Монитор', 'Муш', 'Клавиатура'], 0],
  ['Информатика', 9, 'Кадомаш системаи амалиёт аст?', ['Word', 'Windows', 'Excel', 'Chrome'], 1],
  ['Информатика', 9, 'Дар Excel формула бо кадом аломат оғоз мешавад?', ['+', '#', '=', '*'], 2],
  ['Информатика', 9, 'Адади 10 дар системаи дуӣ:', ['1100', '1001', '0110', '1010'], 3],
  ['Информатика', 9, 'Кадомаш браузер аст?', ['Chrome', 'Word', 'Paint', 'Excel'], 0],
  ['Информатика', 9, 'Алгоритм чист?', ['Барномаи антивирус', 'Пайдарпайии амалҳо барои ҳалли масъала', 'Қисми компютер', 'Намуди файл'], 1],
];
const DEMO_NAMES = ['Азизов Фирдавс', 'Раҳимова Мадина', 'Сафаров Шаҳриёр', 'Назарова Нигина', 'Қодиров Бахтовар', 'Шарипова Зарина', 'Ғафуров Исмоил', 'Холова Манижа', 'Мирзоев Комрон', 'Юсуфова Фарзона', 'Давлатов Сино', 'Каримова Сабрина'];
const DEMO_SCH = ['МТМУ №1', 'МТМУ №3', 'Литсейи №2', 'МТМУ №5'];

/* ---------- ёрирасонҳо ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(arr, rnd) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function toast(m, ms = 2600) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), ms); }
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = d => d ? d.split('-').reverse().join('.') : '';

/* ---------- маълумот ---------- */
let D = load();
function demo() {
  const bank = SAMPLE.map(([subj, grade, text, opts, ans]) => ({ id: uid(), subj, grade, text, opts, ans, pts: 1 }));
  const d = { v: 1, bank, olys: [], set: { org: 'Шуъбаи маорифи шаҳри Кӯлоб', city: 'Кӯлоб', chair: '' } };
  const qs = bank.filter(q => q.subj === 'Математика' && q.grade === 9);
  const o = newOly(d, { name: 'Олимпиадаи мактабии математика', subj: 'Математика', grade: 9, date: today(), nv: 4, mins: 45, qs });
  o.parts = DEMO_NAMES.map((n, i) => ({ no: i + 1, name: n, school: DEMO_SCH[i % 4], cls: '9' }));
  d.olys.push(o);
  return d;
}
function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.bank) return s; } catch (e) { } return demo(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { toast('Хотира пур шуд. Нусхаи эҳтиётӣ гиред ва аксҳои саволҳоро кам кунед.'); } }

function newOly(d, { name, subj, grade, date, nv, mins, qs, shuffleQ = true, shuffleO = true }) {
  const used = new Set(d.olys.map(o => o.tag));
  let tag = 1; while (used.has(tag) && tag < 63) tag++;
  const o = { id: uid(), tag, name, subj, grade: +grade, date, nv: +nv, mins: +mins, shuffleQ, shuffleO, seed: Math.floor(Math.random() * 1e9),
    qs: qs.map(q => ({ ...q, opts: q.opts.slice() })), parts: [], res: {}, g: { 5: 85, 4: 70, 3: 50 }, aw: { mode: 'place', min: 50, p1: 85, p2: 70, p3: 55 } };
  makeVariants(o);
  return o;
}
function makeVariants(o) {
  const rnd = mulberry(o.seed);
  const idx = o.qs.map((_, i) => i);
  o.vars = [];
  for (let v = 0; v < o.nv; v++) {
    const order = (o.shuffleQ && v > 0) ? shuffle(idx, rnd) : idx.slice();
    const perm = order.map(() => (o.shuffleO && v > 0) ? shuffle([0, 1, 2, 3], rnd) : [0, 1, 2, 3]);
    o.vars.push({ order, perm });
  }
}
const oly = id => D.olys.find(o => o.id === id);
const varOf = (o, no) => (no - 1) % o.nv;
function keyOf(o, v) { const va = o.vars[v]; return va.order.map((qi, pos) => va.perm[pos].indexOf(o.qs[qi].ans)); }
const maxPts = o => o.qs.reduce((s, q) => s + (+q.pts || 1), 0);

/* ---------- ҳисоби натиҷа ---------- */
function scoreOf(o, r) {
  const va = o.vars[r.v]; if (!va) return { sc: 0, ok: 0 };
  let sc = 0, ok = 0;
  va.order.forEach((qi, pos) => { const q = o.qs[qi]; if (r.marks[pos] >= 0 && va.perm[pos][r.marks[pos]] === q.ans) { sc += (+q.pts || 1); ok++; } });
  return { sc, ok };
}
function gradeOf(o, pct) { return pct >= o.g[5] ? 5 : pct >= o.g[4] ? 4 : pct >= o.g[3] ? 3 : 2; }
function results(o) {
  const mx = maxPts(o) || 1;
  const rows = o.parts.map(p => {
    const r = o.res[p.no];
    if (!r) return { p, absent: true };
    const { sc, ok } = scoreOf(o, r); const pct = Math.round(sc / mx * 1000) / 10;
    return { p, r, sc, ok, pct, grade: gradeOf(o, pct), flags: (r.flags || []).length };
  });
  const done = rows.filter(x => !x.absent).sort((a, b) => b.sc - a.sc || a.p.name.localeCompare(b.p.name));
  done.forEach((x, i) => { x.place = (i > 0 && done[i - 1].sc === x.sc) ? done[i - 1].place : i + 1; });
  done.forEach(x => {
    if (o.aw.mode === 'place') x.award = (x.place <= 3 && x.pct >= o.aw.min) ? x.place : 0;
    else x.award = x.pct >= o.aw.p1 ? 1 : x.pct >= o.aw.p2 ? 2 : x.pct >= o.aw.p3 ? 3 : 0;
  });
  return { done, absent: rows.filter(x => x.absent), mx };
}
const ROMAN = ['', 'I', 'II', 'III'];

/* ---------- навигатсия ---------- */
let UI = { view: 'home', oly: null, tab: 'qs', bf: { subj: '', grade: '', q: '' }, scans: [] };
const NAV = [['home', '🏠', 'Асосӣ'], ['bank', '📚', 'Бонки саволҳо'], ['olys', '🏆', 'Олимпиадаҳо'], ['set', '⚙️', 'Танзимот']];
function go(view, extra = {}) { Object.assign(UI, { view }, extra); render(); $('#main').scrollTop = 0; }
function render() {
  $('#nav').innerHTML = NAV.map(([k, i, t]) => `<button class="${UI.view === k || (k === 'olys' && UI.view === 'oly') ? 'on' : ''}" onclick="go('${k}')"><span>${i}</span>${t}</button>`).join('');
  const V = { home: vHome, bank: vBank, olys: vOlys, oly: vOly, set: vSet }[UI.view] || vHome;
  $('#main').innerHTML = V();
  if (UI.view === 'oly' && UI.tab === 'print') setTimeout(fitPreview, 0);
}

/* ---------- Асосӣ ---------- */
function vHome() {
  const np = D.olys.reduce((s, o) => s + o.parts.length, 0);
  const nr = D.olys.reduce((s, o) => s + Object.keys(o.res).length, 0);
  return `<div class="hero"><div class="grow"><h1>Ҳакам</h1><p>Тест барои олимпиада тартиб диҳед, варақаҳоро чоп кунед, варақаҳои ҷавобро скан кунед — барнома худаш месанҷад, баҳо мегузорад ва ғолибонро муайян мекунад. Мисли варақаҳои Маркази миллии тестӣ.</p>
  <div class="row"><button class="btn gold" onclick="olyForm()">＋ Олимпиадаи нав</button><button class="btn" style="background:transparent;color:#fff;border-color:#4A5F8F" onclick="go('bank')">📚 Бонки саволҳо</button></div></div><div class="medal">🏅</div></div>
  <div class="grid g4" style="margin-bottom:18px">
   <div class="card stat"><b>${D.bank.length}</b><span>савол дар бонк</span></div>
   <div class="card stat"><b>${D.olys.length}</b><span>олимпиада</span></div>
   <div class="card stat"><b>${np}</b><span>иштирокчӣ</span></div>
   <div class="card stat"><b>${nr}</b><span>варақаи санҷидашуда</span></div></div>
  <h2>Чӣ тавр кор мекунад</h2>
  <div class="steps" style="margin-bottom:22px">
   <div class="step"><i>📚</i><b>1. Саволҳо</b><span>Саволҳоро аз рӯи фан ва синф ворид кунед ё аз Word гузаронед</span></div>
   <div class="step"><i>🏆</i><b>2. Олимпиада</b><span>Фан, синф, шумораи саволҳо ва вариантҳоро интихоб кунед</span></div>
   <div class="step"><i>🖨️</i><b>3. Чоп</b><span>Варақаи саволҳо ва варақаи ҷавобҳо барои ҳар иштирокчӣ</span></div>
   <div class="step"><i>📷</i><b>4. Скан</b><span>Варақаҳои пуркардаро скан кунед ё акс гиред</span></div>
   <div class="step"><i>🥇</i><b>5. Натиҷа</b><span>Хол, баҳо, ҷойҳо, протокол ва ифтихорномаҳо</span></div></div>
  <h2>Олимпиадаҳо</h2>${olyCards()}`;
}
function olyCards() {
  if (!D.olys.length) return `<div class="card empty">Ҳоло олимпиада нест. <button class="btn pri" onclick="olyForm()">＋ Олимпиадаи нав</button></div>`;
  return `<div class="grid g3">${D.olys.map(o => {
    const n = Object.keys(o.res).length;
    return `<div class="card"><div class="row" style="justify-content:space-between"><span class="pill gold">${esc(o.subj)} · синфи ${o.grade}</span><span class="small muted">${fmtDate(o.date)}</span></div>
     <h3 style="margin:10px 0 6px">${esc(o.name)}</h3><div class="small muted">${o.qs.length} савол · ${o.nv} вариант · ${o.parts.length} иштирокчӣ</div>
     <div class="bar" style="margin:12px 0 6px"><i style="width:${o.parts.length ? n / o.parts.length * 100 : 0}%"></i></div><div class="small muted">Санҷида шуд: ${n} аз ${o.parts.length}</div>
     <div class="row" style="margin-top:12px"><button class="btn pri sm" onclick="go('oly',{oly:'${o.id}',tab:'qs'})">Кушодан</button>${n ? `<button class="btn sm" onclick="go('oly',{oly:'${o.id}',tab:'res'})">🥇 Натиҷаҳо</button>` : ''}</div></div>`;
  }).join('')}</div>`;
}

/* ---------- Бонки саволҳо ---------- */
function bankList() {
  const f = UI.bf, s = f.q.trim().toLowerCase();
  return D.bank.filter(q => (!f.subj || q.subj === f.subj) && (!f.grade || q.grade == f.grade) && (!s || q.text.toLowerCase().includes(s)));
}
function subjOptions(sel, all = true) { const list = [...new Set([...SUBJ, ...D.bank.map(q => q.subj)])]; return (all ? `<option value="">Ҳама фанҳо</option>` : '') + list.map(x => `<option ${x === sel ? 'selected' : ''}>${esc(x)}</option>`).join(''); }
function gradeOptions(sel, all = true) { return (all ? `<option value="">Ҳама синфҳо</option>` : '') + Array.from({ length: 11 }, (_, i) => `<option value="${i + 1}" ${sel == i + 1 ? 'selected' : ''}>Синфи ${i + 1}</option>`).join(''); }
function vBank() {
  const list = bankList();
  const groups = {}; D.bank.forEach(q => { const k = q.subj + ' · ' + q.grade; groups[k] = (groups[k] || 0) + 1; });
  return `<div class="row" style="justify-content:space-between;margin-bottom:6px"><div><h1>Бонки саволҳо</h1><p class="sub">${D.bank.length} савол · ${Object.keys(groups).length} гурӯҳ (фан · синф)</p></div>
   <div class="row"><button class="btn" onclick="importForm()">📋 Воридоти матн</button><button class="btn pri" onclick="qForm()">＋ Савол</button></div></div>
   <div class="card" style="margin-bottom:14px"><div class="row">
    <select onchange="UI.bf.subj=this.value;render()">${subjOptions(UI.bf.subj)}</select>
    <select onchange="UI.bf.grade=this.value;render()">${gradeOptions(UI.bf.grade)}</select>
    <input type="text" class="grow" placeholder="🔍 Ҷустуҷӯ дар матни савол…" value="${esc(UI.bf.q)}" oninput="UI.bf.q=this.value;clearTimeout(window._bt);window._bt=setTimeout(()=>{render();const i=document.querySelector('#main input[type=text]');i.focus();i.setSelectionRange(i.value.length,i.value.length)},300)">
    <span class="muted small">Ёфт шуд: ${list.length}</span></div></div>
   <div class="card">${list.length ? list.map((q, i) => qItem(q, i + 1, true)).join('') : '<div class="empty">Савол нест. «＋ Савол» ё «Воридоти матн»-ро пахш кунед.</div>'}</div>`;
}
function qItem(q, n, edit) {
  return `<div class="q"><div class="n">${n}</div><div class="grow"><div class="row" style="gap:8px;margin-bottom:4px"><span class="pill">${esc(q.subj)}</span><span class="pill">синфи ${q.grade}</span><span class="pill gold">${q.pts || 1} хол</span></div>
   <div>${esc(q.text)}</div>${q.img ? `<img src="${q.img}" style="max-height:110px;margin-top:6px;border-radius:6px">` : ''}
   <div class="opts">${q.opts.map((t, k) => `<div class="${k === q.ans ? 'ok' : ''}">${LET[k]}) ${esc(t)}${k === q.ans ? ' ✓' : ''}</div>`).join('')}</div></div>
   ${edit ? `<div class="row" style="align-items:flex-start;gap:6px"><button class="btn sm" onclick="qForm('${q.id}')">✏️</button><button class="btn sm red" onclick="qDel('${q.id}')">🗑</button></div>` : ''}</div>`;
}
let qImg = null;
function qForm(id) {
  const q = id ? D.bank.find(x => x.id === id) : { subj: UI.bf.subj || 'Математика', grade: UI.bf.grade || 9, text: '', opts: ['', '', '', ''], ans: 0, pts: 1 };
  qImg = q.img || null;
  modal(`<h2>${id ? 'Таҳрири савол' : 'Саволи нав'}</h2>
  <div class="grid g3" style="margin-bottom:12px"><label class="f">Фан<input type="text" id="qs" list="subjl" value="${esc(q.subj)}"><datalist id="subjl">${subjOptions('', false)}</datalist></label>
   <label class="f">Синф<select id="qg">${gradeOptions(q.grade, false)}</select></label><label class="f">Хол<input type="number" id="qp" min="1" max="10" value="${q.pts || 1}"></label></div>
  <label class="f" style="margin-bottom:12px">Матни савол<textarea id="qt" rows="3">${esc(q.text)}</textarea></label>
  <div class="row" style="margin-bottom:12px"><button class="btn sm" onclick="pickImg()">🖼 Расм илова кардан</button><span id="qimg">${qImg ? '<img src="' + qImg + '" style="max-height:60px"> <button class=\'btn sm red\' onclick=\'qImg=null;document.getElementById("qimg").innerHTML=""\'>×</button>' : ''}</span></div>
  <div class="small muted" style="margin-bottom:6px">Ҷавобҳо — ҷавоби дурустро бо доира қайд кунед:</div>
  ${q.opts.map((t, k) => `<div class="row" style="margin-bottom:8px"><label class="chk"><input type="radio" name="qa" value="${k}" ${k === q.ans ? 'checked' : ''}><b style="width:18px">${LET[k]}</b></label><input type="text" class="grow qo" value="${esc(t)}"></div>`).join('')}
  <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn pri" onclick="qSave('${id || ''}')">Нигоҳ доштан</button></div>`);
  setTimeout(() => $('#qt').focus(), 50);
}
function pickImg() {
  const fi = $('#fileIn'); fi.accept = 'image/*'; fi.multiple = false; fi.value = '';
  fi.onchange = async () => { const f = fi.files[0]; if (!f) return; const c = await fileToCanvas(f, 700); qImg = c.toDataURL('image/jpeg', .8); $('#qimg').innerHTML = `<img src="${qImg}" style="max-height:60px">`; };
  fi.click();
}
function qSave(id) {
  const text = $('#qt').value.trim(), opts = [...document.querySelectorAll('.qo')].map(i => i.value.trim());
  if (!text || opts.some(o => !o)) return toast('Матни савол ва ҳамаи 4 ҷавобро пур кунед');
  const data = { subj: $('#qs').value.trim() || 'Математика', grade: +$('#qg').value, pts: Math.max(1, +$('#qp').value || 1), text, opts, ans: +document.querySelector('input[name=qa]:checked').value, img: qImg || undefined };
  if (id) Object.assign(D.bank.find(x => x.id === id), data); else D.bank.unshift({ id: uid(), ...data });
  save(); closeModal(); render(); toast('Савол нигоҳ дошта шуд');
}
function qDel(id) { if (!confirm('Ин саволро нест кунем?')) return; D.bank = D.bank.filter(q => q.id !== id); save(); render(); }
function importForm() {
  modal(`<h2>Воридоти саволҳо аз матн</h2><p class="sub">Саволҳоро аз Word ё дафтар нусха гиред ва ин ҷо гузоред. Ҷавоби дурустро бо ситорача (*) нишон диҳед.</p>
  <div class="grid g3" style="margin-bottom:12px"><label class="f">Фан<input type="text" id="is" list="subjl2" value="${esc(UI.bf.subj || 'Математика')}"><datalist id="subjl2">${subjOptions('', false)}</datalist></label><label class="f">Синф<select id="ig">${gradeOptions(UI.bf.grade || 9, false)}</select></label><label class="f">Хол барои ҳар савол<input type="number" id="ip" value="1" min="1"></label></div>
  <textarea id="it" rows="12" placeholder="1. Пойтахти Тоҷикистон кадом шаҳр аст?
А) Хуҷанд
*Б) Душанбе
В) Кӯлоб
Г) Бохтар

2. ..."></textarea>
  <div id="iprev" class="small muted" style="margin:8px 0"></div>
  <div class="row" style="justify-content:flex-end"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn" onclick="const r=parseQs(document.getElementById('it').value);document.getElementById('iprev').textContent='Ёфт шуд: '+r.qs.length+' савол'+(r.bad.length?' · хато дар: '+r.bad.join(', '):'')">Санҷидан</button><button class="btn pri" onclick="doImport()">Ворид кардан</button></div>`);
}
function parseQs(txt) {
  const L = { 'А': 0, 'Б': 1, 'В': 2, 'Г': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'а': 0, 'б': 1, 'в': 2, 'г': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
  const qs = [], bad = []; let cur = null;
  const push = () => { if (!cur) return; if (cur.opts.length === 4 && cur.ans >= 0 && cur.text) qs.push(cur); else bad.push(cur.n); cur = null; };
  for (let line of txt.split(/\r?\n/)) {
    line = line.trim(); if (!line) continue;
    let m = line.match(/^(\*?)\s*([АБВГабвгABCDabcd])\s*[\)\.]\s*(\*?)\s*(.*?)\s*(\*?)$/);
    if (m && cur && cur.opts.length < 4) { if (m[1] || m[3] || m[5]) cur.ans = cur.opts.length; cur.opts.push(m[4]); continue; }
    m = line.match(/^(\d+)\s*[\.\)]\s*(.+)$/);
    if (m) { push(); cur = { n: m[1], text: m[2], opts: [], ans: -1 }; continue; }
    if (cur && !cur.opts.length) cur.text += ' ' + line;
  }
  push();
  return { qs, bad };
}
function doImport() {
  const r = parseQs($('#it').value); if (!r.qs.length) return toast('Савол ёфт нашуд. Намунаро бинед.');
  const subj = $('#is').value.trim() || 'Математика', grade = +$('#ig').value, pts = Math.max(1, +$('#ip').value || 1);
  r.qs.forEach(q => D.bank.push({ id: uid(), subj, grade, pts, text: q.text, opts: q.opts, ans: q.ans }));
  save(); closeModal(); UI.bf.subj = subj; UI.bf.grade = grade; render(); toast(`${r.qs.length} савол ворид шуд${r.bad.length ? ' · ' + r.bad.length + ' савол хато дорад' : ''}`);
}

/* ---------- Олимпиадаҳо ---------- */
function vOlys() {
  return `<div class="row" style="justify-content:space-between"><div><h1>Олимпиадаҳо</h1><p class="sub">Ҳар олимпиада — як фан ва як синф</p></div><button class="btn pri" onclick="olyForm()">＋ Олимпиадаи нав</button></div>${olyCards()}`;
}
function olyForm(id) {
  const o = id ? oly(id) : { name: 'Олимпиадаи мактабӣ', subj: 'Математика', grade: 9, date: today(), nv: 4, mins: 45, shuffleQ: true, shuffleO: true };
  modal(`<h2>${id ? 'Танзимоти олимпиада' : 'Олимпиадаи нав'}</h2>
  <label class="f" style="margin-bottom:12px">Номи олимпиада<input type="text" id="on" value="${esc(o.name)}"></label>
  <div class="grid g3" style="margin-bottom:12px"><label class="f">Фан<select id="os" onchange="olyCount()">${subjOptions(o.subj, false)}</select></label><label class="f">Синф<select id="og" onchange="olyCount()">${gradeOptions(o.grade, false)}</select></label><label class="f">Сана<input type="date" id="od" value="${o.date}"></label></div>
  <div class="grid g3" style="margin-bottom:12px"><label class="f">Шумораи саволҳо<input type="number" id="oq" min="1" max="${MAXQ}" value="${id ? o.qs.length : 15}"></label><label class="f">Вариантҳо<select id="ov">${[1, 2, 3, 4].map(n => `<option ${n == o.nv ? 'selected' : ''}>${n}</option>`).join('')}</select></label><label class="f">Вақт (дақиқа)<input type="number" id="om" value="${o.mins}"></label></div>
  <label class="chk"><input type="checkbox" id="osq" ${o.shuffleQ ? 'checked' : ''}> Тартиби саволҳо дар вариантҳо омехта шавад</label>
  <label class="chk" style="margin-top:6px"><input type="checkbox" id="oso" ${o.shuffleO ? 'checked' : ''}> Тартиби ҷавобҳо (А, Б, В, Г) омехта шавад</label>
  <div id="ocnt" class="card" style="margin-top:12px;background:#FAFBFD"></div>
  <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn pri" onclick="olySave('${id || ''}')">${id ? 'Нигоҳ доштан' : 'Сохтан'}</button></div>`);
  olyCount();
}
function olyCount() {
  const n = D.bank.filter(q => q.subj === $('#os').value && q.grade == $('#og').value).length;
  $('#ocnt').innerHTML = n ? `Дар бонк барои ин фан ва синф <b>${n}</b> савол ҳаст. Саволҳо ба таври тасодуфӣ интихоб мешаванд — баъд онҳоро иваз кардан мумкин аст.` : `<span style="color:var(--red)">Барои ин фан ва синф дар бонк савол нест.</span> Аввал саволҳоро дар «Бонки саволҳо» ворид кунед.`;
}
function olySave(id) {
  const subj = $('#os').value, grade = +$('#og').value;
  const nq = Math.min(MAXQ, Math.max(1, +$('#oq').value || 1));
  const pool = D.bank.filter(q => q.subj === subj && q.grade == grade);
  const base = { name: $('#on').value.trim() || 'Олимпиада', subj, grade, date: $('#od').value, nv: +$('#ov').value, mins: +$('#om').value || 45, shuffleQ: $('#osq').checked, shuffleO: $('#oso').checked };
  if (id) {
    const o = oly(id); const changeQ = o.subj !== subj || o.grade !== grade || o.qs.length !== nq;
    const struct = changeQ || o.nv !== base.nv || o.shuffleQ !== base.shuffleQ || o.shuffleO !== base.shuffleO;
    if (struct && Object.keys(o.res).length && !confirm('Варақаҳои аллакай санҷидашуда бекор мешаванд, чунки вариантҳо дигар мешаванд. Давом диҳем?')) return;
    Object.assign(o, base);
    if (changeQ) { if (pool.length < nq) return toast(`Дар бонк танҳо ${pool.length} савол ҳаст`); o.qs = shuffle(pool, Math.random).slice(0, nq).map(q => ({ ...q })); }
    if (struct) { o.res = {}; makeVariants(o); }
    save(); closeModal(); render(); return;
  }
  if (pool.length < nq) return toast(`Дар бонк танҳо ${pool.length} савол ҳаст. Шумораро кам кунед ё савол илова кунед.`);
  const o = newOly(D, { ...base, qs: shuffle(pool, Math.random).slice(0, nq) });
  D.olys.unshift(o); save(); closeModal(); go('oly', { oly: o.id, tab: 'qs' }); toast('Олимпиада сохта шуд');
}
function olyDel(id) { if (!confirm('Олимпиада ва ҳамаи натиҷаҳояш нест карда шаванд?')) return; D.olys = D.olys.filter(o => o.id !== id); save(); go('olys'); }

const OTABS = [['qs', '📝 Саволҳо'], ['parts', '👥 Иштирокчиён'], ['print', '🖨️ Чоп'], ['scan', '📷 Санҷиш'], ['res', '🥇 Натиҷаҳо']];
function vOly() {
  const o = oly(UI.oly); if (!o) return vOlys();
  const T = { qs: tQs, parts: tParts, print: tPrint, scan: tScan, res: tRes }[UI.tab] || tQs;
  return `<div class="row" style="justify-content:space-between"><div><div class="small muted"><a href="#" onclick="go('olys');return false">Олимпиадаҳо</a> ›</div><h1>${esc(o.name)}</h1>
   <div class="row" style="gap:8px;margin:6px 0 4px"><span class="pill gold">${esc(o.subj)}</span><span class="pill">синфи ${o.grade}</span><span class="pill">${fmtDate(o.date)}</span><span class="pill">${o.qs.length} савол · ${maxPts(o)} хол</span><span class="pill">${o.nv} вариант</span><span class="pill">${o.mins} дақиқа</span></div></div>
   <div class="row"><button class="btn sm" onclick="olyForm('${o.id}')">⚙️ Танзимот</button><button class="btn sm red" onclick="olyDel('${o.id}')">🗑</button></div></div>
   <div class="tabs">${OTABS.map(([k, t]) => `<button class="${UI.tab === k ? 'on' : ''}" onclick="UI.tab='${k}';render()">${t}</button>`).join('')}</div>${T(o)}`;
}
function tQs(o) {
  return `<div class="row" style="justify-content:space-between;margin-bottom:12px"><p class="muted" style="margin:0">Саволҳои варианти 1. Дар вариантҳои дигар тартиб ${o.shuffleQ ? 'омехта' : 'ҳамин'} аст${o.shuffleO ? ', ҷавобҳо ҳам омехта' : ''}.</p>
   <div class="row"><button class="btn sm" onclick="olyPick('${o.id}')">🔁 Интихоби саволҳо</button></div></div>
   <div class="card">${o.qs.map((q, i) => qItem(q, i + 1, false)).join('')}</div>`;
}
function olyPick(id) {
  const o = oly(id); const pool = D.bank.filter(q => q.subj === o.subj && q.grade == o.grade);
  const sel = new Set(o.qs.map(q => q.id));
  modal(`<h2>Интихоби саволҳо</h2><p class="sub">${esc(o.subj)}, синфи ${o.grade} · дар бонк ${pool.length} савол · то ${MAXQ} савол</p>
  <div style="max-height:56vh;overflow:auto;border:1px solid var(--line);border-radius:10px;padding:4px 12px">${pool.map(q => `<label class="chk" style="padding:8px 0;border-bottom:1px solid var(--line);align-items:flex-start"><input type="checkbox" class="pk" value="${q.id}" ${sel.has(q.id) ? 'checked' : ''}><span>${esc(q.text)} <span class="muted small">(${q.pts || 1} хол)</span></span></label>`).join('')}</div>
  <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn pri" onclick="olyPickSave('${id}')">Нигоҳ доштан</button></div>`);
}
function olyPickSave(id) {
  const o = oly(id); const ids = [...document.querySelectorAll('.pk:checked')].map(i => i.value);
  if (!ids.length) return toast('Ақаллан як савол интихоб кунед'); if (ids.length > MAXQ) return toast(`На зиёда аз ${MAXQ} савол`);
  if (Object.keys(o.res).length && !confirm('Натиҷаҳои санҷидашуда бекор мешаванд. Давом диҳем?')) return;
  o.qs = ids.map(i => ({ ...D.bank.find(q => q.id === i) })); o.res = {}; o.seed = Math.floor(Math.random() * 1e9); makeVariants(o); save(); closeModal(); render();
}

/* ---------- Иштирокчиён ---------- */
function tParts(o) {
  return `<div class="grid" style="grid-template-columns:1.6fr 1fr;align-items:start">
  <div class="card" style="padding:0;overflow:hidden">${o.parts.length ? `<table class="t"><tr><th>№</th><th>Ному насаб</th><th>Мактаб</th><th>Синф</th><th>Вариант</th><th></th></tr>
   ${o.parts.map(p => `<tr><td><b>${p.no}</b></td><td>${esc(p.name)}</td><td>${esc(p.school)}</td><td>${esc(p.cls)}</td><td><span class="pill">${varOf(o, p.no) + 1}</span></td><td style="text-align:right"><button class="btn sm red" onclick="partDel('${o.id}',${p.no})">×</button></td></tr>`).join('')}</table>` : '<div class="empty">Ҳоло иштирокчӣ нест</div>'}</div>
  <div class="card"><h3>Илова кардан</h3><p class="small muted" style="margin-top:0">Ҳар сатр — як иштирокчӣ: <b>Ному насаб; Мактаб; Синф</b>. Метавонед аз Excel нусха гиред.</p>
   <textarea id="pt" rows="9" placeholder="Раҳимов Алишер; МТМУ №4; 9
Саидова Парвина; Литсейи №2; 9"></textarea>
   <div class="row" style="margin-top:10px"><button class="btn pri" onclick="partAdd('${o.id}')">＋ Илова</button>${o.parts.length ? `<button class="btn red sm" onclick="partClear('${o.id}')">Тоза кардани рӯйхат</button>` : ''}</div>
   <p class="small muted">Вариантҳо бо навбат дода мешаванд (1, 2, 3, 4, 1…), то ҳамсояҳо як вариант надошта бошанд.</p></div></div>`;
}
function partAdd(id) {
  const o = oly(id); let no = o.parts.reduce((m, p) => Math.max(m, p.no), 0);
  const lines = $('#pt').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean); let n = 0;
  for (const l of lines) { const c = l.split(/[;\t]/).map(s => s.trim()); if (!c[0]) continue; if (no >= 1023) { toast('Ҳадди аксар 1023 иштирокчӣ'); break; } o.parts.push({ no: ++no, name: c[0], school: c[1] || '', cls: c[2] || String(o.grade) }); n++; }
  save(); render(); toast(`${n} иштирокчӣ илова шуд`);
}
function partDel(id, no) { const o = oly(id); if (o.res[no] && !confirm('Ин иштирокчӣ натиҷа дорад. Нест кунем?')) return; o.parts = o.parts.filter(p => p.no !== no); delete o.res[no]; save(); render(); }
function partClear(id) { if (!confirm('Ҳамаи иштирокчиён ва натиҷаҳо нест карда шаванд?')) return; const o = oly(id); o.parts = []; o.res = {}; save(); render(); }

/* ================= ВАРАҚАИ ҶАВОБҲО: геометрия (мм) ================= */
const SH = {
  M: [[16, 16], [194, 16], [194, 281], [16, 281]],   // марказҳои нишонаҳои кунҷӣ (8×8 мм)
  OR: [28.5, 16],                                      // нишонаи самт (5×5 мм), танҳо дар боло-чап
  code: { x0: 49, step: 6.4, y: 67, n: 20 },           // рамзи варақа: 20 катак
  grid: { y0: 99, dy: 8.3, cols: [24, 88, 152], bx: 11, bdx: 8.4, r: 2.6 },
  white: [] // нуқтаҳои холӣ барои сатҳи сафед
};
for (let r = 0; r < 20; r++) { SH.white.push([76, SH.grid.y0 + r * SH.grid.dy], [140, SH.grid.y0 + r * SH.grid.dy]); }
function bpos(q, k) { const g = SH.grid, col = Math.floor(q / 20), row = q % 20; return [g.cols[col] + g.bx + k * g.bdx, g.y0 + row * g.dy]; }
function encode(tag, v, no) {
  const b = []; for (let i = 5; i >= 0; i--) b.push(tag >> i & 1); for (let i = 1; i >= 0; i--) b.push(v >> i & 1); for (let i = 9; i >= 0; i--) b.push(no >> i & 1);
  const c = b.reduce((s, x) => s + x, 0) % 4; b.push(c >> 1 & 1, c & 1); return b;
}
function decode(b) {
  const num = (a, z) => b.slice(a, z).reduce((s, x) => s * 2 + x, 0);
  const c = b.slice(0, 18).reduce((s, x) => s + x, 0) % 4;
  return { ok: c === num(18, 20), tag: num(0, 6), v: num(6, 8), no: num(8, 18) };
}
function sheetHTML(o, p, v) {
  const bits = encode(o.tag, v, p ? p.no : 0), g = SH.grid, nq = o.qs.length;
  let h = `<div class="pg sheet">`;
  SH.M.forEach(([x, y]) => h += `<i class="mk" style="left:${x - 4}mm;top:${y - 4}mm"></i>`);
  h += `<i class="cc" style="left:${SH.OR[0] - 2.25}mm;top:${SH.OR[1] - 2.25}mm"></i>`;
  h += `<div class="a sh-title" style="left:36mm;top:12mm;width:150mm">ВАРАҚАИ ҶАВОБҲО</div>`;
  h += `<div class="a sh-info" style="left:24mm;top:24mm;width:162mm;height:36mm"><table><tr><td style="width:120mm"><table>
     <tr><td class="lab">Олимпиада:</td><td><b>${esc(o.name)}</b></td></tr>
     <tr><td class="lab">Фан, синф:</td><td>${esc(o.subj)}, синфи ${o.grade} · ${fmtDate(o.date)}</td></tr>
     <tr><td class="lab">Иштирокчӣ:</td><td><b>${p ? esc(p.name) : '________________________________'}</b></td></tr>
     <tr><td class="lab">Мактаб, синф:</td><td>${p ? [esc(p.school), p.cls ? 'синфи ' + esc(p.cls) : ''].filter(Boolean).join(', ') : '________________________________'}</td></tr></table></td>
     <td style="border-left:0.3mm solid #bbb;text-align:center"><div style="font-size:3mm;color:#555">Рақам</div><div class="bigv">${p ? p.no : '—'}</div><div style="font-size:3mm;color:#555;margin-top:1mm">Вариант</div><div class="bigv">${v + 1}</div></td></tr></table></div>`;
  for (let i = 0; i < 20; i++) { const x = SH.code.x0 + i * SH.code.step; h += bits[i] ? `<i class="cc" style="left:${x - 2.25}mm;top:${SH.code.y - 2.25}mm"></i>` : `<i class="cc0" style="left:${x - 2.25}mm;top:${SH.code.y - 2.25}mm"></i>`; }
  h += `<div class="a" style="left:24mm;top:${SH.code.y - 2.5}mm;font-size:2.8mm;color:#666;width:22mm;line-height:2.6mm">Рамз — ба ин ҷо нанависед</div>`;
  h += `<div class="a" style="left:24mm;top:75mm;width:162mm;font-size:3.2mm;line-height:4.6mm;color:#222">Барои ҳар савол <b>танҳо як</b> доираро бо ручкаи сиёҳ ё кабуд <b>пурра ранг кунед</b>. Ислоҳ кардан мумкин нест. Варақаро накаҷ накунед.
     <span style="display:inline-flex;gap:3mm;margin-left:3mm;vertical-align:middle">Дуруст: <span style="display:inline-block;width:4mm;height:4mm;border-radius:50%;background:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact"></span> Нодуруст: ✓ ✗ —</span></div>`;
  h += `<div class="a" style="left:24mm;top:89mm;width:162mm;border-top:0.3mm solid #999"></div>`;
  for (let q = 0; q < nq; q++) {
    const [x0, y] = bpos(q, 0);
    h += `<div class="qno" style="left:${x0 - g.bx + 0.5}mm;top:${y - 2.6}mm">${q + 1}</div>`;
    for (let k = 0; k < 4; k++) { const [x] = bpos(q, k); h += `<div class="bb" style="left:${x - 2.6}mm;top:${y - 2.6}mm">${LET[k]}</div>`; }
  }
  h += `<div class="a" style="left:30mm;top:272mm;width:120mm;font-size:3.2mm">Имзои иштирокчӣ: ____________________</div>`;
  h += `<div class="a" style="left:30mm;top:278.5mm;width:130mm;font-size:2.6mm;color:#888">Ҳакам · ${esc(o.subj)} · ${o.grade} · в${v + 1}${p ? ' · №' + p.no : ''}</div>`;
  return h + `</div>`;
}
function bookHTML(o, v, p) {
  const va = o.vars[v];
  return `<div class="book"><div class="hd"><div><b>${esc(o.name)}</b><br>${esc(o.subj)}, синфи ${o.grade} · ${fmtDate(o.date)} · вақт: ${o.mins} дақиқа</div>
   <div style="text-align:right"><b>Варианти ${v + 1}</b><br>${p ? esc(p.name) + ' · №' + p.no : 'Ному насаб: ____________________'}</div></div>
   <p style="margin:0 0 4mm;font-size:3.3mm">Ҷавобҳоро дар <b>варақаи ҷавобҳо</b> қайд кунед. Дар ин варақа навиштан мумкин аст — он санҷида намешавад.</p>
   ${va.order.map((qi, pos) => { const q = o.qs[qi]; return `<div class="bq"><div class="tx">${pos + 1}. ${esc(q.text)}${(q.pts || 1) > 1 ? ` <span style="font-weight:400;color:#555">(${q.pts} хол)</span>` : ''}</div>${q.img ? `<img src="${q.img}">` : ''}
     <div class="bo">${va.perm[pos].map((oi, k) => `<div>${LET[k]}) ${esc(q.opts[oi])}</div>`).join('')}</div></div>`; }).join('')}</div>`;
}
function keyHTML(o) {
  const nq = o.qs.length;
  return `<div class="doc"><h2 style="margin:0 0 2mm">Калиди ҷавобҳо — барои ҳакамон</h2><div style="margin-bottom:4mm">${esc(o.name)} · ${esc(o.subj)}, синфи ${o.grade} · ${fmtDate(o.date)}</div>
   <table><tr><th>Савол</th>${o.vars.map((_, v) => `<th>Вариант ${v + 1}</th>`).join('')}</tr>
   ${Array.from({ length: nq }, (_, q) => `<tr><td>${q + 1}</td>${o.vars.map((_, v) => `<td><b>${LET[keyOf(o, v)[q]]}</b></td>`).join('')}</tr>`).join('')}</table>
   <p style="color:#a00;margin-top:5mm">Махфӣ! Ба иштирокчиён нишон надиҳед.</p></div>`;
}
function tPrint(o) {
  const np = o.parts.length;
  return `<div class="grid" style="grid-template-columns:1fr 1.25fr;align-items:start">
  <div class="grid">
   <div class="card"><h3>Барои ҳар иштирокчӣ</h3><p class="small muted" style="margin-top:0">Ду варақ бо ному рақам: варақаи саволҳо ва варақаи ҷавобҳо. Рамзи поёни варақаи ҷавобҳо рақам ва вариантро нигоҳ медорад.</p>
    <div class="row"><button class="btn pri" ${np ? '' : 'disabled'} onclick="doPrint('${o.id}','both')">🖨️ Ҳарду варақ (${np * 2})</button><button class="btn" ${np ? '' : 'disabled'} onclick="doPrint('${o.id}','sheets')">Танҳо варақаи ҷавобҳо (${np})</button></div>
    ${np ? '' : '<p class="small" style="color:var(--red)">Аввал иштирокчиёнро илова кунед.</p>'}</div>
   <div class="card"><h3>Варақаи саволҳо аз рӯи вариант</h3><p class="small muted" style="margin-top:0">Як нусха барои ҳар вариант — барои нусхабардорӣ.</p><button class="btn" onclick="doPrint('${o.id}','books')">🖨️ ${o.nv} варақаи саволҳо</button></div>
   <div class="card"><h3>Калиди ҷавобҳо</h3><p class="small muted" style="margin-top:0">Ҷадвали ҷавобҳои дуруст барои ҳар вариант — танҳо барои ҳакамон.</p><button class="btn" onclick="doPrint('${o.id}','key')">🔑 Чопи калид</button></div>
   <div class="card" style="background:var(--gold2);border-color:#F1D79A"><b>Маслиҳат:</b> ҳангоми чоп «Андоза: 100%» ва «Варақ: A4»-ро интихоб кунед. Варақаҳои ҷавобро ҳамчун нусхаи ксерокс ҳам истифода бурдан мумкин аст, вале рақами иштирокчӣ дар рамз аст — ҳар варақ барои як нафар.</div>
  </div>
  <div><div class="row" style="justify-content:space-between;margin-bottom:8px"><h3 style="margin:0">Намуди варақаи ҷавобҳо</h3><span class="small muted">${np ? esc(o.parts[0].name) + ' · вариант ' + (varOf(o, o.parts[0].no) + 1) : 'намуна'}</span></div>
   <div class="prev" id="prev"><div id="prevIn">${sheetHTML(o, o.parts[0] || null, o.parts[0] ? varOf(o, o.parts[0].no) : 0)}</div></div></div></div>`;
}
function fitPreview() { const pv = $('#prev'), pg = $('#prevIn .pg'); if (!pv || !pg) return; const s = (pv.clientWidth - 36) / pg.offsetWidth; pg.style.transform = `scale(${s})`; $('#prevIn').style.height = pg.offsetHeight * s + 'px'; }
window.addEventListener('resize', () => { if (UI.view === 'oly' && UI.tab === 'print') fitPreview(); });
function buildPrint(o, what) {
  let h = '';
  if (what === 'both' || what === 'sheets') o.parts.forEach(p => { const v = varOf(o, p.no); if (what === 'both') h += bookHTML(o, v, p); h += sheetHTML(o, p, v); });
  if (what === 'books') for (let v = 0; v < o.nv; v++) h += bookHTML(o, v, null);
  if (what === 'key') h += keyHTML(o);
  if (what === 'protocol') h += protocolHTML(o);
  if (what === 'dipl') h += diplomasHTML(o);
  $('#print').innerHTML = h;
  return h;
}
function doPrint(id, what) { const o = oly(id); if (!buildPrint(o, what)) return toast('Барои чоп чизе нест'); setTimeout(() => window.print(), 80); }

/* ================= Шинохтани скан (OMR) ================= */
async function fileToCanvas(file, maxSide) {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height); return c;
}
let pdfjs = null;
async function filePages(file) {
  if (/pdf$/i.test(file.type) || /\.pdf$/i.test(file.name)) {
    if (!pdfjs) { pdfjs = await import('./lib/pdf.min.mjs'); pdfjs.GlobalWorkerOptions.workerSrc = new URL('./lib/pdf.worker.min.mjs', location.href).href; }
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise; const out = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const pg = await doc.getPage(i), vp0 = pg.getViewport({ scale: 1 }), sc = 2200 / Math.max(vp0.width, vp0.height), vp = pg.getViewport({ scale: sc });
      const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
      await pg.render({ canvasContext: ctx, viewport: vp }).promise; out.push({ c, name: file.name + ' · с.' + i });
    }
    return out;
  }
  return [{ c: await fileToCanvas(file, 2400), name: file.name }];
}
function grayOf(c) {
  const d = c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, c.width, c.height).data, g = new Uint8Array(c.width * c.height);
  for (let i = 0, j = 0; j < g.length; i += 4, j++) g[j] = (d[i] * 77 + d[i + 1] * 150 + d[i + 2] * 29) >> 8;
  return { g, w: c.width, h: c.height };
}
function findMarkers(G) {
  const f = Math.max(1, Math.ceil(Math.max(G.w, G.h) / 1100)), w = Math.floor(G.w / f), h = Math.floor(G.h / f);
  const s = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) s[y * w + x] = G.g[(y * f) * G.w + x * f];
  const I = new Float64Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) { let row = 0; for (let x = 0; x < w; x++) { row += s[y * w + x]; I[(y + 1) * (w + 1) + x + 1] = I[y * (w + 1) + x + 1] + row; } }
  const R = Math.max(8, Math.round(Math.min(w, h) / 9));
  const dark = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) { const y0 = Math.max(0, y - R), y1 = Math.min(h, y + R + 1); for (let x = 0; x < w; x++) { const x0 = Math.max(0, x - R), x1 = Math.min(w, x + R + 1); const m = (I[y1 * (w + 1) + x1] - I[y0 * (w + 1) + x1] - I[y1 * (w + 1) + x0] + I[y0 * (w + 1) + x0]) / ((y1 - y0) * (x1 - x0)); dark[y * w + x] = s[y * w + x] < m * 0.6 ? 1 : 0; } }
  const lab = new Int32Array(w * h), st = new Int32Array(w * h), cands = []; let id = 0;
  for (let i = 0; i < w * h; i++) {
    if (!dark[i] || lab[i]) continue; id++; let sp = 0; st[sp++] = i; lab[i] = id;
    let area = 0, sx = 0, sy = 0, mnx = w, mxx = 0, mny = h, mxy = 0;
    while (sp) { const p = st[--sp], px = p % w, py = (p - px) / w; area++; sx += px; sy += py; if (px < mnx) mnx = px; if (px > mxx) mxx = px; if (py < mny) mny = py; if (py > mxy) mxy = py;
      if (px > 0 && dark[p - 1] && !lab[p - 1]) { lab[p - 1] = id; st[sp++] = p - 1; } if (px < w - 1 && dark[p + 1] && !lab[p + 1]) { lab[p + 1] = id; st[sp++] = p + 1; }
      if (py > 0 && dark[p - w] && !lab[p - w]) { lab[p - w] = id; st[sp++] = p - w; } if (py < h - 1 && dark[p + w] && !lab[p + w]) { lab[p + w] = id; st[sp++] = p + w; } }
    const bw = mxx - mnx + 1, bh = mxy - mny + 1, fill = area / (bw * bh), ar = bw / bh;
    if (area >= 30 && bw >= 5 && bh >= 5 && fill > 0.8 && ar > 0.55 && ar < 1.8 && bw < Math.min(w, h) * 0.09) cands.push({ x: (sx / area + 0.5) * f, y: (sy / area + 0.5) * f, a: area });
  }
  if (cands.length < 4) return null;
  const big = cands.slice().sort((a, b) => b.a - a.a); const maxA = big[Math.min(3, big.length - 1)].a; // 4-умин калонтарин
  const pool = cands.filter(c => c.a >= maxA * 0.45);
  const corners = [[0, 0], [G.w, 0], [G.w, G.h], [0, G.h]].map(([cx, cy]) => { let best = null, bd = 1e18; for (const c of pool) { const d = (c.x - cx) ** 2 + (c.y - cy) ** 2; if (d < bd) { bd = d; best = c; } } return best; });
  if (new Set(corners).size < 4) return null;
  return corners.map(c => [c.x, c.y]);
}
function solve(A, b) {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; if (Math.abs(M[c][c]) < 1e-12) return null;
    for (let r = 0; r < n; r++) if (r !== c) { const k = M[r][c] / M[c][c]; for (let j = c; j <= n; j++) M[r][j] -= k * M[c][j]; } }
  return M.map((r, i) => r[n] / r[i]);
}
function homog(src, dst) {
  const A = [], b = [];
  for (let i = 0; i < 4; i++) { const [x, y] = src[i], [u, v] = dst[i]; A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u); A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v); }
  const h = solve(A, b); if (!h) return null;
  return (x, y) => { const w = h[6] * x + h[7] * y + 1; return [(h[0] * x + h[1] * y + h[2]) / w, (h[3] * x + h[4] * y + h[5]) / w]; };
}
function pix(G, x, y) { x = Math.min(G.w - 1.001, Math.max(0, x)); y = Math.min(G.h - 1.001, Math.max(0, y)); const x0 = x | 0, y0 = y | 0, fx = x - x0, fy = y - y0, i = y0 * G.w + x0; return (G.g[i] * (1 - fx) + G.g[i + 1] * fx) * (1 - fy) + (G.g[i + G.w] * (1 - fx) + G.g[i + G.w + 1] * fx) * fy; }
function sampleMM(G, H, cx, cy, rad) { let s = 0, n = 0; for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const dx = i / 2 * rad, dy = j / 2 * rad; if (dx * dx + dy * dy > rad * rad * 1.05) continue; const [u, v] = H(cx + dx, cy + dy); s += pix(G, u, v); n++; } return s / n; }
function readSheet(c) {
  const G = grayOf(c), C = findMarkers(G);
  if (!C) return { err: 'Нишонаҳои кунҷӣ (4 квадрати сиёҳ) ёфт нашуданд' };
  let best = null;
  for (let rot = 0; rot < 4; rot++) {
    const dst = [0, 1, 2, 3].map(i => C[(i + rot) % 4]); const H = homog(SH.M, dst); if (!H) continue;
    // Равшании маҳаллӣ: ҳар нуқта бо коғази сафеди атрофаш муқоиса мешавад (сояи акс халал намерасонад)
    const W = pts => Math.max(...pts.map(([x, y]) => sampleMM(G, H, x, y, 0.8)));
    const rel = (v, w) => Math.max(0, 1 - v / Math.max(w, 1));
    const kref = Math.max(0.3, SH.M.reduce((s, [x, y]) => s + rel(sampleMM(G, H, x, y, 2), W([[x, y < 100 ? y + 7 : y - 7]])), 0) / 4);
    const dk = (v, w) => Math.max(0, Math.min(1, rel(v, w) / kref));
    const orient = dk(sampleMM(G, H, SH.OR[0], SH.OR[1], 1.5), W([[SH.OR[0], 23], [SH.OR[0] - 4, 23]]));
    const bits = Array.from({ length: SH.code.n }, (_, i) => { const x = SH.code.x0 + i * SH.code.step, y = SH.code.y; return dk(sampleMM(G, H, x, y, 1.4), W([[x, y - 4.5], [x + 3.2, y]])) > 0.5 ? 1 : 0; });
    const code = decode(bits);
    const sc = orient + (code.ok ? 1 : 0);
    if (!best || sc > best.sc) best = { sc, H, dk, code, orient, dst, W };
  }
  if (!best || best.orient < 0.5) return { err: 'Самти варақа муайян нашуд', corners: C };
  const { H, dk, code, W } = best;
  const raw = [];
  for (let q = 0; q < MAXQ; q++) raw.push([0, 1, 2, 3].map(k => { const [x, y] = bpos(q, k); return dk(sampleMM(G, H, x, y, SH.grid.r * 0.62), W([[x, y - 4.15], [x, y + 4.15], [x + 4.2, y]])); }));
  return { H, code, raw, corners: best.dst };
}
function decideMarks(raw, nq) {
  const all = raw.slice(0, nq).flat().sort((a, b) => a - b); const base = all[Math.floor(all.length * 0.4)] || 0;
  const marks = [], flags = [];
  for (let q = 0; q < nq; q++) {
    const d = raw[q].map(x => x - base), on = d.map((x, k) => x >= 0.22 ? k : -1).filter(k => k >= 0);
    const order = [0, 1, 2, 3].sort((a, b) => d[b] - d[a]), top = d[order[0]], sec = d[order[1]];
    if (on.length === 1) { marks.push(on[0]); if (sec > 0.12) flags.push(q); }
    else if (on.length === 0) { if (top > 0.1) { marks.push(order[0]); flags.push(q); } else marks.push(-1); }
    else { if (top - sec > 0.3) { marks.push(order[0]); flags.push(q); } else { marks.push(-2); flags.push(q); } }
  }
  return { marks, flags };
}

/* ---------- Санҷиш (скан) ---------- */
function tScan(o) {
  const mine = UI.scans.filter(s => s.oly === o.id || !s.oly);
  const n = Object.keys(o.res).length;
  return `<div class="grid" style="grid-template-columns:1.3fr 1fr;align-items:start"><div>
   <div class="drop" id="drop" onclick="pickScans('${o.id}')" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="event.preventDefault();this.classList.remove('over');addScans('${o.id}',event.dataTransfer.files)">
    <div style="font-size:34px">📷</div><b>Скан ё аксҳои варақаҳои ҷавобро ин ҷо кашед</b><div class="small muted">ё пахш кунед ва интихоб кунед · JPG, PNG ё PDF · якбора чандто</div></div>
   <div id="scanlist" class="card" style="margin-top:14px;padding:6px 10px">${mine.length ? mine.map((s, i) => scanRow(o, s, UI.scans.indexOf(s))).join('') : '<div class="empty small">Ҳоло скан нест. Варақаҳоро бо сканер (300 dpi) ё бо камераи телефон аз боло акс гиред — ҳар 4 квадрати сиёҳ бояд дар акс бошанд.</div>'}</div></div>
   <div class="grid"><div class="card"><h3>Ҳолат</h3><div class="bar" style="margin:8px 0"><i style="width:${o.parts.length ? n / o.parts.length * 100 : 0}%"></i></div><div class="small muted">Санҷида шуд: <b>${n}</b> аз ${o.parts.length}</div>
    <div class="row" style="margin-top:12px"><button class="btn teal" onclick="UI.tab='res';render()">🥇 Ба натиҷаҳо</button></div></div>
    <div class="card"><h3>Вориди дастӣ</h3><p class="small muted" style="margin-top:0">Агар сканер набошад ё варақ вайрон шуда бошад — ҷавобҳоро худатон ворид кунед.</p>
     <select id="mp" style="width:100%;margin-bottom:8px">${o.parts.map(p => `<option value="${p.no}">${p.no}. ${esc(p.name)}${o.res[p.no] ? ' ✓' : ''}</option>`).join('')}</select>
     <button class="btn" ${o.parts.length ? '' : 'disabled'} onclick="manual('${o.id}',+document.getElementById('mp').value)">✍️ Ворид кардан</button></div>
    <div class="card small muted"><b style="color:var(--ink)">Рангҳо:</b> <span class="pill teal">дуруст</span> <span class="pill red">хато</span> <span class="pill gold">шубҳанок — санҷед</span>. Варақаҳои шубҳанокро кушоед ва бо як клик ислоҳ кунед.</div></div></div>`;
}
function scanRow(o, s, i) {
  let st;
  if (s.busy) st = '<span class="pill">⏳ коркард…</span>';
  else if (s.err) st = `<span class="pill red">✗ ${esc(s.err)}</span>`;
  else {
    const p = o.parts.find(x => x.no === s.no);
    const r = { v: s.v, marks: s.marks }, { sc } = scoreOf(o, r);
    st = `<b>${p ? s.no + '. ' + esc(p.name) : '<span style="color:var(--red)">Иштирокчӣ муайян нашуд</span>'}</b> <span class="pill">вар. ${s.v + 1}</span> <span class="pill teal">${sc} / ${maxPts(o)} хол</span> ${s.flags.length ? `<span class="pill gold">⚠ ${s.flags.length} шубҳанок</span>` : ''} ${s.saved ? '<span class="pill teal">✓ нигоҳ дошта шуд</span>' : ''}`;
  }
  return `<div class="scanrow"><img src="${s.thumb || ''}"><div class="grow"><div class="small muted">${esc(s.name)}</div><div style="margin-top:3px">${st}</div></div>${!s.busy && (s.H || s.err) ? `<button class="btn sm" onclick="review(${i})">${s.H ? 'Санҷидан' : 'Дидан'}</button>` : ''}</div>`;
}
function pickScans(id) { const fi = $('#fileIn'); fi.accept = 'image/*,.pdf,application/pdf'; fi.multiple = true; fi.value = ''; fi.onchange = () => addScans(id, fi.files); fi.click(); }
async function addScans(id, files) {
  const o = oly(id); files = [...files]; if (!files.length) return;
  for (const f of files) {
    let pages; try { pages = await filePages(f); } catch (e) { UI.scans.push({ oly: id, name: f.name, err: /pdf$/i.test(f.name) ? 'PDF кушода нашуд — сканро ҳамчун JPG нигоҳ доред' : 'Файл кушода нашуд' }); render(); continue; }
    for (const pg of pages) {
      const s = { oly: id, name: pg.name, busy: true, c: pg.c }; const tc = document.createElement('canvas'); tc.width = 92; tc.height = Math.round(92 * pg.c.height / pg.c.width); tc.getContext('2d').drawImage(pg.c, 0, 0, tc.width, tc.height); s.thumb = tc.toDataURL('image/jpeg', .7);
      UI.scans.push(s); render(); await new Promise(r => setTimeout(r, 20));
      processScan(o, s); render();
    }
  }
  const ok = UI.scans.filter(s => s.oly === id && s.saved).length;
  toast(`Коркард тамом шуд. Нигоҳ дошта шуд: ${ok}`);
}
function processScan(o, s) {
  s.busy = false;
  let R; try { R = readSheet(s.c); } catch (e) { console.error(e); R = { err: 'Хатои коркард' }; }
  if (R.err) { s.err = R.err; s.corners = R.corners; return; }
  s.H = R.H; s.raw = R.raw; s.corners = R.corners;
  const okTag = R.code.ok && R.code.tag === o.tag;
  s.v = okTag ? Math.min(R.code.v, o.nv - 1) : 0; s.no = okTag ? R.code.no : 0;
  const dm = decideMarks(R.raw, o.qs.length); s.marks = dm.marks; s.flags = dm.flags;
  if (!R.code.ok) s.warn = 'Рамзи варақа хонда нашуд';
  else if (R.code.tag !== o.tag) { const other = D.olys.find(x => x.tag === R.code.tag); s.warn = other ? `Ин варақа аз олимпиадаи дигар аст: «${other.name}»` : 'Варақа аз ин олимпиада нест'; }
  const p = o.parts.find(x => x.no === s.no);
  if (p && !s.warn) { if (o.res[s.no] && o.res[s.no].src === 'scan' && !s.again) s.dup = true; o.res[s.no] = { v: s.v, marks: s.marks.slice(), flags: s.flags.slice(), src: 'scan', t: Date.now() }; s.saved = true; save(); }
}

/* ---------- Санҷиши варақа (тафтиш ва ислоҳ) ---------- */
let RV = null;
function review(i) {
  const s = UI.scans[i], o = oly(s.oly); RV = { i, o, s, marks: (s.marks || []).slice(), flags: new Set(s.flags || []), v: s.v || 0, no: s.no || 0 };
  modal(`<div class="row" style="justify-content:space-between;margin-bottom:10px"><h2 style="margin:0">Санҷиши варақа</h2><button class="btn sm" onclick="closeModal()">✕</button></div>
   <div class="grid" style="grid-template-columns:auto 1fr;gap:18px;align-items:start"><div><canvas id="rvc" style="border:1px solid var(--line);border-radius:8px;cursor:crosshair;max-width:100%"></canvas><div class="small muted">Барои ислоҳ ба доираи лозимӣ клик кунед.</div></div>
   <div id="rvp"></div></div>`, true);
  drawReview(); rvPanel();
  $('#rvc').onclick = e => {
    if (!s.H) return; const c = e.target, rc = c.getBoundingClientRect(), k = s.c.width / rc.width, x = (e.clientX - rc.left) * k, y = (e.clientY - rc.top) * k;
    let best = null, bd = 1e18; for (let q = 0; q < o.qs.length; q++) for (let a = 0; a < 4; a++) { const [mx, my] = bpos(q, a), [u, v] = s.H(mx, my), d = (u - x) ** 2 + (v - y) ** 2; if (d < bd) { bd = d; best = [q, a]; } }
    const [u1] = s.H(0, 0), [u2] = s.H(10, 0); if (!best || bd > ((u2 - u1) * 0.6) ** 2) return;
    setMark(best[0], best[1]);
  };
}
function setMark(q, a) { RV.marks[q] = RV.marks[q] === a ? -1 : a; RV.flags.delete(q); drawReview(); rvPanel(); }
function drawReview() {
  const { s, o } = RV, c = $('#rvc'); if (!c) return;
  const maxH = Math.min(window.innerHeight * 0.8, 1000), sc = maxH / s.c.height; c.width = s.c.width; c.height = s.c.height; c.style.height = maxH + 'px'; c.style.width = s.c.width * sc + 'px';
  const x = c.getContext('2d'); x.drawImage(s.c, 0, 0);
  if (s.corners) { x.strokeStyle = '#1F7A6E'; x.lineWidth = 4; s.corners.forEach(([u, v]) => { x.beginPath(); x.arc(u, v, 26, 0, 7); x.stroke(); }); }
  if (!s.H) return;
  const key = keyOf(o, RV.v), [u1] = s.H(0, 0), [u2] = s.H(10, 0), r = Math.abs(u2 - u1) * 0.36; x.lineWidth = Math.max(2, r / 5);
  for (let q = 0; q < o.qs.length; q++) for (let a = 0; a < 4; a++) {
    const [u, v] = s.H(...bpos(q, a)); const m = RV.marks[q];
    let col = null;
    if (m === a) col = a === key[q] ? '#1F9A6E' : '#D33B2A';
    else if (m === -2 && s.raw[q][a] > 0.3) col = '#D33B2A';
    else if (a === key[q] && m !== a) col = 'rgba(31,154,110,.55)';
    if (RV.flags.has(q)) { x.strokeStyle = '#E5A823'; x.beginPath(); x.arc(u, v, r * 1.35, 0, 7); x.stroke(); }
    if (col) { x.strokeStyle = col; x.setLineDash(m === a ? [] : [r / 3, r / 4]); x.beginPath(); x.arc(u, v, r, 0, 7); x.stroke(); x.setLineDash([]); }
  }
}
function rvPanel() {
  const { o, s } = RV, r = { v: RV.v, marks: RV.marks }, { sc, ok } = s.H ? scoreOf(o, r) : { sc: 0, ok: 0 }, key = keyOf(o, RV.v);
  $('#rvp').innerHTML = s.err && !s.H ? `<div class="card" style="background:var(--red2)"><b>${esc(s.err)}</b><p class="small">Варақаро аз нав скан кунед: ҳамаи 4 квадрати сиёҳи кунҷҳо бояд намоён бошанд. Ё ҷавобҳоро дастӣ ворид кунед.</p></div>` : `
   ${s.warn ? `<div class="card" style="background:var(--gold2);margin-bottom:10px">⚠ ${esc(s.warn)}. Иштирокчӣ ва вариантро дастӣ интихоб кунед.</div>` : ''}
   ${s.dup ? `<div class="card" style="background:var(--gold2);margin-bottom:10px">⚠ Ин иштирокчӣ аллакай натиҷа дошт — натиҷа бо ҳамин варақа иваз шуд.</div>` : ''}
   <div class="grid g2" style="margin-bottom:10px"><label class="f">Иштирокчӣ<select id="rvn" onchange="RV.no=+this.value;rvPanel()"><option value="0">— интихоб кунед —</option>${o.parts.map(p => `<option value="${p.no}" ${p.no === RV.no ? 'selected' : ''}>${p.no}. ${esc(p.name)}</option>`).join('')}</select></label>
    <label class="f">Вариант<select onchange="RV.v=+this.value;drawReview();rvPanel()">${o.vars.map((_, v) => `<option value="${v}" ${v === RV.v ? 'selected' : ''}>${v + 1}</option>`).join('')}</select></label></div>
   <div class="row" style="margin-bottom:10px"><span class="pill teal" style="font-size:15px">${sc} / ${maxPts(o)} хол</span><span class="pill">${ok} дуруст аз ${o.qs.length}</span>${RV.flags.size ? `<span class="pill gold">⚠ ${RV.flags.size} шубҳанок</span>` : ''}</div>
   ${ansGrid(o, RV.marks, key, RV.flags, 'setMark')}
   <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn pri" onclick="rvSave()">✓ Нигоҳ доштан</button></div>`;
}
function ansGrid(o, marks, key, flags, fn) {
  return `<div class="ans">${o.qs.map((_, q) => `<div class="arow ${flags.has(q) ? 'flag' : ''}"><span class="qn">${q + 1}</span>${LET.map((L, a) => {
    const on = marks[q] === a, good = a === key[q];
    return `<button class="ab ${on ? 'on ' + (good ? 'good' : 'bad') : ''} ${good ? 'ok' : ''}" onclick="${fn}(${q},${a})" title="${good ? 'ҷавоби дуруст' : ''}">${L}</button>`; }).join('')}${marks[q] === -2 ? '<span class="pill red" title="Якчанд доира ранг шудааст">2+</span>' : ''}</div>`).join('')}</div>
   <div class="small muted" style="margin-top:8px">Ҳалқаи сабз — ҷавоби дуруст. Сурх — ҷавоби хато. «2+» — якчанд доира ранг шудааст (0 хол); агар лозим бошад, ҷавобро интихоб кунед.</div>`;
}
function rvSave() {
  const { o, s } = RV; if (!RV.no) return toast('Иштирокчиро интихоб кунед');
  o.res[RV.no] = { v: RV.v, marks: RV.marks.slice(), flags: [...RV.flags], src: s ? 'scan' : 'manual', t: Date.now() };
  if (s) { Object.assign(s, { no: RV.no, v: RV.v, marks: RV.marks.slice(), flags: [...RV.flags], saved: true, warn: null, dup: false }); }
  save(); closeModal(); render(); toast('Натиҷа нигоҳ дошта шуд');
}
function manual(id, no) {
  const o = oly(id), r = o.res[no]; RV = { o, s: null, no, v: r ? r.v : varOf(o, no), marks: r ? r.marks.slice() : Array(o.qs.length).fill(-1), flags: new Set() };
  const p = o.parts.find(x => x.no === no);
  modal(`<div class="row" style="justify-content:space-between"><h2 style="margin:0">Вориди дастӣ: ${esc(p.name)}</h2><button class="btn sm" onclick="closeModal()">✕</button></div><p class="sub">Варианти ${RV.v + 1} · Ҷавоби иштирокчиро барои ҳар савол интихоб кунед.</p><div id="rvp"></div>`, true);
  rvManualPanel();
}
function rvManualPanel() {
  const { o } = RV, key = keyOf(o, RV.v), { sc } = scoreOf(o, RV);
  $('#rvp').innerHTML = `<div class="row" style="margin-bottom:10px"><span class="pill teal" style="font-size:15px">${sc} / ${maxPts(o)} хол</span><label class="f" style="flex-direction:row;align-items:center">Вариант <select onchange="RV.v=+this.value;rvManualPanel()">${o.vars.map((_, v) => `<option value="${v}" ${v === RV.v ? 'selected' : ''}>${v + 1}</option>`).join('')}</select></label></div>
   ${ansGrid(o, RV.marks, key, RV.flags, 'setMarkM')}<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn pri" onclick="rvSave()">✓ Нигоҳ доштан</button></div>`;
}
function setMarkM(q, a) { RV.marks[q] = RV.marks[q] === a ? -1 : a; rvManualPanel(); }

/* ---------- Натиҷаҳо ---------- */
function tRes(o) {
  const R = results(o), d = R.done;
  if (!d.length) return `<div class="card empty">Ҳоло натиҷа нест. Варақаҳоро дар «📷 Санҷиш» скан кунед.<br><br><button class="btn pri" onclick="UI.tab='scan';render()">📷 Ба санҷиш</button></div>`;
  const avg = d.reduce((s, x) => s + x.pct, 0) / d.length, top = d[0];
  const flagged = d.filter(x => x.flags).length;
  return `<div class="grid g4" style="margin-bottom:14px"><div class="card stat"><b>${d.length}<span style="font-size:15px;color:var(--mut)"> / ${o.parts.length}</span></b><span>санҷида шуд</span></div>
   <div class="card stat"><b>${avg.toFixed(1)}%</b><span>натиҷаи миёна</span></div><div class="card stat"><b>${top.sc}<span style="font-size:15px;color:var(--mut)"> / ${R.mx}</span></b><span>беҳтарин хол</span></div>
   <div class="card stat"><b>${d.filter(x => x.award).length}</b><span>ғолиб (ҷойҳои I–III)</span></div></div>
  ${flagged ? `<div class="card" style="background:var(--gold2);border-color:#F1D79A;margin-bottom:14px">⚠ Дар ${flagged} варақ ҷавобҳои шубҳанок ҳаст. Онҳоро дар ҷадвал бо ⚠ бинед ва пахш кунед.</div>` : ''}
  <div class="row" style="margin-bottom:12px"><button class="btn pri" onclick="doPrint('${o.id}','protocol')">🖨️ Протокол</button><button class="btn gold" onclick="doPrint('${o.id}','dipl')">🏅 Ифтихорномаҳо</button><button class="btn" onclick="exportCSV('${o.id}')">📊 Excel (CSV)</button><span class="grow"></span><button class="btn sm" onclick="awardForm('${o.id}')">⚙️ Баҳо ва ҷойҳо</button></div>
  <div class="card" style="padding:0;overflow:hidden;margin-bottom:16px"><table class="t"><tr><th>Ҷой</th><th>№</th><th>Ному насаб</th><th>Мактаб</th><th>Вар.</th><th>Дуруст</th><th>Хол</th><th>%</th><th>Баҳо</th><th>Ҷоиза</th><th></th></tr>
   ${d.map(x => `<tr><td class="place ${x.place <= 3 ? 'p' + x.place : ''}">${x.place <= 3 ? ['', '🥇', '🥈', '🥉'][x.place] : ''} ${x.place}</td><td>${x.p.no}</td><td><b>${esc(x.p.name)}</b></td><td>${esc(x.p.school)}</td><td>${x.r.v + 1}</td><td>${x.ok}/${o.qs.length}</td><td><b>${x.sc}</b></td>
    <td style="min-width:110px"><div class="row" style="gap:6px"><div class="bar grow"><i style="width:${x.pct}%"></i></div>${x.pct}</div></td><td><b>${x.grade}</b></td><td>${x.award ? `<span class="pill gold">Ҷойи ${ROMAN[x.award]}</span>` : ''}</td>
    <td><button class="btn sm" onclick="manual('${o.id}',${x.p.no})">${x.flags ? '⚠ ' : ''}✏️</button></td></tr>`).join('')}
   ${R.absent.map(x => `<tr style="color:var(--mut)"><td>—</td><td>${x.p.no}</td><td>${esc(x.p.name)}</td><td>${esc(x.p.school)}</td><td colspan="7">натиҷа нест</td></tr>`).join('')}</table></div>
  <div class="grid g2" style="align-items:start"><div class="card"><h3>Таҳлили саволҳо</h3><p class="small muted" style="margin-top:0">Чанд фоизи иштирокчиён ба ҳар савол дуруст ҷавоб доданд (рақам аз рӯи варианти 1).</p>${qAnalysis(o, d)}</div>
   <div class="card"><h3>Аз рӯи мактабҳо</h3>${schoolTable(d)}</div></div>`;
}
function qAnalysis(o, d) {
  const st = o.qs.map(() => ({ ok: 0, n: 0, pick: [0, 0, 0, 0] }));
  d.forEach(x => { const va = o.vars[x.r.v]; va.order.forEach((qi, pos) => { const m = x.r.marks[pos]; st[qi].n++; if (m >= 0) { const oi = va.perm[pos][m]; st[qi].pick[oi]++; if (oi === o.qs[qi].ans) st[qi].ok++; } }); });
  return `<table class="t">${st.map((s, i) => { const p = s.n ? Math.round(s.ok / s.n * 100) : 0, wrong = s.pick.map((c, k) => [c, k]).filter(([, k]) => k !== o.qs[i].ans).sort((a, b) => b[0] - a[0])[0];
    return `<tr><td style="width:34px"><b>${i + 1}</b></td><td class="small" style="max-width:240px">${esc(o.qs[i].text.slice(0, 70))}${o.qs[i].text.length > 70 ? '…' : ''}</td><td style="width:150px"><div class="row" style="gap:6px"><div class="bar grow"><i style="width:${p}%;background:${p < 40 ? 'var(--red)' : p < 70 ? 'var(--gold)' : 'var(--teal)'}"></i></div><b>${p}%</b></div>${wrong && wrong[0] ? `<div class="small muted">хатои асосӣ: «${esc(o.qs[i].opts[wrong[1]].slice(0, 22))}» (${wrong[0]})</div>` : ''}</td></tr>`; }).join('')}</table>`;
}
function schoolTable(d) {
  const m = {}; d.forEach(x => { const k = x.p.school || '—'; m[k] = m[k] || { n: 0, s: 0, w: 0 }; m[k].n++; m[k].s += x.pct; if (x.award) m[k].w++; });
  const rows = Object.entries(m).map(([k, v]) => ({ k, ...v, a: v.s / v.n })).sort((a, b) => b.w - a.w || b.a - a.a);
  return `<table class="t"><tr><th>Мактаб</th><th>Иштирок</th><th>Миёна</th><th>Ғолибон</th></tr>${rows.map(r => `<tr><td><b>${esc(r.k)}</b></td><td>${r.n}</td><td>${r.a.toFixed(1)}%</td><td>${r.w ? '🏅 ' + r.w : '—'}</td></tr>`).join('')}</table>`;
}
function awardForm(id) {
  const o = oly(id);
  modal(`<h2>Баҳо ва ҷойҳо</h2><h3>Баҳо (аз рӯи фоизи хол)</h3><div class="grid g3" style="margin-bottom:16px">${[5, 4, 3].map(g => `<label class="f">Баҳои ${g} — аз %<input type="number" id="g${g}" value="${o.g[g]}"></label>`).join('')}</div>
   <h3>Ғолибон</h3><label class="chk"><input type="radio" name="awm" value="place" ${o.aw.mode === 'place' ? 'checked' : ''}> Аз рӯи ҷой: 3 ҷойи аввал (ҳоли баробар — ҷойи якхела)</label>
   <label class="f" style="margin:6px 0 12px 26px;width:260px">Ҳадди ақалли натиҷа, %<input type="number" id="awmin" value="${o.aw.min}"></label>
   <label class="chk"><input type="radio" name="awm" value="pct" ${o.aw.mode === 'pct' ? 'checked' : ''}> Аз рӯи фоиз (чанд нафар метавонанд як ҷойро гиранд)</label>
   <div class="grid g3" style="margin:6px 0 0 26px">${[1, 2, 3].map(k => `<label class="f">Ҷойи ${ROMAN[k]} — аз %<input type="number" id="awp${k}" value="${o.aw['p' + k]}"></label>`).join('')}</div>
   <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn" onclick="closeModal()">Бекор</button><button class="btn pri" onclick="awardSave('${id}')">Нигоҳ доштан</button></div>`);
}
function awardSave(id) { const o = oly(id); [5, 4, 3].forEach(g => o.g[g] = +$('#g' + g).value); o.aw = { mode: document.querySelector('input[name=awm]:checked').value, min: +$('#awmin').value, p1: +$('#awp1').value, p2: +$('#awp2').value, p3: +$('#awp3').value }; save(); closeModal(); render(); }
function exportCSV(id) {
  const o = oly(id), R = results(o), sep = ';';
  const head = ['Ҷой', '№', 'Ному насаб', 'Мактаб', 'Синф', 'Вариант', 'Дуруст', 'Хол', 'Ҳадди аксар', '%', 'Баҳо', 'Ҷоиза', ...o.qs.map((_, i) => 'С' + (i + 1))];
  const lines = [head, ...R.done.map(x => [x.place, x.p.no, x.p.name, x.p.school, x.p.cls, x.r.v + 1, x.ok, x.sc, R.mx, String(x.pct).replace('.', ','), x.grade, x.award ? 'Ҷойи ' + ROMAN[x.award] : '', ...x.r.marks.map(m => m >= 0 ? LET[m] : m === -2 ? '×' : '')]),
    ...R.absent.map(x => ['', x.p.no, x.p.name, x.p.school, x.p.cls, '', '', '', '', '', '', 'натиҷа нест'])];
  const csv = '﻿' + lines.map(r => r.map(c => { c = String(c ?? ''); return /[;"\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(sep)).join('\r\n');
  download(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `natija-${o.subj}-${o.grade}.csv`);
}
function download(blob, name) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
function protocolHTML(o) {
  const R = results(o);
  return `<div class="doc"><div style="text-align:center">${esc(D.set.org || '')}</div><h2 style="text-align:center;margin:3mm 0 1mm">ПРОТОКОЛИ НАТИҶАҲОИ ОЛИМПИАДА</h2>
   <div style="text-align:center;margin-bottom:5mm">${esc(o.name)} · ${esc(o.subj)}, синфи ${o.grade} · ${esc(D.set.city || '')} ${fmtDate(o.date)}</div>
   <table><tr><th>Ҷой</th><th>№</th><th>Ному насаб</th><th>Мактаб</th><th>Дуруст</th><th>Хол (аз ${R.mx})</th><th>%</th><th>Баҳо</th><th>Ҷоиза</th></tr>
   ${R.done.map(x => `<tr><td>${x.place}</td><td>${x.p.no}</td><td>${esc(x.p.name)}</td><td>${esc(x.p.school)}</td><td>${x.ok}/${o.qs.length}</td><td><b>${x.sc}</b></td><td>${x.pct}</td><td>${x.grade}</td><td>${x.award ? 'Ҷойи ' + ROMAN[x.award] : ''}</td></tr>`).join('')}</table>
   <p>Иштирок карданд: ${R.done.length} нафар аз ${o.parts.length}. Натиҷаи миёна: ${R.done.length ? (R.done.reduce((s, x) => s + x.pct, 0) / R.done.length).toFixed(1) : 0}%.</p>
   <p style="margin-top:12mm">Раиси ҳакамон: ____________________ ${esc(D.set.chair || '')}</p><p style="margin-top:8mm">Аъзои ҳакамон: ____________________ &nbsp; ____________________</p></div>`;
}
function diplomasHTML(o) {
  const R = results(o), win = R.done.filter(x => x.award);
  return win.map(x => `<div class="dip"><div class="fr"></div><div class="fr2"></div><div class="in">
    <div style="font-size:4mm;letter-spacing:.5mm">${esc(D.set.org || '')}</div><div style="font-size:30mm;margin-top:10mm">${['', '🥇', '🥈', '🥉'][x.award]}</div>
    <div style="font-size:16mm;font-weight:800;letter-spacing:2mm;margin-top:4mm">ИФТИХОРНОМА</div><div style="font-size:7mm;color:#B8860B;font-weight:700;margin-top:2mm">дараҷаи ${ROMAN[x.award]}</div>
    <div style="font-size:5mm;margin-top:14mm">ба</div><div style="font-size:10mm;font-weight:700;margin-top:3mm">${esc(x.p.name)}</div>
    <div style="font-size:5mm;margin-top:3mm">хонандаи ${esc(x.p.school)}${x.p.cls ? ', синфи ' + esc(x.p.cls) : ''}</div>
    <div style="font-size:5mm;margin-top:12mm;max-width:150mm;line-height:8mm">барои ишғоли ҷойи ${ROMAN[x.award]} дар «${esc(o.name)}» аз фанни ${esc(o.subj)} (синфи ${o.grade}) бо натиҷаи ${x.sc} хол аз ${R.mx} (${x.pct}%) дода мешавад.</div>
    <div style="margin-top:auto;width:100%;display:flex;justify-content:space-between;font-size:4.2mm"><span>${esc(D.set.city || '')}, ${fmtDate(o.date)}</span><span>Раиси ҳакамон: ____________ ${esc(D.set.chair || '')}</span></div></div></div>`).join('');
}

/* ---------- Танзимот ---------- */
function vSet() {
  return `<h1>Танзимот</h1><p class="sub">Ин маълумот дар протокол ва ифтихорномаҳо чоп мешавад.</p>
  <div class="card" style="max-width:720px;margin-bottom:16px"><div class="grid g2"><label class="f">Ташкилкунанда (мактаб ё шуъбаи маориф)<input type="text" id="so" value="${esc(D.set.org)}"></label><label class="f">Шаҳр / ноҳия<input type="text" id="sc" value="${esc(D.set.city)}"></label>
   <label class="f">Раиси ҳакамон<input type="text" id="sh" value="${esc(D.set.chair)}"></label></div>
   <div class="row" style="margin-top:14px"><button class="btn pri" onclick="D.set={org:$('#so').value,city:$('#sc').value,chair:$('#sh').value};save();toast('Нигоҳ дошта шуд')">Нигоҳ доштан</button></div></div>
  <div class="card" style="max-width:720px"><h3>Нусхаи эҳтиётӣ</h3><p class="small muted" style="margin-top:0">Ҳамаи саволҳо, олимпиадаҳо ва натиҷаҳо дар як файл. Онро дар флешка нигоҳ доред ё ба компютери дигар гузаронед.</p>
   <div class="row"><button class="btn" onclick="download(new Blob([JSON.stringify(D)],{type:'application/json'}),'hakam-'+today()+'.json')">💾 Сохтани нусха</button><button class="btn" onclick="restore()">📂 Барқарор кардан</button><button class="btn red" onclick="if(confirm('Ҳама маълумот нест шуда, намуна барқарор шавад?')){D=demo();save();UI.scans=[];render()}">Аз нав оғоз</button></div></div>`;
}
function restore() {
  const fi = $('#fileIn'); fi.accept = '.json,application/json'; fi.multiple = false; fi.value = '';
  fi.onchange = async () => { try { const d = JSON.parse(await fi.files[0].text()); if (!d.bank || !d.olys) throw 0; if (!confirm('Маълумоти ҳозира бо нусха иваз карда шавад?')) return; D = d; save(); render(); toast('Барқарор шуд'); } catch (e) { toast('Файл нодуруст аст'); } };
  fi.click();
}

/* ---------- модал ---------- */
function modal(html, wide) { const m = $('#modal'); m.innerHTML = `<div class="mbox ${wide ? 'wide' : ''}">${html}</div>`; m.classList.remove('hidden'); m.onclick = e => { if (e.target === m) closeModal(); }; }
function closeModal() { $('#modal').classList.add('hidden'); $('#modal').innerHTML = ''; RV = null; }
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').classList.contains('hidden')) closeModal(); });
window.addEventListener('afterprint', () => { $('#print').innerHTML = ''; });

render();
