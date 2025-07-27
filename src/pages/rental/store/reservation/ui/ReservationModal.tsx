import React from 'react';

import ReceiptSection from '@/pages/rental/store/reservation/page/ReceiptSection';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  periodDate: string;
  periodDays: string;
  devices: Array<{
    name: string;
    price: string;
    count: number;
  }>;
  onPay: () => Promise<void>;
  isSubmitting: boolean;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  periodDate,
  periodDays,
  devices,
  onPay,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 영수증 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="relative">
          <ReceiptSection
            periodDate={periodDate}
            periodDays={periodDays}
            devices={devices}
            onPay={onPay}
            onClose={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isSubmitting && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
            <span className="font-body-regular text-[var(--black)]">예약 처리 중...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ReservationModal);
