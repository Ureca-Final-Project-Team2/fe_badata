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

export default function DeviceCard({ device }: { device: StoreDevice }) {
  return (
    <div
      className={`${CARD_SIZE.radius} bg-white ${CARD_SIZE.w} ${CARD_SIZE.h} overflow-hidden flex flex-col`}
    >
      <div className={`w-full ${CARD_SIZE.img} ${CARD_SIZE.imgRadius} rounded-b-none`}>
        <DeviceImage url={device.imageUrl} alt={device.deviceName} />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col px-4 py-3 flex-1">
        <div className="flex items-center justify-between w-full">
          <span className="text-black">
            <span className="font-small-light">매일 </span>
            <span className="font-small-semibold">{device.dataCapacity}GB</span>
          </span>
          <ReserveButton>예약</ReserveButton>
        </div>
        <div className="text-black font-label-semibold mb-1">
          {device.deviceName}
          <div className="flex justify-between items-center text-[var(--main-5)] font-label-semibold mt-1">
            {device.price.toLocaleString()}원
            <span className="text-black font-small-light ml-2">
              남은 공유기 <span className="text-[var(--main-5)]">{device.leftCount}개</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
