/**
 * 예약 관련 타입 정의
 */

/*
  예약 가능한 장비 정보
*/
export interface RentalDevice {
  storeDeviceId: number;
  deviceId: number;
  deviceName: string;
  dataCapacity: number;
  imageUrl: string;
  availableCount: number; // 예약 가능한 수량
  totalCount: number; // 총 수량
  price: number; // 가격
}

/*
  예약 가능한 장비 조회 파라미터
*/
export interface FetchRentalDevicesParams {
  rentalStartDate?: string;
  rentalEndDate?: string;
}

/**
 * 예약할 장비 정보
 */
export interface ReservationStoreDevice {
  storeDeviceId: number;
  count: number;
}

/**
 * 예약 요청 데이터
 */
export interface CreateReservationRequest {
  storeDevices: ReservationStoreDevice[];
  rentalStartDate: string; // ISO 8601 형식
  rentalEndDate: string; // ISO 8601 형식
  storeId: number;
}

/**
 * 예약 성공 응답
 */
export interface CreateReservationResponse {
  code: number;
  message: string | null;
  content: number; // reservationId
}

/**
 * 예약 에러 응답
 */
export interface ReservationErrorResponse {
  code: number;
  message: string;
  content: null;
}

/**
 * 예약 에러 코드 상수
 */
export const RESERVATION_ERROR_CODES = {
  DEVICE_NOT_FOUND: 4002,
  DEVICE_NOT_BELONG_TO_STORE: 4009,
  DEVICE_COUNT_EXCEEDED: 4010, // 추정된 에러 코드
} as const;

/**
 * 예약 에러 메시지 상수
 */
export const RESERVATION_ERROR_MESSAGES = {
  [RESERVATION_ERROR_CODES.DEVICE_NOT_FOUND]: '해당 가맹점이 보유한 기기를 찾을 수 없습니다',
  [RESERVATION_ERROR_CODES.DEVICE_NOT_BELONG_TO_STORE]:
    '요청된 장치가 해당 가맹점에 속하지 않습니다.',
} as const;

/**
 * ========================================
 * 재입고 알림 관련 타입 정의
 * ========================================
 */

/**
 * 재입고 알림 요청 데이터
 */
export interface RestockNotificationRequest {
  storeDeviceId: number;
  count: number;
  desiredStartDate: string; // ISO 8601 format
  desiredEndDate: string; // ISO 8601 format
}

/**
 * 재입고 알림 응답 데이터
 */
export interface RestockNotificationResponse {
  code: number;
  message: string | null;
  content: number | null;
}

/**
 * 재입고 알림 에러 코드
 */
export const RESTOCK_ERROR_CODES = {
  EXCEED_STORE_CAPACITY: 4008,
  RESERVATION_AVAILABLE: 4006,
} as const;

/**
 * 재입고 알림 에러 메시지
 */
export const RESTOCK_ERROR_MESSAGES = {
  [RESTOCK_ERROR_CODES.EXCEED_STORE_CAPACITY]:
    '재입고 알림 대수는 가맹점이 소유한 기기 이상으로 할 수 없습니다',
  [RESTOCK_ERROR_CODES.RESERVATION_AVAILABLE]:
    '예약 가능한 상황일 때는 재입고를 신청할 수 없습니다',
  DEFAULT: '재입고 알림 신청 중 오류가 발생했습니다',
} as const;
