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
};
