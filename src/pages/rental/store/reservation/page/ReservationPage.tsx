'use client';

import { useReducer, useState } from 'react';

import { mockReservationDevices } from '@/pages/rental/map/__mocks__/reservationDeviceCard.mock';
import { initialState, reducer } from '@/pages/rental/store/reservation/model/reservationReducer';
import CalendarSection from '@/pages/rental/store/reservation/page/CalendarSection';
import DeviceSelectSection from '@/pages/rental/store/reservation/page/DeviceSelectSection';
import NoticeSection from '@/pages/rental/store/reservation/page/NoticeSection';
import ReceiptSection from '@/pages/rental/store/reservation/page/ReceiptSection';
import { makeToast } from '@/shared/lib/makeToast';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';

const ReservationPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const isDateSelected = !!(state.dateRange && state.dateRange.from && state.dateRange.to);
  const isDeviceSelected = Object.keys(state.selectedDevices).length > 0;
  const isFormValid = isDateSelected && isDeviceSelected && state.agreed;

  const isDateFuture = (() => {
    if (!state.dateRange || !state.dateRange.from || !state.dateRange.to) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.dateRange.from >= today && state.dateRange.to >= today;
  })();

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
    .filter((d) => !!d);

  return (
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
        onCountChange={(deviceId, count) =>
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
      {/* 영수증 모달 */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
