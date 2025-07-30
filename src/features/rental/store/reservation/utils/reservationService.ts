import { createReservation } from '@/features/rental/store/reservation/api/apis';
import { ReservationError } from '@/features/rental/store/reservation/lib/errors';
import { validateReservationData } from '@/features/rental/store/reservation/lib/validation';
import { formatDateForReservation } from '@/features/rental/store/reservation/utils/dataFormatters';

import type { CreateReservationRequest } from '@/features/rental/store/reservation/lib/types';

/**
 * ========================================
 * 예약 요청 데이터 생성 함수들
 * ========================================
 */

/**
 * 예약 요청 데이터 생성 헬퍼 함수
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

/**
 * ========================================
 * 예약 API 호출 함수들
 * ========================================
 */

/**
 * 예약 생성 헬퍼 함수 (유효성 검증 포함)
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
