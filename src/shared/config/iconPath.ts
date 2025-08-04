/* prettier-ignore */
// ETC
import backIcon from '@/shared/icons/back-icon.png';
import coinStack from '@/shared/icons/coin-stack.png';
// MYPAGE
import coin from '@/shared/icons/coin.png';
import filterIcon from '@/shared/icons/filter-icon.png';
import likeActive from '@/shared/icons/like-active.png';
import likeNonactive from '@/shared/icons/like-nonactive.png';
import likeActiveHalf from '@/shared/icons/like_active_half.png';
import notification from '@/shared/icons/notification.png';
import rentalLike from '@/shared/icons/rental-like-shop.png';
import rentalList from '@/shared/icons/rental-list.png';
import rentalNotification from '@/shared/icons/rental-notification.png';
import shell from '@/shared/icons/shell.png';
import mySos from '@/shared/icons/sos-siren.png';
import tradeBuy from '@/shared/icons/trade-buy-list.png';
import tradeCell from '@/shared/icons/trade-cell-list.png';
import tradeLike from '@/shared/icons/trade-like-list.png';

export const ICONS = {
  LOGO: {
    BADATA: '/assets/logo-badata.png',
    SOS: '/assets/logo-sos.svg',
    DETAIL: '/assets/trade-detail.jpg',
    SAMPLE: '/assets/trade-sample.png',
  },
  ETC: {
    LIKE_ACTIVE: likeActive,
    LIKE_NONACTIVE: likeNonactive,
    BACKICON: backIcon,
    FILTERICON: filterIcon,
    LIKE_ACTIVE_HAㄴLF: likeActiveHalf,
    SHELL: shell,
    SPINNER: '/assets/spinner.gif',
  },
  MYPAGE: {
    COIN: coin,
    COIN_STACK: coinStack,
    TRADE_CELL: tradeCell,
    TRADE_BUY: tradeBuy,
    TRADE_LIKE: tradeLike,
    RENTAL_LIST: rentalList,
    RENTAL_LIKE: rentalLike,
    RENTAL_NOTIFICATION: rentalNotification,
    MYSOS: mySos,
    NOTIFICATION: notification,
  },
  TRADE: {
    BRAND_LOGO: {
      // Data Default img
      DATA_DEFAULT: '/assets/data/Data_Default.png',
      KT: '/assets/data/KT_Logo.png',
      UPLUS: '/assets/data/LGU_Logo.png',
      SKT: '/assets/data/SKT_Logo.png',
    },
  },
  GIFTICON: {
    BRAND_LOGO: {
      // Gifticon Default img
      GIFTICON_DEFAULT: '/assets/gifticon/Gifticon_Default.svg',

      // OTT/뮤직
      YOUTUBE_PREMIUM: '/assets/gifticon/ott-music/YouTube_Logo.png',
      CGV: '/assets/gifticon/ott-music/CGV_Logo.png',
      EMOTICON_PLUS: '/assets/gifticon/ott-music/Emoticon_Logo.png',
      NETFLIX: '/assets/gifticon/ott-music/NEFLIX_Logo.png',
      GENIE_MUSIC: '/assets/gifticon/ott-music/Genie_Logo.png',
      DISNEY_PLUS: '/assets/gifticon/ott-music/Disney_Logo.png',
      BAEMIN: '/assets/gifticon/ott-music/Baemin_Logo.png',
      TVING: '/assets/gifticon/ott-music/TVING_Logo.png',
      V_COLORING: '/assets/gifticon/ott-music/V_Logo.png',

      // 도서/아티클
      TOPTOON: '/assets/gifticon/book-article/Toptoon_Logo.png',
      BLICE: '/assets/gifticon/book-article/Blice_Logo.png',
      KAKAO_PAGE: '/assets/gifticon/book-article/kakaopage_Logo.png',
      JAEDAM_SHORTS: '/assets/gifticon/book-article/Jaedam_Logo.png',
      RIDI: '/assets/gifticon/book-article/RIDI_Logo.png',
      YES24: '/assets/gifticon/book-article/Yes24_Logo.png',
      LONG_BLACK: '/assets/gifticon/book-article/LongBlack_Logo.png',
      DBR: '/assets/gifticon/book-article/DBR_Logo.png',
      HBR: '/assets/gifticon/book-article/HBR_Logo.png',
      MOBILE_HK: '/assets/gifticon/book-article/MobileHG_Logo.png',
      MILLIE_LIBRARY: '/assets/gifticon/book-article/Millie_Logo.png',
      OUTSTANDING: '/assets/gifticon/book-article/OUTSTANDING_Logo.png',
      CULTURE_LAND: '/assets/gifticon/book-article/Cultureland_Logo.png',
      STORY_TELL: '/assets/gifticon/book-article/Storytel_Logo.png',
      KAKAO_WEBTOON: '/assets/gifticon/book-article/KakaoWebtoon_Logo.png',
      THE_JUNGANG_PLUS: '/assets/gifticon/book-article/TheJungang_Logo.png',

      // 자기개발
      CLASS101: '/assets/gifticon/self-development/Class101_Logo.png',
      SIWON_SCHOOL: '/assets/gifticon/self-development/Siwonschool_Logo.png',
      YANADOO: '/assets/gifticon/self-development/Yanadoo_Logo.png',
      CAKE: '/assets/gifticon/self-development/Cake_Logo.png',
      MOONJEONGA_CHINESE: '/assets/gifticon/self-development/MoonChinese_Logo.png',

      // 식품
      PAUL_BASSETT: '/assets/gifticon/food/PaulBassett_Logo.png',
      YOGIYO: '/assets/gifticon/food/Yogiyo_Logo.png',
      CJ_MARKET: '/assets/gifticon/food/CJtheMarket_Logo.png',
      ILIY: '/assets/gifticon/food/Illy_Logo.png',
      MEGA_MGC_COFFEE: '/assets/gifticon/food/Megacoffee_Logo.png',
      BASKIN_ROBBINS: '/assets/gifticon/food/BR_Logo.png',
      PARIS_BAGUETTE: '/assets/gifticon/food/PB_Logo.png',
      PAPA_JOHNS: '/assets/gifticon/food/PAPAJOHNS_Logo.png',

      // 생활/편의
      SNOW: '/assets/gifticon/lifestyle/SNOW_Logo.png',
      MC_AFEE_SECURITY: '/assets/gifticon/lifestyle/McAfee_Logo.png',
      GS_CALTEX: '/assets/gifticon/lifestyle/GS_Logo.png',
      DAISO: '/assets/gifticon/lifestyle/Daiso_Logo.png',
      CU: '/assets/gifticon/lifestyle/CU_Logo.png',

      // 패션/뷰티
      OLIVEYOUNG: '/assets/gifticon/fashion-beauty/OliveYoung_Logo.png',
      SPAO: '/assets/gifticon/fashion-beauty/SPAO_Logo.png',

      // 키즈
      COOKIDS: '/assets/gifticon/kids/COOKIDS_Logo.png',

      // 반려동물
      HAPPYDOG_TV: '/assets/gifticon/pet/HappyDogTV_Logo.png',
    },
  } as const,
};
/* prettier-ignore-end */
