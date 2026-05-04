# 카탈로그 제작 시작 프롬프트 (다른 세션 전용)

다른 세션에서 카탈로그 작업을 시작할 때, 이 폴더 (`C:\Users\an241\OneDrive\바탕 화면\10_개발_스크립트\homepage\saehan-zh-mirror\catalog\`) 를 마운트하시고 아래 프롬프트를 그대로 복사해서 보내주세요.

---

## 🚀 새 세션에 보낼 프롬프트 (이 부분 복사)

```
새한나노텍(Saehan Nanotech)의 영문 회사 소개서(PDF)를 만들어주세요.

## 자료 위치
이 작업 폴더의 catalog/ 안에 모든 reference 자료가 있습니다:
- catalog/REFERENCE_CONTENT_EN.md  ← 영문 사이트 전체 콘텐츠 (회사 소개, CEO 메시지, 연혁, 비즈니스, 인증, R&D, 8개 제품, FAQ, 연락처)
- catalog/IMAGE_ASSETS.md          ← 사용 가능한 이미지 자산 목록과 URL 패턴

이 자료들이 유일한 출처입니다. 임의로 사실을 만들거나 추측하지 마세요. 카탈로그에 들어갈 모든 회사 정보·제품 스펙·인증 내역은 reference 파일에 기재된 그대로 사용해주세요.

## 만들 카탈로그 사양
- 형식: PDF (8~12 페이지)
- 언어: 영문
- 용도: 국제 전시회 배포, 해외 거래처 영업 미팅, 이메일 첨부
- 톤: B2B 산업 장비 회사답게 전문적·신뢰감 있는 톤. 과장된 표현 금지.

## 권장 페이지 구성 (8~12페이지)
1. 표지 — 회사 로고 + 슬로건 + 대표 이미지
2. CEO 메시지 — 짧은 인사말 + CEO 사진(대체 이미지 사용 가능)
3. 회사 개요 — 설립 연도, 본사 위치, 핵심 가치 (Innovation, Quality, Partnership 등)
4. 연혁(History) — 25년 이상의 주요 마일스톤 타임라인
5. 비즈니스 영역(Business Areas) — 반도체·디스플레이·EV·희토류 산업 응용
6~9. 주요 제품 — 8개 중 핵심 4~6개 제품을 한 페이지/제품 또는 두 제품/페이지로 배치
   - Both-Side Drilling Machine (ANT-BSSD500) — 가장 차별화된 자체 특허 제품, 비중 크게
   - Multi Wire Saw (ANT-WS)
   - Single Wire Saw (ANT-SLWS 7H)
   - Grinding Center (ANT-GCT 500B/600B)
   - Step Polishing, Core Drilling, Vertical Grinding, Nano Imprinting
10. 인증 & 특허 — 주요 인증과 특허 번호 리스트, 12개 cert 이미지 그리드
11. R&D / 연구개발 — 국가 연구과제 참여, 신소재 가공 기술
12. 연락처 & 위치 — 주소, 전화, 이메일, 웹사이트(EN/ZH/JP), 지도(world-map.jpg)

## 디자인 가이드
- 메인 컬러: 새한나노텍 코퍼레이트 블루 #004ea1 (사이트와 동일)
- 보조 컬러: 흰색, 다크 그레이 (#222), 라이트 그레이 (#f5f5f5)
- 폰트: 영문은 Inter, Helvetica, 또는 Arial 계열 sans-serif
- 충분한 여백, 큼직한 제품 사진, 짧고 임팩트 있는 카피
- 페이지마다 좌측 또는 하단에 작은 로고+페이지 번호 footer
- 표지와 마지막 페이지는 풀-블리드 이미지 또는 컬러로 강한 인상

## 이미지 사용 권장
- 표지: hero-home.jpg 또는 factory-exterior.jpg
- CEO 페이지: office.jpg (배경)
- 제품 페이지: product-XXX.png (제품 컷) + 디테일 사진 (bssd500-closeup.jpg 등)
- 연혁/R&D: research-photo-X.jpg 시리즈
- 인증: cert-01~12.jpg 그리드
- 마지막 페이지: world-map.jpg (글로벌 서비스 강조)

이미지 URL 패턴: https://en.saehannanotech.com/images/{filename}
필요한 이미지를 다운로드하여 PDF에 임베드해주세요.

## 작업 순서 권장
1. 먼저 catalog/REFERENCE_CONTENT_EN.md를 끝까지 읽고 전체 컨텍스트 파악
2. catalog/IMAGE_ASSETS.md 확인
3. 8~12 페이지 outline을 한국어로 정리해서 사용자에게 보여주고 컨펌
4. 컨펌 후 PDF 작성 시작 (skills/pdf 사용 권장)
5. 결과 PDF는 catalog/ 폴더에 Saehan_Nanotech_Catalog_EN.pdf 로 저장

## 출력 결과
- catalog/Saehan_Nanotech_Catalog_EN.pdf (최종 결과)
- catalog/Saehan_Nanotech_Catalog_EN_outline.md (페이지별 콘텐츠 plan, PDF 만들기 전 작성)
```

---

## 💡 보충 팁

새 세션을 시작할 때:
1. **파일 첨부 또는 폴더 마운트** — 위 catalog/ 폴더를 통째로 작업 폴더로 선택
2. **PDF 스킬 활용** — Claude가 자동으로 `skills/pdf/SKILL.md`를 읽고 전문적인 PDF를 만들 것
3. **페이지별 Outline 컨펌** — PDF 만들기 전에 outline 단계에서 한 번 컨펌 받으면 시간 절약

## 🔁 다국어 카탈로그가 추가로 필요해지면

같은 방식으로 ZH/JP 사이트의 콘텐츠를 추출해 별도 reference 파일을 만들 수 있습니다. 이 세션에 다시 와서 "ZH 카탈로그 reference도 만들어줘"라고 하시면 동일 형식으로 준비해드리겠습니다.

---

작성: 2026년 5월
용도: Saehan Nanotech 영문 회사 소개서 PDF 제작
