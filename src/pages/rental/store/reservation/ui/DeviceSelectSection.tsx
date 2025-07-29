import React, { useMemo } from 'react';

import { CircleCheck } from 'lucide-react';

import ReservationDeviceCard from '@/pages/rental/map/ui/ReservationDeviceCard';

import { useRestockModal } from '../hooks/useRestockModalHooks';
import { useScrollDrag } from '../hooks/useScrollDragHooks';

import RestockNotificationModal from './RestockNotificationModal';

interface Device {
  id: number;
  deviceName: string;
  imageUrl: string;
  dataCapacity: number | string;
  price: number;
  remainCount: number;
  totalCount: number; // 가맹점 보유 총 기기 수
}

interface DeviceSelectSectionProps {
  devices: Device[];
  selectedDevices: Record<number, number>;
  onCountChange: (deviceId: number, count: number) => void;
  dateRange?: { from?: Date | null; to?: Date | null } | null; // 재입고 알림용
}

const DeviceSelectSection: React.FC<DeviceSelectSectionProps> = ({
  devices,
  selectedDevices,
  onCountChange,
  dateRange = null,
}) => {
  // 커스텀 훅들
  const { scrollRef, dragging, handleMouseDown } = useScrollDrag();
  const {
    isRestockModalOpen,
    restockDevice,
    isSubmitting,
    handleRestockRequest,
    handleRestockModalClose,
    handleRestockModalConfirm,
  } = useRestockModal({ dateRange });

  // 디바이스 목록 메모이제이션 (깜빡거림 방지)
  const memoizedDevices = useMemo(() => devices, [devices]);

  // 선택된 디바이스 상태 메모이제이션
  const memoizedSelectedDevices = useMemo(() => selectedDevices, [selectedDevices]);

  return (
    <>
      <div className="font-body-semibold flex items-center gap-2 mt-6 transition-all duration-200">
        <CircleCheck size={28} className="text-[var(--main-5)]" />
        기기를 선택해 주세요
        {memoizedDevices.length > 0 && (
          <span className="text-sm text-[var(--gray-dark)] ml-2 transition-opacity duration-300">
            ({memoizedDevices.length}개 기기)
          </span>
        )}
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row gap-6 overflow-x-auto pb-2 pl-1 transition-opacity duration-300 ease-in-out"
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
          opacity: memoizedDevices.length === 0 ? 0.5 : 1,
        }}
        onMouseDown={handleMouseDown}
      >
        {memoizedDevices.map((device) => (
          <div
            key={device.id}
            className="flex-shrink-0 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <ReservationDeviceCard
              device={device}
              count={memoizedSelectedDevices[device.id] ?? 0}
              onCountChange={(newCount: number) => onCountChange(device.id, newCount)}
              selected={!!memoizedSelectedDevices[device.id]}
              max={device.remainCount}
              onRestockRequest={handleRestockRequest}
            />
          </div>
        ))}
      </div>

      {/* 재입고 알림 신청 모달 */}
      <RestockNotificationModal
        isOpen={isRestockModalOpen}
        onClose={handleRestockModalClose}
        onConfirm={handleRestockModalConfirm}
        deviceName={restockDevice?.deviceName || ''}
        totalCount={restockDevice?.totalCount || 0}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default React.memo(DeviceSelectSection);
