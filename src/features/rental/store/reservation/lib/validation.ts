import type { CreateReservationRequest } from '@/features/rental/store/reservation/lib/types';

/**
 * 예약 데이터 유효성 검증 결과
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * 예약 데이터 유효성 검증 함수
 * @param reservationData 검증할 예약 데이터
 * @returns 유효성 검증 결과
 */
export const validateReservationData = (
  reservationData: CreateReservationRequest,
): ValidationResult => {
  const errors: string[] = [];

  // storeId 검증
  const storeIdError = validateStoreId(reservationData.storeId);
  if (storeIdError) {
    errors.push(storeIdError);
  }

  // storeDevices 검증
  const deviceErrors = validateStoreDevices(reservationData.storeDevices);
  errors.push(...deviceErrors);

  // 날짜 검증
  const dateErrors = validateDates(reservationData.rentalStartDate, reservationData.rentalEndDate);
  errors.push(...dateErrors);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 개별 필드 검증 함수들
 */
export const validateStoreId = (storeId: number): string | null => {
  if (!storeId || storeId <= 0) {
    return '유효한 가맹점을 선택해주세요.';
  }
  return null;
};

export const validateStoreDevices = (
  devices: CreateReservationRequest['storeDevices'],
): string[] => {
  const errors: string[] = [];

  if (!devices || devices.length === 0) {
    errors.push('대여할 장비를 선택해주세요.');
    return errors;
  }

  devices.forEach((device, index) => {
    if (!device.storeDeviceId || device.storeDeviceId <= 0) {
      errors.push(`${index + 1}번째 장비 ID가 유효하지 않습니다.`);
    }
    if (!device.count || device.count <= 0) {
      errors.push(`${index + 1}번째 장비의 수량을 1개 이상 선택해주세요.`);
    }
  });

  return errors;
};

export const validateDates = (startDate: string, endDate: string): string[] => {
  const errors: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (isNaN(start.getTime())) {
    errors.push('유효한 대여 시작 날짜를 선택해주세요.');
  } else if (start < now) {
    errors.push('대여 시작 날짜는 현재 시간 이후여야 합니다.');
  }

  if (isNaN(end.getTime())) {
    errors.push('유효한 대여 종료 날짜를 선택해주세요.');
  } else if (end <= start) {
    errors.push('대여 종료 날짜는 시작 날짜 이후여야 합니다.');
  }

  return errors;
};
