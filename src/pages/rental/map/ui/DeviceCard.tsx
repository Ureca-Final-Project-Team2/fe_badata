import DeviceImage from '@/pages/rental/map/ui/DeviceImage';
import ReserveButton from '@/pages/rental/map/ui/ReserveButton';

import type { StoreDevice } from '@/pages/rental/map/lib/types';

const CARD_SIZE = {
  w: 'w-[270px]',
  h: 'h-[230px]',
  img: 'h-[135px]',
  radius: 'rounded-20',
  imgRadius: 'rounded-t-[30px]',
};

interface DeviceCardProps {
  device: StoreDevice;
  price?: number;
}

export default function DeviceCard({ device, price = 1900 }: DeviceCardProps) {
  const sz = CARD_SIZE;
  const nameClass = 'font-label-semibold';
  const priceClass = 'font-label-semibold';
  const capacityClass = 'font-small-light';
  const capacityNumberClass = 'font-small-semibold';

  return (
    <div className={`${sz.radius} bg-white ${sz.w} ${sz.h} overflow-hidden flex flex-col`}>
      <div className={`w-full ${sz.img} ${sz.imgRadius} rounded-b-none`}>
        <DeviceImage url={device.imageUrl} alt={device.deviceName} />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col px-4 py-3 flex-1">
        <div className="flex items-center justify-between w-full">
          <span className="text-black m-0">
            <span className={capacityClass}>매일 </span>
            <span className={capacityNumberClass}>{device.dataCapacity}GB</span>
          </span>
          <ReserveButton>예약</ReserveButton>
        </div>
        <div className={`text-black ${nameClass} mb-1`}>{device.deviceName}</div>
        <div className={`text-[var(--main-5)] ${priceClass}`}>{price.toLocaleString()}원</div>
      </div>
    </div>
  );
}
