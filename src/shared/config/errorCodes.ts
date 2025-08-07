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

  // 추천 게시물
  RECOMMENDATION_FAILED = 3036,

  // 유저 팔로우
  FOLLOW_SELF_ERROR = 2014,
  FOLLOW_USER_NOT_FOUND = 2011,

  // 리뷰
  REVIEW_DELETE_NOT_ALLOWED = 4019,

  // 렌탈
  ALREADY_RENTAL_EXIST_SAME_PERIOD = 4002,
  RESERVATION_NOT_FOUND = 4003,
  CANT_CANCEL_RESERVED_USERS = 4005,
  CANT_RESTOCK_WHEN_AVAILABLE_COUNT = 4006,
  CANT_RESTOCK_MORE_THAN_COUNT = 4007,
  CANT_END_DATE_BEFORE_THAN_START_DATE = 4008,
  DONT_MATCH_STORE_DEVICE_STORE = 4009,
  DONT_MATCH_REVIEW_RESERVATION_OWNER = 4010,
  CANT_FIND_QUICK_REPLY = 4011,
  CANT_ACCESS_TO_OTHER_RESERVATION = 4012,
  CANT_WRITE_REVIEW_IN_SAME_RESERVATION = 4013,
  CANT_ACCESS_TO_OTHER_REVIEW = 4014,
  REVIEW_NOT_FOUND = 4015,
  CANT_RESERVATION_MORE_THAN_COUNT = 4016,
  CANT_FIND_RESTOCK = 4017,
  CANT_DELETE_OTHER_RESTOCK = 4018,
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

  // 추천 게시물
  [ErrorCode.RECOMMENDATION_FAILED]: '추천 게시글 처리에 실패했습니다.',

  // 유저 팔로우
  [ErrorCode.FOLLOW_SELF_ERROR]: '자기 자신을 팔로우할 수 없습니다.',
  [ErrorCode.FOLLOW_USER_NOT_FOUND]: '유저 정보를 찾을 수 없습니다.',

  // 리뷰
  [ErrorCode.REVIEW_DELETE_NOT_ALLOWED]: '작성한 지 7일 이내의 리뷰는 삭제할 수 없습니다.',

  // 랜탈
  [ErrorCode.ALREADY_RENTAL_EXIST_SAME_PERIOD]: '이미 해당 기간에 예약이 존재합니다.',
  [ErrorCode.RESERVATION_NOT_FOUND]: '해당 예약을 찾을 수 없습니다.',
  [ErrorCode.CANT_CANCEL_RESERVED_USERS]: '예약을 진행한 당사자만 예약을 취소할 수 있습니다.',
  [ErrorCode.CANT_RESTOCK_WHEN_AVAILABLE_COUNT]:
    '예약 가능한 상황일 때는 재입고를 신청할 수 없습니다.',
  [ErrorCode.CANT_RESTOCK_MORE_THAN_COUNT]:
    '재입고 알림 대수는 가맹점이 소유한 기기 이상으로 할 수 없습니다.',
  [ErrorCode.CANT_END_DATE_BEFORE_THAN_START_DATE]:
    '예약 재입고 시 시작 날짜는 종료 날짜보다 먼저 와야 합니다.',
  [ErrorCode.DONT_MATCH_STORE_DEVICE_STORE]: '요청된 장치가 해당 가맹점에 속하지 않습니다.',
  [ErrorCode.DONT_MATCH_REVIEW_RESERVATION_OWNER]:
    '리뷰 요청 주체가 예약을 진행한 주체가 아닙니다.',
  [ErrorCode.CANT_FIND_QUICK_REPLY]: '해당 퀵 리플라이를 찾을 수 없습니다.',
  [ErrorCode.CANT_ACCESS_TO_OTHER_RESERVATION]: '다른 사람의 예약 정보는 접근할 수 없습니다.',
  [ErrorCode.CANT_WRITE_REVIEW_IN_SAME_RESERVATION]: '이미 해당 예약에 리뷰를 작성하였습니다.',
  [ErrorCode.CANT_ACCESS_TO_OTHER_REVIEW]: '다른 사람의 리뷰에는 접근할 수 없습니다.',
  [ErrorCode.REVIEW_NOT_FOUND]: '해당 리뷰를 찾을 수 없습니다.',
  [ErrorCode.CANT_RESERVATION_MORE_THAN_COUNT]:
    '예약은 해당 가맹점이 소유한 기기 이상으로 수행할 수 없습니다.',
  [ErrorCode.CANT_FIND_RESTOCK]: '해당 재입고 알림을 찾을 수 없습니다.',
  [ErrorCode.CANT_DELETE_OTHER_RESTOCK]: '다른 사람의 재입고 알림은 삭제할 수 없습니다.',
};
