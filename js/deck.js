/* Sunum motoru: bölüm/sahne kaydı, geçişler, adım (fragment) gösterimi, kısayollar, menü, notlar, lazer. */
(function(){
const { $, $$, h, icons } = Y;
const Deck = window.Deck = { chapters: [], slides: [], i: -1, step: 0, maxStep: 0, listeners: [] };
const byChapter = {};

Deck.chapter = (id, o) => { const c = { id, ...o, scenes: [] }; Deck.chapters.push(c); byChapter[id] = c; return c; };
Deck.add = (chId, scene) => byChapter[chId].scenes.push(scene);
Deck.on = fn => Deck.listeners.push(fn);

function build(){
  let n = 0;
  Deck.chapters.forEach((c, ci) => {
    c.num = String(ci).padStart(2, '0');
    c.start = Deck.slides.length;
    if (c.opener !== false) Deck.slides.push({ id: c.id, chapter: c, opener: true, title: c.title });
    c.scenes.forEach(s => Deck.slides.push({ ...s, chapter: c }));
    c.end = Deck.slides.length;
  });
}

function openerHtml(c){
  return `<div class="opener" style="display:flex;flex-direction:column;height:100%">
    <div class="kicker a">Bölüm ${c.num}</div>
    <div class="op-num">${c.num}</div>
    <h1 class="op-title a">${c.title}</h1>
    <div class="op-line"></div>
    ${c.sub ? `<p class="op-sub a">${c.sub}</p>` : ''}
  </div>`;
}

/* ——— Ölçek ——— */
function fit(){
  const s = Math.min(innerWidth / 1600, innerHeight / 900);
  document.documentElement.style.setProperty('--scale', s);
}

/* ——— Gösterim ——— */
let cur = null;
function render(i, dir = 1, opts = {}){
  i = Y.clamp(i, 0, Deck.slides.length - 1);
  if (i === Deck.i && !opts.force) return;
  const s = Deck.slides[i], stage = $('#stage'), old = cur;
  if (old && old.cleanup) try { old.cleanup(); } catch {}
  Deck.i = i;
  const html = s.opener ? openerHtml(s.chapter) : (typeof s.html === 'function' ? s.html() : s.html);
  const el = h(`<section class="slide ${s.cls || ''} ${s.opener ? 'opener-slide' : ''}" data-id="${s.id}" aria-label="${Y.esc(s.title || '')}">${html}</section>`);
  stage.appendChild(el); icons(el);

  // adımlar
  const stepped = $$('[data-step]', el);
  Deck.maxStep = stepped.reduce((m, e) => Math.max(m, +e.dataset.step), 0);
  Deck.step = opts.allSteps ? Deck.maxStep : 0;
  stepped.forEach(e => { if (+e.dataset.step > Deck.step) gsap.set(e, { opacity: 0, y: 26, filter: 'blur(6px)' }); });

  // çıkış
  if (old && old.el){
    const oe = old.el;
    gsap.to(oe, { opacity: 0, x: -70 * dir, scale: .975, filter: 'blur(8px)', duration: .42, ease: 'power2.in', onComplete: () => oe.remove() });
  }
  // giriş
  const tl = gsap.timeline({ delay: old ? .18 : .05 });
  tl.from(el, { opacity: 0, x: 80 * dir, duration: .6, ease: 'power3.out' }, 0);
  const items = $$('.a', el).filter(e => !e.closest('[data-step]') || +e.closest('[data-step]').dataset.step <= Deck.step);
  if (!Y.reduced) tl.from(items, { opacity: 0, y: 30, filter: 'blur(10px)', duration: .75, stagger: .055, ease: 'power3.out', clearProps: 'filter' }, .08);
  if (s.opener){
    tl.from($('.op-num', el), { scale: .6, opacity: 0, duration: 1.1, ease: 'expo.out' }, 0)
      .to($('.op-line', el), { width: 420, duration: 1, ease: 'expo.out' }, .35);
  }
  cur = { el, s, cleanup: null };
  if (s.enter) { try { cur.cleanup = s.enter(el, { tl, step: Deck.step }) || null; } catch (e) { console.error(e); } }

  // palet
  const c = s.chapter;
  if (c.a){ FX.palette(c.a, c.b || c.a); document.documentElement.style.setProperty('--glow-a', c.a); document.documentElement.style.setProperty('--glow-b', c.b || c.a); }
  updateChrome();
  try { history.replaceState(null, '', '#' + s.id); } catch {}
  Deck.listeners.forEach(fn => fn(s, i));
}

function revealStep(n){
  const el = cur.el;
  const items = $$(`[data-step="${n}"]`, el);
  gsap.to(items, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .6, stagger: .08, ease: 'power3.out' });
  if (cur.s.onStep) cur.s.onStep(n, el);
}

Deck.next = () => {
  if (Deck.step < Deck.maxStep){ Deck.step++; revealStep(Deck.step); updateChrome(); return; }
  if (Deck.i < Deck.slides.length - 1) render(Deck.i + 1, 1);
};
Deck.prev = () => { if (Deck.i > 0) render(Deck.i - 1, -1, { allSteps: true }); };
Deck.go = (idOrIndex, dir) => {
  const i = typeof idOrIndex === 'number' ? idOrIndex : Deck.slides.findIndex(s => s.id === idOrIndex && !s.opener) >= 0 ? Deck.slides.findIndex(s => s.id === idOrIndex && !s.opener) : Deck.slides.findIndex(s => s.id === idOrIndex);
  if (i < 0) return;
  render(i, dir || (i >= Deck.i ? 1 : -1), { allSteps: true });
};
Deck.current = () => Deck.slides[Deck.i];

function updateChrome(){
  const s = Deck.slides[Deck.i], c = s.chapter;
  $('#hud-num').textContent = c.num;
  $('#hud-title').textContent = c.title;
  $('#counter').textContent = `${Deck.i + 1} / ${Deck.slides.length}`;
  $$('#progress .seg').forEach((seg, ci) => {
    const ch = Deck.chapters[ci], len = ch.end - ch.start;
    const f = Deck.i >= ch.end ? 1 : Deck.i < ch.start ? 0 : (Deck.i - ch.start + 1) / len;
    seg.firstElementChild.style.transform = `scaleX(${f})`;
  });
  $('#notes-body').innerHTML = s.notes ? `<p>${s.notes}</p>` : `<p class="muted">${Y.esc(s.title || '')} — bu sahne için not yok.</p>`;
  $$('.menu-item').forEach(m => m.classList.toggle('on', +m.dataset.ch === Deck.chapters.indexOf(c)));
  $$('.ov').forEach(m => m.classList.toggle('on', +m.dataset.i === Deck.i));
}

function buildChrome(){
  const prog = $('#progress');
  Deck.chapters.forEach((c, ci) => {
    const seg = h(`<div class="seg" style="flex:${c.end - c.start}" title="${Y.esc(c.title)}"><i></i></div>`);
    seg.addEventListener('click', () => render(c.start, c.start > Deck.i ? 1 : -1));
    prog.appendChild(seg);
  });
  const list = $('#menu-list');
  Deck.chapters.forEach((c, ci) => {
    const b = h(`<button class="menu-item" data-ch="${ci}"><span class="mono">${c.num}</span><span><b>${c.title}</b><small>${c.end - c.start} sahne</small></span></button>`);
    b.addEventListener('click', () => { toggle('#menu', false); render(c.start); });
    list.appendChild(b);
  });
  const grid = $('#overview-grid');
  Deck.slides.forEach((s, i) => {
    const b = h(`<button class="ov" data-i="${i}"><small>${String(i + 1).padStart(2, '0')} · ${s.chapter.title}</small><span>${s.opener ? 'Bölüm açılışı' : Y.esc(s.title || s.id)}</span></button>`);
    b.addEventListener('click', () => { toggle('#overview', false); render(i, i > Deck.i ? 1 : -1, { allSteps: true }); });
    grid.appendChild(b);
  });
}

function toggle(sel, force){
  const el = $(sel), show = force ?? el.hidden;
  el.hidden = !show;
  if (show && window.gsap) gsap.from(el.firstElementChild || el, { y: 20, opacity: 0, duration: .3, ease: 'power3.out' });
  return show;
}
Deck.toggle = toggle;
const anyOverlay = () => ['#menu', '#overview', '#remote-pop'].some(s => !$(s).hidden) || $('.lightbox');

function setTheme(t){
  if (t === 'light') document.documentElement.dataset.theme = 'light'; else delete document.documentElement.dataset.theme;
  FX.setLight(t === 'light'); Y.store.set('yara_theme', t);
}

const actions = {
  next: () => Deck.next(), prev: () => Deck.prev(),
  menu: () => toggle('#menu'), overview: () => toggle('#overview'),
  notes: () => toggle('#notes'),
  remote: () => { if (toggle('#remote-pop')) Quiz.openRemote(); },
  sound: () => { const on = Y.Sfx.toggle(); Y.toast(on ? 'Ses açık' : 'Ses kapalı'); paintSound(); },
  theme: () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'),
  fullscreen: () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); },
  laser: () => { const on = document.body.classList.toggle('laser-on'); $('#laser').hidden = !on; Y.toast(on ? 'Lazer imleç açık (L)' : 'Lazer kapalı'); }
};
Deck.actions = actions;
function paintSound(){
  const b = $('[data-act="sound"]'); if (!b) return;
  b.innerHTML = Y.icon(Y.Sfx.on ? 'volume-2' : 'volume-x'); icons(b);
}

function keys(e){
  if (e.target.closest('input,textarea,select')) return;
  if (!$('#analysis').hidden){ if (e.key === 'Escape') Analytics.close(); return; }
  if (window.Quiz && Quiz.active){ Quiz.key(e); return; }
  const k = e.key;
  if (k === 'Escape'){ $('.lightbox')?.remove(); ['#menu', '#overview', '#remote-pop'].forEach(s => $(s).hidden = true); return; }
  if (anyOverlay()) return;
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)){ e.preventDefault(); Deck.next(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)){ e.preventDefault(); Deck.prev(); }
  else if (k === 'Home') render(0, -1);
  else if (k === 'End') render(Deck.slides.length - 1, 1);
  else if (k === 'm' || k === 'M') actions.menu();
  else if (k === 'o' || k === 'O') actions.overview();
  else if (k === 'n' || k === 'N') actions.notes();
  else if (k === 'f' || k === 'F') actions.fullscreen();
  else if (k === 'l' || k === 'L') actions.laser();
  else if (k === 't' || k === 'T') actions.theme();
  else if (k === 'a' || k === 'A') actions.sound();
  else if (k === 'h' || k === 'H') document.body.classList.toggle('clean');
}

Deck.boot = () => {
  build(); buildChrome(); fit();
  addEventListener('resize', fit);
  setTheme(Y.store.get('yara_theme', 'dark'));
  document.addEventListener('keydown', keys);
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    const fn = actions[a.dataset.act]; if (fn){ e.preventDefault(); fn(); }
  });
  document.addEventListener('pointerdown', () => Y.Sfx.unlock(), { once: true });
  $$('.overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o){ o.hidden = true; } }));
  addEventListener('mousemove', e => { if (document.body.classList.contains('laser-on')){ const l = $('#laser'); l.style.left = e.clientX + 'px'; l.style.top = e.clientY + 'px'; } });
  // dokunmatik kaydırma
  let sx = null;
  $('#viewport').addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  $('#viewport').addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 60) dx < 0 ? Deck.next() : Deck.prev(); sx = null; });
  paintSound(); icons();
  const id = location.hash.slice(1);
  const qs = new URLSearchParams(location.search);
  const start = Deck.slides.findIndex(s => s.id === id);
  render(start >= 0 ? start : 0, 1, { force: true });
  if (window.Quiz) Quiz.init();
  if (qs.get('analiz')) Analytics.openPin(qs.get('analiz'));
  if (qs.has('demo')) Y.toast('Demo modu: canlı sınav sanal öğrencilerle çalışır');
};
})();
