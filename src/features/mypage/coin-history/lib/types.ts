export interface CoinHistoryItem {
  id: number;
  usedCoin: number;
  coinSource: string;
  totalCoin: number;
  createdAt: string;
}

export interface CoinHistoryResponse {
  item: CoinHistoryItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface CoinHistoryParams {
  cursor?: number;
  size?: number;
}
