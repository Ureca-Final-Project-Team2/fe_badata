// ETC
import backIcon from '@/shared/icons/back-icon.png';
import filterIcon from '@/shared/icons/filter-icon.png';
import likeActive from '@/shared/icons/like-active.png';
import likeNonactive from '@/shared/icons/like-nonactive.png';

// MYPAGE
import coin from '@/shared/icons/coin.png';
import notification from '@/shared/icons/notification.png';
import rentalLike from '@/shared/icons/rental-like-shop.png';
import rentalList from '@/shared/icons/rental-list.png';
import rentalNotification from '@/shared/icons/rental-notification.png';
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
  },
  MYPAGE: {
    COIN: coin,
    TRADE_CEll: tradeCell,
    TRADE_BUY: tradeBuy,
    TRADE_LIKE: tradeLike,
    RENTAL_LIST: rentalList,
    RENTAL_LIKE: rentalLike,
    RENTAL_NOTIFICATION: rentalNotification,
    MYSOS: mySos,
    NOTIFICATION: notification,
  },
};
