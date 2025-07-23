'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { Calendar as CalendarIcon, CircleCheck } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import DeviceCard from '@/pages/rental/map/ui/ReservationDeviceCard';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab/FlatTab';
import { Header_Detail } from '@/shared/ui/Header_Detail';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';

import type { DateRange } from 'react-day-picker';

// 예시 mock 데이터
const mockDevices = [
  { id: 1, name: '기기 이름', price: '10,000원', image: '' },
  { id: 2, name: '기기 이름', price: '10,000원', image: '' },
  { id: 3, name: '기기 이름', price: '10,000원', image: '' },
];

const ReservationPage = () => {
  const params = useParams();
  const storeId =
    typeof params === 'object' && params !== null ? (params['storeId'] as string) : '';
  const [tab, setTab] = useState('예약');
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const tabList = [
    { label: '예약', value: '예약' },
    { label: '상세정보', value: '상세정보' },
    { label: '리뷰', value: '리뷰' },
  ];

  return (
    <BaseLayout
      header={<Header_Detail title={`LG유플러스 플러자 ${storeId}호점`} />}
      showHeader
      showBottomNav
      className="custom-scrollbar"
    >
      <FlatTab items={tabList} value={tab} onValueChange={setTab} />
      {tab === '예약' && (
        <div className="flex flex-col gap-4 mt-4 w-full">
          {/* 날짜 선택 */}
          <div className="font-body-semibold text-lg flex items-center gap-2">
            <CalendarIcon size={20} className="text-[var(--main-5)]" />
            날짜를 선택해 주세요
          </div>
          <div className="w-full">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              required
              className="rounded-md w-full"
            />
          </div>
          {/* 기기 선택 */}
          <div className="font-body-semibold text-lg flex items-center gap-2 mt-6">
            <CircleCheck size={28} className="text-[var(--main-5)]" />
            기기를 선택해 주세요
          </div>
          {/* 가로 스크롤 디바이스 카드 */}
          <div className="flex flex-row gap-6 overflow-x-auto pb-2 pl-1">
            {mockDevices.map((device) => (
              <DeviceCard
                key={device.id}
                name={device.name}
                price={device.price}
                image={device.image}
              />
            ))}
          </div>
          {/* 안내사항 및 예약하기 버튼 */}
          <div className="mt-6 w-full flex flex-col items-center">
            <div className="w-full bg-white rounded-xl px-2 pt-4 pb-2 text-black">
              <div className="font-body-semibold mt-5 mb-10 text-center">
                아래 주의 사항을 꼭 읽어보시고
                <br />
                약관 내용에 동의해 주세요
              </div>
              <ul className="list-disc pl-5 space-y-1 font-label-regular">
                <li>
                  기기는 반드시{' '}
                  <span className="text-[var(--main-5)] font-semibold">
                    대여 신청 당일 대리점 영업시간 내에 수령
                  </span>
                  하셔야 합니다.
                </li>
                <li>
                  대여 신청 당일에 수령하지 않을 시 해당 기기에 대한 예약 내역은{' '}
                  <span className="text-[var(--main-5)] font-semibold">자동 취소</span>되오니 신중히
                  예약 부탁드립니다.
                </li>
                <li>
                  반납은{' '}
                  <span className="text-[var(--main-5)] font-semibold">
                    대여 종료일 당일 대리점 영업시간 내에
                  </span>{' '}
                  하셔야 합니다.
                </li>
                <li>
                  기기 미반납 시{' '}
                  <span className="text-[var(--main-5)] font-semibold">
                    연체료 및 기기 손해배상금
                  </span>
                  이 발생하며, 법적 조치를 취할 수 있습니다.
                </li>
                <li>
                  단말기에 대한 손실 및 파손 발생 시,{' '}
                  <span className="text-[var(--main-5)] font-semibold">추가 비용</span>이 발생할 수
                  있습니다.
                </li>
                <li>
                  분실/파손/기기 반환지연이 반복적으로 발생되는 경우, 고객은{' '}
                  <span className="text-[var(--main-5)] font-semibold">즉시 대여이용이 제한</span>될
                  수 있습니다.
                </li>
                <li>
                  단말기 대리점으로 연락하지 않고 미반납/미수령 시, 대리점은 이에 대한{' '}
                  <span className="text-[var(--main-5)] font-semibold">책임이 없습니다</span>.
                </li>
              </ul>
              <div className="my-10 text-center font-label-medium">위 사항에 동의하십니까?</div>
            </div>
            <RegisterButton
              className="w-full bg-[var(--main-5)] text-white mb-10"
              size="lg"
              isFormValid={false}
            >
              예약하기
            </RegisterButton>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default ReservationPage;
