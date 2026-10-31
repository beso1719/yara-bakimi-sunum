"""Yara Bakımı Sunumu.pptx → assets/img/sNN-K.jpg + assets/img/map.json

Kullanım: py -I tools/extract_pptx.py "<pptx yolu>" <çıktı klasörü>
Her slaytın rels dosyasından görselleri okur, sırayla s<slayt>-<n>.jpg adıyla
max 1600px / q82 JPEG olarak kaydeder. SVG ikonlar atlanır.
"""
import io
import json
import re
import sys
import zipfile
from pathlib import Path

from PIL import Image

MAX = 1600


def main(pptx, out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    z = zipfile.ZipFile(pptx)
    slides = sorted(
        (n for n in z.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)),
        key=lambda s: int(re.findall(r"\d+", s)[0]),
    )
    mapping = {}
    for sl in slides:
        num = int(re.findall(r"\d+", sl)[0])
        xml = z.read(sl).decode("utf8")
        rels = z.read(f"ppt/slides/_rels/slide{num}.xml.rels").decode("utf8")
        rid_to_target = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="\.\./media/([^"]+)"', rels))
        # görselleri slayttaki geçiş sırasına göre al (p:pic içindeki r:embed)
        order = re.findall(r'<p:pic>.*?r:embed="(rId\d+)"', xml, flags=re.S)
        files = []
        for k, rid in enumerate(order, 1):
            tgt = rid_to_target.get(rid)
            if not tgt or tgt.endswith(".svg"):
                continue
            im = Image.open(io.BytesIO(z.read(f"ppt/media/{tgt}")))
            im = im.convert("RGB")
            im.thumbnail((MAX, MAX))
            name = f"s{num:02d}-{k}.jpg"
            im.save(out / name, "JPEG", quality=82, optimize=True, progressive=True)
            files.append({"file": name, "w": im.width, "h": im.height, "src": tgt})
        if files:
            mapping[num] = files
    (out / "map.json").write_text(json.dumps(mapping, indent=1), encoding="utf8")
    print(json.dumps(mapping))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
