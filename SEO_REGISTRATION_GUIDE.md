# 검색 엔진 등록 가이드 (3개 사이트 공통)

이 가이드는 새한나노텍 EN/ZH/JP 3개 사이트를 주요 검색 엔진에 등록하는 단계별 안내입니다. 모든 사이트에 SEO 강화(JSON-LD 구조화 데이터, 메타 태그)와 IndexNow 키가 이미 적용되어 있으므로, 콘솔 등록만 완료하면 검색 노출이 시작됩니다.

---

## 📋 사이트 정보

| 사이트 | 도메인 | GitHub Pages 임시 URL |
|---|---|---|
| 🇺🇸 영문 | https://en.saehannanotech.com | https://an24163-bot.github.io/saehan-en/ |
| 🇨🇳 중문 | https://zh.saehannanotech.com | https://an24163-bot.github.io/saehan-zh/ |
| 🇯🇵 일문 | https://jp.saehannanotech.com | https://an24163-bot.github.io/saehan-jp/ |

**Sitemap URL**: 각 사이트의 `https://[도메인]/sitemap.xml`
**IndexNow 키**: `5d6c70cfd60129ff5d93000b96505422` (3개 사이트 공통, 이미 배포됨)

---

## 🚀 1. Google Search Console (가장 중요)

전 세계에서 가장 큰 검색 엔진. 영문/중문/일문 모두 등록 필요.

### 단계
1. https://search.google.com/search-console 접속 (Google 계정 필요)
2. 좌측 상단 "속성 추가" → "URL 접두어" 선택
3. 3개 도메인을 각각 추가:
   - `https://en.saehannanotech.com`
   - `https://zh.saehannanotech.com`
   - `https://jp.saehannanotech.com`
4. 소유권 인증 — **HTML 메타 태그 방식 권장**
   - "기타 인증 방법" → "HTML 태그" 선택
   - 표시되는 `<meta name="google-site-verification" content="...">` 코드 복사
   - 저(Claude)에게 코드를 전달하면 3개 사이트 head에 일괄 추가하고 푸시
5. 인증 완료 후 좌측 메뉴 "Sitemaps" → 사이트맵 URL 입력 → 제출
   - `sitemap.xml` (도메인은 자동 인식)

### 검증 도구
- 리치 결과 테스트: https://search.google.com/test/rich-results
  - 각 페이지 URL 입력해서 Product/FAQ/Article schema 정상 인식 확인

---

## 🇰🇷 2. Naver Search Advisor (한국 검색 핵심)

한국 시장에 노출하려면 필수. 모든 3개 사이트 등록 가능.

### 단계
1. https://searchadvisor.naver.com/ 접속 (네이버 계정 필요)
2. "웹마스터도구" → "사이트 등록"
3. 3개 도메인 각각 입력 후 "확인"
4. 사이트 소유 확인 — **HTML 태그 방식**
   - 표시되는 `<meta name="naver-site-verification" content="...">` 코드 복사
   - 저에게 코드를 전달
5. 인증 완료 후 "요청" → "사이트맵 제출" → URL 입력
6. "RSS 제출"도 함께 진행 가능 (선택)

### 추가 활용
- "네이버 검색반영 요청" 메뉴에서 개별 URL 인덱싱 즉시 요청 가능
- IndexNow는 네이버도 지원하므로 키 등록만 하면 자동 통보됨

---

## 🇨🇳 3. Baidu 站长工具 (중문 사이트 한정)

ZH 사이트만 등록. 중국 시장 진출 시 필수.

### 주의사항
⚠️ **중국 본토에서 호스팅되지 않은 사이트는 인덱싱이 제한적**입니다. GitHub Pages는 중국에서 차단된 시기가 있어, 실제 노출을 위해서는 향후 중국 내 호스팅(아리클라우드, 텐센트클라우드 등) 또는 CDN(클라우드플레어 베이징 노드 등) 검토 필요.

### 단계
1. https://ziyuan.baidu.com/ 접속 (Baidu 계정 필요, 한국에서 가입 가능)
2. "用户中心" → "站点管理" → "添加网站"
3. `https://zh.saehannanotech.com` 입력
4. 사이트 소유 확인 — **HTML 标签验证**
   - 표시되는 `<meta name="baidu-site-verification" content="...">` 코드 복사
   - 저에게 전달
5. "链接提交" 메뉴에서 sitemap URL 제출

---

## 🇺🇸 4. Bing Webmaster Tools

영문 사이트 위주이지만 3개 모두 등록 가능. **Google Search Console에서 직접 가져오기 가능 (가장 빠름)**.

### 단계 (방법 A: Google Console import)
1. https://www.bing.com/webmasters 접속
2. "Google Search Console에서 가져오기" 선택
3. Google 계정 연동 → 등록된 사이트들이 자동 import됨

### 단계 (방법 B: 수동 등록)
1. "사이트 추가" → URL 입력
2. "메타 태그 추가" 인증 → 코드 받아 저에게 전달
3. 좌측 "Sitemaps" → URL 제출

### IndexNow 자동 활용
- Bing은 IndexNow 프로토콜의 메인 서포터
- robots.txt에 IndexNow 선언이 이미 있으므로 콘솔에서 별도 키 제출 불필요

---

## 🌐 5. Yandex Webmaster (러시아·CIS, IndexNow 지원)

러시아 시장 진출 가능성이 있다면 등록.

### 단계
1. https://webmaster.yandex.com/ 접속
2. "사이트 추가" → URL 입력
3. HTML 메타 태그로 인증 → 저에게 전달
4. "Indexing → Sitemap files" 메뉴에서 sitemap URL 제출

---

## ⚡ IndexNow (이미 적용됨)

IndexNow는 변경된 페이지 URL을 검색 엔진에 즉시 알리는 프로토콜입니다. **별도 등록 불필요**.

지원 검색 엔진:
- Microsoft Bing
- Naver
- Yandex
- Seznam.cz

배포 상태:
- ✅ 키 파일: `https://[도메인]/5d6c70cfd60129ff5d93000b96505422.txt` (3개 사이트 모두)
- ✅ robots.txt에 `IndexNow: 5d6c70cfd60129ff5d93000b96505422` 선언

콘텐츠 변경 시 IndexNow API 호출 명령어 (수동 알림용, 일괄 처리 가능):
```bash
curl -X POST 'https://api.indexnow.org/IndexNow' \
  -H 'Content-Type: application/json' \
  -d '{
    "host": "en.saehannanotech.com",
    "key": "5d6c70cfd60129ff5d93000b96505422",
    "keyLocation": "https://en.saehannanotech.com/5d6c70cfd60129ff5d93000b96505422.txt",
    "urlList": [
      "https://en.saehannanotech.com/index.html",
      "https://en.saehannanotech.com/double-sided-drilling.html"
    ]
  }'
```

---

## 📝 인증 메타 태그를 받으셨다면

각 검색 엔진에서 받은 인증 메타 태그를 저에게 알려주시면 다음 형식으로 한 번에 적용해드립니다:

```
Google Search Console:
  EN: <meta name="google-site-verification" content="XXXX">
  ZH: <meta name="google-site-verification" content="YYYY">
  JP: <meta name="google-site-verification" content="ZZZZ">

Naver Search Advisor:
  EN: <meta name="naver-site-verification" content="...">
  ZH: <meta name="naver-site-verification" content="...">
  JP: <meta name="naver-site-verification" content="...">

Bing Webmaster (Google import 시 불필요):
  ...

Baidu (ZH만):
  <meta name="baidu-site-verification" content="...">

Yandex:
  ...
```

각 사이트마다 별도 인증 코드를 받아야 합니다 (한 번에 하나씩 콘솔에서 발급).

---

## ✅ 권장 작업 순서

1. **Google Search Console** 3개 사이트 등록 → 인증 코드 받아서 저에게 전달 → 사이트 적용 → sitemap 제출
2. **Naver Search Advisor** 등록 (한국 시장 필수) → 인증 코드 → 적용 → sitemap 제출
3. **Bing Webmaster** Google 연동으로 자동 import (가장 간편)
4. **Baidu** (ZH만, 중국 진출 시) 또는 **Yandex** (러시아 진출 시) 선택적 등록
5. 인덱싱 시작 후 1~2주 모니터링 → "검색결과 노출수" / "노출된 키워드" 확인

---

## 📊 인덱싱 상태 모니터링

각 콘솔에서 확인:
- **Google**: "성능" 보고서 → 노출수, 클릭수, 평균 CTR
- **Naver**: "사이트 진단" → "노출 분석"
- **Bing**: "검색 성능" → 노출수와 클릭수
- **Baidu**: "数据统计" → 索引量 (인덱싱된 페이지 수)

**주의**: SEO 효과는 일반적으로 등록 후 4~12주 사이 점진적으로 나타납니다. 첫 1주는 인덱싱 중이라 결과가 반영되지 않을 수 있습니다.

---

## 🛠 추가 최적화 팁 (선택)

1. **Google Analytics 4 (GA4)** 연동 — 방문자 행동 분석
2. **Google Tag Manager** 도입 — 추후 픽셀, 이벤트 추적 통합 관리
3. **백링크** — 거래처 사이트, 업계 디렉토리, 보도자료 등에 사이트 URL 노출
4. **콘텐츠 정기 업데이트** — 공지사항/뉴스 페이지 주기적 추가가 검색 순위 유지에 도움

---

작성일: 2026년
버전: v1.0
