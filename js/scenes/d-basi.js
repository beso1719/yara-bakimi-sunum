/* Bölüm 04 Bası yarası (pptx slayt 32–40) */
(function(){
const { T, icon } = Y;
Deck.chapter('basi', { title: 'Bası Yarası', sub: 'Uzun süreli basınç ve sürtünme: nasıl oluşur, nasıl önlenir, evreleri ve bakımı.', a: '#A78BFA', b: '#FF6B5E' });

Deck.add('basi', {
  id: 'basi-tanim', title: 'Bası yarası nedir?',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:22px">
      ${T.head('Tanım', 'Bası <em>yarası</em>')}
      <p class="a" style="font-size:28px;line-height:1.45">Cilt ve cilt altı dokuların uzun süreli <b class="t-violet">basınca</b> ve/veya <b class="t-coral">sürtünmeye</b> maruz kalması sonucu kan dolaşımının bozulmasıyla ortaya çıkan yerel doku hasarı veya açık yaradır.</p>
      <p class="s-lead a" style="font-size:22px">Genellikle vücuttaki basınç noktalarında, kemik çıkıntılarının üstündeki dokularda gelişir:</p>
      <div class="a" style="display:flex;flex-wrap:wrap;gap:10px">${['Sakrum', 'Topuklar', 'Kalça kemikleri', 'Dirsekler', 'Kulaklar', 'Omuz', 'Başın arkası'].map(t => `<span class="chip violet">${icon('target')}${t}</span>`).join('')}</div>
    </div>
    ${T.photo(32, 1, 'Sırtüstü yatışta basınç noktaları', 'contain', 'height:380px')}
  </div>`
});

Deck.add('basi', {
  id: 'basi-olusum', title: 'Bası yarası nasıl oluşur?',
  notes: 'Dış basınç kılcal damar basıncını aşınca dolaşım durur → iskemi → nekroz. Kızarıklıkla başlar, önlem alınmazsa derin açık yaraya döner.',
  html: `${T.head('Patofizyoloji', 'Basınçtan <em>nekroza</em> üç adım')}
  <div class="chain">
    ${[['circle-arrow-down', 'Dolaşımın engellenmesi', 'Bölge uzun süre sabit kalınca dış basınç kılcal damarlardaki kan basıncından yüksek olur.', 'var(--violet)'],
       ['wind', 'Doku oksijensizliği (iskemi)', 'Kan akımı kesilince hücreler yeterli oksijen ve besin alamaz.', 'var(--amber)'],
       ['skull', 'Doku ölümü (nekroz)', 'Hücreler canlılığını yitirir; önce kızarıklık, önlem alınmazsa derin açık yara.', 'var(--coral)']]
      .map(([ic, t, d, c], i) => `<div class="card a chain-node" style="--c:${c}"><div class="ic" style="background:color-mix(in oklab,${c} 18%,transparent);color:${c}">${icon(ic)}</div><span class="mono" style="color:${c}">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>${i < 2 ? `<div class="chain-arrow a">${icon('arrow-right')}</div>` : ''}`).join('')}
  </div>
  <div class="row a" style="height:250px;gap:22px;align-items:stretch">
    <div class="card" style="flex:1;flex-direction:row;align-items:center;gap:26px">
      <svg viewBox="0 0 220 200" style="width:220px;height:200px;flex:none"><rect x="10" y="20" width="200" height="160" rx="24" fill="#E7B49A"/><ellipse class="tissue" cx="110" cy="100" rx="60" ry="46" fill="#E8A0A0"/><path class="press" d="M110 -30 V40" stroke="var(--violet)" stroke-width="10" stroke-linecap="round" marker-end="url(#pm)"/><defs><marker id="pm" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6z" fill="var(--violet)"/></marker></defs></svg>
      <div><b class="tstate" style="font:700 30px var(--f-display)">Sağlıklı doku</b><p class="muted">Basınç sürdükçe doku rengi değişir.</p></div>
    </div>
    ${T.photo(33, 1, 'Sakral bölgede bası yarası', '', 'flex:0 0 340px')}
  </div>`,
  enter(el){
    const t = el.querySelector('.tissue'), s = el.querySelector('.tstate');
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: .8 });
    tl.call(() => s.textContent = 'Sağlıklı doku').from(el.querySelector('.press'), { attr: { d: 'M110 -30 V-20' }, duration: .8 })
      .call(() => s.textContent = 'Dolaşım engellendi').to(t, { attr: { fill: '#C9B7C9' }, duration: 1.2 }).to(el.querySelectorAll('.chain-node')[0], { boxShadow: '0 0 0 2px var(--violet)', duration: .3 }, '<')
      .call(() => s.textContent = 'İskemi').to(t, { attr: { fill: '#9C8AA0' }, duration: 1.2 }).to(el.querySelectorAll('.chain-node')[1], { boxShadow: '0 0 0 2px var(--amber)', duration: .3 }, '<')
      .call(() => s.textContent = 'Nekroz').to(t, { attr: { fill: '#3B0D0D', rx: 50, ry: 40 }, duration: 1.4 }).to(el.querySelectorAll('.chain-node')[2], { boxShadow: '0 0 0 2px var(--coral)', duration: .3 }, '<')
      .to({}, { duration: 1.6 }).set(t, { attr: { fill: '#E8A0A0', rx: 60, ry: 46 } }).set(el.querySelectorAll('.chain-node'), { boxShadow: 'none' });
    return () => tl.kill();
  }
});

const clock = (h, label, c) => `<div class="clock a"><svg viewBox="0 0 160 160" style="width:150px;height:150px"><circle cx="80" cy="80" r="72" fill="var(--surface)" stroke="${c}" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<line x1="${80 + 60 * Math.sin(a)}" y1="${80 - 60 * Math.cos(a)}" x2="${80 + 66 * Math.sin(a)}" y2="${80 - 66 * Math.cos(a)}" stroke="var(--ink-3)" stroke-width="3"/>`; }).join('')}<line class="hand-h" x1="80" y1="80" x2="80" y2="44" stroke="var(--ink)" stroke-width="6" stroke-linecap="round" style="transform-origin:80px 80px"/><line class="hand-m" x1="80" y1="80" x2="80" y2="24" stroke="${c}" stroke-width="4" stroke-linecap="round" style="transform-origin:80px 80px"/><circle cx="80" cy="80" r="6" fill="${c}"/></svg><div><b style="font:800 54px/1 var(--f-display);color:${c}">${h}</b><p class="muted">${label}</p></div></div>`;
Deck.add('basi', {
  id: 'basi-onleme-1', title: 'Bası yarasını önleme: pozisyon ve nem',
  notes: 'Yatağa bağımlı → en az 2 saatte bir; tekerlekli sandalye → saat başı. Sınavda “1 saat” çeldiricisi var.',
  html: `${T.head('Önleme · 1', 'Pozisyon değiştir, <em>nemi</em> kontrol et')}
  <div class="split" style="grid-template-columns:1fr 1fr;align-items:start">
    <div class="card a" style="gap:18px">
      <div style="display:flex;gap:12px;align-items:center"><div class="ic">${icon('rotate-cw')}</div><h3>Pozisyon değiştirme</h3></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">${clock('2 sa', 'Yatağa bağımlı hasta — <b>en az</b> 2 saatte bir', 'var(--violet)')}${clock('1 sa', 'Tekerlekli sandalyeye bağımlı — saat başı', 'var(--sky)')}</div>
      ${T.bullets(['Diz ve ayak bileklerinin sürtünmesini önlemek için bacak araları yastık/köpük kenarlıklarla desteklenir.', 'Topukların yatağa teması için baldırın arka alt kısmına (diz altından ayak bileğine) yastık konur.'], 'tight')}
    </div>
    <div class="card a sky" style="gap:16px">
      <div style="display:flex;gap:12px;align-items:center"><div class="ic">${icon('droplets')}</div><h3>Nemi kontrol etme</h3></div>
      <p>Neme yol açan nedenler belirlenir:</p>
      <div class="grid g2" style="gap:12px">${[['thermometer-sun', 'Terleme'], ['droplet', 'Yara drenajı'], ['bath', 'Banyo sonrası ıslak kalma'], ['circle-alert', 'Fekal / üriner inkontinans']].map(([ic, t]) => `<div class="mini">${icon(ic)}<span>${t}</span></div>`).join('')}</div>
    </div>
  </div>`,
  enter(el){
    const tw = [];
    el.querySelectorAll('.clock').forEach((c, i) => {
      tw.push(gsap.to(c.querySelector('.hand-m'), { rotate: 360, duration: i ? 1.5 : 1.5, repeat: -1, ease: 'none' }));
      tw.push(gsap.to(c.querySelector('.hand-h'), { rotate: 360, duration: i ? 18 : 36, repeat: -1, ease: 'none' }));
    });
    return () => tw.forEach(t => t.kill());
  }
});

Deck.add('basi', {
  id: 'basi-onleme-2', title: 'Bası yarasını önleme: beslenme ve friksiyon',
  html: `${T.head('Önleme · 2', 'Beslenme ve <em>sürtünme</em>')}
  <div class="grid" style="grid-template-columns:.8fr 1.2fr;flex:1">
    ${T.card({ icon: 'beef', title: 'Beslenmeyi düzenleme', text: 'Risk altındaki hastaların <b style="color:var(--ink)">protein ve kalori</b> alım miktarları artırılmalıdır.', tone: 'amber' })}
    <div class="card a">
      <div style="display:flex;gap:12px;align-items:center"><div class="ic">${icon('move-vertical')}</div><h3>Friksiyon ve yırtılmayı kontrol etme</h3></div>
      <div class="dodont"><div class="do">${icon('circle-check')}<span>Hasta yatakta hareket ederken (oturma, yana dönme) <b>trapez</b> kullanır.</span></div>
      <div class="do">${icon('circle-check')}<span>Ayak ucuna kaymış hastayı başucuna çekerken mutlaka <b>çarşaf</b> kullanılır.</span></div>
      <div class="dont">${icon('circle-x')}<span>Hasta iki kişi tarafından <b>koltuk altlarından</b> tutularak yukarı çekilmemeli.</span></div></div>
    </div>
  </div>`
});

/* Evreler: deri kesitinde krater derinliği evreye göre değişir */
const crater = (x1, x2, D) => `M${x1} 60 C${x1 + 20} ${60 + (D - 60) * .9} ${270} ${D} 350 ${D} C${430} ${D} ${x2 - 20} ${60 + (D - 60) * .9} ${x2} 60 Z`;
const STAGES = [
  { n: 1, d: crater(330, 370, 61), red: 1, title: '1. Evre', text: 'Cilt bütünlüğü bozulmamıştır; parmakla basmakla <b>solmayan kalıcı kızarıklık</b> vardır. Bölge sıcak, ağrılı veya sert olabilir.', layer: 'Epidermis sağlam' },
  { n: 2, d: crater(260, 440, 125), red: .55, title: '2. Evre', text: 'Epidermis ve/veya dermisin üst tabakasını etkileyen <b>kısmi derinlikte doku kaybı</b>. Sıyrılma, su toplanması veya derin olmayan çukur.', layer: 'Dermise kadar' },
  { n: 3, d: crater(220, 480, 250), red: .45, title: '3. Evre', text: 'Epidermisten üst fasyaya kadar <b>tam derinlikte doku kaybı</b> ya da nekroz. Kemik, tendon, ekleme uzanmaz; derin çukur.', layer: 'Fasyaya kadar' },
  { n: 4, d: crater(200, 500, 385), red: .4, title: '4. Evre', text: 'Tam derinlikte kayıp; doku kaybı ve nekroz <b>fasyanın altına, kemik, tendon ve eklem kapsülüne</b> kadar ilerlemiştir.', layer: 'Kas ve kemiğe kadar' }
];
Deck.add('basi', {
  id: 'basi-evreler', title: 'Bası yarası evreleri',
  notes: 'İleri tuşu evreleri sırayla açar (1→4). Kesitte krater derinleşir; sağda gerçek klinik fotoğraf.',
  html: `<div style="display:flex;justify-content:space-between;align-items:end">${T.head('Evreleme', 'Dört evre, <em>dört derinlik</em>')}
    <div class="seg-tabs a stage-tabs">${STAGES.map(s => `<button data-s="${s.n}">${s.title}</button>`).join('')}</div></div>
  ${[1, 2, 3].map(n => `<i data-step="${n}" hidden></i>`).join('')}
  <div class="grid fill" style="grid-template-columns:1.15fr .85fr;gap:26px">
    <div class="card a" style="padding:18px 18px 10px">
      <svg viewBox="0 0 700 430" style="width:100%;height:100%">
        <defs><linearGradient id="crg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9B1C1C"/><stop offset="1" stop-color="#3B0A0A"/></linearGradient>
        <radialGradient id="redg"><stop offset="0" stop-color="#EF4444" stop-opacity=".85"/><stop offset="1" stop-color="#EF4444" stop-opacity="0"/></radialGradient></defs>
        <rect x="0" y="60" width="700" height="25" fill="#EBC0A5"/><rect x="0" y="85" width="700" height="80" fill="#DA8E78"/><rect x="0" y="165" width="700" height="90" fill="#F2D59E"/>
        <rect x="0" y="255" width="700" height="10" fill="#E5E7EB"/><rect x="0" y="265" width="700" height="80" fill="#B4534F"/><rect x="0" y="345" width="700" height="85" fill="#F5F0E1"/>
        ${[['Epidermis', 73], ['Dermis', 125], ['Subkutan yağ', 210], ['Fasya', 262], ['Kas', 305], ['Kemik', 390]].map(([t, y]) => `<text x="690" y="${y + 6}" text-anchor="end" font-size="17" font-weight="700" fill="#1F2937" opacity=".75">${t}</text>`).join('')}
        <ellipse class="redness" cx="350" cy="64" rx="150" ry="22" fill="url(#redg)"/>
        <path class="crater" d="${STAGES[0].d}" fill="url(#crg)"/>
        <line class="depth" x1="350" y1="60" x2="350" y2="61" stroke="#fff" stroke-width="2" stroke-dasharray="5 5"/>
        <text class="depth-l" x="365" y="40" font-size="20" font-weight="800" fill="var(--ink)">Epidermis sağlam</text>
      </svg>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;min-height:0">
      <div class="photo stage-photo a" style="flex:1" data-cap=""><img src="${Y.img(36)}" alt="Bası yarası klinik fotoğraf"><figcaption></figcaption></div>
      <div class="card stage-card a" style="padding:20px 22px"><h3 class="st-t"></h3><p class="st-d" style="font-size:19px"></p></div>
    </div>
  </div>`,
  enter(el, ctx){
    const set = n => {
      const s = STAGES[n - 1];
      el.querySelectorAll('.stage-tabs button').forEach(b => b.classList.toggle('on', +b.dataset.s === n));
      gsap.to(el.querySelector('.crater'), { attr: { d: s.d }, duration: 1.1, ease: 'power3.inOut' });
      gsap.to(el.querySelector('.redness'), { opacity: s.red, duration: .6 });
      const D = +s.d.match(/350 ([\d.]+) C/)[1];
      gsap.to(el.querySelector('.depth'), { attr: { y2: D }, duration: 1.1, ease: 'power3.inOut' });
      el.querySelector('.depth-l').textContent = s.layer;
      const ph = el.querySelector('.stage-photo'), im = ph.querySelector('img');
      gsap.to(ph, { opacity: 0, duration: .2, onComplete(){ im.src = Y.img(35 + n); ph.dataset.cap = s.title + ' bası yarası'; ph.querySelector('figcaption').textContent = s.title; gsap.to(ph, { opacity: 1, duration: .4 }); } });
      el.querySelector('.st-t').textContent = s.title; el.querySelector('.st-d').innerHTML = s.text;
      gsap.from(el.querySelector('.stage-card'), { y: 12, opacity: .3, duration: .4 });
    };
    el._set = set;
    el.querySelectorAll('.stage-tabs button').forEach(b => b.addEventListener('click', () => set(+b.dataset.s)));
    set(ctx.step + 1);
  },
  onStep(n, el){ el._set(n + 1); }
});

Deck.add('basi', {
  id: 'basi-bakim', title: 'Bası yarasında bakım ve tedavi',
  html: `${T.head('Bakım / tedavi', 'Evreye göre <em>yaklaşım</em>')}
  <div class="grid g4 fill">
    ${T.card({ icon: 'shield', title: '1. Evre', text: 'Genellikle kendiliğinden iyileşir. Önlemler alınmalı: pozisyon, hijyen, cilt hasarının önlenmesi.', num: '1' })}
    ${T.card({ icon: 'search', title: '2. Evre', text: 'İlk adım yaranın dikkatlice değerlendirilmesidir — derin dokularda 3. evre yara olma ihtimali vardır. Nedenler ortadan kaldırılır, enfeksiyondan korunur.', tone: 'amber', num: '2' })}
    ${T.card({ icon: 'scissors', title: '3. Evre', text: 'Nekrotik doku uzaklaştırılır, enfeksiyon tedavi edilir (pansuman, antibiyotik). Protein ve enerjiden zengin beslenme. Genellikle cerrahi gerekir.', tone: 'coral', num: '3' })}
    ${T.card({ icon: 'bone', title: '4. Evre', text: 'Tedavi 3. evre gibidir; ancak kemik etkilendiği için debridman genellikle <b style="color:var(--ink)">radikaldir</b>.', tone: 'violet', num: '4' })}
  </div>`
});
})();
