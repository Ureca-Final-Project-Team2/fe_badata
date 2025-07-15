export interface UserCoin {
  coin: number;
}

export interface UserDataUsage {
  // total: number;
  used: number;
}

export interface SosHistoryItem {
  id: number;
  createdAt: string;
  imageUrl: string;
  merchantName: string;
  menuName: string;
  price: number;
}
