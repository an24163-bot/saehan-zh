# Google Analytics 4 + Baidu + Yandex 등록 가이드

이 문서는 검색 엔진 등록 후 추가로 진행할 수 있는 다음 단계 작업의 가이드입니다.

---

## 📊 1. Google Analytics 4 (GA4) 연동

### 왜 필요한가?
- 방문자 행동 분석 (어느 페이지에서 이탈하는지, 어디서 오는지)
- 국가·디바이스·소스별 트래픽 데이터
- 검색 키워드 → 클릭 → 페이지 방문 → 문의 전환 추적
- 광고/마케팅 ROI 측정의 기반 (페이스북/구글 광고와 연동 가능)

### 단계
1. https://analytics.google.com/ 접속 (Google 계정으로 로그인)
2. "관리(⚙️)" → "+ 만들기" → "계정" 선택
   - 계정 이름: `Saehan Nanotech` (또는 회사명)
3. "+ 만들기" → "속성"
   - **EN 사이트용**: 속성 이름 `Saehan Nanotech (EN)`, 시간대 한국, 통화 USD
4. "비즈니스 정보" 입력 (산업: 제조업, 규모: 1~10명 등)
5. "데이터 수집을 시작" → **"웹"** 선택
6. 스트림 설정:
   - 웹사이트 URL: `https://en.saehannanotech.com`
   - 스트림 이름: `Saehan EN`
7. **측정 ID 받기** (예: `G-XXXXXXXXXX`)
8. 동일 절차로 ZH/JP 속성 생성:
   - ZH: `https://zh.saehannanotech.com` → `G-YYYYYYYYYY`
   - JP: `https://jp.saehannanotech.com` → `G-ZZZZZZZZZZ`
9. **저(Claude)에게 3개 측정 ID를 전달**하면 다음 형식으로 96개 페이지에 일괄 설치:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 전달 형식
```
GA4 측정 ID:
EN: G-XXXXXXXXXX
ZH: G-YYYYYYYYYY
JP: G-ZZZZZZZZZZ
```

### 추가 설정 (선택)
- **Google Search Console과 연동**: GA4 관리 → "Search Console 연결" → 인증 완료된 속성 선택
- **이벤트 추적**: 문의 폼 제출, 제품 페이지 스크롤 깊이, 외부 링크 클릭 등 자동 추적
- **전환 설정**: "문의하기 클릭" 또는 "이메일 클릭"을 전환으로 표시

---

## 🇨🇳 2. Baidu 站长工具 (중국 검색)

### 왜 필요한가?
- 중국 본토 검색 시장 60% 이상 점유 (Google은 차단됨)
- 중국 거래처 신규 발굴, 전시회 유입 활성화

### ⚠️ 주의사항
GitHub Pages는 중국에서 차단된 시기가 있어 **인덱싱이 제한적**일 수 있습니다.
중국 시장이 핵심이라면 다음 중 하나를 검토하세요:
- 中国 호스팅(아리클라우드 / 텐센트 클라우드 / Baidu Cloud)
- Cloudflare Beijing 노드(중국 ICP 라이선스 필요)

### 단계
1. https://ziyuan.baidu.com/ 접속 (Baidu 계정 가입 필요, 한국에서도 가입 가능)
2. "用户中心" → "站点管理" → "添加网站"
3. `https://zh.saehannanotech.com` 입력 (ZH 사이트만 등록)
4. 사이트 소유 확인 — **HTML 标签验证** 선택
   - 표시되는 `<meta name="baidu-site-verification" content="...">` 코드 복사
5. **저에게 코드를 전달**하면 ZH 사이트 32개 페이지에 일괄 적용
6. "链接提交" 메뉴에서 sitemap URL 제출:
   - `https://zh.saehannanotech.com/sitemap.xml`

---

## 🇷🇺 3. Yandex Webmaster (러시아·CIS)

### 왜 필요한가?
- 러시아 검색 시장 50% 이상 점유 (Google보다 우세)
- CIS 국가(우즈베키스탄, 카자흐스탄 등) 시장 진출

### 단계
1. https://webmaster.yandex.com/ 접속
2. Yandex 계정 가입 (Google/Apple/Facebook 로그인 가능)
3. "사이트 추가" → URL 입력 (3개 사이트 각각)
   - `https://en.saehannanotech.com`
   - `https://zh.saehannanotech.com`
   - `https://jp.saehannanotech.com`
4. HTML 메타 태그 인증 선택 → 코드 복사
5. **저에게 코드를 전달** → 일괄 적용
6. "Indexing → Sitemap files" 메뉴에서 sitemap URL 제출

### IndexNow 보너스
- Yandex는 IndexNow의 메인 서포터 중 하나
- robots.txt에 IndexNow 키가 이미 선언되어 있어 **인증만 끝나면 자동으로 인덱싱** 시작

### 전달 형식 (3개 모두 받으면 한 번에 적용)
```
Yandex 인증 메타 태그:
EN: <meta name="yandex-verification" content="...">
ZH: <meta name="yandex-verification" content="...">
JP: <meta name="yandex-verification" content="...">

Baidu 인증 메타 태그 (ZH만):
<meta name="baidu-site-verification" content="...">
```

---

## ✅ 권장 작업 순서

1. **GA4 먼저 진행** — 데이터 수집은 빠르게 시작할수록 좋음. 1~2주 데이터를 모아야 패턴이 보임.
2. **Yandex** — IndexNow 이미 적용되어 있어 인증만 끝나면 즉시 인덱싱.
3. **Baidu** — 중국 시장 타겟이 확실할 때만. 호스팅 검토 병행.

---

## 📈 다음 단계 (이후)

이 가이드의 작업이 모두 완료되면:
- **검색 성과 모니터링 자동화** — 1~2주마다 GSC·Bing·Naver 노출수·클릭수 모아 리포트
- **백링크 확보** — KOTRA, 한국반도체산업협회, 산업 디렉토리, 거래처 사이트 등록
- **콘텐츠 정기 업데이트** — 월 2회 이상 공지/뉴스 페이지 추가 (SEO 순위 유지)

---

작성일: 2026년 5월
버전: v1.0
