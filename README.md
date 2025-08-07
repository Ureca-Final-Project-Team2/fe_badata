## 🌊BADATA: 프론트 소개

&nbsp;  
&nbsp;    

<div align="center">

<img width="400" height="225" alt="figma-cover" src="https://github.com/user-attachments/assets/a0ad5c0a-ee08-4fdf-a812-76878be527bf" />  

&nbsp;  

**디지털 자원을 연결하는 통합형 데이터 공유 플랫폼 ‘BADATA’**

_유레카 프론트엔드 개발자 과정 2기 <br/> 최종 융합 프로젝트 2조_  

**팀장** 이시현 ｜ **팀원** 박은서 · 박지회 · 이은채

</div>

&nbsp;  
&nbsp;  

## 📌 프로젝트 개요

| 항목           | 내용                                         |
| -------------- | -------------------------------------------- |
| **프로젝트명** | BADATA (바다(BADA) + DATA)                                      |
| **팀명**       | 2SeaU  (2조 + Sea + UPLUS)                                      |
| **주제**       | LG U+ 공유 데이터 거래 통합 플랫폼          |
| **타겟층**     | 가변적 데이터 소비자 & 임시 인터넷 필요층                 |
| **개발 기간**  | 2025.06.30 ~ 2025.08.07                      |
| **팀 구성**    | 프론트엔드 중심 개발팀 (4명)                |

&nbsp;  
&nbsp;  
&nbsp;  


## ✔️ 서버 실행방법

```ts
npm run dev
```

[배포 페이지](https://badata.store)
홈 경로 뒤에 직접 `/trade`, `/mypage`, `/rental` 명시하여 확인 가능합니다!

&nbsp;  
&nbsp;  
&nbsp;  

## 📢 서비스 주요 기능 소개

### 👤 카카오 소셜 로그인 & 마이페이지

- **카카오 로그인**을 통해 간편 가입 가능
- 맞춤형 서비스: 로그인 사용자는 **데이터 및 기프티콘 구매**, **사용자 맞춤 추천 게시글** 등 모든 기능 이용 가능
- 비로그인 제한: 거래 글 및 공유기 목록 열람만 가능, **게시글 작성 및 대여 신청 제한**
- **마이페이지**에서 제공하는 정보:
  - **데이터 & 코인 잔액**
  - **거래 내역** 
  - **공유기 대여 예약 내역** 
  - **SOS 요청 내역**  
  - 기타 설정 (**알림 설정** 등)

&nbsp;  
&nbsp;  

### 🛒 거래 커뮤니티

- **데이터 및 기프티콘**(유플러스 유독) 거래 가능
- **실시간 탐색 기능**: **최근 검색어, 실시간 인기 검색어**
- **거래 유도**: **실시간 인기 게시물**, **마감 임박 게시글** 제공
- **소셜 기능**: 관심 거래글 **찜하기**, 신뢰/관심 판매자 **팔로우** 가능
- **OCR 자동 인식**: 기프티콘 이미지 업로드 시 **유효성 검사** & **정보 자동 입력**
- **안전 거래**: 사기 의심 및 부적절 게시물 **신고 시스템(3회 누적 시 제재)**
- **다양한 결제**: **실제 구매** + **코인 할인 결제** 가능


&nbsp;  
&nbsp;  

### 💬 추천 시스템

- **스택 카드** 구조로 추천 게시글 직관적 탐색
- **스와이프 인터랙션**: **왼쪽(관심없음)**/**오른쪽 스와이프(찜하기)**
- **시각적 피드백**: **그라데이션 애니메이션** + **액션 라벨** + **액션 힌트**
- **사용자 가이드**: 첫 이용 시 **인터랙티브 튜토리얼** 제공
- **탐색 후 액션**: **이어서 추천**, **찜 목록**, **거래 페이지 이동** CTA 제공

&nbsp;  
&nbsp; 

### 📡 무선 공유기 대여 시스템 (LG U+ 가맹점 기반)

- **지도 기반 시각화**: **위치/거리 기준** 가맹점 필터링
- 상세 정보 제공:
  - **보유 기기 정보**
  - **대여 가능 기기 수량**  
  - **대여 가능 시간**  
- **지도 기반 시각화 UI** 제공:  
  - **줌 아웃: 수량 요약 마커** 
  - **줌 인/클릭: 예약 카드 UI** (네이버 지도 스타일)  
- **예약 관리**: **웨이팅 등록 + 재입고 알림** 시스템
- **리뷰 시스템**: 기기 반납 후 **리뷰쓰기 가능**, 리뷰 작성 시 **코인 보상**

&nbsp;  
&nbsp;  

### 🚨 데이터 SOS 구조 요청 시스템

- **SSE 실시간 통신**: 즉시 데이터 요청/응답 시스템
- **SOS 요청**: 홈 화면의 버튼으로 **100MB 긴급 도움 요청**
- **스마트 매칭**: 접속자 중 **알림 허용을 한 사용자**에게 **푸시 알림** 전송
- **선착순 시스템**: **1명**만 나눔 가능
- **인센티브 구조**: 데이터 나눔 시 **코인 리워드** 지급

&nbsp;  
&nbsp;  
&nbsp;  

## 🧩 서비스 플로우차트

<img width="3965" height="2265" alt="플로우차트" src="https://github.com/user-attachments/assets/ec4ca70e-f566-4c36-8e02-9ea45727576f" />


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

## ❤️ 팀원 소개 및 역할

| 프로필                                                                             | 이름                                                         | 주요 역할 및 기여 내용 |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------ |
| <img src="https://avatars.githubusercontent.com/u/102678331?v=4" width="100" />   | **이시현**<br/>[@sihyuuun](https://github.com/sihyuuun)       | - 프로젝트 초기 세팅 및 구조 설계<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 거래 메인 페이지 담당 <br/>- 추천 페이지 담당 |
| <img src="https://avatars.githubusercontent.com/u/88071251?v=4" width="100" />    | **박은서**<br/>[@arty0928](https://github.com/arty0928)       | - 프로젝트 배포 및 환경 설정<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 공유기 대여 페이지 담당 |
| <img src="https://avatars.githubusercontent.com/u/197379577?v=4" width="100" />   | **박지회**<br/>[@jihoi0615](https://github.com/jihoi0615)     | - 서비스 플로우차트 설계 및 컴포넌트 관리<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 홈, 마이페이지 담당<br/>- SOS 담당 |
| <img src="https://avatars.githubusercontent.com/u/171488704?v=4" width="100" />   | **이은채**<br/>[@eunchrri](https://github.com/eunchrri)       | - 스토리북 세팅 및 컴포넌트 관리<br/>- 기획, 피그마 디자인 및 공통 컴포넌트 제작<br/>- 거래 상세 페이지 담당 <br/> - 온보딩 페이지 구현 |


&nbsp;  
&nbsp;  
&nbsp;  



---

<div align="center">
  
**Team BADATA**  
LG U+ URECA 프론트엔드 개발자 과정 2기  
최종 융합 프로젝트 2조

</div>
