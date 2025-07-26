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
