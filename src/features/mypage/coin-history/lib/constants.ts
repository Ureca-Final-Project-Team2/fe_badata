export const COIN_HISTORY_DEFAULT_SIZE = 10;

export const COIN_SOURCE_CONFIG = {
  REVIEW_REWARD: {
    text: '리뷰 보상',
    icon: '/images/coin.png',
    isPositive: true,
  },
  SOS_REWARD: {
    text: 'SOS 보상',
    icon: '🆘',
    isPositive: true,
  },
  GIFTICON_PURCHASE: {
    text: '기프티콘 구매',
    icon: '🎁',
    isPositive: false,
  },
  DATA_PURCHASE: {
    text: '데이터 구매',
    icon: '📱',
    isPositive: false,
  },
} as const; 