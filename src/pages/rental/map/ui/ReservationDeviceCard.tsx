import React from 'react';

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

export default function ReservationDeviceCard({
  device,
  count = 0,
  onCountChange = () => {},
  selected,
  max = 99,
}: ReservationDeviceCardProps) {
  const sz = CARD_SIZE;
  const { deviceName, imageUrl, dataCapacity, price, remainCount } = device;
  const canIncrement = count < (max ?? 99);
  const isSoldOut = (remainCount ?? 0) === 0;
  const [notifyActive, setNotifyActive] = React.useState(false);

  const handleNotifyToggle = () => {
    if (!notifyActive) {
      makeToast('알림 신청이 완료되었습니다', 'success');
    } else {
      makeToast('알림 신청을 취소합니다', 'success');
    }
    setNotifyActive((prev) => !prev);
  };

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
                className={`font-title-semibold text-lg transition-colors duration-200 ${
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
          <span className="text-black">
            <span className="font-label-regular">매일 </span>
            <span className="font-label-semibold">{dataCapacity}GB</span>
          </span>
          <span className="font-label-regular text-right text-[var(--main-5)]">
            남은 공유기 <span className="font-label-semibold">{remainCount}대</span>
          </span>
        </div>
        <div className="font-label-semibold text-black mb-1">{deviceName}</div>
        {/* 가격 + 수량조절 한 줄에 */}
        <div className="flex items-center justify-between mb-2">
          <div className="font-label-semibold text-[var(--main-5)]">
            {typeof price === 'number' ? `${price.toLocaleString()}원` : '-'}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onCountChange(Math.max(0, count - 1));
              }}
              type="button"
              disabled={count <= 0}
            >
              –
            </button>
            <span
              className={`font-label-semibold w-6 text-center ${count > 0 ? 'text-[var(--main-5)]' : 'text-black'}`}
            >
              {count}
            </span>
            <button
              className={`w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center ${!canIncrement ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onCountChange(count + 1);
              }}
              type="button"
              disabled={!canIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
