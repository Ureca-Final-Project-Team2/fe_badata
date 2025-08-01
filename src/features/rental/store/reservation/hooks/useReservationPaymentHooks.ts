import { useCallback, useState } from 'react';

import { formatDateForReservation } from '@/features/rental/store/reservation/utils/dataFormatters';
import { createReservationWithValidation } from '@/features/rental/store/reservation/utils/reservationService';
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

  const handlePayment = useCallback(async () => {
    setIsSubmitting(true);

    try {
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

      // 예약 API 호출
      const result = await createReservationWithValidation(reservationData);

      if (result.success) {
        makeToast('예약이 완료되었습니다!', 'success');
        onSuccess?.();
      } else {
        // 유효성 검증 또는 API 에러
        const errorMessage = result.errors?.join(', ') || '예약에 실패했습니다.';
        console.error('예약 실패 상세:', {
          errors: result.errors,
          errorMessage,
        });
        makeToast(errorMessage, 'warning');
      }
    } catch (error) {
      console.error('예약 처리 중 오류 발생:', error);
      makeToast('예약 처리 중 오류가 발생했습니다.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  }, [storeId, selectedDevices, dateRange, onSuccess]);

  return {
    isSubmitting,
    handlePayment,
  };
};
