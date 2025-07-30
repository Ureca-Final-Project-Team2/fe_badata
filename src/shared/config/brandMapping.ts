// prettier-ignore
export const BRAND_MAPPING = {
  // OTT/뮤직
  '유튜브 프리미엄': 'YOUTUBE_PREMIUM',
  'CGV': 'CGV',
  '이모티콘 플러스': 'EMOTICON_PLUS',
  '넷플릭스': 'NETFLIX',
  '지니뮤직': 'GENIE_MUSIC',
  '디즈니+': 'DISNEY_PLUS',
  '배달의 민족': 'BAEMIN',
  '티빙': 'TVING',
  'V컬러링': 'V_COLORING',

  // 도서/아티클
  '탑툰': 'TOPTOON',
  '블라이스': 'BLICE',
  '카카오페이지': 'KAKAO_PAGE',
  '재담쇼츠': 'JAEDAM_SHORTS',
  '리디': 'RIDI',
  '예스24': 'YES24',
  '롱블랙': 'LONG_BLACK',
  '(DBR) 동아 비즈니스 리뷰 디지털': 'DBR',
  '(HBR) 하버드 비즈니스 리뷰 디지털': 'HBR',
  '모바일한경': 'MOBILE_HK',
  '밀리의서재': 'MILLIE_LIBRARY',
  '아웃스탠딩': 'OUTSTANDING',
  '컬쳐랜드': 'CULTURE_LAND',
  '스토리텔': 'STORY_TELL',
  '카카오웹툰': 'KAKAO_WEBTOON',
  '더중앙플러스': 'THE_JUNGANG_PLUS',

  // 자기개발
  '클래스101+': 'CLASS101',
  '시원스쿨': 'SIWON_SCHOOL',
  '야나두': 'YANADOO',
  '케이크': 'CAKE',
  '문정아중국어': 'MOONJEONGA_CHINESE',

  // 식품
  '폴 바셋': 'PAUL_BASSETT',
  '요기요': 'YOGIYO',
  'CJ더마켓': 'CJ_MARKET',
  '일리': 'ILIY',
  '메가MGC커피': 'MEGA_MGC_COFFEE',
  '배스킨라빈스': 'BASKIN_ROBBINS',
  '파리바게뜨': 'PARIS_BAGUETTE',
  '파파존스': 'PAPA_JOHNS',

  // 생활/편의
  '스노우': 'SNOW',
  '맥아피 시큐리티': 'MC_AFEE_SECURITY',
  'GS 칼텍스': 'GS_CALTEX',
  '다이소': 'DAISO',
  'CU': 'CU',

  // 패션/뷰티
  '올리브영': 'OLIVEYOUNG',
  '스파오': 'SPAO',

  // 키즈
  '쿠키즈': 'COOKIDS',

  // 반려동물
  '해피독TV': 'HAPPYDOG_TV',
} as const;

export type KoreanBrandName = keyof typeof BRAND_MAPPING;
export type EnglishBrandName = (typeof BRAND_MAPPING)[KoreanBrandName];
