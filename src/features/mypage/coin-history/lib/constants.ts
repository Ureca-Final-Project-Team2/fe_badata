export const COIN_HISTORY_DEFAULT_SIZE = 10;

export const COIN_SOURCE_CONFIG = {
  REVIEW_REWARD: {
    text: '🖊️ 리뷰 보상',
    icon: '🖊️',
    isPositive: true,
  },
  SOS_REWARD: {
    text: '🆘 SOS 보상',
    icon: '🆘',
    isPositive: true,
  },
  GIFTICON_PURCHASE: {
    text: '🎁 기프티콘 구매',
    icon: '🎁',
    isPositive: false,
  },
  DATA_PURCHASE: {
    text: '📱 데이터 구매',
    icon: '📱',
    isPositive: false,
  },
} as const;


export type CoinSource = keyof typeof COIN_SOURCE_CONFIG;

export const getSourceText = (source: CoinSource): string => {
  return COIN_SOURCE_CONFIG[source]?.text ?? '기타';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0].replace(/-/g, '.');
};
