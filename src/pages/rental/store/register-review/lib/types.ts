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

export interface PostReviewResponse {
  content: number;
}

export interface ReviewFormState {
  rating: number;
  selectedQuickReplies: number[];
  comment: string;
  image: File | undefined;
}
