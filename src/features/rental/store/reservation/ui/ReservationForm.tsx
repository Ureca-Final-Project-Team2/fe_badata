import React from 'react';

import CalendarSection from '@/features/rental/store/reservation/ui/CalendarSection';
import DeviceSelectSection from '@/features/rental/store/reservation/ui/DeviceSelectSection';
import NoticeSection from '@/features/rental/store/reservation/ui/NoticeSection';
import {
  convertFromReducerDateRange,
  convertToReducerDateRange,
} from '@/features/rental/store/reservation/utils';
import { RegisterButton } from '@/shared/ui/RegisterButton';

interface ReservationFormProps {
  dateRange: { from: Date | null; to: Date | null } | null;
  onDateRangeChange: (range: { from: Date | null; to: Date | null } | null) => void;
  devices: Array<{
    id: number;
    deviceName: string;
    imageUrl: string;
    dataCapacity: number;
    price: number;
    availableCount: number; // remainCount 대신 availableCount 사용
    totalCount: number; // API에서 오는 totalCount
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
      <CalendarSection
        dateRange={convertToReducerDateRange(dateRange)}
        onChange={(range) => onDateRangeChange(convertFromReducerDateRange(range))}
      />

      {/* 기기 선택 */}
      <div className="relative">
        <DeviceSelectSection
          devices={devices.map((device) => ({
            ...device,
            remainCount: device.availableCount, // ReservationDeviceCard에서 사용하는 remainCount로 매핑
            availableCount: device.availableCount, // 날짜별 대여 가능한 수량
            totalCount: device.totalCount, // API에서 오는 totalCount 사용
          }))}
          selectedDevices={selectedDevices}
          onCountChange={onDeviceCountChange}
          dateRange={dateRange}
        />
        {isLoadingDevices && devices.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-[var(--gray-dark)]">예약 가능한 장비를 조회 중...</span>
            </div>
          </div>
        )}
        {isLoadingDevices && devices.length > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <div className="w-4 h-4 border-2 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

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
