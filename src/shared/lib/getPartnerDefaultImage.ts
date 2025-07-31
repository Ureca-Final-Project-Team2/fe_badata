import type { KoreanBrandName } from '@/shared/config/brandMapping';

/**
 * 파트너별 디폴트 이미지 경로를 반환하는 함수
 * @param partner 파트너명 (한글)
 * @returns 해당 파트너의 디폴트 이미지 경로
 */
export function getPartnerDefaultImage(partner: KoreanBrandName): string {
  switch (partner) {
    // OTT/뮤직
    case '유튜브 프리미엄':
      return '/assets/gifticon/ott-music/bg/YoutubePremium.webp';
    case 'CGV':
      return '/assets/gifticon/ott-music/bg/CGV.png';
    case '이모티콘 플러스':
      return '/assets/gifticon/ott-music/bg/emoticonplus.png';
    case '넷플릭스':
      return '/assets/gifticon/ott-music/NETFLIX_Logo.png';
    case '지니뮤직':
      return '/assets/gifticon/ott-music/bg/genie.png';
    case '디즈니+':
      return '/assets/gifticon/ott-music/bg/Disneyplus.png';
    case '배달의 민족':
      return '/assets/gifticon/ott-music/Baemin_Logo.svg';
    case '티빙':
      return '/assets/gifticon/ott-music/bg/TVING2.png';
    case 'V컬러링':
      return '/assets/gifticon/ott-music/V_Logo.png';

    // 도서/아티클
    case '탑툰':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '블라이스':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '카카오페이지':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '재담쇼츠':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '리디':
      return '/assets/gifticon/book-article/bg/RIDI_bg.png';
    case '예스24':
      return '/assets/gifticon/book-article/bg/Yes24_bg.png';
    case '롱블랙':
      return '/assets/gifticon/book-article/bg/LongBlack.png';
    case '(DBR) 동아 비즈니스 리뷰 디지털':
      return '/assets/gifticon/book-article/bg/DBR_bg.png';
    case '(HBR) 하버드 비즈니스 리뷰 디지털':
      return '/assets/gifticon/book-article/bg/HBR_bg.png';
    case '모바일한경':
      return '/assets/gifticon/book-article/bg/MobileHK_bg.png';
    case '밀리의서재':
      return '/assets/gifticon/book-article/bg/Millie_bg.png';
    case '아웃스탠딩':
      return '/assets/gifticon/book-article/bg/Outstanding_bg.png';
    case '컬쳐랜드':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '스토리텔':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '카카오웹툰':
      return '/assets/gifticon/book-article/bg/book_article_default.png';
    case '더중앙플러스':
      return '/assets/gifticon/book-article/bg/book_article_default.png';

    // 자기개발
    case '클래스101+':
      return '/assets/gifticon/self-development/bg/Class101_bg.png';
    case '시원스쿨':
      return '/assets/gifticon/self-development/bg/Siwon_bg.png';
    case '야나두':
      return '/assets/gifticon/self-development/bg/Yanadoo_bg.png';
    case '케이크':
      return '/assets/gifticon/self-development/bg/Cakeplus_bg.png';
    case '문정아중국어':
      return '/assets/gifticon/self-development/bg/MoonChinese_bg.png';

    // 식품
    case '폴 바셋':
      return '/assets/gifticon/food/bg/PaulBassett_bg.png';
    case '요기요':
      return '/assets/gifticon/food/bg/Yogiyo_bg.png';
    case 'CJ더마켓':
      return '/assets/gifticon/food/bg/TheMarket_bg.png';
    case '일리':
      return '/assets/gifticon/food/bg/Illy_bg.png';
    case '메가MGC커피':
      return '/assets/gifticon/food/bg/Mega_bg.png';
    case '배스킨라빈스':
      return '/assets/gifticon/food/bg/BaskinRobbins_bg.webp';
    case '파리바게뜨':
      return '/assets/gifticon/food/bg/ParisBaguette_bg.jpg';
    case '파파존스':
      return '/assets/gifticon/food/bg/PapaJohns_bg.jpg';

    // 생활/편의
    case '스노우':
      return '/assets/gifticon/lifestyle/bg/Snow_bg.png';
    case '맥아피 시큐리티':
      return '/assets/gifticon/lifestyle/bg/Mc_bg.png';
    case 'GS 칼텍스':
      return '/assets/gifticon/lifestyle/bg/GS_bg.png';
    case '다이소':
      return '/assets/gifticon/lifestyle/bg/Daiso_bg.png';
    case 'CU':
      return '/assets/gifticon/lifestyle/bg/CU_bg.jpg';

    // 패션/뷰티
    case '올리브영':
      return '/assets/gifticon/fashion-beauty/bg/OliveYoung_bg.jpg';
    case '스파오':
      return '/assets/gifticon/fashion-beauty/bg/SPAO_bg.jpg';

    // 키즈
    case '쿠키즈':
      return '/assets/gifticon/kids/bg/COOKIDS_bg.png';

    // 반려동물
    case '해피독TV':
      return '/assets/gifticon/pet/bg/HappyDog_bg.png';

    default:
      return '/assets/trade-detail.jpg'; // 기본 이미지
  }
}
