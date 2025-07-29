export interface SosHistoryItem {
  sosId: number;
  responderId: number | null;
  createdAt: string;
  dataAmount: string;
  isSuccess: boolean;
}

export interface SosHistoryResponse {
  code: number;
  message: string | null;
  content: {
    item: SosHistoryItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}
