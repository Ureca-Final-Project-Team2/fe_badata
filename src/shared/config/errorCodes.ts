export enum ErrorCode {
  // 거래
  SEARCH_NO_RESULT = 3000,
  TRENDING_SEARCH_FAILED = 3001,
  REPORT_INVALID_TARGET = 3002,
  REPORT_ALREADY_SUBMITTED = 3003,
  LIKES_UNAUTHORIZED = 3004,
  PAYMENT_FAILED = 3005,
  PAYMENT_DUPLICATE = 3006,
  POST_NOT_FOUND = 3007,
  POST_ACCESS_DENIED = 3008,
  USER_NOT_FOUND = 3009,
  RECENT_SEARCH_NOT_FOUND = 3010,
  OCR_PROCESSING_FAILED = 3011,
  EXPIRED_POST_ACCESS = 3012,
  EXPIRED_POST_MODIFY = 3013,
  DELETED_POST_ACCESS_DENIED = 3020,
  // 거래 결제
  SELF_PAYMENT_DENIED = 3023,
  COIN_DECIMAL_NOT_ALLOWED = 3029,
  COIN_NOT_ENOUGH = 3030,
  COIN_EXCEED_PRICE = 3032,

  // 유저 팔로우
  FOLLOW_SELF_ERROR = 2014,
  FOLLOW_USER_NOT_FOUND = 2011,

  // 리뷰
  REVIEW_DELETE_NOT_ALLOWED = 4019,
}

export const ErrorMessageMap: Record<ErrorCode, string> = {
  // 거래
  [ErrorCode.SEARCH_NO_RESULT]: '검색 결과가 존재하지 않습니다.',
  [ErrorCode.TRENDING_SEARCH_FAILED]: '실시간 검색 처리에 실패했습니다.',
  [ErrorCode.REPORT_INVALID_TARGET]: '잘못된 신고 대상입니다.',
  [ErrorCode.REPORT_ALREADY_SUBMITTED]: '이미 신고한 게시글입니다.',
  [ErrorCode.LIKES_UNAUTHORIZED]: '본인 게시글은 찜할 수 없습니다.',
  [ErrorCode.PAYMENT_FAILED]: '결제에 실패했습니다.',
  [ErrorCode.PAYMENT_DUPLICATE]: '이미 거래된 게시글입니다.',
  [ErrorCode.POST_NOT_FOUND]: '해당 게시글을 찾을 수 없습니다.',
  [ErrorCode.POST_ACCESS_DENIED]: '게시글에 접근할 권한이 없습니다.',
  [ErrorCode.USER_NOT_FOUND]: '찾을 수 없는 유저입니다.',
  [ErrorCode.RECENT_SEARCH_NOT_FOUND]: '최근 검색 기록을 찾을 수 없습니다.',
  [ErrorCode.OCR_PROCESSING_FAILED]: 'OCR 처리에 실패했습니다.',
  [ErrorCode.EXPIRED_POST_ACCESS]: '이미 마감 기한이 지난 게시글입니다.',
  [ErrorCode.EXPIRED_POST_MODIFY]: '마감 기한이 지난 게시글은 수정할 수 없습니다.',
  [ErrorCode.DELETED_POST_ACCESS_DENIED]: '삭제된 게시글에 접근할 수 없습니다.',

  // 거래 결제
  [ErrorCode.SELF_PAYMENT_DENIED]: '본인 게시글은 구매할 수 없습니다.',
  [ErrorCode.COIN_DECIMAL_NOT_ALLOWED]: '포인트는 소수점 이하를 사용할 수 없습니다.',
  [ErrorCode.COIN_NOT_ENOUGH]: '포인트가 부족합니다.',
  [ErrorCode.COIN_EXCEED_PRICE]: '포인트는 게시글 가격을 초과할 수 없습니다.',

  // 유저 팔로우
  [ErrorCode.FOLLOW_SELF_ERROR]: '자기 자신을 팔로우할 수 없습니다.',
  [ErrorCode.FOLLOW_USER_NOT_FOUND]: '유저 정보를 찾을 수 없습니다.',

  // 리뷰
  [ErrorCode.REVIEW_DELETE_NOT_ALLOWED]: '작성한 지 7일 이내의 리뷰는 삭제할 수 없습니다.',
};
