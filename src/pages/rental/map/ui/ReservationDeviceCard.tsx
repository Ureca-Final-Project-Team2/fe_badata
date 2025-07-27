import React, { useCallback } from 'react';

import DeviceImage from '@/pages/rental/map/ui/DeviceImage';
import { useDeviceQuantity } from '@/pages/rental/store/reservation/hooks/useDeviceQuantityHooks';
import DeviceCardInfo from '@/pages/rental/store/reservation/ui/DeviceCardInfo';
import DeviceCardOverlay from '@/pages/rental/store/reservation/ui/DeviceCardOverlay';
import { makeToast } from '@/shared/lib/makeToast';

interface ReservationDeviceCardProps {
  device: {
    deviceName?: string;
    imageUrl?: string;
    dataCapacity?: number | string;
    price?: number;
    remainCount?: number;
    totalCount?: number; // 가맹점 보유 총 기기 수
    id?: number;
  };
  count?: number;
  onCountChange?: (newCount: number) => void;
  selected?: boolean;
  max?: number;
  onRestockRequest?: (device: { id: number; deviceName: string; totalCount: number }) => void; // 재입고 알림 신청 콜백
  isRestockNotified?: boolean; // 재입고 알림 신청 완료 상태
}

const CARD_SIZE = {
  w: 'w-[270px]',
  h: 'h-[230px]',
  img: 'h-[135px]',
  radius: 'rounded-[20px]',
  imgRadius: 'rounded-t-[20px]',
};

const ReservationDeviceCard: React.FC<ReservationDeviceCardProps> = React.memo(
  ({
    device,
    count = 0,
    onCountChange = () => {},
    selected,
    max = 99,
    onRestockRequest,
    isRestockNotified = false,
  }) => {
    const sz = CARD_SIZE;
    const { deviceName, imageUrl, dataCapacity, price, remainCount, totalCount } = device;
    const actualRemainCount = remainCount ?? 0;
    const actualTotalCount = totalCount ?? remainCount ?? 10; // fallback to remainCount or 10
    const maxCount = max ?? Math.max(0, actualRemainCount);
    const isSoldOut = actualRemainCount <= 0;

    // 커스텀 훅 사용
    const { canIncrement, handleDecrement, handleIncrement } = useDeviceQuantity({
      count,
      maxCount,
      isSoldOut,
      onCountChange,
    });

    const handleNotifyToggle = useCallback(() => {
      if (!isRestockNotified) {
        // 재입고 알림 신청 모달 열기 (상위 컴포넌트에서 처리)
        if (onRestockRequest && device.id && device.deviceName && actualTotalCount) {
          onRestockRequest({
            id: device.id,
            deviceName: device.deviceName,
            totalCount: actualTotalCount,
          });
        }
      } else {
        // 이미 재입고 알림 신청된 상태
        makeToast('이미 재입고 알림 신청을 하였습니다', 'warning');
      }
    }, [isRestockNotified, onRestockRequest, device.id, device.deviceName, actualTotalCount]);

    return (
      <div
        className={`${sz.radius} bg-white ${sz.w} ${sz.h} overflow-hidden flex flex-col border transition
          ${selected ? 'border-[var(--main-5)] border-2' : 'border border-[var(--gray-light)]'} flex-shrink-0 min-w-[270px] relative`}
        style={{ cursor: 'default' }}
      >
        <div className={`w-full ${sz.img} ${sz.imgRadius} rounded-b-none overflow-hidden relative`}>
          <DeviceImage
            url={imageUrl ?? ''}
            alt={deviceName ?? ''}
            className={`w-full h-full object-cover ${sz.imgRadius}`}
          />
          {/* 품절 시 블러 및 오버레이 (이미지 위에만) */}
          {isSoldOut && (
            <DeviceCardOverlay
              notifyActive={isRestockNotified}
              onNotifyToggle={handleNotifyToggle}
            />
          )}
        </div>

        {/* 정보 영역 */}
        <DeviceCardInfo
          deviceName={deviceName}
          dataCapacity={dataCapacity}
          price={price}
          remainCount={actualRemainCount}
          count={count}
          isSoldOut={isSoldOut}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          canIncrement={canIncrement}
        />
      </div>
    );
  },
);

ReservationDeviceCard.displayName = 'ReservationDeviceCard';

export default ReservationDeviceCard;
