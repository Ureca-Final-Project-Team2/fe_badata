import { createReservation } from '@/pages/rental/store/reservation/api/apis';
import { ReservationError } from '@/pages/rental/store/reservation/lib/errors';
import { validateReservationData } from '@/pages/rental/store/reservation/lib/validation';

import type { CreateReservationRequest } from '@/pages/rental/store/reservation/lib/types';

/**
 * 날짜를 ISO 8601 형식으로 변환하는 헬퍼 함수 (Z 제거)
 * @param date Date 객체
 * @returns ISO 8601 형식 문자열 (Z 없이)
 */
export const formatDateForReservation = (date: Date): string => {
  return date.toISOString().slice(0, -1); // 'Z' 제거
};

/**
 * 예약 생성 헬퍼 함수 (유효성 검증 포함)
 * @param reservationData 예약 요청 데이터
 * @returns 예약 ID
 */
export const createReservationWithValidation = async (
  reservationData: CreateReservationRequest,
): Promise<{ success: boolean; reservationId?: number; errors?: string[] }> => {
  try {
    // 1. 유효성 검증
    const validation = validateReservationData(reservationData);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    // 2. API 호출
    const reservationId = await createReservation(reservationData);

    return {
      success: true,
      reservationId,
    };
  } catch (error) {
    if (error instanceof ReservationError) {
      return {
        success: false,
        errors: [error.getUserMessage()],
      };
    }

    return {
      success: false,
      errors: ['예약 처리 중 알 수 없는 오류가 발생했습니다.'],
    };
  }
};

/**
 * 예약 요청 데이터 생성 헬퍼 함수
 * @param params 예약 파라미터
 * @returns 예약 요청 데이터
 */
export const buildReservationRequest = (params: {
  storeId: number;
  devices: Array<{ deviceId: number; count: number }>;
  startDate: Date;
  endDate: Date;
}): CreateReservationRequest => {
  return {
    storeId: params.storeId,
    storeDevices: params.devices.map((device) => ({
      storeDeviceId: device.deviceId,
      count: device.count,
    })),
    rentalStartDate: formatDateForReservation(params.startDate),
    rentalEndDate: formatDateForReservation(params.endDate),
  };
};
