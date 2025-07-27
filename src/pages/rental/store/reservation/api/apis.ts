import {
  RESTOCK_ERROR_CODES,
  RESTOCK_ERROR_MESSAGES,
} from '@/pages/rental/store/reservation/lib/types';
import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  CreateReservationRequest,
  CreateReservationResponse,
  FetchRentalDevicesParams,
  RentalDevice,
  RestockNotificationRequest,
  RestockNotificationResponse,
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

/**
 * ========================================
 * 재입고 알림 관련 API
 * ========================================
 */

/**
 * 재입고 알림 신청 API
 */
export const requestRestockNotification = async (
  data: RestockNotificationRequest,
): Promise<{ success: boolean; notificationId?: number; error?: string }> => {
  try {
    console.log('📦 재입고 알림 신청 요청:', data);

    const response = await axiosInstance.post(END_POINTS.RENTAL.RESTOCK, data);

    console.log('📦 재입고 알림 신청 응답:', response);

    // axios interceptor가 성공 시 content만 반환하는 경우 (숫자가 반환됨)
    if (typeof response === 'number') {
      return {
        success: true,
        notificationId: response,
      };
    }

    // 전체 응답 객체가 반환되는 경우
    if (response && typeof response === 'object' && 'code' in response) {
      const fullResponse = response as unknown as RestockNotificationResponse;

      // 성공 응답 처리
      if (fullResponse.code === 20000) {
        return {
          success: true,
          notificationId: fullResponse.content || undefined,
        };
      }

      // 에러 응답 처리
      const errorMessage =
        fullResponse.code === RESTOCK_ERROR_CODES.EXCEED_STORE_CAPACITY
          ? RESTOCK_ERROR_MESSAGES[RESTOCK_ERROR_CODES.EXCEED_STORE_CAPACITY]
          : fullResponse.code === RESTOCK_ERROR_CODES.RESERVATION_AVAILABLE
            ? RESTOCK_ERROR_MESSAGES[RESTOCK_ERROR_CODES.RESERVATION_AVAILABLE]
            : fullResponse.message || RESTOCK_ERROR_MESSAGES.DEFAULT;

      return {
        success: false,
        error: errorMessage,
      };
    }

    // 예상하지 못한 응답 형식
    return {
      success: false,
      error: RESTOCK_ERROR_MESSAGES.DEFAULT,
    };
  } catch (error: unknown) {
    console.error('재입고 알림 신청 실패:', error);

    // axios 에러 응답에서 에러 코드 확인
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response
    ) {
      const errorData = (error.response as { data: RestockNotificationResponse }).data;
      const errorMessage =
        errorData.code === RESTOCK_ERROR_CODES.EXCEED_STORE_CAPACITY
          ? RESTOCK_ERROR_MESSAGES[RESTOCK_ERROR_CODES.EXCEED_STORE_CAPACITY]
          : errorData.code === RESTOCK_ERROR_CODES.RESERVATION_AVAILABLE
            ? RESTOCK_ERROR_MESSAGES[RESTOCK_ERROR_CODES.RESERVATION_AVAILABLE]
            : errorData.message || RESTOCK_ERROR_MESSAGES.DEFAULT;

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: false,
      error: RESTOCK_ERROR_MESSAGES.DEFAULT,
    };
  }
};
