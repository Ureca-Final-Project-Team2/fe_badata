## BADATA🌊, 1인 가구를 위한 데이터 공유 및 거래 통합 플랫폼

&nbsp;  
&nbsp;    

<div align="center">

<img width="400" height="225" alt="figma-cover" src="https://github.com/user-attachments/assets/a0ad5c0a-ee08-4fdf-a812-76878be527bf" />  

&nbsp;  

**실시간 데이터 공유의 한계를 체감한 1인 가구를 위한**  
**남는 데이터를 순환시키는 개인 간 데이터 거래 플랫폼 ‘BADATA’**

_유레카 프론트엔드 개발자 2기 최종 융합 프로젝트 2조_  

**팀장** 이시현 ｜ **팀원** 박은서 · 박지회 · 이은채

</div>

&nbsp;  
&nbsp;  

## 📌 프로젝트 개요

| 항목           | 내용                                         |
| -------------- | -------------------------------------------- |
| **프로젝트명** | BADATA                                       |
| **팀명**       | 2SEAU                                        |
| **주제**       | LG U+ 공유 데이터 거래 통합 플랫폼          |
| **타겟층**     | 1인 가구, 소규모 소비자                     |
| **개발 기간**  | 2025.06.30 ~ 2025.08.07                      |
| **팀 구성**    | 프론트엔드 중심 개발팀 (4명)                |

&nbsp;  
&nbsp;  
&nbsp;  

## 📢 서비스 주요 기능 소개

### 👤 회원 관리 (카카오 연동 + 사용자 정보 입력)

- **카카오 로그인**을 통해 간편하게 가입할 수 있습니다.  
- 회원가입 시 이름, 선호 요금제, 위치 정보 입력에 동의하면 **개인 맞춤 추천 및 공유기 예약 서비스** 이용이 가능합니다.  
- 비로그인 사용자는 거래 글 및 공유기 목록 열람만 가능하며, 게시글 작성 및 대여 신청은 제한됩니다.  
- **마이페이지**에서는 다음 정보를 통합적으로 확인할 수 있습니다:  
  - 데이터 & 코인 잔액  
  - 거래 내역  
  - 공유기 대여 예약 내역  
  - SOS 요청 내역  
  - 기타 설정 (알림 설정, 내 위치 변경 등)

&nbsp;  
&nbsp;  

### 💬 거래 게시판 (데이터 / 기프티콘 등록 및 검색)

- 사용자 맞춤 추천 거래 게시글을 기본으로 보여줍니다.  
- **검색창, 최근 검색어, 인기 태그** 기반 탐색 기능 제공  
- **마감 임박 게시글**은 상단 스와이프 배너에 노출되어 빠른 거래를 유도합니다.  
- ‘하트’ 버튼으로 관심 거래글을 찜하고, 마이페이지에서 ‘나의 찜 목록’으로 확인할 수 있습니다.  
- **거래 유형**:  
  - 데이터 거래 게시물  
  - 기프티콘 거래 게시물 (통신사 혜택 기반)  
- 게시글 작성 시 이미지(OCR 처리)를 첨부하면  
  **요금제 또는 기프티콘 정보가 자동 입력**됩니다.

&nbsp;  
&nbsp;  

### 📡 무선 공유기 대여 예약 (LG U+ 가맹점 기반)

- 사용자 위치 또는 거리 기준으로 **가까운 LG U+ 가맹점**을 필터링  
- 가맹점별 정보 제공:  
  - 대여 가능 기기 수량  
  - 대여 가능 시간  
  - 공유기 성능  
- **지도 기반 시각화 UI** 제공:  
  - 줌 아웃: 수량 요약 마커  
  - 줌 인/클릭 시: 예약 카드 UI 제공 (네이버 지도 스타일)  
- 대기자가 있는 경우, **웨이팅 등록 및 알림 설정 기능** 제공

&nbsp;  
&nbsp;  

### 🚨 데이터 SOS 구조 요청 시스템 (데이터 저금통 + 리워드)

- 홈 화면의 **SOS 버튼**을 통해, 데이터 부족 시 **100MB 단위 도움 요청** 가능  
- 데이터 요청 시 **선착순 1명**(데이터제공자)이 해당 데이터를 전달할 수 있으며,  
  데이터 제공자는 **10MB 상당의 코인**을 리워드로 적립받아 .  
- 월말 소멸 예정 데이터는 **저금통에 저장 가능**  
- 저장된 데이터는 **10MB당 코인으로 환산되어 적립**  
- 코인은 앱 내에서 사용 가능:  
  - 리워드 상품 구매 (기프티콘 등)  
  - 데이터 요금제 충전  
  - 리뷰 작성 보상

&nbsp;  
&nbsp;  
&nbsp;  

## ❤️ 팀원 소개 및 역할

| 프로필                                                                             | 이름                                                         | 주요 역할 및 기여 내용 |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------ |
| <img src="https://avatars.githubusercontent.com/u/102678331?v=4" width="100" />   | **이시현**<br/>[@sihyuuun](https://github.com/sihyuuun)       | - 프로젝트 설계 및 구조<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 거래 메인 페이지 **UI 및 API 연동** 담당 |
| <img src="https://avatars.githubusercontent.com/u/88071251?v=4" width="100" />    | **박은서**<br/>[@arty0928](https://github.com/arty0928)       | - 프로젝트 배포 및 환경 설정<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 공유기 대여 페이지 **UI 및 API 연동** 담당 |
| <img src="https://avatars.githubusercontent.com/u/197379577?v=4" width="100" />   | **박지회**<br/>[@jihoi0615](https://github.com/jihoi0615)     | - 서비스 플로우차트 설계<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 마이페이지 **UI 및 API 연동** 담당 |
| <img src="https://avatars.githubusercontent.com/u/171488704?v=4" width="100" />   | **이은채**<br/>[@eunchrri](https://github.com/eunchrri)       | - 스토리북 세팅 및 컴포넌트 관리<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 거래 상세 페이지 **UI 및 API 연동** 담당 |




&nbsp;  
&nbsp;  
&nbsp;  

## 🛠️ 프론트엔드 기술 스택

| 분류               | 기술 스택                                                                 | 도입 이유                                                                                   |
| ------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **프레임워크**      | <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" /> <br/> <img src="https://img.shields.io/badge/App%20Router-000000?style=flat-square&logo=vercel&logoColor=white" /> | 최신 App Router 구조 기반으로, 서버 컴포넌트와 중첩/병렬 라우팅 등 **유연한 구조 설계**에 적합 |
| **언어**           | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> | **정적 타입 검사**를 통해 런타임 오류를 사전에 방지하고 협업 시 명확한 계약을 제공             |
| **상태 관리**       | <img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zotero&logoColor=white" /> | 전역 상태를 **간결하고 효율적으로 관리**할 수 있으며, 불필요한 리렌더링도 최소화됨              |
| **데이터 패칭**     | <img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" /> <br/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" /> | 서버 상태는 React Query로 캐싱·로딩 관리, Axios로 **REST API 요청 모듈화**하여 유지보수 용이    |
| **스타일링**        | <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" /> <br/> <img src="https://img.shields.io/badge/Shadcn_UI-white?style=flat-square&logo=radix-ui&logoColor=black" /> | Tailwind는 **빠르고 일관된 스타일링**, Shadcn은 접근성 높은 UI 컴포넌트 제공                    |
| **컴포넌트 개발**   | <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white" /> | UI를 **독립적으로 개발/테스트/문서화**할 수 있어 디자인 시스템 구성에 유리                     |
| **코드 품질 관리**  | <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" /> <br/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black" /> <br/> <img src="https://img.shields.io/badge/Husky-29C4F6?style=flat-square&logo=git&logoColor=white" /> | 커밋 전 린트/포맷 자동화로 **코드 스타일 일관성** 유지, 협업 생산성 향상                          |
| **번들러 / 빌드 도구** | <img src="https://img.shields.io/badge/Turbopack-000000?style=flat-square&logo=vercel&logoColor=white" /> | Webpack 대비 **빌드 속도와 HMR 성능이 우수**하여 빠른 개발 경험 제공                             |

&nbsp;  
&nbsp;  
&nbsp;  

## 🧩 서비스 플로우차트

<img width="3965" height="2265" alt="플로우차트" src="https://github.com/user-attachments/assets/ee2a67ec-d036-48ca-8e51-715e92d11c90" />


---

<div align="center">
  
**Team BADATA**  
LG U+ URECA 프론트엔드 개발자 과정 2기  
최종 융합 프로젝트 2조

</div>
