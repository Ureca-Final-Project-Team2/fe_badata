/**
 * 예약 관련 에러 클래스
 */
export class ReservationError extends Error {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super(message);
    this.name = 'ReservationError';
  }

  /**
   * 에러 코드에 따른 사용자 친화적 메시지 반환
   */
  getUserMessage(): string {
    switch (this.code) {
      case 4002:
        return '해당 가맹점이 보유한 기기를 찾을 수 없습니다.';
      case 4009:
        return '요청된 장치가 해당 가맹점에 속하지 않습니다.';
      case 4010:
        return '선택한 기간에 해당 장비의 재고가 부족합니다.';
      default:
        return this.message || '예약 처리 중 오류가 발생했습니다.';
    }
  }

  /**
   * 에러가 재시도 가능한지 판단
   */
  isRetryable(): boolean {
    // 4002, 4009는 클라이언트 에러이므로 재시도 불가
    // 4010은 재고 부족이므로 재시도 불가
    // 5xxx는 서버 에러이므로 재시도 가능
    return this.code >= 5000;
  }
}
