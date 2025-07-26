import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  CreateReservationRequest,
  CreateReservationResponse,
  FetchRentalDevicesParams,
  RentalDevice,
} from '@/pages/rental/store/reservation/lib/types';

/**
 * 특정 가맹점의 예약 가능한 장비 목록 조회
 */
export const fetchRentalDevices = async (
  storeId: number,
  params?: FetchRentalDevicesParams,
): Promise<RentalDevice[]> => {
  try {
    console.log('예약 가능한 장비 조회 요청:', { storeId, params });

    const response = await axiosInstance.get(END_POINTS.RENTAL.AVAILABLE_DEVICE(storeId), {
      params,
    });

    console.log('예약 가능한 장비 조회 응답:', response);

    // axios interceptor에서 이미 response.data를 반환하므로 직접 사용
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error(`가맹점 ${storeId} 예약 가능한 장비 조회 실패:`, error);
    return [];
  }
};

/**
 * 예약 생성 API 함수
 * @param reservationData 예약 요청 데이터
 * @returns 예약 ID (reservationId)
 */
export const createReservation = async (
  reservationData: CreateReservationRequest,
): Promise<number> => {
  try {
    console.log('예약 요청 데이터:', reservationData);

    const response: CreateReservationResponse = await axiosInstance.post(
      END_POINTS.RENTAL.RESERVATIONS,
      reservationData,
    );

    return response.content;
  } catch (error) {
    console.error('예약 생성 실패:', error);
    throw error;
  }
};
