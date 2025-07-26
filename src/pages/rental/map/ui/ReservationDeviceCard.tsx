import React, { useCallback, useState } from 'react';

import { BellRing } from 'lucide-react';

import DeviceImage from '@/pages/rental/map/ui/DeviceImage';
import { makeToast } from '@/shared/lib/makeToast';

interface ReservationDeviceCardProps {
  device: {
    deviceName?: string;
    imageUrl?: string;
    dataCapacity?: number | string;
    price?: number;
    remainCount?: number;
    id?: number;
  };
  count?: number;
  onCountChange?: (newCount: number) => void;
  selected?: boolean;
  max?: number;
}

const CARD_SIZE = {
  w: 'w-[270px]',
  h: 'h-[230px]',
  img: 'h-[135px]',
  radius: 'rounded-[20px]',
  imgRadius: 'rounded-t-[20px]',
};

const ReservationDeviceCard: React.FC<ReservationDeviceCardProps> = React.memo(
  ({ device, count = 0, onCountChange = () => {}, selected, max = 99 }) => {
    const sz = CARD_SIZE;
    const { deviceName, imageUrl, dataCapacity, price, remainCount } = device;
    const actualRemainCount = remainCount ?? 0;
    const maxCount = max ?? Math.max(0, actualRemainCount);
    const canIncrement = count < maxCount && actualRemainCount > 0;
    const isSoldOut = actualRemainCount <= 0;
    const [notifyActive, setNotifyActive] = useState(false);

    const handleNotifyToggle = useCallback(() => {
      if (!notifyActive) {
        makeToast('알림 신청이 완료되었습니다', 'success');
      } else {
        makeToast('알림 신청을 취소합니다', 'success');
      }
      setNotifyActive((prev) => !prev);
    }, [notifyActive]);

    const handleDecrement = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onCountChange(Math.max(0, count - 1));
      },
      [count, onCountChange],
    );

    const handleIncrement = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (count >= maxCount) {
          makeToast('남은 수량까지만 선택할 수 있습니다.', 'warning');
          return;
        }
        onCountChange(count + 1);
      },
      [count, onCountChange, maxCount],
    );

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
            <>
              <div
                className={`absolute inset-0 z-10 backdrop-blur-[8px] transition-colors duration-200 ${
                  notifyActive ? 'bg-[var(--main-5)]/60' : 'bg-white/40'
                }`}
              />
              <button
                type="button"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full focus:outline-none"
                onClick={handleNotifyToggle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNotifyToggle();
                  }
                }}
                tabIndex={0}
              >
                <BellRing
                  size={40}
                  className={`mb-2 transition-colors duration-200 ${
                    notifyActive
                      ? 'text-white fill-white'
                      : 'text-[var(--main-5)] fill-[var(--main-5)]'
                  }`}
                />
                <span
                  className={`font-title-semibold transition-colors duration-200 ${
                    notifyActive ? 'text-white' : 'text-[var(--main-5)]'
                  }`}
                >
                  {notifyActive ? '알림 취소' : '재입고 알림 신청'}
                </span>
              </button>
            </>
          )}
        </div>
        {/* 정보 영역 */}
        <div className="flex flex-col px-4 py-3 flex-1">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[var(--black)]">
              <span className="font-label-regular">매일 </span>
              <span className="font-label-semibold">{dataCapacity}GB</span>
            </span>
            <span className="font-label-regular text-right text-[var(--main-5)]">
              {actualRemainCount <= 0 ? (
                <span className="font-label-semibold text-[var(--orange)]">재입고알림</span>
              ) : (
                <>
                  남은 공유기 <span className="font-label-semibold">{actualRemainCount}대</span>
                </>
              )}
            </span>
          </div>
          <div className="font-label-semibold text-[var(--black)] mb-1">{deviceName}</div>
          {/* 가격 + 수량조절 한 줄에 */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-label-semibold text-[var(--main-5)]">
              {typeof price === 'number' ? `${price.toLocaleString()}원` : '-'}
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center ${count <= 0 || isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDecrement}
                type="button"
                disabled={count <= 0 || isSoldOut}
              >
                –
              </button>
              <span
                className={`font-label-semibold w-6 text-center ${count > 0 ? 'text-[var(--main-5)]' : 'text-[var(--black)]'}`}
              >
                {count}
              </span>
              <button
                className={`w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center ${!canIncrement || isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleIncrement}
                type="button"
                disabled={!canIncrement || isSoldOut}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ReservationDeviceCard.displayName = 'ReservationDeviceCard';

export default ReservationDeviceCard;
