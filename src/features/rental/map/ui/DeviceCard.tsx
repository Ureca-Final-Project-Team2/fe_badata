'use client';

import { memo } from 'react';

import { useReservationNavigation } from '@/features/rental/map/hooks/useReservationNavigationHooks';
import DeviceImage from '@/features/rental/map/ui/DeviceImage';
import ReserveButton from '@/features/rental/map/ui/ReserveButton';

import type { StoreDevice } from '@/features/rental/map/lib/types';
import type { DateRange } from 'react-day-picker';

const CARD_SIZE = {
  w: 'w-[270px]',
  h: 'h-[230px]',
  img: 'h-[125px]',
  radius: 'rounded-20',
  imgRadius: 'rounded-t-[30px]',
};

interface DeviceCardProps {
  device: StoreDevice;
  storeId?: number;
  dateRange?: DateRange;
}

const DeviceCard = memo(function DeviceCard({ device, storeId, dateRange }: DeviceCardProps) {
  const { navigateToReservation } = useReservationNavigation({ storeId, dateRange });

  const handleCardClick = (e: React.MouseEvent) => {
    // 버튼 클릭 시 이벤트 전파 방지
    if ((e.target as Element).closest('button')) {
      e.stopPropagation();
      return;
    }

    navigateToReservation();
  };

  const handleReserveButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateToReservation();
  };

  return (
    <div
      className={`${CARD_SIZE.radius} bg-white ${CARD_SIZE.w} ${CARD_SIZE.h} overflow-hidden flex flex-col cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className={`w-full ${CARD_SIZE.img} ${CARD_SIZE.imgRadius} rounded-b-none`}>
        <DeviceImage url={device.imageUrl} alt={device.deviceName} />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col px-4 py-2 flex-1">
        <div className="flex items-center justify-between w-full">
          <span className="text-[var(--black)]">
            <span className="font-small-light">매일 </span>
            <span className="font-small-semibold">{device.dataCapacity}GB</span>
          </span>
          <ReserveButton onClick={handleReserveButtonClick}>예약</ReserveButton>
        </div>
        <div className="text-[var(--black)] font-label-semibold mb-1">
          {device.deviceName}
          <div className="flex justify-between items-center text-[var(--main-5)] font-label-semibold mt-1">
            {device.price.toLocaleString()}원
            <span className="text-[var(--black)] font-small-light ml-2">
              남은 공유기 <span className="text-[var(--main-5)]">{device.leftCount}개</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DeviceCard;
