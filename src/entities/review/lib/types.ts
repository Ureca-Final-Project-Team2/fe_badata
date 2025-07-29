export interface QuickReply {
  quickReplyId: number;
  quickReplyName: string;
}

export interface ReservationDevice {
  deviceName: string;
  dataCapacity: number;
  price: number;
  count: number;
}

export interface ReservationDetails {
  storeId: number;
  storeImageUrl: string;
  storeName: string;
  showReservedDeviceResponses: ReservationDevice[];
  countOfVisit: number;
}

export interface PostReviewRequest {
  reservationId: number;
  quickReplyIds: number[];
  comment: string;
  rating: number;
  file?: File | undefined;
}

// Post/Delete/Put ReviewResponse는 content: number만 받아오므로 타입 통합
export interface ReviewResponse {
  content: number;
}

export interface PutReviewRequest {
  quickReplyIds: number[];
  comment: string;
  rating: number;
  file?: File | undefined;
}

export interface ReviewFormState {
  rating: number;
  selectedQuickReplies: number[];
  comment: string;
  image: File | undefined;
}
