export interface StoreDetail {
  storeId: number;
  imageUrl: string;
  detailAddress: string;
  phoneNumber: string;
  distanceFromMe: number;
  reviewRating: number;
  isOpening: boolean;
  startTime: string; // "HH:mm:ss" 형식
  endTime: string;   // "HH:mm:ss" 형식
}
