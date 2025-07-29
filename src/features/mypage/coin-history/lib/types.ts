export interface UserCoin {
  coin: number;
}

export interface CoinHistoryItem {
  id: number;
  usedCoin: number;
  coinSource: 'REVIEW_REWARD' | 'SOS_REWARD' | 'GIFTICON_PURCHASE' | 'DATA_PURCHASE';
  totalCoin: number | null;
  createdAt: string;
}

export interface CoinHistoryResponse {
  item: CoinHistoryItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface CoinHistoryParams {
  cursor?: number;
  size?: number;
}
