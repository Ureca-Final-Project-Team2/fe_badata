export interface RentalHistoryItem {
  id: number;
  storeName: string;
  rentalStartDate: string;
  price: number;
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
