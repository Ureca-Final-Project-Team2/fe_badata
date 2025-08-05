export interface RentalHistoryItem {
  id: number;
  storeId: number;
  storeName: string;
  rentalStartDate: string;
  rentalEndDate: string;
  price: number;
  isReviewed: boolean;
  reservationStatus: 'PENDING' | 'BURROWING' | 'COMPLETE';
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
