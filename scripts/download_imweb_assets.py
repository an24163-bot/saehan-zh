#!/usr/bin/env python3
"""
Saehan Nanotech — imweb.me 이미지 자가 호스팅 다운로더
=========================================================
이 스크립트는 영문 홈페이지가 외부 의존하고 있는 cdn.imweb.me 이미지
55개를 로컬 images/ 폴더로 다운로드합니다.

사용법:
    cd saehan-en-mirror
    python download_imweb_assets.py

요구사항: Python 3.7+ (표준 라이브러리만 사용)
멱등성: 이미 받은 파일은 건너뜁니다. 안전하게 재실행 가능.
"""

from __future__ import annotations
import urllib.request
import urllib.error
import ssl
import socket
import time
from pathlib import Path

# URL → 로컬 파일명 매핑 (총 55개)
# 명명 규칙:
#   banner-*       페이지 상단 배너 (snt-pb 배경)
#   hero-*         index.html 히어로 배경
#   home-*         index.html 본문 사진/카드 배경
#   research-*     research.html 본문 사진
#   product-*      제품 페이지 메인 사진
#   cert-NN        특허증 갤러리 (12장, 순서는 certifications.html 기준)
MAPPING = {
    # ─── 공용 배너 (21개 페이지) ──────────────────────────────
    "https://cdn.imweb.me/thumbnail/20230113/791b284a7891f.jpg": "banner-default.jpg",

    # ─── 제품 페이지 배너 (각 페이지 1개씩) ───────────────────
    "https://cdn.imweb.me/thumbnail/20221222/24edda5513529.jpg": "banner-machines.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/4e552b68c3627.jpg": "banner-polishing.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/51eef3ddf0f0e.jpg": "banner-double-sided-drilling.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/6d18cc5ce12a9.jpg": "banner-nano-imprinting.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/b449871247f82.jpg": "banner-vertical-grinding.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/eead6bf236b09.jpg": "banner-core-drilling.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/f133a5ab09547.jpg": "banner-grinding-center.jpg",
    "https://cdn.imweb.me/thumbnail/20221222/fcdba84f8f347.jpg": "banner-wire-saws.jpg",  # multi+single 공유

    # ─── index.html 히어로 ────────────────────────────────────
    "https://cdn.imweb.me/thumbnail/20230113/2f5c441e51702.jpg": "hero-home.jpg",

    # ─── 특허증 12장 (certifications.html 갤러리 순서) ───────
    "https://cdn.imweb.me/thumbnail/20230113/8f939eeb9af58.jpg": "cert-01.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/554ad66cbd9dd.jpg": "cert-02.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/777ce4860f186.jpg": "cert-03.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/8ae4ccecaaa81.jpg": "cert-04.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/a74060fc9213f.jpg": "cert-05.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/9b4a580a41a0c.jpg": "cert-06.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/6643fee28380d.jpg": "cert-07.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/8c79f268d1235.jpg": "cert-08.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/c5652ee7f3d73.jpg": "cert-09.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/d751445fa1183.jpg": "cert-10.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/372be58baf8b8.jpg": "cert-11.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/237e2f3a8168d.jpg": "cert-12.jpg",

    # ─── index.html / machines.html 공유 섹션 배경 ────────────
    "https://cdn.imweb.me/thumbnail/20230113/02f3aff90046c.jpg": "home-section-1.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/346fa281e1c2b.jpg": "home-section-2.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/5d7fdecf69011.jpg": "home-section-3.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/622a46eca24a8.jpg": "home-section-4.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/8d7e88eb42a33.jpg": "home-section-5.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/b8d89d1ae9e30.jpg": "home-section-6.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/c64ab0f8fe72b.jpg": "home-section-7.jpg",

    # ─── index.html 본문 사진 ─────────────────────────────────
    "https://cdn.imweb.me/thumbnail/20221210/2ff99ef7dcd3f.jpg": "home-photo-1.jpg",
    "https://cdn.imweb.me/thumbnail/20221210/f94e4826c2620.jpg": "home-photo-2.jpg",
    "https://cdn.imweb.me/thumbnail/20230104/1078acca84e26.jpg": "home-photo-3.jpg",
    "https://cdn.imweb.me/thumbnail/20230104/12dc4d6cf7885.jpg": "home-photo-4.jpg",
    "https://cdn.imweb.me/thumbnail/20230104/7beb925c09e33.jpg": "home-photo-5.jpg",
    "https://cdn.imweb.me/thumbnail/20230104/ab6134a09623d.jpg": "home-photo-6.jpg",
    "https://cdn.imweb.me/thumbnail/20230104/d48ab608caac7.jpg": "home-photo-7.jpg",
    "https://cdn.imweb.me/thumbnail/20230104/d5d0667bf8680.jpg": "home-photo-8.jpg",

    # ─── research.html / index.html 공유 사진 ─────────────────
    "https://cdn.imweb.me/thumbnail/20221117/31e2dd14d83b7.jpg": "research-photo-1.jpg",
    "https://cdn.imweb.me/thumbnail/20221117/7186e531c1f56.jpg": "research-photo-2.jpg",
    "https://cdn.imweb.me/thumbnail/20221117/98e05b8ed4986.jpg": "research-photo-3.jpg",
    "https://cdn.imweb.me/thumbnail/20221117/e80158483f707.jpg": "research-photo-4.jpg",
    "https://cdn.imweb.me/thumbnail/20221125/9c7357fff5815.png": "research-photo-5.png",
    "https://cdn.imweb.me/thumbnail/20221220/569882486fdfb.jpg": "research-photo-6.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/a3388b1064926.jpg": "research-photo-7.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/cfa265c6073d9.jpg": "research-photo-8.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/dd341fa17052b.jpg": "research-photo-9.jpg",
    "https://cdn.imweb.me/thumbnail/20230113/fdf1c5015d995.jpg": "research-photo-10.jpg",

    # ─── 제품 페이지 메인 사진 ────────────────────────────────
    "https://cdn.imweb.me/upload/S20221111c787cba5e5c99/8c8a80b721788.png": "product-double-sided-drilling.png",
    "https://cdn.imweb.me/thumbnail/20221221/48558460356bc.jpg": "product-nano-imprinting-1.jpg",
    "https://cdn.imweb.me/thumbnail/20221221/6b04e8e1d1df1.jpg": "product-nano-imprinting-2.jpg",
    "https://cdn.imweb.me/thumbnail/20221221/e90250bf6508d.png": "product-nano-imprinting-3.png",
    "https://cdn.imweb.me/thumbnail/20260420/226fdf68847cb.png": "product-vertical-grinding.png",
    "https://cdn.imweb.me/thumbnail/20260421/31e821993538a.png": "product-grinding-center.png",
    "https://cdn.imweb.me/thumbnail/20260421/cc2c4d78a779d.png": "product-core-drilling.png",
    "https://cdn.imweb.me/thumbnail/20260421/e03c09cb2fb8e.png": "product-polishing.png",
}

# 일부 CDN은 봇/스크립트 UA를 차단하므로 일반 브라우저 UA로 위장
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
      "AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/124.0.0.0 Safari/537.36")

# SSL context — 일부 CDN은 SNI 누락 시 인증서 오류
SSL_CTX = ssl.create_default_context()


def download(url: str, dest: Path, retries: int = 3, timeout: int = 20) -> tuple[bool, str]:
    """이미지 한 개를 다운로드. (성공여부, 메시지) 반환."""
    if dest.exists() and dest.stat().st_size > 0:
        return True, f"skip (exists, {dest.stat().st_size:,} bytes)"

    last_err = ""
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.saehannanotech.com/"})
            with urllib.request.urlopen(req, timeout=timeout, context=SSL_CTX) as r:
                data = r.read()
            if not data:
                last_err = "empty response"
                continue
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return True, f"ok ({len(data):,} bytes)"
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code} {e.reason}"
        except (urllib.error.URLError, socket.timeout, ConnectionError) as e:
            last_err = f"network: {e}"
        except Exception as e:  # pragma: no cover
            last_err = f"unknown: {e}"
        if attempt < retries:
            time.sleep(1.5 * attempt)
    return False, last_err


def main() -> int:
    here = Path(__file__).resolve().parent.parent
    out_dir = here / "images"
    print(f"Output: {out_dir}")
    print(f"Total assets: {len(MAPPING)}\n")

    ok, fail, skip = 0, 0, 0
    failures: list[tuple[str, str]] = []

    for i, (url, name) in enumerate(MAPPING.items(), 1):
        dest = out_dir / name
        success, msg = download(url, dest)
        marker = "✓" if success else "✗"
        if success and msg.startswith("skip"):
            skip += 1
        elif success:
            ok += 1
        else:
            fail += 1
            failures.append((url, msg))
        # 한 줄 진행 표시
        print(f"  [{i:2d}/{len(MAPPING)}] {marker} {name:36} {msg}")

    print()
    print(f"Summary: {ok} downloaded, {skip} skipped (already present), {fail} failed")
    if failures:
        print("\nFailures (re-run to retry):")
        for url, err in failures:
            print(f"  - {url}\n    {err}")
        return 1
    print("\nAll assets present. You can now safely commit images/ to git.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
