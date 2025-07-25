export interface StoreDetail {
  storeName: string;
  storeId: number;
  imageUrl: string;
  detailAddress: string;
  reviewRating?: number;
  isOpening: boolean;
  startTime: string; // "HH:mm:ss" 형식
  endTime: string; // "HH:mm:ss" 형식
}
