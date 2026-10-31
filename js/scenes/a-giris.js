/* Bölüm 00 Giriş · 01 Sınıflandırma (pptx slayt 1–12) */
(function(){
const { T, icon, img } = Y;

Deck.chapter('giris', { title: 'Giriş', opener: false, a: '#2DD4BF', b: '#6366F1' });
Deck.chapter('siniflandirma', { title: 'Yaranın Sınıflandırılması', sub: 'Oluşum nedeni, doku bütünlüğü, derinlik, temizlik ve renk — beş farklı mercekle aynı yara.', a: '#60A5FA', b: '#2DD4BF' });

const TEAM = ['Berfin Çelik', 'Sude Başeğmez', 'Müslina Boran', 'Emine Yurtsever', 'Halise Bozkurt', 'Muhammed Sefa Demirezen'];
Y.TEAM = TEAM;

/* Kapak: dönen hücre halkası + harf harf başlık */
Deck.add('giris', {
  id: 'kapak', title: 'Kapak', cls: 'cover',
  notes: 'Kendinizi tanıtın. Sunum sonunda telefonlardan canlı bir sınav yapılacağını şimdiden söyleyin — dikkat artar.',
  html: `
  <svg class="cover-orbit" viewBox="0 0 600 600" aria-hidden="true">
    <defs><radialGradient id="cg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="var(--glow-a)" stop-opacity=".55"/><stop offset="1" stop-color="var(--glow-a)" stop-opacity="0"/></radialGradient></defs>
    <circle cx="300" cy="300" r="120" fill="url(#cg)"/>
    <g class="ring r1"><circle cx="300" cy="300" r="170" fill="none" stroke="var(--stroke-2)" stroke-dasharray="2 10"/>${Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2;return `<circle cx="${300+170*Math.cos(a)}" cy="${300+170*Math.sin(a)}" r="${i%3?5:9}" fill="${i%2?'var(--glow-a)':'var(--coral)'}" opacity=".85"/>`}).join('')}</g>
    <g class="ring r2"><circle cx="300" cy="300" r="250" fill="none" stroke="var(--stroke)" />${Array.from({length:16},(_,i)=>{const a=i/16*Math.PI*2;return `<circle cx="${300+250*Math.cos(a)}" cy="${300+250*Math.sin(a)}" r="${i%4?3:7}" fill="var(--glow-b)" opacity=".7"/>`}).join('')}</g>
    <path class="cross" d="M300 255v90M255 300h90" stroke="var(--teal)" stroke-width="22" stroke-linecap="round"/>
  </svg>
  <div class="kicker a">Hemşirelik Eğitimi · 2026</div>
  <h1 class="c-title"><span class="w">Yara</span> <span class="w">Bakımında</span><br><span class="w serif">Hemşirelik</span> <span class="w">Eğitimi</span></h1>
  <p class="s-lead a" style="max-width:820px">Yaranın oluşumundan iyileşmesine, bası yarasından yanığa — kanıta dayalı bakımın temelleri. Sonunda: <b class="t-teal">telefonlarınızdan canlı sınav.</b></p>
  <div class="team">${TEAM.map(n => `<span class="chip a">${icon('user-round')}${n}</span>`).join('')}</div>
  <p class="a muted small" style="margin-top:8px">İlerlemek için <span class="kbd">→</span> veya <span class="kbd">Boşluk</span> · Bölümler <span class="kbd">M</span> · Tam ekran <span class="kbd">F</span></p>`,
  enter(el){
    const words = el.querySelectorAll('.c-title .w');
    gsap.from(words, { yPercent: 110, opacity: 0, rotate: 4, duration: 1.1, stagger: .09, ease: 'expo.out', delay: .2 });
    gsap.to(el.querySelector('.r1'), { rotate: 360, transformOrigin: '300px 300px', duration: 60, repeat: -1, ease: 'none' });
    gsap.to(el.querySelector('.r2'), { rotate: -360, transformOrigin: '300px 300px', duration: 90, repeat: -1, ease: 'none' });
    gsap.from(el.querySelector('.cover-orbit'), { scale: .6, opacity: 0, duration: 1.6, ease: 'expo.out' });
    gsap.to(el.querySelector('.cross'), { scale: 1.12, transformOrigin: '300px 300px', duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }
});

Deck.add('giris', {
  id: 'hedefler', title: 'Öğrenim hedefleri',
  notes: 'Yedi hedefi kısaca okuyun; sınav soruları bu hedeflere göre etiketlendi ve analizde hedef bazında sonuç göreceğiz.',
  html: `${T.head('Öğrenim hedefleri', 'Bu sunumun <em>sonunda</em> şunları yapabileceğiz')}
  <div class="grid g4 fill" style="align-content:start">
    ${T.card({ icon: 'activity', title: 'İyileşme süreci', text: 'Yara iyileşme sürecini ve bu süreci etkileyen faktörleri bilmek.', num: '1' })}
    ${T.card({ icon: 'book-open-check', title: 'Kanıta dayalı bakım', text: 'Kanıta dayalı yara bakımı uygulamak.', tone: 'sky', num: '2' })}
    ${T.card({ icon: 'tags', title: 'Sınıflandırma', text: 'Yaraları doğru sınıflandırmak ve belgelemek.', tone: 'violet', num: '3' })}
    ${T.card({ icon: 'biohazard', title: 'Enfeksiyon & biyofilm', text: 'Enfeksiyon ve biyofilmi tanımak.', tone: 'coral', num: '4' })}
    ${T.card({ icon: 'scissors', title: 'Tedavi yöntemleri', text: 'Debridman, pansuman seçimi ve ileri düzey yara tedavi yöntemleri.', tone: 'amber', num: '5' })}
    ${T.card({ icon: 'users', title: 'Eğitim & iş birliği', text: 'Hasta eğitimi, meslekler arası iş birliği ve yasal uyum.', num: '6' })}
    ${T.card({ icon: 'award', title: 'Liderlik', text: 'Yara bakım programı liderliği yapabilecek beceriler geliştirmek.', tone: 'sky', num: '7', cls: 'hl' })}
  </div>`
});

/* Yara nedir: merkezde tanım, çevrede nedenler (çizgiler çizilerek bağlanır) */
const CAUSES = [['scissors','Kesici-delici'],['bed','Uzun süreli bası'],['car-front','Travma'],['heart-crack','İskemi'],['flask-conical','Kimyasal ajan'],['thermometer','Sıcak / soğuk'],['stethoscope','Hastalık']];
Deck.add('giris', {
  id: 'yara-nedir', title: 'Yara nedir?',
  html: `<div class="split">
    <div class="s-head">
      <div class="kicker a">Tanım</div>
      <h2 class="s-title a">Yara <em>nedir?</em></h2>
      <p class="a" style="font-size:34px;line-height:1.35;font-weight:500">Herhangi bir neden sonucu <b class="t-teal">deri</b> veya deri ile birlikte daha derin dokuların, organların <b class="t-coral">bütünlüğünün bozulmasıdır.</b></p>
      <p class="s-lead a">Bu bozulmaya kesici-delici yaralanma, uzun süreli basınca bağlı bası yarası, travma, iskemi, kimyasal ajan, sıcak-soğuğa maruz kalmaya bağlı yanık veya hastalık neden olabilir.</p>
    </div>
    <div class="cause-map a" style="position:relative;width:600px;height:600px;justify-self:center">
      <svg viewBox="0 0 600 600" style="position:absolute;inset:0">${CAUSES.map((c,i)=>{const a=-Math.PI/2+i/CAUSES.length*Math.PI*2;return `<line class="cl" x1="300" y1="300" x2="${300+235*Math.cos(a)}" y2="${300+235*Math.sin(a)}" stroke="var(--stroke-2)" stroke-width="2" stroke-dasharray="4 6"/>`}).join('')}</svg>
      <div class="cause-core">Doku<br>bütünlüğü<br><span class="t-coral">bozulur</span></div>
      ${CAUSES.map((c,i)=>{const a=-Math.PI/2+i/CAUSES.length*Math.PI*2;return `<div class="cause" style="left:${300+235*Math.cos(a)}px;top:${300+235*Math.sin(a)}px">${icon(c[0])}<span>${c[1]}</span></div>`}).join('')}
    </div>
  </div>`,
  enter(el){
    gsap.from(el.querySelectorAll('.cl'), { attr: { x2: 300, y2: 300 }, duration: 1, stagger: .08, ease: 'power3.out', delay: .4 });
    gsap.from(el.querySelectorAll('.cause'), { scale: 0, opacity: 0, duration: .7, stagger: .08, ease: 'back.out(1.8)', delay: .6 });
    gsap.to(el.querySelector('.cause-core'), { boxShadow: '0 0 90px 10px rgba(255,107,94,.35)', duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }
});

/* ——— Sınıflandırma ——— */
const AXES = [
  ['flame', 'Oluşum nedeni', ['Mekanik', 'Yanık-kimyasal', 'Kronik'], ''],
  ['shield-half', 'Doku bütünlüğü', ['Açık', 'Kapalı'], 'sky'],
  ['layers', 'Derinlik', ['Yüzeysel', 'Derin'], 'violet'],
  ['sparkles', 'Temizlik', ['Temiz', 'Temiz-kontamine', 'Kontamine', 'Kirli-enfekte'], 'amber'],
  ['palette', 'Renk', ['Kırmızı', 'Sarı', 'Siyah', 'Karışık'], 'coral']
];
Deck.add('siniflandirma', {
  id: 'siniflandirma', title: 'Beş sınıflandırma ekseni',
  notes: 'Pptx’te temizlik için “iki gruba” yazıyor; doğrusu dört grup (temiz, temiz-kontamine, kontamine, kirli-enfekte).',
  html: `${T.head('Sınıflandırma', 'Aynı yara, <em>beş</em> farklı mercek')}
  <div class="grid g5 fill" style="align-content:start">
    ${AXES.map(([ic, t, list, tone], i) => `<div class="card a ${tone}" style="min-height:420px"><span class="num">${i + 1}</span><div class="ic">${icon(ic)}</div><h3>${t}</h3><p>${list.length} gruba ayrılır</p><div style="display:flex;flex-direction:column;gap:8px;margin-top:auto">${list.map(x => `<span class="chip ${tone || 'teal'}" style="justify-content:flex-start">${x}</span>`).join('')}</div></div>`).join('')}
  </div>`
});

Deck.add('siniflandirma', {
  id: 'olusum-nedeni', title: 'Oluşum nedenine göre yaralar',
  html: `<div class="split wide-l">
    <div style="display:flex;flex-direction:column;gap:22px">
      ${T.head('Oluşum nedenine göre', 'Üç ana <em>köken</em>')}
      ${T.card({ icon: 'scissors', title: 'Mekanik yaralar', text: 'Ayrılma, laserasyon ve cerrahi yaraları kapsar.', cls: 'compact' })}
      ${T.card({ icon: 'flame', title: 'Yanık-kimyasal yaralar', text: 'Sıcaklık, kimyasal madde, elektrik enerjisi ve radyasyon yaralarını kapsar.', tone: 'coral', cls: 'compact' })}
      ${T.card({ icon: 'hourglass', title: 'Kronik yaralar', text: 'Dokudaki kanlanmanın yetersiz olması sonucu oluşur (venöz bacak ülseri vb.).', tone: 'violet', cls: 'compact' })}
    </div>
    ${T.photo(6, 1, 'Yanık yarası ve kronik yara', 'contain', 'height:640px')}
  </div>`
});

Deck.add('siniflandirma', {
  id: 'doku-butunlugu', title: 'Doku bütünlüğüne göre yaralar',
  html: `${T.head('Doku bütünlüğü durumuna göre', 'Açık mı, <em>kapalı</em> mı?')}
  <div class="grid g2 fill">
    <div class="card a sky" style="padding:0;flex-direction:row;gap:0">
      ${T.photo(8, 2, 'Açık yara', '', 'width:46%;border-radius:0;border:0;box-shadow:none')}
      <div style="padding:30px;display:flex;flex-direction:column;gap:12px"><div class="ic">${icon('droplet')}</div><h3>Açık yara</h3><p>Cilt bütünlüğünü bozan kesici bir alet sonucu oluşan ve kan, beden sıvısı kaybına neden olan yaralardır.</p></div>
    </div>
    <div class="card a violet" style="padding:0;flex-direction:row;gap:0">
      ${T.photo(8, 1, 'Kapalı yara', '', 'width:46%;border-radius:0;border:0;box-shadow:none')}
      <div style="padding:30px;display:flex;flex-direction:column;gap:12px"><div class="ic">${icon('shield')}</div><h3>Kapalı yara</h3><p>Burkulma, zorlama veya darbe sonucu cilt bütünlüğünde bozulma yapmayan yaralardır.</p></div>
    </div>
  </div>`
});

Deck.add('siniflandirma', {
  id: 'derinlik', title: 'Derinliğe göre yaralar',
  html: `${T.head('Yaralanmanın derinliğine göre', 'Yüzeysel ve <em>derin</em>')}
  <div class="grid g2 fill">
    <div class="card a" style="padding:0;flex-direction:row;gap:0">
      ${T.photo(10, 2, 'Yüzeysel yara', '', 'width:48%;border-radius:0;border:0;box-shadow:none')}
      <div style="padding:30px;display:flex;flex-direction:column;gap:12px"><div class="ic">${icon('minus')}</div><h3>Yüzeysel yaralar</h3><p>Sıyrık ve kontüzyon (cilt altında kılcal damar kanamaları sonucu ödem oluşumu).</p></div>
    </div>
    <div class="card a coral" style="padding:0;flex-direction:row;gap:0">
      ${T.photo(10, 1, 'Derin yara', '', 'width:48%;border-radius:0;border:0;box-shadow:none')}
      <div style="padding:30px;display:flex;flex-direction:column;gap:12px"><div class="ic">${icon('arrow-down-to-line')}</div><h3>Derin yaralar</h3><p>Delici, batıcı aletler sonucu oluşur.</p></div>
    </div>
  </div>`
});

/* Temizlik: mikrop yoğunluğu soldan sağa artar */
const CLEAN = [
  ['Temiz yara', 'Doku kaybı ve enfeksiyon yok; kenarlar birleşir, minimal skar dokusu gelişir.', 2, 'var(--teal)'],
  ['Temiz-kontamine', 'Solunum, GİS, genitoüriner sistem gibi flora içeren lüminal organların kontrollü koşullarda, belirgin yayılma olmaksızın açılmasıyla oluşur.', 9, 'var(--sky)'],
  ['Kontamine yara', 'Patojen mikroorganizma var, ancak enfeksiyon belirtileri henüz yok. Travmadan hemen sonra gelen açık yaralar, steril teknikte majör sorun, organ içeriğinin fazla yayılımı.', 22, 'var(--amber)'],
  ['Kirli yara', 'Patojen mikroorganizmalar bulunur; kızarıklık, ağrı, akıntı, kötü koku gibi enfeksiyon belirtileri görülür.', 46, 'var(--coral)']
];
const microbes = (n, col) => { let s = ''; for (let i = 0; i < n; i++){ const x = 10 + ((i * 53) % 280), y = 10 + ((i * 37 + i * i * 3) % 100); s += `<ellipse class="mb" cx="${x}" cy="${y}" rx="${4 + (i % 3)}" ry="3" fill="${col}" transform="rotate(${(i * 47) % 180} ${x} ${y})" opacity=".85"/>`; } return s; };
Deck.add('siniflandirma', {
  id: 'temizlik', title: 'Temizlik durumuna göre yaralar',
  notes: 'Soldan sağa mikroorganizma yükü artıyor. Kontamine ile kirli arasındaki fark: belirtilerin ortaya çıkıp çıkmaması.',
  html: `${T.head('Temizlik durumuna göre', 'Temizden <em>kirliye</em> dört basamak')}
  <div class="tl-bar a" style="height:8px"><i></i></div>
  <div class="grid g4 fill">
    ${CLEAN.map(([t, d, n, c], i) => `<div class="card a" style="border-top:3px solid ${c}">
      <svg viewBox="0 0 300 120" style="width:100%;height:110px;border-radius:12px;background:var(--surface)">${microbes(n, c)}</svg>
      <span class="mono" style="color:${c};font-size:15px">0${i + 1}</span><h3>${t}</h3><p style="font-size:18.5px">${d}</p></div>`).join('')}
  </div>`,
  enter(el){
    gsap.from(el.querySelector('.tl-bar i'), { scaleX: 0, duration: 1.6, ease: 'power2.inOut', delay: .3 });
    el.querySelectorAll('.mb').forEach(m => gsap.to(m, { x: 'random(-6,6)', y: 'random(-5,5)', duration: 'random(1.2,2.4)', repeat: -1, yoyo: true, ease: 'sine.inOut' }));
  }
});

Deck.add('siniflandirma', {
  id: 'renk', title: 'Renk durumuna göre yaralar',
  html: `${T.head('Renk durumuna göre', 'Rengin <em>söylediği</em>')}
  <div class="grid g4 fill">
    ${[
      ['#E2483D', 'Kırmızı yaralar', 'Cilt yırtılması, travmatik ya da cerrahi yara. Açık kırmızı ve temiz görünümdedir.'],
      ['#E3B23C', 'Sarı yaralar', 'Kabuklu ya da yumuşak nekrotik doku. Sarı-yeşil renkte. Evre 2 bası yarası, 2. derece yanıklar.'],
      ['#141414', 'Siyah yaralar', 'Kalın nekrotik doku ile kaplı. 3. derece yanıklar, 3. ve 4. evre bası yarası, gangrenli ülserler.'],
      ['conic', 'Karışık yara', 'Kısmen üç rengi birlikte gösterir.']
    ].map(([c, t, d]) => `<div class="card a" style="align-items:flex-start">
      <div class="swatch" style="${c === 'conic' ? 'background:conic-gradient(#E2483D 0 33%,#E3B23C 0 66%,#141414 0)' : `background:radial-gradient(circle at 35% 30%,color-mix(in oklab,${c} 60%,#fff),${c} 60%)`}"></div>
      <h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>`,
  enter(el){ gsap.from(el.querySelectorAll('.swatch'), { scale: 0, rotate: -90, duration: 1, stagger: .12, ease: 'back.out(1.6)', delay: .3 }); }
});
})();
