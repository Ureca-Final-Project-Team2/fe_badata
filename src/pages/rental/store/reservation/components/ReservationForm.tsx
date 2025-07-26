import React from 'react';

import CalendarSection from '@/pages/rental/store/reservation/page/CalendarSection';
import DeviceSelectSection from '@/pages/rental/store/reservation/page/DeviceSelectSection';
import NoticeSection from '@/pages/rental/store/reservation/page/NoticeSection';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';

interface ReservationFormProps {
  dateRange: { from: Date | null; to: Date | null } | null;
  onDateRangeChange: (range: { from: Date | null; to: Date | null } | null) => void;
  devices: Array<{
    id: number;
    deviceName: string;
    imageUrl: string;
    dataCapacity: number;
    price: number;
    remainCount: number;
  }>;
  selectedDevices: Record<string, number>;
  onDeviceCountChange: (deviceId: number, count: number) => void;
  agreed: boolean;
  onToggleAgreed: () => void;
  isFormValid: boolean;
  onReservationClick: () => void;
  isLoadingDevices?: boolean;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  dateRange,
  onDateRangeChange,
  devices,
  selectedDevices,
  onDeviceCountChange,
  agreed,
  onToggleAgreed,
  isFormValid,
  onReservationClick,
  isLoadingDevices = false,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 날짜 선택 */}
      <CalendarSection dateRange={dateRange} onChange={onDateRangeChange} />

      {/* 기기 선택 */}
      {isLoadingDevices ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[var(--gray-dark)]">예약 가능한 장비를 조회 중...</span>
          </div>
        </div>
      ) : (
        <DeviceSelectSection
          devices={devices}
          selectedDevices={selectedDevices}
          onCountChange={onDeviceCountChange}
        />
      )}

      {/* 안내사항 및 예약하기 버튼 */}
      <div className="mt-6 w-full flex flex-col items-center">
        <NoticeSection agreed={agreed} onToggleAgreed={onToggleAgreed} />
        <RegisterButton
          className={`w-full ${
            isFormValid ? 'bg-[var(--main-5)] text-white' : 'bg-[var(--gray)] text-white'
          }`}
          size="lg"
          isFormValid={isFormValid}
          onClick={(e) => {
            if (!isFormValid) {
              e.preventDefault();
              return;
            }
            onReservationClick();
          }}
        >
          예약하기
        </RegisterButton>
      </div>
    </div>
  );
};

export default React.memo(ReservationForm);
