# Yara Bakımında Hemşirelik Eğitimi — Canlı Sunum + Sınıf Sınavı

`Yara Bakımı Sunumu.pptx` içeriğinden üretilmiş, animasyonlu web sunumu; sonunda öğrencilerin telefondan katıldığı Kahoot tarzı ölçme-değerlendirme sınavı ve otomatik sonuç analizi.

- **Sunum (projeksiyon):** `index.html`
- **Öğrenci sayfası (telefon):** `katil/` — QR kodu buraya `?pin=` ile gelir
- **Geçmiş bir sınavın analizi:** `index.html?analiz=PIN`
- **Prova:** sınav sahnesinde “Demo sınıf” (28 sanal öğrenci, internet/Supabase gerekmez)

## Sunumu kullanma

| Tuş | İşlev |
|---|---|
| `→` `Boşluk` `PageDown` | ileri (sahnedeki adımlar önce açılır) |
| `←` `PageUp` | geri |
| `M` / `O` | bölüm menüsü / tüm sahneler |
| `N` | konuşmacı notları |
| `F` | tam ekran |
| `L` | lazer imleç |
| `T` | açık/koyu tema (aydınlık sınıfta açık tema) |
| `A` | ses aç/kapa |
| `H` | arayüzü gizle |

Telefon kumandası: üst çubuktaki telefon simgesi → QR’ı yalnız sunucu okutur → telefon ileri/geri tuşu olur.

## Canlı sınav

1. Son sahnede soru seti (18 / kısa 10) ve süreyi seçip **Canlı sınavı başlat**.
2. Öğrenciler QR’ı okutur ya da `…/katil` adresine PIN’i girer; adları ekrana düşer.
3. `Boşluk` ile başlatılır: geri sayım → soru (telefonda da görünür) → cevap dağılımı ve açıklama → sıralama → … → podyum.
4. **Sonuç analizi:** genel başarı, konu bazında anlaşılma (%60 altı “tekrar anlatılmalı”), en çok seçilen yanlış şık + kavram yanılgısı, “sunumda bu konuyu aç”, puan/doğru dağılımı, öğrenci tablosu, CSV ve PDF.

Puan: doğru cevap 500–1000 (hızlı olan çok alır) + ardışık doğru serisi bonusu (en çok +400). Süre sunucu saatiyle ölçülür; geç ve tekrar cevap kabul edilmez. 300 kişiye kadar.

## Kurulum (bir kez)

1. Supabase projesinde **SQL Editor → `supabase/schema.sql`** dosyasının tamamını çalıştırın.
2. `js/config.js` içindeki `SUPABASE_URL` ve `SUPABASE_KEY` (publishable/anon key) değerlerini girin. *service_role anahtarı asla koymayın.*
3. GitHub Pages’te yayınlayın; öğrenciler `https://<kullanıcı>.github.io/<repo>/katil/` adresini kullanır.

Ücretsiz Supabase projeleri bir hafta kullanılmazsa duraklatılır — sunumdan önce panelden **Restore** edin.

## Dosyalar

```
index.html            sunum + sınav sunucusu + analiz
katil/index.html      öğrenci telefonu / kumanda
js/deck.js            sahne motoru     js/scenes/*.js   bölümler (pptx slayt 1–80)
js/quiz-data.js       sorular, konular, kavram yanılgıları
js/quiz-host.js       sınav akışı      js/analytics.js  analiz
js/db.js              Supabase + DEMO  js/student.js    öğrenci akışı
assets/img/           pptx görselleri (tools/extract_pptx.py ile çıkarıldı)
supabase/schema.sql   tablolar, RLS, RPC’ler
```

İçerik eğitim amaçlı özettir; kurum protokolleri ve hekim istemi önceliklidir.
