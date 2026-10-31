/* Bölüm 02 Yara iyileşmesi (pptx slayt 13–20) */
(function(){
const { T, icon } = Y;
Deck.chapter('iyilesme', { title: 'Yara İyileşmesi', sub: 'Vücudun kendini onarma sanatı: iyileşme tipleri, dört evre ve iyileşmeyi geciktiren faktörler.', a: '#FF6B5E', b: '#FBBF24' });

/* Deri kesiti + yara boşluğu: üç iyileşme tipinin döngüsel animasyonu */
function woundSvg(kind){
  const L = (x, w) => `<rect x="${x}" y="40" width="${w}" height="22" fill="#E9B79B"/><rect x="${x}" y="62" width="${w}" height="70" fill="#D88A73"/><rect x="${x}" y="132" width="${w}" height="50" fill="#F1D39C"/>`;
  return `<svg viewBox="0 0 360 210" class="wsvg" data-kind="${kind}">
    <rect x="0" y="40" width="360" height="142" fill="#3A1216"/>
    <rect class="gran" x="120" y="182" width="120" height="0" fill="#C8394A"/>
    <g class="granbumps" opacity="0">${Array.from({ length: 8 }, (_, i) => `<circle cx="${128 + i * 15}" cy="70" r="8" fill="#D9475A"/>`).join('')}</g>
    <rect class="epi" x="120" y="40" width="120" height="6" fill="#F3C9AE" opacity="0"/>
    <g class="lft">${L(0, kind === 'primer' ? 168 : 130)}</g>
    <g class="rgt">${L(kind === 'primer' ? 192 : 230, kind === 'primer' ? 168 : 130)}</g>
    <g class="sut" opacity="0">${[150, 170, 190, 210].map(x => `<path d="M${x - 10} 34 q10 -16 20 0" fill="none" stroke="#1E293B" stroke-width="3"/><path d="M${x - 10} 34 q10 -16 20 0" fill="none" stroke="#7DD3FC" stroke-width="1.5"/>`).join('')}</g>
    <text class="lbl" x="180" y="22" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)"></text>
  </svg>`;
}
function animateWound(svg){
  const k = svg.dataset.kind, q = s => svg.querySelector(s), lbl = q('.lbl');
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
  const say = t => () => { lbl.textContent = t; };
  if (k === 'primer'){
    tl.call(say('Kenarlar yaklaştırılır')).to(q('.lft'), { x: 12, duration: 1.2, ease: 'power2.inOut' }, .4).to(q('.rgt'), { x: -12, duration: 1.2, ease: 'power2.inOut' }, .4)
      .to(q('.sut'), { opacity: 1, duration: .4 }).call(say('Minimal skar ✓')).to({}, { duration: 1.6 })
      .set([q('.lft'), q('.rgt')], { x: 0 }).set(q('.sut'), { opacity: 0 });
  } else if (k === 'sekonder'){
    tl.call(say('Granülasyon doku dolar')).to(q('.gran'), { attr: { y: 70, height: 112 }, duration: 2.4, ease: 'power1.inOut' }, .3)
      .to(q('.granbumps'), { opacity: 1, duration: .5 }, '-=.6').to(q('.gran'), { attr: { y: 46, height: 136 }, duration: .8 })
      .to(q('.granbumps'), { y: -24, opacity: 0, duration: .8 }, '<').call(say('Reepitelizasyon ✓')).to(q('.epi'), { opacity: 1, duration: .6 }).to({}, { duration: 1.6 })
      .set(q('.gran'), { attr: { y: 182, height: 0 } }).set(q('.epi'), { opacity: 0 }).set(q('.granbumps'), { y: 0, opacity: 0 });
  } else {
    tl.call(say('Açık bırakılır, beklenir…')).to(q('.gran'), { attr: { y: 120, height: 62 }, duration: 1.8, ease: 'power1.inOut' }, .3)
      .call(say('Koşullar uygun → sütür')).to(q('.lft'), { x: 50, duration: 1.1, ease: 'power2.inOut' }).to(q('.rgt'), { x: -50, duration: 1.1, ease: 'power2.inOut' }, '<')
      .to(q('.sut'), { opacity: 1, duration: .4 }).call(say('Kapatıldı ✓')).to({}, { duration: 1.6 })
      .set([q('.lft'), q('.rgt')], { x: 0 }).set(q('.sut'), { opacity: 0 }).set(q('.gran'), { attr: { y: 182, height: 0 } });
  }
  return tl;
}
Deck.add('iyilesme', {
  id: 'iyilesme-tipleri', title: 'Yara iyileşme tipleri',
  notes: 'Animasyonlar döngüde. Tersiyer = gecikmiş primer kapama: önce sekonder gibi açık bırakılır, sonra sütüre edilir.',
  html: `${T.head('İyileşme tipleri', 'Primer, sekonder, <em>tersiyer</em>')}
  <div class="grid g3 fill">
    ${[['primer', 'Primer iyileşme', 'Belirgin bakteriyel kontaminasyon ve doku kaybı olmayan yarada, kenarlar yaklaştırılarak sağlanan iyileşme.', ''],
       ['sekonder', 'Sekonder iyileşme', 'Granülasyon dokusunun gelişip yara alanını doldurması beklenerek, rejenerasyon ve reepitelizasyonla gerçekleşen iyileşme.', 'amber'],
       ['tersiyer', 'Tersiyer iyileşme', 'Sekonder iyileşmeye bırakılan yaranın, şartlar uygun hale geldiğinde sütüre edilerek kapatılması.', 'violet']]
      .map(([k, t, d, tone]) => `<div class="card a ${tone}">${woundSvg(k)}<h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>`,
  enter(el){ const tls = [...el.querySelectorAll('.wsvg')].map(animateWound); return () => tls.forEach(t => t.kill()); }
});

/* Dört evre zaman çizelgesi; işaretçi ilerledikçe evre kartı parlar */
const PHASES = [
  ['Hemostaz', 'Dakikalar – saatler', 'Vazokonstriksiyon, trombosit tıkacı, pıhtı.', '#FF6B5E', 'droplet'],
  ['İnflamasyon', '0 – 4. gün', 'Bağışıklık hücreleri bölgeye gelir; hafif kızarıklık normaldir.', '#FBBF24', 'shield-plus'],
  ['Proliferasyon', '4 – 21. gün', 'Epitelizasyon, fibroplazi, anjiyogenez, kollajen sentezi.', '#2DD4BF', 'sprout'],
  ['Maturasyon', '21. gün – aylar/yıllar', 'Kollajen yeniden düzenlenir, iz dokusu olgunlaşır.', '#60A5FA', 'gem']
];
Deck.add('iyilesme', {
  id: 'iyilesme-sureci', title: 'Yara iyileşme süreci',
  html: `${T.head('İyileşme süreci', 'Dört evre, <em>tek</em> kesintisiz akış')}
  <div class="phase-track a">
    <div class="pt-line"><i></i></div>
    <div class="pt-dot"></div>
  </div>
  <div class="grid g4 fill" style="align-content:start">
    ${PHASES.map(([t, time, d, c, ic], i) => `<div class="card a phase" style="--pc:${c}"><div class="ic" style="background:color-mix(in oklab,${c} 18%,transparent);color:${c}">${icon(ic)}</div><span class="mono" style="color:${c};font-size:15px">${time}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>`,
  enter(el){
    const cards = el.querySelectorAll('.phase'), dot = el.querySelector('.pt-dot'), line = el.querySelector('.pt-line i');
    const tl = gsap.timeline({ repeat: -1, delay: .8 });
    PHASES.forEach((p, i) => {
      tl.to(dot, { left: `${(i + .5) * 25}%`, background: p[3], boxShadow: `0 0 30px 8px ${p[3]}`, duration: 1.1, ease: 'power2.inOut' })
        .to(line, { scaleX: (i + .5) / 4, duration: 1.1, ease: 'power2.inOut' }, '<')
        .call(() => cards.forEach((c, j) => c.classList.toggle('lit', j === i)))
        .to({}, { duration: 1.6 });
    });
    tl.to(line, { scaleX: 0, duration: .5 }).to(dot, { left: '0%', duration: .5 }, '<');
    return () => tl.kill();
  }
});

/* Hemostaz: damar duvarındaki yırtığa trombositler toplanır, fibrin ağı örülür */
Deck.add('iyilesme', {
  id: 'hemostaz', title: 'Hemostaz ve inflamasyon evresi',
  notes: 'Trombositler “geçici yara bandı” gibi ilk tıkacı oluşturur; üzerine pıhtılaşma faktörleri fibrin ağıyla kalıcı pıhtıyı kurar.',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:20px">
      ${T.head('Evre 1 · Hemostaz ve inflamasyon', 'Önce <em>kanama</em> durur')}
      ${T.bullets([
        '<b>Vazokonstriksiyon:</b> Damar hasarına refleks olarak damar büzülür, bölgeye giden kan azalır.',
        '<b>Trombosit tıkacı:</b> Pıhtılaşmada görevli hücre parçacıkları hasarlı bölgeye hızla yapışır — geçici bir yara bandı gibi.',
        '<b>Pıhtı:</b> İlk tıkacın üzerine pıhtılaşma faktörleri devreye girer; yara iyileşene kadar kanama tamamen durdurulur.',
        '<b>İnflamasyon:</b> Bağışıklık hücreleri bölgeye gelir, ölü doku ve mikroorganizmaları temizler; hafif kızarıklık normaldir.'
      ], 'coral tight')}
    </div>
    <div style="display:flex;flex-direction:column;gap:18px;height:100%">
      <div class="card a" style="padding:14px;flex:1"><svg class="vessel" viewBox="0 0 640 300" style="width:100%;height:100%">
        <rect x="0" y="0" width="640" height="300" rx="16" fill="#2A0E14"/>
        <path d="M0 80 H280 M360 80 H640" stroke="#E07A7A" stroke-width="16"/>
        <path d="M0 230 H640" stroke="#E07A7A" stroke-width="16"/>
        <g class="rbcs">${Array.from({ length: 16 }, (_, i) => `<ellipse class="rbc" cx="${(i * 47) % 640}" cy="${120 + (i * 29) % 90}" rx="16" ry="9" fill="#D7263D"/>`).join('')}</g>
        <g class="plts">${Array.from({ length: 14 }, (_, i) => `<circle class="plt" cx="${30 + i * 40}" cy="${130 + (i * 17) % 70}" r="7" fill="#C4B5FD"/>`).join('')}</g>
        <g class="fibrin" opacity="0">${Array.from({ length: 7 }, (_, i) => `<path d="M${282 + i * 12} 58 L${300 + (i % 3) * 18} 102" stroke="#FDE68A" stroke-width="2"/>`).join('')}<path d="M280 70 L360 92 M280 92 L360 66" stroke="#FDE68A" stroke-width="2"/></g>
        <text x="320" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="#FECACA" class="vlbl">Damar duvarında yırtık</text>
      </svg></div>
      ${T.photo(17, 1, 'Hemostaz döngüsü', 'contain', 'height:250px')}
    </div>
  </div>`,
  enter(el){
    const rbcs = el.querySelectorAll('.rbc'), plts = el.querySelectorAll('.plt'), lbl = el.querySelector('.vlbl');
    const flow = gsap.to(rbcs, { x: '+=680', duration: 6, ease: 'none', repeat: -1, modifiers: { x: (v, t) => { const cx = +t.getAttribute('cx'); return (((cx + parseFloat(v)) % 680) - cx - 20) + 'px'; } } });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.call(() => lbl.textContent = 'Damar duvarında yırtık')
      .to(plts, { attr: { cx: i => 290 + (i % 6) * 13, cy: i => 64 + Math.floor(i / 6) * 13 }, duration: 2.2, stagger: .08, ease: 'power2.inOut' }, .6)
      .call(() => lbl.textContent = 'Trombosit tıkacı').to(el.querySelector('.fibrin'), { opacity: 1, duration: .8 })
      .call(() => lbl.textContent = 'Fibrin ağı → kalıcı pıhtı').to({}, { duration: 2.4 })
      .to(el.querySelector('.fibrin'), { opacity: 0, duration: .4 }).set(plts, { attr: { cx: i => 30 + i * 40, cy: i => 130 + (i * 17) % 70 } });
    return () => { flow.kill(); tl.kill(); };
  }
});

Deck.add('iyilesme', {
  id: 'proliferasyon', title: 'Proliferasyon evresi',
  html: `${T.head('Evre 2 · Proliferasyon (4–21. gün)', 'Doku <em>yeniden inşa</em> edilir', 'İnflamatuvar aşamayı izler ve dört alt evrede gerçekleşir.')}
  <div class="grid g4">
    ${T.card({ icon: 'layers', title: 'Epitelizasyon', text: 'Yara yüzeyinin yeni epitel (deri) hücreleriyle örtülerek dış ortama kapatılması.', num: '1' })}
    ${T.card({ icon: 'waypoints', title: 'Fibroplazi', text: 'Fibroblastların yaraya göç edip çoğalarak yeni bağ dokusunu oluşturması.', tone: 'amber', num: '2' })}
    ${T.card({ icon: 'git-fork', title: 'Anjiyogenez', text: 'Dokunun beslenmesi ve oksijenlenmesi için yeni kılcal damarların üretilmesi.', tone: 'coral', num: '3' })}
    ${T.card({ icon: 'dna', title: 'Kollajen sentezi', text: 'Fibroblastların ürettiği, yaraya yapısal sağlamlık ve direnç kazandıran ana proteinin yapımı.', tone: 'violet', num: '4' })}
  </div>
  ${T.callout('Vücut bu evrede yeni damarlar ve kollajen lifleriyle yara yatağını doldurur, yarayı <b>büzerek küçültür</b> ve üzerini yeni epitel tabakasıyla kaplayarak dokuyu yeniden inşa eder.', 'teal', 'sprout')}`
});

/* Maturasyon: rastgele kollajen lifleri zamanla paralel dizilir */
Deck.add('iyilesme', {
  id: 'maturasyon', title: 'Maturasyon evresi',
  notes: 'Pptx’te bu slayt yalnız başlıktı; kısa standart bilgi eklendi: kollajen yeniden düzenlenir, skar olgunlaşır, gerilme gücü artar ama normal derinin ancak ~%80’ine ulaşır.',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:22px">
      ${T.head('Evre 3 · Maturasyon (yeniden şekillenme)', 'İz dokusu <em>olgunlaşır</em>')}
      ${T.bullets([
        'Yaklaşık 21. günden itibaren başlar; <b>aylar, hatta 1–2 yıl</b> sürebilir.',
        'Gelişigüzel dizilmiş kollajen lifleri <b>yeniden düzenlenir</b> ve gerilim yönünde hizalanır.',
        'Skar kırmızıdan soluk renge döner, incelir ve sertleşir.',
        'Gerilme gücü artar ancak normal derinin yaklaşık <b>%80’ine</b> ulaşabilir.'
      ], 'tight')}
    </div>
    <div class="card a" style="align-items:center;gap:16px">
      <svg class="coll" viewBox="0 0 520 300" style="width:100%;height:330px">${Array.from({ length: 46 }, (_, i) => { const x = 30 + (i % 10) * 48, y = 30 + Math.floor(i / 10) * 58; return `<line x1="${x - 22}" y1="${y}" x2="${x + 22}" y2="${y}" stroke="${i % 3 ? '#FCA5A5' : '#F9A8D4'}" stroke-width="6" stroke-linecap="round" style="transform-box:fill-box;transform-origin:center" data-r="${(i * 67) % 180 - 90}"/>`; }).join('')}</svg>
      <div style="display:flex;justify-content:space-between;width:100%;align-items:end"><span class="chip coral coll-l">Gelişigüzel kollajen</span><div style="text-align:right"><div class="bigstat" style="font-size:96px">%<span class="m80">0</span></div><small class="muted">normal deri gücüne ulaşma</small></div></div>
    </div>
  </div>`,
  enter(el){
    const lines = el.querySelectorAll('.coll line'), lab = el.querySelector('.coll-l');
    lines.forEach(l => gsap.set(l, { rotate: +l.dataset.r }));
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: .6 });
    tl.call(() => { lab.textContent = 'Gelişigüzel kollajen'; lab.className = 'chip coral coll-l'; })
      .to(lines, { rotate: 0, duration: 2.6, stagger: { each: .03, from: 'random' }, ease: 'power3.inOut' }, .8)
      .call(() => { lab.textContent = 'Hizalanmış, olgun skar'; lab.className = 'chip teal coll-l'; })
      .to({}, { duration: 2.2 }).to(lines, { rotate: i => +lines[i].dataset.r, duration: .8 });
    Y.countUp(el.querySelector('.m80'), 80, { dur: 2.4 });
    return () => tl.kill();
  }
});

const FACTORS = [['skull', 'Lokal nekroz', 'l'], ['biohazard', 'Enfeksiyon', 'l'], ['heart-pulse', 'Kan desteği', 'l'], ['accessibility', 'Mobilite', 'l'], ['pin', 'Yabancı cisim', 'l'],
  ['utensils', 'Sistemik beslenme', 's'], ['pill', 'Vitamin eksikliği', 's'], ['hourglass', 'Yaş', 's'], ['shield-alert', 'İmmün direnç', 's'], ['stethoscope', 'Eşlik eden hastalık', 's', 'diyabet, anemi vb.']];
Deck.add('iyilesme', {
  id: 'geciktiren', title: 'İyileşmeyi geciktiren faktörler',
  notes: 'Üst sıra yaraya ait (lokal), alt sıra hastanın geneline ait (sistemik) faktörler.',
  html: `${T.head('Dikkat', 'İyileşmeyi <em>geciktiren</em> faktörler')}
  <div class="legend a"><span><i style="background:var(--coral)"></i>Lokal (yaraya ait)</span><span><i style="background:var(--violet)"></i>Sistemik (hastaya ait)</span></div>
  <div class="grid g5 fill" style="align-content:start">
    ${FACTORS.map(([ic, t, k, sub]) => `<div class="card a compact ${k === 'l' ? 'coral' : 'violet'}" style="align-items:center;text-align:center;min-height:170px;justify-content:center"><div class="ic">${icon(ic)}</div><h3>${t}</h3>${sub ? `<p>${sub}</p>` : ''}</div>`).join('')}
  </div>`
});
})();
