export interface ReviewItem {
  reviewId: number;
  writerId: number;
  name: string;
  userImageUrl: string;
  reviewImageUrl: string;
  comment: string;
  createdAt: string;
  rating: number;
  countOfVisit: number;
  quickReplyNames: string[];
}

export interface ReviewsResponse {
  showReviewResponses: ReviewItem[];
  hasNext: boolean;
}

export interface QuickReplyCount {
  quickReplyName: string;
  count: number;
}

export interface ReviewMetaResponse {
  reviewCount: number;
  showCountPerQuickReplyResponses: QuickReplyCount[];
}

export interface ReviewsQueryParams {
  storeId: number;
  page: number;
  size: number;
  sort: string;
}

export type ReviewSortType = 'latest' | 'rating_high' | 'rating_low';
