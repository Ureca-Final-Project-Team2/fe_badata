import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CircleCheck } from 'lucide-react';

import ReservationDeviceCard from '@/pages/rental/map/ui/ReservationDeviceCard';
import { requestRestockNotification } from '@/pages/rental/store/reservation/api/apis';
import RestockNotificationModal from '@/pages/rental/store/reservation/components/RestockNotificationModal';
import { formatDateForReservation } from '@/pages/rental/store/reservation/utils/dataFormatters';
import { makeToast } from '@/shared/lib/makeToast';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = React.useState(false);

  // 재입고 모달 상태
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockDevice, setRestockDevice] = useState<{
    id: number;
    deviceName: string;
    totalCount: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 디바이스 목록 메모이제이션 (깜빡거림 방지)
  const memoizedDevices = useMemo(() => devices, [devices]);

  // 선택된 디바이스 상태 메모이제이션
  const memoizedSelectedDevices = useMemo(() => selectedDevices, [selectedDevices]);

  // document 이벤트 등록/해제
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX.current;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
    };
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  // 재입고 알림 신청 모달 관련 함수들
  const handleRestockRequest = useCallback(
    (device: { id: number; deviceName: string; totalCount: number }) => {
      setRestockDevice(device);
      setIsRestockModalOpen(true);
    },
    [],
  );

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
