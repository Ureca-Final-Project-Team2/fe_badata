'use client';

import { useReducer, useState } from 'react';

import { useParams } from 'next/navigation';

import { mockReservationDevices } from '@/pages/rental/map/__mocks__/reservationDeviceCard.mock';
import { initialState, reducer } from '@/pages/rental/store/reservation/model/reservationReducer';
import CalendarSection from '@/pages/rental/store/reservation/page/CalendarSection';
import DeviceSelectSection from '@/pages/rental/store/reservation/page/DeviceSelectSection';
import NoticeSection from '@/pages/rental/store/reservation/page/NoticeSection';
import ReceiptSection from '@/pages/rental/store/reservation/page/ReceiptSection';
import { makeToast } from '@/shared/lib/makeToast';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab/FlatTab';
import { Header_Detail } from '@/shared/ui/Header_Detail';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';
import { Toaster } from '@/shared/ui/Toaster/Toaster';

const ReservationPage = () => {
  const params = useParams();
  const storeId =
    typeof params === 'object' && params !== null ? (params['storeId'] as string) : '';
  const [tab, setTab] = useState('예약');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const tabList = [
    { label: '예약', value: '예약' },
    { label: '상세정보', value: '상세정보' },
    { label: '리뷰', value: '리뷰' },
  ];

  // 날짜, 기기, 동의 체크 모두 선택되어야 예약하기 버튼 활성화
  const isDateSelected = !!(state.dateRange && state.dateRange.from && state.dateRange.to);
  const isDeviceSelected = Object.keys(state.selectedDevices).length > 0;
  const isFormValid = isDateSelected && isDeviceSelected && state.agreed;

  // 오늘 이후 날짜인지 검사
  const isDateFuture = (() => {
    if (!state.dateRange || !state.dateRange.from || !state.dateRange.to) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.dateRange.from >= today && state.dateRange.to >= today;
  })();

  // 여러 디바이스와 개수에 맞게 영수증용 리스트 생성
  const receiptDevices = Object.entries(state.selectedDevices)
    .map(([deviceId, count]) => {
      const device = mockReservationDevices.find((d) => d.id === Number(deviceId));
      if (!device || count === 0) return undefined;
      return {
        name: device.deviceName || '',
        price: device.price ? `${device.price.toLocaleString()}원` : '-',
        count,
      };
    })
    .filter((d): d is { name: string; price: string; count: number } => !!d);

  return (
    <>
      <BaseLayout header={<Header_Detail title={`LG유플러스 플러자 ${storeId}호점`} />}>
        <Toaster />
        <div className="relative min-h-screen bg-white scrollbar-hide">
          <FlatTab items={tabList} value={tab} onValueChange={setTab} />
          <div className="fixed bottom-0 left-0 w-full z-30"></div>
          {/* 스크롤 가능한 컨텐츠 영역 */}
          <div
            className="pt-10 pb-16 overflow-y-auto"
            style={{ height: '100vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            {tab === '예약' && (
              <div className="flex flex-col gap-4 w-full">
                {/* 날짜 선택 */}
                <CalendarSection
                  dateRange={state.dateRange}
                  onChange={(range) => dispatch({ type: 'SET_DATE_RANGE', payload: range })}
                />
                {/* 기기 선택 */}
                <DeviceSelectSection
                  devices={mockReservationDevices}
                  selectedDevices={state.selectedDevices}
                  onCountChange={(deviceId: number, count: number) =>
                    dispatch({ type: 'SET_DEVICE_COUNT', payload: { deviceId, count } })
                  }
                />
                {/* 안내사항 및 예약하기 버튼 */}
                <div className="mt-6 w-full flex flex-col items-center">
                  <NoticeSection
                    agreed={state.agreed}
                    onToggleAgreed={() => dispatch({ type: 'SET_AGREED', payload: !state.agreed })}
                  />
                  <RegisterButton
                    className={`w-full ${isFormValid ? 'bg-[var(--main-5)] text-white' : 'bg-[var(--gray)] text-white'}`}
                    size="lg"
                    isFormValid={isFormValid}
                    onClick={(e) => {
                      if (!isFormValid) {
                        e.preventDefault();
                        return;
                      }
                      if (!isDateFuture) {
                        makeToast('날짜를 다시 선택해주세요', 'warning');
                        e.preventDefault();
                        return;
                      }
                      setShowReceiptModal(true);
                    }}
                  >
                    예약하기
                  </RegisterButton>
                </div>
              </div>
            )}
            {/* Receipt 모달 */}
            {showReceiptModal && (
              <ReceiptSection
                periodDate={
                  state.dateRange
                    ? `${state.dateRange.from?.toLocaleDateString()} ~ ${state.dateRange.to?.toLocaleDateString()}`
                    : ''
                }
                periodDays={
                  state.dateRange
                    ? `${Math.ceil(((state.dateRange.to?.getTime() ?? 0) - (state.dateRange.from?.getTime() ?? 0)) / (1000 * 60 * 60 * 24)) + 1}일`
                    : ''
                }
                devices={receiptDevices}
                onPay={() => {
                  /* 결제 로직 */
                }}
                onClose={() => setShowReceiptModal(false)}
              />
            )}
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default ReservationPage;
