/* Bölüm 03 Pansuman ve yara tedavisi (pptx slayt 21–31) */
(function(){
const { T, icon } = Y;
Deck.chapter('pansuman', { title: 'Pansuman ve Yara Tedavisi', sub: 'Doğru örtü, doğru yöntem: pansuman türleri, VAC, deri grefti ve flep.', a: '#2DD4BF', b: '#60A5FA' });

const AIMS = [['shield-check', 'Korumak', 'Yarayı dış etkenlerden ve enfeksiyondan korumak.'], ['droplets', 'Emmek', 'Yaradaki akıntıyı emmek.'], ['hand-heart', 'Desteklemek', 'Yara ve çevresindeki dokuyu desteklemek.'],
  ['droplet', 'Nemli ortam', 'Nemli ortam sağlamak ve ödemi önlemek.'], ['thermometer', 'Ağrı & ısı', 'Ağrıyı azaltmak ve ısı kaybını önlemek.'], ['octagon-x', 'Kanama', 'Kanamayı durdurmak.']];
Deck.add('pansuman', {
  id: 'pansuman-amac', title: 'Pansumanın amacı',
  html: `<div class="split r">
    <div class="aim-ring a" style="position:relative;width:560px;height:560px;justify-self:center">
      <svg viewBox="0 0 560 560" style="position:absolute;inset:0"><circle class="ring-p" cx="280" cy="280" r="200" fill="none" stroke="var(--teal)" stroke-width="2" stroke-dasharray="1257" stroke-dashoffset="1257" opacity=".6"/></svg>
      <div class="aim-core">${icon('bandage')}<b>Pansuman</b></div>
      ${AIMS.map((a, i) => { const ang = -Math.PI / 2 + i / AIMS.length * Math.PI * 2; return `<div class="aim" style="left:${280 + 200 * Math.cos(ang)}px;top:${280 + 200 * Math.sin(ang)}px">${icon(a[0])}<span>${a[1]}</span></div>`; }).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:22px">
      ${T.head('Pansuman ve çeşitleri', 'Pansuman <em>neden</em> yapılır?')}
      ${T.bullets(AIMS.map(a => a[2]), 'tight')}
    </div>
  </div>`,
  enter(el){
    gsap.to(el.querySelector('.ring-p'), { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', delay: .3 });
    gsap.from(el.querySelectorAll('.aim'), { scale: 0, opacity: 0, duration: .6, stagger: .12, ease: 'back.out(2)', delay: .5 });
  }
});

/* Basınçlı pansuman: sargı distalden proksimale ilerler */
Deck.add('pansuman', {
  id: 'pansuman-turleri', title: 'Koruyucu, emici ve basınçlı pansuman',
  notes: 'Basınçlı pansumanda kritik nokta: ekstremitede DİSTALDEN PROKSİMALE ve dolaşımı engellemeyecek basınç. Sınavda soru var.',
  html: `${T.head('Amaca göre pansuman', 'Koruyucu, emici, <em>basınçlı</em>')}
  <div class="grid" style="grid-template-columns:1fr 1fr 1.25fr;flex:1">
    ${T.card({ icon: 'umbrella', title: 'Koruyucu pansuman', text: 'Yara yüzeyi ya da üzerine konan nemlendirici materyal su geçirmez malzemeyle kaplanır. Kanama ve akıntı olmadığı için emici özellik aranmaz.' })}
    ${T.card({ icon: 'droplets', title: 'Emici pansuman', text: 'Akıntının emilmesi için yara yüzeyi emici, kuru malzemeyle kapatılır. Yumuşak sargılar da emici özellik sağlar.', tone: 'sky' })}
    <div class="card a coral">
      <div style="display:flex;gap:14px;align-items:center"><div class="ic">${icon('arrow-up-from-line')}</div><h3>Basınçlı pansuman</h3></div>
      <p>Kanamayı durdurmak, ödemi azaltmak, ölü boşluğu kapatmak için. Basınç her yere <b>eşit</b>; dolaşımı engellemeyecek derecede.</p>
      <svg class="limb" viewBox="0 0 420 200" style="width:100%;height:190px">
        <path d="M20 70 Q60 52 120 60 L380 70 Q405 100 380 130 L120 140 Q60 148 20 130 Z" fill="#E7B49A"/>
        <g class="wraps">${Array.from({ length: 9 }, (_, i) => `<path d="M${70 + i * 34} 52 L${96 + i * 34} 146" stroke="#F8FAFC" stroke-width="20" stroke-linecap="round" opacity="0"/>`).join('')}</g>
        <path class="arr" d="M70 180 H370" stroke="var(--coral)" stroke-width="4" marker-end="url(#ah)"/>
        <defs><marker id="ah" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--coral)"/></marker></defs>
        <text x="40" y="30" font-size="16" font-weight="700" fill="var(--ink)">Distal</text><text x="330" y="30" font-size="16" font-weight="700" fill="var(--ink)">Proksimal</text>
      </svg>
    </div>
  </div>
  <div class="row a" style="height:170px;gap:20px">${T.photo(23, 1, 'Sargı uygulaması', '', 'flex:0 0 280px')}${T.callout('Ekstremitede basınçlı pansuman <b>distalden başlayıp yaranın proksimaline doğru</b> yapılır.', 'coral', 'move-right')}</div>`,
  enter(el){
    const w = el.querySelectorAll('.wraps path');
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: .6 });
    tl.from(el.querySelector('.arr'), { attr: { d: 'M70 180 H72' }, duration: 1.2, ease: 'power2.out' }).to(w, { opacity: .95, duration: .25, stagger: .22 }, '<').to({}, { duration: 1.4 }).to(w, { opacity: 0, duration: .4 });
    return () => tl.kill();
  }
});

Deck.add('pansuman', {
  id: 'yapilis', title: 'Yapılış özelliğine göre pansuman',
  html: `${T.head('Yapılış özelliğine göre', 'Kuru, ıslak, Garrel, <em>hazır steril</em>')}
  <div class="grid g4 fill">
    ${T.card({ icon: 'sun', title: 'Kuru pansuman', text: 'Epidermisin sağlam olduğu ve malzemenin yaraya yapışma ihtimalinin olmadığı yaralarda.', num: '1' })}
    ${T.card({ icon: 'waves', title: 'Islak pansuman', text: 'Yaranın nemli kalması isteniyorsa ya da sıvı ilaç/antiseptik uygulanacaksa. <b style="color:var(--ink)">En az iki saatte bir</b> değiştirilir.', tone: 'sky', num: '2', cls: 'hl' })}
    ${T.card({ icon: 'shower-head', title: 'Garrel pansuman', text: 'Yaralı bölgeyi devamlı ya da belirli aralıklarla antiseptik veya ilaçla yıkamak için.', tone: 'violet', num: '3' })}
    ${T.card({ icon: 'package-plus', title: 'Hazır steril pansuman', text: 'Acil durumlarda (trafik kazası, yangın, patlama) hemen uygulamak için paket içinde hazır bulunan malzeme.', tone: 'amber', num: '4' })}
  </div>`
});

Deck.add('pansuman', {
  id: 'yara-tedavisi', title: 'Yara tedavisi', cls: 'center',
  html: `<div class="kicker a">Yara tedavisi</div>
  <p class="a" style="font:500 54px/1.25 var(--f-display);letter-spacing:-.02em;max-width:1250px">Önemli olan kapatma <span class="serif t-coral" style="font-size:1.1em">yöntemi</span> değil; <br>gerginliğin en az olacağı şekilde kenarları yaklaştırmak ve <span class="serif t-teal" style="font-size:1.1em">minimal skarla primer iyileşme</span> sağlamaktır.</p>
  <div class="row a" style="justify-content:center;margin-top:20px"><span class="chip teal">${icon('minimize-2')}Az gerginlik</span><span class="chip sky">${icon('git-merge')}Kenar yaklaştırma</span><span class="chip violet">${icon('sparkles')}Minimal skar</span></div>`
});

/* VAC: köpük içindeki yaraya negatif basınç, eksüda tüp boyunca çekilir */
Deck.add('pansuman', {
  id: 'vac', title: 'Negatif basınç tedavisi (VAC)',
  notes: 'VAC: invaziv olmayan, kontrollü ve lokalize negatif basınç. Oklar içe doğru — yara kenarlarını yaklaştırır, eksüdayı uzaklaştırır.',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:18px">
      ${T.head('Vacuum-Assisted Closure', 'Negatif basınç <em>tedavisi</em>')}
      <p class="s-lead a" style="font-size:22px">Akut ve kronik yaralarda iyileşmeyi hızlandırmak için yara üzerine <b class="t-teal">kontrollü ve lokalize negatif basınç</b> uygulanması esasına dayanan, <b>invaziv olmayan</b> bir yöntemdir.</p>
      <div class="a" style="display:flex;flex-wrap:wrap;gap:10px">${['Ekstremite açık yaraları', 'Açık sternal, spinal, fasiyal yaralar', 'Diyabetik yaralar', 'Yanık yaraları', 'Abdominal duvar yaraları', 'Bası yaraları'].map(t => `<span class="chip teal">${t}</span>`).join('')}</div>
      <div class="row a" style="height:230px;gap:16px">${T.photo(27, 1, 'VAC cihazı', 'contain', 'flex:1')}${T.photo(27, 2, 'Uygulama basamakları', '', 'flex:1.4')}</div>
    </div>
    <div class="card a" style="padding:16px;height:640px">
      <svg viewBox="0 0 560 600" style="width:100%;height:100%">
        <rect x="0" y="330" width="560" height="270" fill="#D88A73"/><rect x="0" y="310" width="560" height="26" fill="#E9B79B"/>
        <path d="M150 320 Q150 470 280 480 Q410 470 410 320 Z" fill="#7F1D1D"/>
        <path class="foam" d="M165 322 Q168 455 280 462 Q392 455 395 322 Z" fill="#111827"/>
        <g opacity=".35">${Array.from({ length: 40 }, (_, i) => `<circle cx="${180 + (i * 37) % 200}" cy="${335 + (i * 23) % 115}" r="5" fill="#374151"/>`).join('')}</g>
        <rect x="120" y="296" width="320" height="18" rx="6" fill="rgba(186,230,253,.55)"/>
        <text x="455" y="309" font-size="15" fill="var(--ink-2)">Örtü (drape)</text>
        <path d="M280 296 V140 Q280 100 330 100 H470" fill="none" stroke="#94A3B8" stroke-width="16" stroke-linecap="round"/>
        <rect x="440" y="40" width="110" height="130" rx="18" fill="#E2E8F0"/><rect x="458" y="60" width="74" height="40" rx="6" fill="#0EA5E9"/><text x="495" y="87" text-anchor="middle" font-size="18" font-weight="800" fill="#fff" class="kpa">-125</text><text x="495" y="140" text-anchor="middle" font-size="14" font-weight="700" fill="#334155">mmHg</text>
        <g class="drops">${Array.from({ length: 6 }, (_, i) => `<circle cx="280" cy="${290 - i * 30}" r="5" fill="#FBBF24"/>`).join('')}</g>
        <g class="arrows">${[[150, 380, 1], [410, 380, -1], [200, 470, 1], [360, 470, -1]].map(([x, y, d]) => `<path d="M${x - 40 * d} ${y} L${x} ${y}" stroke="var(--teal)" stroke-width="6" stroke-linecap="round" marker-end="url(#ahv)"/>`).join('')}<path d="M280 540 L280 490" stroke="var(--teal)" stroke-width="6" stroke-linecap="round" marker-end="url(#ahv)"/></g>
        <defs><marker id="ahv" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--teal)"/></marker></defs>
        <text x="20" y="580" font-size="16" fill="#fff" font-weight="700">Köpük + negatif basınç → kenarlar yaklaşır, eksüda uzaklaşır</text>
      </svg>
    </div>
  </div>`,
  enter(el){
    const a = gsap.to(el.querySelectorAll('.arrows path'), { opacity: .25, duration: .7, yoyo: true, repeat: -1, stagger: .12, ease: 'sine.inOut' });
    const f = gsap.to(el.querySelector('.foam'), { scale: .94, transformOrigin: '280px 330px', duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    const d = gsap.to(el.querySelectorAll('.drops circle'), { attr: { cy: '-=170' }, opacity: 0, duration: 2.2, stagger: { each: .35, repeat: -1 }, ease: 'none' });
    return () => { a.kill(); f.kill(); d.kill(); };
  }
});

Deck.add('pansuman', {
  id: 'greft', title: 'Deri grefti',
  html: `${T.head('Deri grefti', 'Dokuyu <em>yeni bir yatağa</em> taşımak')}
  <div class="split" style="grid-template-columns:1fr 1fr">
    <div style="display:flex;flex-direction:column;gap:18px">
      ${T.bullets(['Greft, herhangi bir dokunun <b>onu besleyen kan desteğinden ayrılarak</b> yeni bir besleyici bölgeye transferidir.', 'Doğrudan kapatılamayan yaraların kapatılmasında değerli bir seçenektir.'])}
      <div class="card a"><h3 style="font-size:22px">Greft sonrası duyuların geri dönüş sırası</h3>
        <div class="sense-row">${[['zap', 'Ağrı', 'coral'], ['hand', 'Dokunma', 'amber'], ['thermometer', 'Isı', 'teal']].map(([ic, t, c], i) => `<div class="sense" style="--c:var(--${c})"><span class="mono">${i + 1}</span>${icon(ic)}<b>${t}</b></div>${i < 2 ? `<div class="sense-arrow">${icon('chevron-right')}</div>` : ''}`).join('')}</div>
      </div>
    </div>
    ${T.photo(29, 1, 'Deri grefti uygulaması', 'contain', 'height:300px;align-self:center')}
  </div>`,
  enter(el){ gsap.from(el.querySelectorAll('.sense'), { scale: .5, opacity: 0, duration: .6, stagger: .45, ease: 'back.out(2)', delay: .8 }); }
});

Deck.add('pansuman', {
  id: 'flep', title: 'Flep',
  html: `${T.head('Flep', 'Kendi <em>damarıyla</em> taşınan doku')}
  <div class="split" style="grid-template-columns:1fr 1fr">
    <div style="display:flex;flex-direction:column;gap:18px">
      ${T.bullets(['Bir ucu kendi damarları ile beslenebilmesi için kesildiği bölgede bırakılmış şerit şeklindeki deri veya doku parçasına <b>flep</b> denir.', 'Flepler, deri greftlerinin tersine kendi özgün kan dolaşımlarını taşındıkları bölgede de korurlar.'])}
      <div class="cmp a">
        <div></div><b>Greft</b><b>Flep</b>
        <span>Kan desteği</span><span class="t-coral">Ayrılır — alıcı yataktan beslenir</span><span class="t-teal">Korunur — kendi damar sapı</span>
        <span>Kullanım</span><span>Doğrudan kapatılamayan yüzeyel defektler</span><span>Daha derin, kanlanması zayıf alanlar</span>
      </div>
    </div>
    ${T.photo(31, 1, 'Flep uygulaması', 'contain', 'height:300px;align-self:center')}
  </div>`
});
})();
