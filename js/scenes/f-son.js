/* Bölüm 06 Cerrahi & kronik yara · 07 Enfeksiyon & hemşirelik · 08 Canlı sınav & kapanış (pptx slayt 70–80) */
(function(){
const { T, icon } = Y;
Deck.chapter('cerrahi', { title: 'Cerrahi ve Kronik Yara', sub: 'Kontrollü bir hasar olarak cerrahi kesi, beklenen ve tehlikeli bulgular; venöz ülser.', a: '#38BDF8', b: '#A78BFA' });
Deck.chapter('hemsirelik', { title: 'Enfeksiyon ve Hemşirelik', sub: 'Enfeksiyonu tanımak, sistematik değerlendirme, beslenme ve ağrı yönetimi.', a: '#34D399', b: '#2DD4BF' });
Deck.chapter('sinav', { title: 'Canlı Sınav', sub: 'Telefonlarınızı çıkarın: ne kadar anladık, birlikte görelim.', a: '#FBBF24', b: '#A78BFA', opener: false });

Deck.add('cerrahi', {
  id: 'cerrahi-tanim', title: 'Cerrahi yara',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:20px">
      ${T.head('Cerrahi yara', 'Amacı <em>tedavi</em> olan yara')}
      <p class="a" style="font-size:26px;line-height:1.45">Doktor tarafından <b class="t-sky">steril şartlarda</b> yapılan kesinin ardından oluşan <b>kontrollü doku hasarıdır</b>. Diğer yaralardan farkı, amacının tedavi sağlamak olmasıdır.</p>
      <p class="s-lead a" style="font-size:21px">Cerrahi sonrası süreçte evde yara bakımı ve evde pansuman ihtiyacı oluşabilir.</p>
    </div>
    <div class="card a" style="gap:14px"><h3>Kapatma yöntemleri</h3>
      ${[['spline', 'Dikiş (sütür)'], ['stapler', 'Zımba (stapler)'], ['bandage', 'Yapıştırıcı bantlar'], ['droplet', 'Cerrahi doku yapıştırıcıları'], ['door-open', 'Açık bırakılarak iyileşme (bazı durumlarda)']]
        .map(([ic, t], i) => `<div class="mini" style="justify-content:flex-start"><span class="mono" style="color:var(--sky);width:28px">0${i + 1}</span>${icon(ic)}<span>${t}</span></div>`).join('')}
    </div>
  </div>`
});

Deck.add('cerrahi', {
  id: 'cerrahi-evreler', title: 'Cerrahi yaranın iyileşmesi',
  html: `${T.head('İyileşme', 'Cerrahi kesi de <em>dört evreden</em> geçer')}
  ${T.photo(71, 1, 'Hemostaz, inflamasyon, proliferasyon, remodeling', 'contain', 'height:300px')}
  <div class="grid g4">
    ${T.card({ icon: 'droplet', title: 'Hemostaz', text: 'İlk saatlerde kanama durur.', tone: 'coral', cls: 'compact' })}
    ${T.card({ icon: 'shield-plus', title: 'İnflamasyon', text: 'Bağışıklık hücreleri gelir; hafif kızarıklık normal olabilir.', tone: 'amber', cls: 'compact' })}
    ${T.card({ icon: 'sprout', title: 'Proliferasyon', text: 'Yeni doku oluşur, yara kapanmaya başlar.', cls: 'compact' })}
    ${T.card({ icon: 'gem', title: 'Maturasyon', text: 'Aylar boyunca iz dokusu olgunlaşır.', tone: 'sky', cls: 'compact' })}
  </div>`
});

/* Beklenen ↔ tehlike: rozetler ortadan iki sütuna dağılır */
const OK = ['Hafif ağrı', 'Gerginlik hissi', 'Hafif kızarıklık', 'Minimal sızıntı', 'Kaşıntı', 'Sertlik hissi', 'Hafif morluk'];
const BAD = ['Artan kızarıklık', 'Şiddetli ağrı', 'Kötü kokulu akıntı', 'Sarı/yeşil iltihap', 'Ateş', 'Yaranın açılması', 'Kanama', 'Şişlik', 'Dikişlerin ayrılması'];
Deck.add('cerrahi', {
  id: 'cerrahi-bulgular', title: 'Beklenen ve tehlike bulguları',
  notes: 'İleri tuşu: önce beklenen bulgular sola, sonra tehlike bulguları sağa ayrışır. “Hafif” kelimesi ile “artan/şiddetli” farkına dikkat çekin.',
  html: `${T.head('Ayırt et', 'Normal mi, <em>alarm</em> mı?')}
  <div class="grid g2 fill" style="gap:30px">
    <div class="card a" style="border-color:color-mix(in oklab,var(--teal) 45%,transparent)"><div style="display:flex;gap:12px;align-items:center"><div class="ic">${icon('circle-check')}</div><h3>Beklenen bulgular</h3></div>
      <div class="pills" data-step="1">${OK.map(t => `<span class="chip teal pill">${t}</span>`).join('')}</div></div>
    <div class="card a coral" style="border-color:color-mix(in oklab,var(--coral) 45%,transparent)"><div style="display:flex;gap:12px;align-items:center"><div class="ic">${icon('siren')}</div><h3>Tehlike bulguları</h3></div>
      <div class="pills" data-step="2">${BAD.map(t => `<span class="chip coral pill">${t}</span>`).join('')}</div></div>
  </div>`,
  onStep(n, el){
    const pills = el.querySelectorAll(`[data-step="${n}"] .pill`);
    gsap.from(pills, { x: n === 1 ? 420 : -420, y: () => gsap.utils.random(-120, 120), rotate: () => gsap.utils.random(-30, 30), opacity: 0, duration: .9, stagger: .07, ease: 'back.out(1.4)' });
    if (n === 2) Y.Sfx.wrong();
  }
});

Deck.add('cerrahi', {
  id: 'hasta-egitimi', title: 'Cerrahi yara sonrası hasta eğitimi',
  html: `<div class="split">
    ${T.photo(73, 1, 'Hasta eğitimi', '', 'height:640px')}
    <div style="display:flex;flex-direction:column;gap:18px">
      ${T.head('Taburculuk', 'Cerrahi yara sonrası <em>hasta eğitimi</em>')}
      ${T.bullets(['Evde pansuman değişimi ve el hijyeni <b>görsel ve uygulamalı</b> anlatılır.', 'Beklenen bulgular (hafif ağrı, kaşıntı, gerginlik) normaldir; hastayı rahatlatın.', '<b>Artan kızarıklık, ateş, kötü kokulu/sarı-yeşil akıntı, yaranın açılması</b> görülürse hemen sağlık kuruluşuna başvurmalıdır.', 'Uygun evde yara bakımı ve pansuman iyileşmeyi destekler.'])}
    </div>
  </div>`
});

Deck.add('cerrahi', {
  id: 'venoz-ulser', title: 'Kronik yara: venöz ülser',
  notes: 'Kritik güvenlik noktası: arteriyel dolaşım değerlendirilmeden kompresyon başlanmaz (arteriyel yetmezlikte iskemiyi ağırlaştırır).',
  html: `<div class="split">
    <div style="display:flex;flex-direction:column;gap:18px">
      ${T.head('Kronik yara türleri', 'Venöz <em>ülser</em>')}
      ${T.bullets(['Sıklıkla alt bacağın <b>medial malleol</b> çevresinde görülür.', 'Yüzeysel, düzensiz kenarlı ve eksüdalı olabilir.', 'Ödem, varis, hemosiderin renklenmesi ve staz dermatiti eşlik edebilir.', 'Ağrı bacak elevasyonuyla azalabilir; klinik değişkenlik vardır.'])}
      ${T.callout('<b>Arteriyel dolaşım değerlendirilmeden kompresyon başlanmamalıdır.</b>', 'coral', 'octagon-alert')}
    </div>
    <div class="card a" style="padding:18px;height:600px"><svg viewBox="0 0 420 560" style="width:100%;height:100%">
      <path d="M150 0 H280 L290 300 Q296 420 300 470 Q304 520 340 530 L380 540 Q400 550 380 560 H170 Q150 556 152 520 L160 300 Z" fill="#E7B49A"/>
      <path class="vein" d="M200 10 C 210 120, 180 200, 215 300 C 240 380, 205 430, 240 500" fill="none" stroke="#6366F1" stroke-width="8" stroke-linecap="round"/>
      <path d="M250 30 C 240 140, 270 220, 245 320" fill="none" stroke="#6366F1" stroke-width="6" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="200" cy="470" rx="40" ry="26" fill="#9F1239"/><ellipse cx="200" cy="470" rx="28" ry="16" fill="#E11D48" opacity=".7"/>
      <ellipse cx="200" cy="470" rx="70" ry="50" fill="none" stroke="#92400E" stroke-width="10" opacity=".35"/>
      <text x="300" y="460" font-size="17" font-weight="700" fill="var(--ink)">Medial malleol</text><line x1="296" y1="455" x2="240" y2="468" stroke="var(--ink-2)" stroke-width="2"/>
      <text x="270" y="200" font-size="17" font-weight="700" fill="var(--ink)">Varis</text>
    </svg></div>
  </div>`,
  enter(el){ const t = gsap.to(el.querySelector('.vein'), { strokeWidth: 12, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }); return () => t.kill(); }
});

Deck.add('cerrahi', {
  id: 'venoz-bakim', title: 'Venöz ülserde hemşirelik bakımı',
  html: `<div class="split r">
    ${T.photo(75, 1, 'Venöz yetmezlik', '', 'height:560px')}
    <div style="display:flex;flex-direction:column;gap:18px">
      ${T.head('Bakım', 'Venöz ülserde <em>hemşirelik</em>')}
      <div class="grid g2" style="gap:14px">
        ${T.card({ icon: 'activity', title: 'Kompresyon', text: 'Dolaşım değerlendirmesi sonrası uygun kompresyon; düzeyi klinik değerlendirme ve protokole göre.', cls: 'compact' })}
        ${T.card({ icon: 'footprints', title: 'Elevasyon & hareket', text: 'Bacak elevasyonu; baldır kas pompasını destekleyen hareket.', tone: 'sky', cls: 'compact' })}
        ${T.card({ icon: 'bandage', title: 'Örtü & çevre deri', text: 'Eksüdaya uygun örtü ve çevre deri koruması.', tone: 'violet', cls: 'compact' })}
        ${T.card({ icon: 'eye', title: 'İzlem', text: 'Staz dermatiti ve enfeksiyon bulguları izlenir.', tone: 'amber', cls: 'compact' })}
      </div>
    </div>
  </div>`
});

/* ——— Enfeksiyon & hemşirelik ——— */
Deck.add('hemsirelik', {
  id: 'enfeksiyon', title: 'Yara bakımında enfeksiyon kontrolü',
  html: `${T.head('Enfeksiyon kontrolü', 'Belirtileri <em>erken</em> tanı')}
  <div class="grid g3" style="gap:14px">
    ${[['flame', 'Kızarıklık (eritem)', 'Yara çevresinde yayılma gösteren kızarıklık.'], ['thermometer-sun', 'Isı artışı', 'Dokunulduğunda belirgin sıcaklık.'], ['zap', 'Ağrı ve hassasiyet', 'Ani artış veya zonklama hissi.'], ['circle-dot', 'Şişlik (ödem)', 'Yara ve çevresinde belirgin ödem.'], ['droplets', 'Eksüda / akıntı', 'Kötü kokulu, pürülan (sarı-yeşil, yoğun) akıntı artışı.'], ['hand', 'Fonksiyon kaybı', 'İlgili organ veya dokuda hareket kısıtlılığı.']]
      .map(([ic, t, d]) => T.card({ icon: ic, title: t, text: d, tone: 'coral', cls: 'compact' })).join('')}
  </div>
  <div class="grid g2" style="gap:18px">
    <div class="card a violet compact"><h3>${icon('thermometer')} Sistemik belirtiler</h3><div style="display:flex;flex-wrap:wrap;gap:8px">${['Ateş', 'Titreme', 'Taşikardi', 'Halsizlik', 'Lökositoz (WBC↑)'].map(t => `<span class="chip violet">${t}</span>`).join('')}</div></div>
    <div class="card a compact"><h3>${icon('shield-check')} Korunma</h3>${T.bullets(['Pansuman öncesi <b>el hijyeni</b>.', 'Kontaminasyona karşı uygun bariyer pansumanlar.', 'Ölü dokuların debridman ile uzaklaştırılması.'], 'tight')}</div>
  </div>`
});

Deck.add('hemsirelik', {
  id: 'hemsirelik-1', title: 'Yara bakımında hemşirelik yaklaşımları',
  html: `${T.head('Hemşirelik girişimleri', 'Değerlendir, seç, <em>yönet</em>, öğret')}
  <div class="grid g2 fill">
    ${T.card({ icon: 'ruler', title: 'Sistematik yara değerlendirmesi', text: 'Tip, evre, boyut (uzunluk-genişlik-derinlik), eksüda miktarı/niteliği, yara yatağı (granülasyon, epitelizasyon, nekroz, slough) düzenli değerlendirilir ve <b style="color:var(--ink)">dokümante edilir</b>.', num: '1' })}
    ${T.card({ icon: 'layers', title: 'Uygun pansuman seçimi', text: 'Nem dengesini sağlayan (emici köpük, hidrojel, hidrokolloid) ve enfeksiyon durumuna uygun (örn. gümüşlü) ürünler.', tone: 'sky', num: '2' })}
    ${T.card({ icon: 'bed', title: 'Basınç yönetimi ve pozisyon', text: 'En geç 2 saatte bir pozisyon; havalı yatak ve destek yüzeyleri.', tone: 'violet', num: '3' })}
    ${T.card({ icon: 'messages-square', title: 'Hasta ve yakını eğitimi', text: 'Evde pansuman ve hijyen görsel/uygulamalı anlatılır; kızarıklık, ateş, kötü kokulu akıntıda ne zaman başvurulacağı öğretilir.', tone: 'amber', num: '4' })}
  </div>`
});

/* Beslenme hesaplayıcı + ağrı ölçeği */
Deck.add('hemsirelik', {
  id: 'hemsirelik-2', title: 'Beslenme ve ağrı yönetimi',
  notes: 'Kilo kaydırıcısını sürükleyin. Protein 1,2–1,5 g/kg/gün; sıvı 30–35 ml/kg/gün (kontrendikasyon yoksa). Yanıkta sıvı 9’lar kuralına göre hesaplanır.',
  html: `${T.head('Beslenme ve ağrı', 'Yara <em>içeriden</em> de iyileşir')}
  <div class="grid" style="grid-template-columns:1.1fr .9fr;flex:1;gap:24px">
    <div class="card a" style="gap:16px">
      <div style="display:flex;justify-content:space-between;align-items:center"><h3>${icon('calculator')} Günlük gereksinim</h3><span class="chip"><b class="kg mono">70</b>&nbsp;kg</span></div>
      <input type="range" class="range wkg" min="40" max="130" value="70" aria-label="Hasta kilosu">
      <div class="calc-out">
        <div class="card compact"><small class="muted">Protein · 1,2–1,5 g/kg</small><b class="mono"><span class="p1">84</span>–<span class="p2">105</span></b><small>g/gün</small></div>
        <div class="card compact sky"><small class="muted">Sıvı · 30–35 ml/kg</small><b class="mono" style="color:var(--sky)"><span class="f1">2,1</span>–<span class="f2">2,5</span></b><small>L/gün</small></div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><span class="chip amber">C vitamini · kollajen sentezi</span><span class="chip teal">Çinko · hücre bölünmesi, bağışıklık</span><span class="chip violet">A vitamini · epitelizasyon</span></div>
      <p class="muted small">Kontrendikasyon yoksa. <b class="t-coral">Yanık yaralarında sıvı 9’lar kuralına göre hesaplanır!</b></p>
    </div>
    <div class="card a coral" style="gap:14px">
      <h3>${icon('activity')} Ağrı yönetimi</h3>
      <div><div class="vas"><i class="vas-m"></i></div><div style="display:flex;justify-content:space-between" class="muted small"><span>0 · ağrı yok</span><span>VAS</span><span>10 · en şiddetli</span></div></div>
      ${T.bullets(['Pansuman öncesi ve sonrası ağrı geçerli ölçeklerle (örn. <b>VAS</b>) değerlendirilir.', 'Pansumandan <b>30–45 dk önce</b> hekim istemine uygun analjezik.', 'Yara yatağına yapışmayan (silikon, non-adherent) malzeme tercih edilir.', 'Yapışan kısımlar <b>ılık serum fizyolojik</b> ile yumuşatılıp nazikçe çıkarılır.'], 'coral tight')}
    </div>
  </div>`,
  enter(el){
    const r = el.querySelector('.wkg'), f = n => n.toFixed(1).replace('.', ',');
    const upd = () => { const k = +r.value; el.querySelector('.kg').textContent = k; el.querySelector('.p1').textContent = Math.round(k * 1.2); el.querySelector('.p2').textContent = Math.round(k * 1.5); el.querySelector('.f1').textContent = f(k * .03); el.querySelector('.f2').textContent = f(k * .035); };
    r.addEventListener('input', upd); upd();
    const t = gsap.fromTo(el.querySelector('.vas-m'), { left: '78%' }, { left: '22%', duration: 2.6, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: 1 });
    return () => t.kill();
  }
});

Deck.add('hemsirelik', {
  id: 'kaynakca', title: 'Kaynakça',
  html: `${T.head('Kaynakça', 'Yararlanılan <em>kaynaklar</em>')}
  <div class="grid g2" style="gap:14px">
    ${['Mustafa Altıntaş — yara bakımı ders notu (PDF)', '10. Hafta: Yara bakımı ve pansuman yapma uygulamaları (PDF)', 'Yanık ve enfeksiyonlar — ders notu', 'Bası yaraları — ders notu', 'Yanık ilk yardım görselleri — Yandex Görsel', 'Cerrahi kesi iyileşme süreci görselleri — Yandex Görsel', 'Hemostaz ve inflamasyon görselleri — Yandex Görsel']
      .map(t => `<div class="mini a" style="justify-content:flex-start">${icon('book-marked')}<span>${t}</span></div>`).join('')}
  </div>
  <p class="muted a small" style="margin-top:auto">İçerik eğitim amaçlı özettir; kurum protokolleri ve hekim istemi önceliklidir.</p>`
});

/* ——— Sınav girişi ——— */
Deck.add('sinav', {
  id: 'sinav', title: 'Canlı sınav', cls: 'center',
  notes: 'Başlat’a basınca PIN ve QR kodu çıkar. Herkes katılınca Boşluk ile başlayın. Prova için “Demo sınıf” sanal öğrencilerle çalışır.',
  html: `<div class="kicker a">Şimdi sıra sizde</div>
  <h2 class="s-title xl a" style="text-align:center">Ne kadar <em>anladık?</em></h2>
  <div class="grid g3 a" style="width:1180px;margin-top:10px">
    ${[['scan-qr-code', 'QR kodu okutun', 'Telefon kamerasıyla ekrandaki kodu okutun.'], ['user-round-pen', 'Takma ad seçin', 'Adınız ve avatarınız ekranda belirir.'], ['timer', 'Hızlı ve doğru', 'Doğru cevap + hız = daha çok puan.']]
      .map(([ic, t, d], i) => `<div class="card" style="align-items:center;text-align:center"><span class="num">${i + 1}</span><div class="ic">${icon(ic)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
  <div class="quiz-setup a">
    <label>Soru seti <select class="q-set"><option value="full">Tam — 18 soru</option><option value="short">Kısa — 10 soru</option></select></label>
    <label>Süre <select class="q-time"><option value="20">20 sn</option><option value="30">30 sn</option><option value="15">15 sn</option></select></label>
  </div>
  <div class="row a" style="justify-content:center;gap:16px">
    <button class="btn primary cta-big start-live">${icon('radio')}Canlı sınavı başlat</button>
    <button class="btn cta-big start-demo" style="font-size:20px">${icon('bot')}Demo sınıf (prova)</button>
  </div>
  <p class="muted small a sinav-past"></p>`,
  enter(el){
    const opts = () => ({ set: el.querySelector('.q-set').value, time: +el.querySelector('.q-time').value });
    el.querySelector('.start-live').addEventListener('click', () => Quiz.start({ ...opts(), demo: false }));
    el.querySelector('.start-demo').addEventListener('click', () => Quiz.start({ ...opts(), demo: true }));
    const last = Y.store.get('yara_last_pin');
    if (last) el.querySelector('.sinav-past').innerHTML = `Son oturum: <b class="mono">${last}</b> · <a href="?analiz=${last}" style="color:var(--teal)">analizi aç</a>`;
    gsap.to(el.querySelector('.start-live'), { scale: 1.04, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }
});

/* Kapanış finali: sayılar + ekip jeneriği + havai fişek */
Deck.add('sinav', {
  id: 'kapanis', title: 'Teşekkürler', cls: 'center',
  html: () => {
    const r = Y.store.get('yara_last_result');
    return `<div class="kicker a">Kapanış</div>
    <h1 class="a" style="font-size:150px;line-height:.9;letter-spacing:-.05em;font-weight:800">Teşekkürler<span class="t-teal">.</span></h1>
    <p class="serif a" style="font-size:44px;color:var(--ink-2)">Dinlediğiniz ve katıldığınız için</p>
    ${r ? `<div class="grid g3 a" style="width:1000px;margin:10px 0">
      <div class="card compact" style="align-items:center"><b class="bigstat fin" data-v="${r.players}" style="font-size:80px">0</b><small class="muted">katılımcı</small></div>
      <div class="card compact" style="align-items:center"><b class="bigstat fin" data-v="${r.pct}" data-s="%" style="font-size:80px">0</b><small class="muted">genel başarı</small></div>
      <div class="card compact" style="align-items:center"><b class="bigstat fin" data-v="${r.answers}" style="font-size:80px">0</b><small class="muted">verilen cevap</small></div>
    </div>` : ''}
    <div class="credits a"><div class="credits-in">${Y.TEAM.map(n => `<span>${n}</span>`).join('')}</div></div>
    <button class="btn a fire-again">${icon('sparkles')}Bir daha!</button>`;
  },
  enter(el){
    el.querySelectorAll('.fin').forEach(b => Y.countUp(b, +b.dataset.v, { dur: 2, prefix: b.dataset.s || '' }));
    const go = () => { FX.fireworks(6); Y.Sfx.fanfare(); };
    const d = gsap.delayedCall(.8, go);
    el.querySelector('.fire-again').addEventListener('click', go);
    gsap.from(el.querySelectorAll('.credits span'), { y: 40, opacity: 0, stagger: .18, duration: .8, delay: 1, ease: 'power3.out' });
    return () => d.kill();
  }
});
})();
