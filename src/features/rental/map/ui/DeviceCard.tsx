'use client';

import { useRouter } from 'next/navigation';

import DeviceImage from '@/features/rental/map/ui/DeviceImage';
import ReserveButton from '@/features/rental/map/ui/ReserveButton';
import { PATH } from '@/shared/config/path';

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

export default function DeviceCard({ device, storeId, dateRange }: DeviceCardProps) {
  const router = useRouter();

  console.log('DeviceCard 렌더링:', { storeId, deviceName: device.deviceName, dateRange });

  const handleCardClick = (e: React.MouseEvent) => {
    console.log('DeviceCard 클릭 이벤트 발생');

    // 버튼 클릭 시 이벤트 전파 방지
    if ((e.target as Element).closest('button')) {
      console.log('버튼 클릭 감지, 이벤트 전파 방지');
      e.stopPropagation();
      return;
    }

    if (storeId) {
      console.log('DeviceCard 클릭됨 - 가맹점 ID:', storeId);

      // 항상 예약 탭으로 이동
      let reservationPath = `${PATH.RENTAL.STORE_DETAIL.replace(':storeId', storeId.toString())}?tab=reservation`;

      // 대여기간이 설정되어 있으면 URL 파라미터에 추가
      if (dateRange?.from && dateRange?.to) {
        const startDate = dateRange.from.toISOString().split('T')[0];
        const endDate = dateRange.to.toISOString().split('T')[0];
        reservationPath += `&startDate=${startDate}&endDate=${endDate}`;
        console.log('대여기간과 함께 예약 탭으로 이동:', reservationPath);
      } else {
        console.log('예약 탭으로 이동 (대여기간 없음):', reservationPath);
      }

      router.push(reservationPath);
    } else {
      console.log('storeId가 없어서 이동할 수 없음');
    }
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
          <ReserveButton
            onClick={(e) => {
              console.log('ReserveButton 클릭 이벤트 발생');
              e.stopPropagation();
              if (storeId) {
                console.log('ReserveButton 클릭됨 - 가맹점 ID:', storeId);

                // 예약 탭으로 이동
                let reservationPath = `${PATH.RENTAL.STORE_DETAIL.replace(':storeId', storeId.toString())}?tab=reservation`;

                // 대여기간이 설정되어 있으면 URL 파라미터에 추가
                if (dateRange?.from && dateRange?.to) {
                  const startDate = dateRange.from.toISOString().split('T')[0];
                  const endDate = dateRange.to.toISOString().split('T')[0];
                  reservationPath += `&startDate=${startDate}&endDate=${endDate}`;
                  console.log('ReserveButton - 대여기간과 함께 예약 탭으로 이동:', reservationPath);
                } else {
                  console.log('ReserveButton - 예약 탭으로 이동 (대여기간 없음):', reservationPath);
                }

                router.push(reservationPath);
              } else {
                console.log('ReserveButton - storeId가 없어서 이동할 수 없음');
              }
            }}
          >
            예약
          </ReserveButton>
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
}
