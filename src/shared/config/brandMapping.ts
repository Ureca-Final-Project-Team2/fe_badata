// prettier-ignore
export const BRAND_MAPPING = {
  // OTT/뮤직
  '유튜브 프리미엄': 'youtube_premium',
  'CGV': 'cgv',
  '이모티콘 플러스': 'emoticon_plus',
  '넷플릭스': 'netflix',
  '지니뮤직': 'genie_music',
  '디즈니+': 'disney_plus',
  '배달의 민족': 'baemin',
  '티빙': 'tving',
  'V컬러링': 'v_coloring',

  // 도서/아티클
  '탑툰': 'toptoon',
  '블라이스': 'blice',
  '카카오페이지': 'kakao_page',
  '재담쇼츠': 'jaedam_shorts',
  '리디': 'ridi',
  '예스24': 'yes24',
  '롱블랙': 'long_black',
  '(DBR) 동아 비즈니스 리뷰 디지털': 'dbr',
  '(HBR) 하버드 비즈니스 리뷰 디지털': 'hbr',
  '모바일한경': 'mobile_hk',
  '밀리의서재': 'millie_library',
  '아웃스탠딩': 'outstanding',
  '컬쳐랜드': 'culture_land',
  '스토리텔': 'story_tell',
  '카카오웹툰': 'kakao_webtoon',
  '더중앙플러스': 'the_jungang_plus',

  // 자기개발
  '클래스101+': 'class101',
  '시원스쿨': 'siwonschool',
  '야나두': 'yanadoo',
  '케이크': 'cake',
  '문정아중국어': 'moonjeonga_chinese',

  // 식품
  '폴 바셋': 'paul_bassett',
  '요기요': 'yogiyo',
  'CJ더마켓': 'cj_market',
  '일리': 'illy',
  '메가MGC커피': 'mega_mgc_coffee',
  '배스킨라빈스': 'baskin_robbins',
  '파리바게뜨': 'paris_baguette',
  '파파존스': 'papa_johns',

  // 생활/편의
  '스노우': 'snow',
  '맥아피 시큐리티': 'mcafee_security',
  'GS 칼텍스': 'gs_caltex',
  '다이소': 'daiso',
  'CU': 'cu',

  // 패션/뷰티
  '올리브영': 'oliveyoung',
  '스파오': 'spao',

  // 키즈
  '쿠키즈': 'cookids',

  // 반려동물
  '해피독TV': 'happydog_tv',
} as const;

export type KoreanBrandName = keyof typeof BRAND_MAPPING;
export type EnglishBrandName = (typeof BRAND_MAPPING)[KoreanBrandName];
