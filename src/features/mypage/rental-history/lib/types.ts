export interface RentalHistoryItem {
  id: number;
  storeId: number;
  storeName: string;
  rentalStartDate: string;
  price: number;
  isReviewed: boolean;
  reservationStatus: 'PENDING' | 'COMPLETE';
}

export interface RentalHistoryResponse {
  code: number;
  message: string | null;
  content: {
    item: RentalHistoryItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}
