import { useCallback, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { formatDateForReservation } from '@/features/rental/store/reservation/utils/dataFormatters';
import { createReservationWithValidation } from '@/features/rental/store/reservation/utils/reservationService';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { makeToast } from '@/shared/lib/makeToast';

interface UseReservationPaymentProps {
  storeId: number;
  selectedDevices: Record<string, number>;
  dateRange: { from: Date; to: Date };
  onSuccess?: () => void;
}

interface UseReservationPaymentReturn {
  isSubmitting: boolean;
  handlePayment: () => Promise<void>;
}

export const useReservationPayment = ({
  storeId,
  selectedDevices,
  dateRange,
  onSuccess,
}: UseReservationPaymentProps): UseReservationPaymentReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeWithAuth } = useAuthRequiredRequest();
  const { isLoggedIn } = useAuthStore();

  const handlePayment = useCallback(async () => {
    console.log('🔍 예약 결제 시작:', {
      storeId,
      selectedDevices,
      dateRange,
      isLoggedIn,
    });
    setIsSubmitting(true);

    const requestFn = async () => {
      console.log('🔍 예약 API 요청 실행');
      // 예약 요청 데이터 구성
      const reservationData = {
        storeId,
        storeDevices: Object.entries(selectedDevices)
          .filter(([, count]) => count > 0)
          .map(([deviceId, count]) => {
            const id = Number(deviceId);
            if (isNaN(id)) {
              throw new Error(`Invalid device ID: ${deviceId}`);
            }
            return {
              storeDeviceId: id,
              count,
            };
          }),
        rentalStartDate: formatDateForReservation(dateRange.from),
        rentalEndDate: formatDateForReservation(dateRange.to),
      };

      console.log('🔍 예약 데이터:', reservationData);

      // 예약 API 호출
      const result = await createReservationWithValidation(reservationData);

      if (result.success) {
        console.log('✅ 예약 성공:', result);
        makeToast('예약이 완료되었습니다!', 'success');
        onSuccess?.();
        return result;
      } else {
        // 유효성 검증 또는 API 에러
        const errorMessage = result.errors?.join(', ') || '예약에 실패했습니다.';
        console.error('❌ 예약 실패 상세:', {
          errors: result.errors,
          errorMessage,
        });
        makeToast(errorMessage, 'warning');
        throw new Error(errorMessage);
      }
    };

    try {
      const result = await executeWithAuth(
        requestFn,
        '/api/v1/rentals/devices',
        {
          type: 'RESERVATION',
          method: 'POST',
          data: {
            storeId,
            selectedDevices,
            dateRange,
          },
        },
        () => {
          console.log('🔍 AuthModal 닫힘 - isSubmitting 초기화');
          // AuthModal이 닫힐 때 isSubmitting 상태 초기화
          setIsSubmitting(false);
        },
      );

      console.log('🔍 executeWithAuth 결과:', result);
    } catch (error) {
      console.error('❌ 예약 처리 중 오류 발생:', error);
      makeToast('예약 처리 중 오류가 발생했습니다.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  }, [storeId, selectedDevices, dateRange, onSuccess, executeWithAuth, isLoggedIn]);

  return {
    isSubmitting,
    handlePayment,
  };
};
