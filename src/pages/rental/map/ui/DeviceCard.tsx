import DeviceImage from './DeviceImage';
import ReserveButton from './ReserveButton';

import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

interface DeviceCardProps {
  storeDetail: StoreDetail;
  device: StoreDevice;
  price?: number;
}

export default function DeviceCard({ device, price = 1900 }: DeviceCardProps) {
  return (
    <div className="rounded-32 bg-white w-[310px] h-[260px] overflow-hidden flex flex-col">
      <div className="w-full h-[140px] rounded-t-[40px] rounded-b-none">
        <DeviceImage url={device.imageUrl} alt={device.deviceName} />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col px-4 py-3 flex-1">
        <div className="flex items-center justify-between w-full">
          <span className="text-black m-0">
            <span className="font-label-light">매일 </span>
            <span className="font-label-semibold">{device.dataCapacity}GB</span>
          </span>
          <ReserveButton>예약</ReserveButton>
        </div>
        <div className="font-body-semibold text-black">{device.deviceName}</div>
        <div className="font-body-semibold text-[var(--main-5)] text-label-semibold">
          {price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}

// MOCK DATA for testing DeviceCard
export const MOCK_DEVICE: StoreDevice = {
  storeDeviceId: 1,
  deviceName: '포켓 와이파이 기기 A',
  dataCapacity: 2,
  imageUrl:
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
};

export const MOCK_STORE_DETAIL: StoreDetail = {
  storeId: 1,
  imageUrl:
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  detailAddress: '서울특별시 강남구 테헤란로 123',
  phoneNumber: '02-1234-5678',
  distanceFromMe: 120,
  reviewRating: 4.7,
  isOpening: true,
  startTime: '09:00:00',
  endTime: '21:00:00',
};
