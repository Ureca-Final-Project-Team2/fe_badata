import { useCallback, useState } from 'react';

import { requestRestockNotification } from '@/pages/rental/store/reservation/api/apis';
import { formatDateForReservation } from '@/pages/rental/store/reservation/utils/dataFormatters';
import { makeToast } from '@/shared/lib/makeToast';

interface RestockDevice {
  id: number;
  deviceName: string;
  totalCount: number;
}

interface UseRestockModalProps {
  dateRange?: { from?: Date | null; to?: Date | null } | null;
}

interface UseRestockModalReturn {
  isRestockModalOpen: boolean;
  restockDevice: RestockDevice | null;
  isSubmitting: boolean;
  handleRestockRequest: (device: RestockDevice) => void;
  handleRestockModalClose: () => void;
  handleRestockModalConfirm: (requestCount: number) => Promise<void>;
}

export const useRestockModal = ({
  dateRange = null,
}: UseRestockModalProps = {}): UseRestockModalReturn => {
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockDevice, setRestockDevice] = useState<RestockDevice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRestockRequest = useCallback((device: RestockDevice) => {
    setRestockDevice(device);
    setIsRestockModalOpen(true);
  }, []);

  const handleRestockModalClose = useCallback(() => {
    setIsRestockModalOpen(false);
    setRestockDevice(null);
  }, []);

  const handleRestockModalConfirm = useCallback(
    async (requestCount: number) => {
      if (!restockDevice) return;

      setIsSubmitting(true);

      // 날짜 범위가 없으면 기본값 사용 (현재 시간 기준)
      const now = new Date();
      const startDate = dateRange?.from || now;
      const endDate = dateRange?.to || new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24시간 후

      try {
        const result = await requestRestockNotification({
          storeDeviceId: restockDevice.id,
          count: requestCount,
          desiredStartDate: formatDateForReservation(startDate),
          desiredEndDate: formatDateForReservation(endDate),
        });

        if (result.success) {
          makeToast('재입고 알림 신청이 완료되었습니다', 'success');
          setIsRestockModalOpen(false);
          setRestockDevice(null);
        } else {
          makeToast(result.error || '재입고 알림 신청에 실패했습니다', 'warning');
        }
      } catch (error) {
        console.error('재입고 알림 신청 오류:', error);
        makeToast('재입고 알림 신청 중 오류가 발생했습니다', 'warning');
      } finally {
        setIsSubmitting(false);
      }
    },
    [restockDevice, dateRange],
  );

  return {
    isRestockModalOpen,
    restockDevice,
    isSubmitting,
    handleRestockRequest,
    handleRestockModalClose,
    handleRestockModalConfirm,
  };
};
