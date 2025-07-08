export enum ErrorCode {}
// 커스텀 에러 코드
// 예시) RENTAL_HISTORY_NOT_FOUND = 2002,

export const ErrorMessageMap: Record<ErrorCode, string> = {
  // 커스텀 에러 코드, 에러 메시지
  // 예시) [ErrorCode.RENTAL_HISTORY_NOT_FOUND]: '렌탈 내역이 존재하지 않습니다.',
};
