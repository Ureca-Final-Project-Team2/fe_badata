export type GifticonCategory =
  | 'OTT/뮤직'
  | '도서/아티클'
  | '자기개발'
  | '식품'
  | '생활/편의'
  | '패션/뷰티'
  | '키즈'
  | '반려동물';

export const GIFTICON_CATEGORIES = {
  'OTT/뮤직': [
    '유튜브 프리미엄',
    'CGV',
    '이모티콘 플러스',
    '넷플릭스',
    '지니뮤직',
    '디즈니+',
    '배달의 민족',
    '티빙',
    'V컬러링',
  ],
  '도서/아티클': [
    '탑툰',
    '블라이스',
    '카카오페이지',
    '재담쇼츠',
    '리디',
    '예스24',
    '롱블랙',
    '(DBR) 동아 비즈니스 리뷰 디지털',
    '(HBR) 하버드 비즈니스 리뷰 디지털',
    '모바일한경',
    '밀리의서재',
    '아웃스탠딩',
    '컬쳐랜드',
    '스토리텔',
    '카카오웹툰',
    '더중앙플러스',
  ],
  자기개발: ['클래스101+', '시원스쿨', '야나두', '케이크', '문정아중국어', '아웃스탠딩'],
  식품: [
    '폴 바셋',
    '요기요',
    'CJ더마켓',
    '일리',
    '메가MGC커피',
    '배스킨라빈스',
    '파리바게뜨',
    '파파존스',
  ],
  '생활/편의': ['스노우', '맥아피 시큐리티', 'GS 칼텍스', '일리', '다이소', 'CU'],
  '패션/뷰티': ['올리브영', '스파오'],
  키즈: ['쿠키즈'],
  반려동물: ['해피독TV'],
} as const;

export interface PostTradeGifticonRequest {
  title: string;
  category: GifticonCategory;
  partner: string;
  gifticonNumber: string;
  deadLine: string;
  issueDate: string;
  price: number;
  comment?: string;
  file: File;
}
