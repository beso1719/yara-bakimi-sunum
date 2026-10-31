/* Bölüm 05 Yanık yarası (pptx slayt 41–69) */
(function(){
const { T, icon } = Y;
Deck.chapter('yanik', { title: 'Yanık Yarası', sub: 'Türleri, 9’lar kuralı, yanık şoku, derinlik sınıflaması, ilk yardım ve tedavi.', a: '#FB923C', b: '#EF4444' });

Deck.add('yanik', {
  id: 'yanik-tanim', title: 'Yanık nedir? Altı tür',
  html: `${T.head('Tanım', 'Yanık: <em>altı</em> başlıkta', 'Isı, ışın, elektrik, kimyasal maddeler veya sürtünme sonucu cilt ve cilt altı dokuların bütünlüğünün bozulmasıdır.')}
  <div class="grid g3 fill">
    ${[['flame', 'Termal yanıklar', 43, 1, 'Kaynar su yanığı'], ['snowflake', 'Soğuk maruziyeti', 0, 0, ''], ['flask-conical', 'Kimyasal yanıklar', 0, 0, ''],
       ['zap', 'Elektrik yanıkları', 43, 2, 'Elektrik yanığı'], ['radiation', 'Radyasyon yanıkları', 45, 1, 'Radyasyon yanığı'], ['wind', 'İnhalasyon yanıkları', 45, 2, 'Alev yanığı']]
      .map(([ic, t, s, k, cap]) => `<div class="card a burn-type" style="padding:0;flex-direction:row;gap:0;overflow:hidden">
        ${s ? `<figure class="photo" style="width:44%;border-radius:0;border:0;box-shadow:none" data-cap="${cap}"><img src="${Y.img(s, k)}" alt="${cap}" loading="lazy"></figure>` : `<div style="width:44%;display:grid;place-items:center;background:var(--surface)"><div class="ic" style="width:84px;height:84px;border-radius:24px">${icon(ic)}</div></div>`}
        <div style="padding:22px;display:flex;flex-direction:column;justify-content:center;gap:8px"><div class="ic" style="width:42px;height:42px">${icon(ic)}</div><h3 style="font-size:24px">${t}</h3></div></div>`).join('')}
  </div>`
});

Deck.add('yanik', {
  id: 'termal-donma', title: 'Termal yanıklar ve donma',
  html: `${T.head('Yanık türleri · 1', 'Isı ve <em>soğuk</em>')}
  <div class="grid" style="grid-template-columns:1fr 1fr .8fr;flex:1">
    <div class="card a coral"><div class="ic">${icon('flame')}</div><h3>Termal yanıklar</h3>
      ${T.bullets(['Hasarın derinliği; ısı kaynağının <b>temas süresi</b>, <b>temas sıcaklığı</b> ve derinin kalınlığı ile ilgilidir.', 'En yaygınları alev, sıcak sıvılar, sıcak katı nesneler ve buhar.', 'Haşlanmaya bağlı yanıklar çoğunlukla epidermis ve dermisin bir bölümüne sınırlıdır.'], 'coral tight')}</div>
    <div class="card a sky"><div class="ic">${icon('snowflake')}</div><h3>Soğuk maruziyeti (donma)</h3>
      ${T.bullets(['Buz kristalleri hücreleri patlattığında veya hipertonik ortam oluşturduğunda deride ve alttaki dokularda hasar oluşur.', 'Hemokonsantrasyon, intravasküler tromboz ve doku hipoksisi gelişebilir.'], 'tight')}</div>
    ${T.photo(43, 1, 'Kaynar su yanığı', '', 'height:100%')}
  </div>`
});

Deck.add('yanik', {
  id: 'elektrik-radyasyon', title: 'Elektrik ve radyasyon yanıkları',
  html: `${T.head('Yanık türleri · 2', 'Elektrik ve <em>radyasyon</em>')}
  <div class="grid g2 fill">
    <div class="card a amber" style="flex-direction:row;gap:22px">
      <div style="flex:1;display:flex;flex-direction:column;gap:12px"><div class="ic">${icon('zap')}</div><h3>Elektrik yanıkları</h3>
      ${T.bullets(['Elektrik iletimi dokulardan geçerken enerji termal yaralanmaya dönüşür.', 'Hasarın büyüklüğü; akımın yoluna, dokuların direncine ve akımın süresine bağlıdır.'], 'amber tight')}</div>
      ${T.photo(43, 2, 'Elektrik yanığı', '', 'width:42%')}
    </div>
    <div class="card a violet" style="flex-direction:row;gap:22px">
      <div style="flex:1;display:flex;flex-direction:column;gap:12px"><div class="ic">${icon('radiation')}</div><h3>Radyasyon yanıkları</h3>
      ${T.bullets(['Mor ötesi ışınlara ya da iyonize radyasyona uzun süre maruz kalma sonucu.', 'Çok derin, iç yanıklara neden olabilir.', 'En yaygın görüleni <b>güneş yanığıdır</b>.'], 'tight')}</div>
      ${T.photo(45, 1, 'Radyasyon yanığı', '', 'width:42%')}
    </div>
  </div>`,
  enter(el){ const t = gsap.to(el.querySelector('.card.amber .ic'), { boxShadow: '0 0 40px 6px rgba(251,191,36,.6)', duration: .12, repeat: -1, yoyo: true, repeatDelay: 1.6 }); return () => t.kill(); }
});

Deck.add('yanik', {
  id: 'inhalasyon', title: 'İnhalasyon yanıkları',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:22px">
      ${T.head('Yanık türleri · 3', 'İnhalasyon <em>yanıkları</em>')}
      ${T.bullets(['Yangınlarda üretilen birçok toksik kimyasal madde solunum yollarında <b>kimyasal yanıklara</b> neden olur.', 'Bu yanıklara sıcak buhar veya aleve bağlı termal yanıklar da eşlik eder.', 'Sıklıkla <b>farinks</b> etkilenir; alt solunum yollarında da hasar olabilir.', 'Yanmadan üretilen <b>karbonmonoksit</b> hücresel solunumu bozar.'])}
      ${T.callout('Yüz/boyun yanığı, kurumlu balgam, ses kısıklığı olan hastada solunum yolunu yakından izleyin.', 'coral', 'wind')}
    </div>
    <div class="grid" style="grid-template-rows:1fr 1fr;gap:16px;height:640px">${T.photo(46, 1, 'Yangından kurtarma')}${T.photo(45, 2, 'Alev yanığı')}</div>
  </div>`
});

/* 9'lar kuralı: bölgeye tıkla → yüzde toplanır */
const REG = [
  ['head', 'Baş-boyun', 9, '<ellipse cx="200" cy="62" rx="40" ry="46"/><rect x="184" y="104" width="32" height="20" rx="6"/>'],
  ['torsoF', 'Gövde ön', 18, '<path d="M140 128 H260 Q272 128 270 150 L262 300 Q260 320 240 322 H160 Q140 320 138 300 L130 150 Q128 128 140 128Z"/>'],
  ['armL', 'Sol kol', 9, '<path d="M128 140 Q104 146 98 176 L72 320 Q68 344 84 348 Q98 350 102 330 L130 196Z"/>'],
  ['armR', 'Sağ kol', 9, '<path d="M272 140 Q296 146 302 176 L328 320 Q332 344 316 348 Q302 350 298 330 L270 196Z"/>'],
  ['gen', 'Genital', 1, '<path d="M182 322 H218 L210 348 H190Z"/>'],
  ['legL', 'Sol bacak', 18, '<path d="M160 326 H198 L192 560 Q190 580 172 580 Q158 578 158 560 L150 360Z"/>'],
  ['legR', 'Sağ bacak', 18, '<path d="M240 326 H202 L208 560 Q210 580 228 580 Q242 578 242 560 L250 360Z"/>']
];
Deck.add('yanik', {
  id: 'dokuzlar', title: 'Yanığın genişliği: 9’lar kuralı',
  notes: 'Bölgelere tıklayın; sağdaki sayaç toplamı gösterir. Arka gövde ayrı bir düğme (%18). Çocuklarda bu yöntem kullanılmaz — beden oranları yaşla değişir.',
  html: `<div class="split" style="grid-template-columns:.9fr 1.1fr">
    <div class="card a" style="height:700px;align-items:center;justify-content:center;position:relative">
      <svg class="body9" viewBox="0 0 400 600" style="height:100%">${REG.map(([id, t, p, d]) => `<g class="rg" data-id="${id}" data-p="${p}" tabindex="0" role="button" aria-label="${t} %${p}">${d}</g>`).join('')}
      ${REG.map(([id, t, p]) => { const pos = { head: [200, 66], torsoF: [200, 230], armL: [96, 250], armR: [304, 250], gen: [200, 340], legL: [176, 460], legR: [224, 460] }[id]; return `<text x="${pos[0]}" y="${pos[1]}" text-anchor="middle" font-size="${id === 'gen' ? 13 : 20}" font-weight="800" fill="#0B1626" pointer-events="none">%${p}</text>`; }).join('')}</svg>
    </div>
    <div style="display:flex;flex-direction:column;gap:22px">
      ${T.head('Wallace’ın 9’lar kuralı', 'Yanığın <em>genişliği</em>')}
      <p class="s-lead a" style="font-size:22px">Vücudu 9 ya da 9’un katları olarak ayırır; hatırlaması kolay, etkilenen alanı hızlı hesaplamaya uygundur.</p>
      <div class="card a" style="flex-direction:row;align-items:center;justify-content:space-between">
        <div><small class="muted">Seçilen yanık alanı</small><div class="bigstat" style="font-size:120px">%<span class="tbsa">0</span></div></div>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-end">
          <button class="btn back18" aria-pressed="false">${icon('rotate-ccw')}Gövde arka %18</button>
          <button class="btn reset9">${icon('eraser')}Sıfırla</button>
        </div>
      </div>
      <div class="a" style="display:flex;gap:16px;align-items:center">${T.photo(47, 1, 'Çocuk ve erişkinde oranlar', 'contain', 'width:330px;height:170px')}${T.callout('<b>Çocuklarda kullanılmaz:</b> beden yüzdeleri yaşla birlikte değişir.', '', 'baby')}</div>
    </div>
  </div>`,
  enter(el){
    const sel = new Set(); let back = false;
    const out = el.querySelector('.tbsa');
    const total = () => [...sel].reduce((s, id) => s + REG.find(r => r[0] === id)[2], 0) + (back ? 18 : 0);
    const upd = () => { const t = total(); gsap.to(out, { innerText: t, duration: .5, snap: { innerText: 1 } }); };
    el.querySelectorAll('.rg').forEach(g => {
      const tog = () => { const id = g.dataset.id; sel.has(id) ? sel.delete(id) : sel.add(id); g.classList.toggle('on', sel.has(id)); Y.Sfx.pop(); upd(); if (sel.has(id)) gsap.fromTo(g, { scale: 1.06, transformOrigin: 'center' }, { scale: 1, duration: .4 }); };
      g.addEventListener('click', tog); g.addEventListener('keydown', e => { if (e.key === 'Enter') { e.stopPropagation(); tog(); } });
    });
    const b = el.querySelector('.back18');
    b.addEventListener('click', () => { back = !back; b.classList.toggle('primary', back); b.setAttribute('aria-pressed', back); upd(); });
    el.querySelector('.reset9').addEventListener('click', () => { sel.clear(); back = false; b.classList.remove('primary'); el.querySelectorAll('.rg').forEach(g => g.classList.remove('on')); upd(); });
    // tanıtım: kolu ve bir bacağı otomatik işaretle
    const demo = gsap.delayedCall(1.2, () => { ['armR', 'legL'].forEach((id, i) => setTimeout(() => el.querySelector(`[data-id="${id}"]`).dispatchEvent(new Event('click')), i * 500)); });
    return () => demo.kill();
  }
});

/* Yanık şoku: kılcal damardan plazma sızar, damar içi hacim azalır */
Deck.add('yanik', {
  id: 'yanik-soku', title: 'Yanık şoku',
  html: `${T.head('Yanık şoku', 'Damar <em>sızdırmaya</em> başlayınca')}
  <div class="grid" style="grid-template-columns:1.1fr .9fr;flex:1;gap:26px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      ${[['Damar geçirgenliği artar', 'Yanık sonrası kılcal damarların geçirgenliği aşırı artar.', 'coral'], ['Plazma sızıntısı', 'Plazma, proteinler ve elektrolitler damar içinden hücre dışı mesafeye hızla sızar.', 'amber'], ['Ödem ve hacim kaybı', 'Dokularda şiddetli ödem; damar içi kan hacmi kitlesel olarak azalır.', 'sky'], ['Doku hipoksisi', 'Organlara giden oksijen ve besin azalır; çoklu organ yetmezliğine yol açabilir.', 'violet']]
        .map(([t, d, tone], i) => T.card({ title: t, text: d, tone, num: String(i + 1), cls: 'compact' })).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card a" style="padding:14px;flex:1"><svg viewBox="0 0 520 260" style="width:100%;height:100%">
        <rect width="520" height="260" rx="14" fill="#2B1810"/>
        <rect x="0" y="95" width="520" height="70" fill="#5B1218"/><path d="M0 95 H520 M0 165 H520" stroke="#F87171" stroke-width="6" stroke-dasharray="40 14"/>
        <g class="plasma">${Array.from({ length: 26 }, (_, i) => `<circle cx="${20 + (i * 41) % 500}" cy="${110 + (i * 13) % 40}" r="6" fill="#FCD34D"/>`).join('')}</g>
        <text x="16" y="40" font-size="17" font-weight="700" fill="#FDE68A">İnterstisyel alan (ödem)</text>
        <text x="16" y="135" font-size="17" font-weight="700" fill="#FECACA">Damar içi</text>
        <rect x="380" y="18" width="124" height="22" rx="11" fill="rgba(255,255,255,.12)"/><rect class="vol" x="380" y="18" width="124" height="22" rx="11" fill="#F87171"/><text x="442" y="56" text-anchor="middle" font-size="13" fill="#FECACA">damar içi hacim</text>
      </svg></div>
      ${T.photo(48, 1, 'Yanık şoku akışı', 'contain', 'height:250px')}
    </div>
  </div>`,
  enter(el){
    const dots = el.querySelectorAll('.plasma circle');
    const tl = gsap.timeline({ repeat: -1, repeatDelay: .8, delay: .5 });
    tl.to(dots, { attr: { cy: i => i % 2 ? 20 + (i * 7) % 60 : 190 + (i * 7) % 55 }, duration: 2.2, stagger: .05, ease: 'power2.out' })
      .to(el.querySelector('.vol'), { attr: { width: 30 }, duration: 2, ease: 'power1.inOut' }, '<').to({}, { duration: 1.2 })
      .set(dots, { attr: { cy: i => 110 + (i * 13) % 40 } }).set(el.querySelector('.vol'), { attr: { width: 124 } });
    return () => tl.kill();
  }
});

Deck.add('yanik', {
  id: 'fizyopatoloji', title: 'Yanığın fizyopatolojisi',
  notes: 'Damar içi sıvı kaybı ilk 8 saatte en fazla, 36–48 saat sürer. Ardından 48–72 saatte diüretik dönem başlar.',
  html: `${T.head('Fizyopatoloji', 'Lokal yanıt ve <em>zaman</em> çizelgesi')}
  <div class="grid" style="grid-template-columns:1fr 1.15fr;flex:1;gap:28px">
    <div style="display:flex;flex-direction:column;gap:16px">
      ${T.bullets(['Lokal inflamatuvar cevap sonucu <b>vazodilatasyon</b> ve vasküler geçirgenlikte artış.', 'Derin yanık nedeniyle hasarlı bölgeden plazma proteinleri hücreler arası boşluğa çıkar.'], 'tight')}
      <div class="a" style="display:flex;flex-wrap:wrap;gap:10px">${['Histamin', 'Bradikinin', 'Serotonin', 'Prostaglandinler'].map(t => `<span class="chip amber">${icon('flask-round')}${t}</span>`).join('')}</div>
      <p class="muted a" style="font-size:19px">Yaralanan dokudan salınan bu mediyatörler kapiller geçirgenliği artırır.</p>
      <div class="grid g2" style="gap:14px">${T.card({ icon: 'trending-down', title: 'Hipovolemik dönem', text: 'Sıvı damar dışına kaçar.', tone: 'coral', cls: 'compact' })}${T.card({ icon: 'trending-up', title: 'Diüretik dönem', text: 'Sıvı damar yatağına geri döner.', tone: 'sky', cls: 'compact' })}</div>
    </div>
    <div class="card a" style="padding:26px 24px">
      <svg viewBox="0 0 640 420" style="width:100%;height:100%" class="fz">
        <path class="fz-curve" d="M30 330 C 80 330, 90 70, 150 70 C 210 70, 250 160, 300 250 C 340 320, 380 330, 420 330" fill="none" stroke="var(--coral)" stroke-width="5"/>
        <path class="fz-curve2" d="M380 330 C 420 330, 450 150, 520 150 C 570 150, 590 220, 620 240" fill="none" stroke="var(--sky)" stroke-width="5" stroke-dasharray="10 8"/>
        <line x1="30" y1="350" x2="620" y2="350" stroke="var(--stroke-2)" stroke-width="2"/>
        ${[[30, '0'], [150, '8. saat'], [330, '36–48 sa'], [470, '48–72 sa']].map(([x, t]) => `<line x1="${x}" y1="345" x2="${x}" y2="358" stroke="var(--ink-3)" stroke-width="2"/><text x="${x}" y="384" text-anchor="middle" font-size="16" font-weight="700">${t}</text>`).join('')}
        <text x="150" y="52" text-anchor="middle" font-size="17" font-weight="800" fill="var(--coral)">Sıvı kaybı en fazla</text>
        <text x="520" y="132" text-anchor="middle" font-size="17" font-weight="800" fill="var(--sky)">Sıvı geri döner</text>
        <text x="30" y="410" font-size="14" fill="var(--ink-3)">Damar dışına sıvı kaçışı (temsili)</text>
      </svg>
    </div>
  </div>`,
  enter(el){
    el.querySelectorAll('.fz path').forEach((p, i) => { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: i ? '10 8' : L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 2, delay: .5 + i * 1.4, ease: 'power2.inOut' }); });
  }
});

Deck.add('yanik', {
  id: 'hipovolemik', title: 'Hipovolemik dönem',
  html: `${T.head('Hipovolemik dönem', 'Sıvı <em>kaçar</em>, şok derinleşir')}
  <div class="grid g2 fill">${T.photo(50, 1, 'Hipovolemik şok basamakları', 'contain')}${T.photo(50, 2, 'Vasküler geçirgenlikten yanık şokuna', 'contain')}</div>`
});

/* Diüretik dönem + elektrolit eğrileri */
Deck.add('yanik', {
  id: 'diuretik', title: 'Diüretik dönem ve elektrolitler',
  notes: 'İlk 48 saat HİPERKALEMİ (hücre içi K dışarı çıkar), idrar açılınca K atılır, ~1 hafta sonra HİPOKALEMİ. İlk günlerde aşırı sıvı kaybıyla HİPERNATREMİ; fazla sıvı verilirse HİPONATREMİ.',
  html: `${T.head('Diüretik dönem (48–72 saat sonra)', 'Sıvı geri döner, <em>elektrolitler</em> dalgalanır')}
  <div class="grid" style="grid-template-columns:.95fr 1.05fr;flex:1;gap:26px">
    <div style="display:flex;flex-direction:column;gap:12px">
      ${T.bullets(['Ödem sıvısı doku boşluklarından damar yatağına döner; kapiller membran bütünlüğü oluşmaya başlar.', 'Damar volümü artar → <b class="t-coral">aşırı sıvı yüklenmesi</b> olabilir.', 'Akut dönemde anemi (eritrosit kaybı) ve malnütrisyon.', 'Doku yıkımı, protein kaybı, strese bağlı katabolizma → <b>negatif nitrojen dengesi</b>.'], 'tight')}
    </div>
    <div class="card a" style="padding:22px">
      <div class="legend" style="margin-bottom:6px"><span><i style="background:var(--amber)"></i>Potasyum (K⁺)</span><span><i style="background:var(--sky)"></i>Sodyum (Na⁺)</span><span><i style="background:var(--violet);height:3px;vertical-align:4px"></i>fazla sıvı verilirse</span></div>
      <svg viewBox="0 0 640 360" style="width:100%;height:100%" class="el">
        <rect x="60" y="20" width="570" height="90" fill="var(--coral-soft)"/><rect x="60" y="110" width="570" height="110" fill="var(--teal-soft)" opacity=".6"/><rect x="60" y="220" width="570" height="90" fill="var(--sky-soft)"/>
        <text x="50" y="70" text-anchor="end" font-size="15" font-weight="700">Yüksek</text><text x="50" y="170" text-anchor="end" font-size="15" font-weight="700">Normal</text><text x="50" y="270" text-anchor="end" font-size="15" font-weight="700">Düşük</text>
        <path class="k" d="M60 160 C 90 40, 200 40, 240 60 C 290 90, 300 165, 360 170 C 420 175, 470 280, 540 285 C 580 288, 610 220, 630 190" fill="none" stroke="var(--amber)" stroke-width="5"/>
        <path class="na" d="M60 165 C 110 70, 180 80, 240 100 C 300 125, 330 160, 400 165 L630 165" fill="none" stroke="var(--sky)" stroke-width="5"/>
        <path class="na2" d="M240 100 C 300 140, 340 240, 420 262 C 480 275, 560 250, 630 240" fill="none" stroke="var(--violet)" stroke-width="4" stroke-dasharray="9 7"/>
        ${[[60, '0'], [240, '48. saat'], [400, '72. saat'], [540, '~1 hafta']].map(([x, t]) => `<text x="${x}" y="340" text-anchor="middle" font-size="15" font-weight="700">${t}</text>`).join('')}
        <g class="tags" font-size="15" font-weight="800"><text x="150" y="38" fill="var(--amber)">HİPERKALEMİ</text><text x="490" y="304" fill="var(--amber)">HİPOKALEMİ</text><text x="120" y="96" fill="var(--sky)">HİPERNATREMİ</text><text x="420" y="292" fill="var(--violet)">HİPONATREMİ</text></g>
      </svg>
    </div>
  </div>`,
  enter(el){
    el.querySelectorAll('.el path').forEach((p, i) => { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.8, delay: .4 + i * .9, ease: 'power2.inOut', onComplete(){ if (i === 2) p.style.strokeDasharray = '9 7'; } }); });
    gsap.from(el.querySelectorAll('.tags text'), { opacity: 0, y: 8, stagger: .5, delay: 1.4 });
  }
});

Deck.add('yanik', {
  id: 'sistemik', title: 'Sistemik yanıt',
  html: `${T.head('Sistemik yanıt', 'Yanık <em>tüm vücudu</em> etkiler')}
  <div class="grid g2 fill">${T.photo(52, 1, 'Uzak doku ve organ hasarları', 'contain')}${T.photo(52, 2, 'Yanık şoku: kardiyak etkiler', 'contain')}</div>`
});

/* Derinlik sınıflaması: deri kesitinde derece bandı */
const DEG = [['1.', 'Yüzeyel / epidermal', 0, 25, '#FCA5A5'], ['2.', 'Kısmi kalınlık', 0, 105, '#FB923C'], ['3.', 'Tam kalınlık', 0, 195, '#7C2D12'], ['4.', 'Fasya, kas, kemik', 0, 330, '#1C1917']];
Deck.add('yanik', {
  id: 'yanik-siniflama', title: 'Yanıkların sınıflandırılması',
  notes: 'Yanıklar genellikle düzgün değildir; çoğu derin ve yüzeysel bileşenleri birlikte içerir.',
  html: `${T.head('Derinliğe göre', 'Yanık <em>dereceleri</em>', 'Yanık yaraları çoğu zaman düzgün değildir; derin ve yüzeysel bileşenleri birlikte içerir.')}
  <div class="grid" style="grid-template-columns:1.2fr .8fr;flex:1;gap:26px">
    <div class="card a" style="padding:16px"><svg viewBox="0 0 760 380" style="width:100%;height:100%" class="degsvg">
      <rect x="0" y="20" width="760" height="25" fill="#EBC0A5"/><rect x="0" y="45" width="760" height="85" fill="#DA8E78"/><rect x="0" y="130" width="760" height="90" fill="#F2D59E"/><rect x="0" y="220" width="760" height="70" fill="#B4534F"/><rect x="0" y="290" width="760" height="90" fill="#F5F0E1"/>
      ${DEG.map(([n, t, , d, c], i) => `<g class="deg" data-i="${i}"><rect x="${30 + i * 180}" y="20" width="150" height="${d}" rx="8" fill="${c}" opacity=".88"/><text x="${105 + i * 180}" y="${Math.min(20 + d + 32, 370)}" text-anchor="middle" font-size="26" font-weight="800" fill="${i > 1 ? '#fff' : '#111'}" ${i > 1 ? '' : ''}>${n} derece</text></g>`).join('')}
    </svg></div>
    <div style="display:flex;flex-direction:column;gap:12px">
      ${DEG.map(([n, t, , , c]) => `<div class="card a compact" style="flex-direction:row;align-items:center;gap:14px"><span style="width:18px;height:18px;border-radius:5px;background:${c};flex:none;border:1px solid var(--stroke-2)"></span><div><h3>${n} derece</h3><p>${t}</p></div></div>`).join('')}
      ${T.photo(54, 1, 'Yanık dereceleri', 'contain', 'height:150px')}
    </div>
  </div>`,
  enter(el){ gsap.from(el.querySelectorAll('.deg rect'), { attr: { height: 0 }, duration: 1.2, stagger: .25, ease: 'power3.out', delay: .4 }); }
});

const degCard = (s, k, t, items, tone, cap) => `<div class="card a ${tone}" style="padding:0;flex-direction:row;gap:0;overflow:hidden">
  ${T.photo(s, k, cap, '', 'width:38%;border-radius:0;border:0;box-shadow:none;cursor:zoom-in')}
  <div style="padding:22px;display:flex;flex-direction:column;gap:10px;flex:1"><h3>${t}</h3>${T.bullets(items, 'tight')}</div></div>`;
Deck.add('yanik', {
  id: 'derece-1-2', title: 'Birinci ve ikinci derece yanıklar',
  html: `${T.head('Dereceler · 1', 'Birinci ve <em>ikinci</em> derece')}
  <div class="grid g3 fill">
    ${degCard(55, 1, '1. derece', ['Kabarık olmayan, ağrılı, kuru, kırmızı.', '<b>Basmakla solar.</b>', 'Yalnız epidermis.', 'Örnek: güneş yanığı.'], '', '1. derece yanık')}
    ${degCard(56, 1, 'Yüzeyel 2. derece', ['24 saatte oluşan <b>büller</b>.', 'Ağrılı, kıpkırmızı, nemli; basmakla solar.', '7–21 günde düzelir; skar nadir.', 'Pigment değişikliği olabilir.'], 'amber', 'Yüzeyel 2. derece')}
    ${degCard(57, 1, 'Derin 2. derece', ['Retiküler dermise uzanır.', 'Sadece <b>dokunmakla</b> ağrı.', 'Kolay soyulan büller; kırmızı-beyaz alacalı.', '<b>Basmakla solmayan</b>, mumsu lezyon.'], 'coral', 'Derin 2. derece')}
  </div>`
});
Deck.add('yanik', {
  id: 'derece-3-4', title: 'Üçüncü ve dördüncü derece yanıklar',
  notes: '3. derece AĞRISIZ (anestetik/hipoestetik) — sinir uçları da yanmıştır. Sınavda soruluyor.',
  html: `${T.head('Dereceler · 2', 'Üçüncü ve <em>dördüncü</em> derece')}
  <div class="grid g2 fill">
    ${degCard(58, 1, '3. derece (tam kalınlık)', ['Derinin tüm katmanlarına uzanır; subkutan dokuyu inceltir.', 'Genellikle <b>anestetik veya hipoestetik</b> (ağrısız).', 'Mumlu beyazdan griye, kömürleşmiş/siyah.', 'Kuru, esnekliğini kaybetmiş; basmakla solmaz; <b>bül yok</b>.', 'Tam iyileşme beklenmez.'], 'coral', '3. derece yanık')}
    ${degCard(59, 1, '4. derece', ['Fasya, kas veya kemik gibi altta yatan dokulara kadar uzanır.', 'Derin ve <b>potansiyel olarak hayatı tehdit eden</b> yaralanmadır.'], 'violet', '4. derece yanık')}
  </div>`
});

/* İlk yardım: 10–20 dk akan su sayacı */
Deck.add('yanik', {
  id: 'ilk-yardim', title: 'Yanıklarda ilk yardım',
  notes: 'Sayaç 20 dakikayı temsilen hızlandırılmış. Buz YOK — damarları büzüp hasarı artırır.',
  html: `${T.head('İlk yardım', 'İlk dakikalar <em>belirler</em>')}
  <div class="grid" style="grid-template-columns:1.25fr .75fr;flex:1;gap:26px">
    <ol class="steps a">
      ${['Isı, elektrik veya kimyasal kaynakla teması <b>derhal kesin</b>.', 'Giysi alev aldıysa koşturmayın: <b>“Dur, Yat, Yuvarlan”</b> veya kalın battaniyeyle söndürün.', 'Bölgeyi <b>10–20 dakika</b> akan ılık/serin şebeke suyu (15–20 °C) altında tutun.', '<b class="t-coral">Buz veya çok soğuk su kullanmayın</b> — damarları büzüp doku hasarını artırır.', 'Ödem hızla gelişebilir: yüzük, saat, bilezik ve sıkı giysileri hemen çıkarın.', 'Deriye yapışmış giysiyi zorlamayın; <b>etrafından kesin</b>.', 'Temiz, nemli/kuru steril gazlı bez ya da streç filmle <b>gevşekçe</b> örtün.']
        .map((s, i) => `<li class="a" style="${i === 3 ? 'border-color:color-mix(in oklab,var(--coral) 50%,transparent);background:var(--coral-soft)' : ''}"><span class="mono">${i + 1}</span><p>${s}</p></li>`).join('')}
    </ol>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card a" style="align-items:center;text-align:center;gap:6px">
        <svg viewBox="0 0 220 220" style="width:210px;height:210px"><circle cx="110" cy="110" r="94" fill="none" stroke="var(--surface-2)" stroke-width="16"/><circle class="water" cx="110" cy="110" r="94" fill="none" stroke="var(--sky)" stroke-width="16" stroke-linecap="round" stroke-dasharray="590.6" stroke-dashoffset="590.6" transform="rotate(-90 110 110)"/><text x="110" y="112" text-anchor="middle" font-size="46" font-weight="800" fill="var(--ink)" class="wmin mono">0</text><text x="110" y="142" text-anchor="middle" font-size="16" fill="var(--ink-3)">dakika</text></svg>
        <b style="font-size:22px">15–20 °C akan su</b><p class="muted small">10–20 dakika</p>
      </div>
      <div class="grid g2" style="gap:12px;flex:1">${T.photo(61, 1, 'Soğutma ve örtme')}${T.photo(61, 2, 'Dur, yat, yuvarlan', 'contain')}</div>
    </div>
  </div>`,
  enter(el){
    const o = { m: 0 }, c = el.querySelector('.water'), t = el.querySelector('.wmin');
    const tw = gsap.to(o, { m: 20, duration: 8, ease: 'none', repeat: -1, repeatDelay: 1.5, delay: .8, onUpdate(){ t.textContent = Math.floor(o.m); c.style.strokeDashoffset = 590.6 * (1 - o.m / 20); c.style.stroke = o.m >= 10 ? 'var(--teal)' : 'var(--sky)'; } });
    return () => tw.kill();
  }
});

Deck.add('yanik', {
  id: 'akut-donem', title: 'Akut dönemde hemşirelik girişimleri',
  html: `<div class="split wide-l">
    <div style="display:flex;flex-direction:column;gap:20px">
      ${T.head('Akut dönem', 'Hemşirelik <em>girişimleri</em>')}
      <div class="grid g2" style="gap:14px">
        ${[['brain', 'Korku ve anksiyeteyi azaltma'], ['thermometer-snowflake', 'Hipotermiyi önleme'], ['bandage', 'Yara bakımı'], ['shield-plus', 'Enfeksiyonu önleme'], ['utensils', 'Beslenme gereksinimini sağlama'], ['droplets', 'Sıvı desteği'], ['pill', 'Ağrıyı giderme'], ['users', 'Skarla baş etme, sosyal izolasyonu azaltma']]
          .map(([ic, t]) => `<div class="mini a">${icon(ic)}<span>${t}</span></div>`).join('')}
      </div>
    </div>
    ${T.photo(63, 1, 'Hemşirelik bakımı', '', 'height:620px')}
  </div>`
});

Deck.add('yanik', {
  id: 'yanik-tedavi', title: 'Yanıkta tedavi yöntemleri',
  html: `${T.head('Yanıkta tedavi', 'Açık, yarı açık, <em>kapalı</em>')}
  <div class="grid g3 fill">
    <div class="card a"><div class="ic">${icon('sun')}</div><h3>Açık yöntem</h3>${T.bullets(['Yüz, boyun, perine ve geniş göğüs yanıklarında.', 'Bölge temizlenir, hava ile ilişkisi sağlanır.', '<b>İzolasyon tekniği şarttır.</b>'], 'tight')}</div>
    <div class="card a amber"><div class="ic">${icon('layers-2')}</div><h3>Yarı açık yöntem</h3>${T.bullets(['Aseptik temizlik sonrası lokal antimikrobiyal ajan, ince gaz tabakasıyla yarayla temasta tutulur.', 'Debridmanı hızlandırır, granülasyonu artırır, greft başarısını olumlu etkiler.'], 'amber tight')}</div>
    <div class="card a coral"><div class="ic">${icon('package')}</div><h3>Kapalı yöntem</h3>${T.bullets(['Günde en az bir kez yıkanır, pansuman değiştirilir.', 'Lokal pomat + gazlı bez; ekiple karar verilerek elastik bandaj.', 'Derin, büyük yaralarda; ağrılıdır.', 'Enfeksiyona karşı dikkat gerektirir.'], 'coral tight')}</div>
  </div>`
});

Deck.add('yanik', {
  id: 'greftleme', title: 'Greftleme',
  html: `${T.head('Greftleme', 'Yara grefte <em>hazır</em> mı?')}
  <div class="grid" style="grid-template-columns:1fr 1fr;flex:1;gap:26px">
    <div style="display:flex;flex-direction:column;gap:16px">
      ${T.callout('<b>Koyu kırmızı, sağlam, düz ve çok az akıntılı granülasyon dokusu</b> yaranın grefte hazır olduğunu gösterir.', 'teal', 'circle-check')}
      ${T.bullets(['Greft doku transferidir.', 'Yanıkta greft <b>ince</b> olmalıdır: hem granülasyon dokusunda tutması hem de alınan yerin erken iyileşmesi için.', 'Biyolojik örtüler su ve protein kaybını önler, epitelizasyonu hızlandırır.'], 'tight')}
    </div>
    <div class="grid g2" style="gap:16px">
      ${T.card({ icon: 'user-round', title: 'Homogreft', text: 'Hastadan ya da diğer insanlardan alınan deri grefti.' })}
      ${T.card({ icon: 'paw-print', title: 'Heterogreft', text: 'Başka bir canlıdan alınır (örn. domuz derisi); kolay uyum sağlar, üç günde bir değiştirilir.', tone: 'amber' })}
    </div>
  </div>`
});

Deck.add('yanik', {
  id: 'cerrahi-girisimler', title: 'Fasyotomi, greftleme, debridman, eskarotomi',
  html: `${T.head('Cerrahi girişimler', 'Dört <em>kritik</em> kavram')}
  <div class="grid g4 fill">
    ${[[68, 2, 'Fasyotomi', 'Fasyanın kesilmesidir.'], [68, 1, 'Greftleme', 'Eskar eksizyonu sonrası greft ile kapatma.'], [69, 2, 'Debridman', 'Nekrotik dokunun sağlıklı dokuya ulaşana kadar çıkarılmasıdır.'], [69, 1, 'Eskarotomi', 'Eskarın kesilmesidir.']]
      .map(([s, k, t, d]) => `<div class="card a" style="padding:0;gap:0">${T.photo(s, k, t, '', 'height:330px;border-radius:0;border:0;box-shadow:none')}<div style="padding:18px 20px"><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
  </div>`
});
})();
