export interface QuickReply {
  quickReplyId: number;
  quickReplyName: string;
}

export interface ReviewDevice {
  deviceName: string;
  dataCapacity: number;
  price: number;
  count: number;
}

export interface ReviewDetailResponse {
  reviewId: number;
  writerId: number;
  reservationId: number;
  rating: number;
  comment: string;
  reviewImageUrl: string;
  createdAt: string;
  updatedAt: string;
  quickReplyIds: number[];
  showRentalResponses: {
    storeId: number;
    storeImageUrl: string;
    storeName: string;
    showReservedDeviceResponses: ReviewDevice[];
    countOfVisit: number;
  };
}

export interface ReservationDetails {
  storeId: number;
  storeImageUrl: string;
  storeName: string;
  showReservedDeviceResponses: ReviewDevice[];
  countOfVisit: number;
}

export interface PostReviewRequest {
  reservationId: number;
  quickReplyIds: number[];
  comment: string;
  rating: number;
  file?: File;
}

export interface UpdateReviewRequest {
  quickReplyIds: number[];
  comment: string;
  rating: number;
  file?: File;
}

export interface PostReviewResponse {
  content: number;
}

export interface ReviewFormState {
  rating: number;
  selectedQuickReplies: number[];
  comment: string;
  image: string | File | undefined;
}
