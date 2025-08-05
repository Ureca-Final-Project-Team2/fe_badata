'use client';

import { useEffect, useState } from 'react';

import { useReservationDevices } from '@/features/rental/store/reservation/hooks/useReservationDevicesHooks';
import { useReservationForm } from '@/features/rental/store/reservation/hooks/useReservationFormHooks';
import { useReservationPayment } from '@/features/rental/store/reservation/hooks/useReservationPaymentHooks';
import ReservationForm from '@/features/rental/store/reservation/ui/ReservationForm';
import ReservationModal from '@/features/rental/store/reservation/ui/ReservationModal';
import {
  calculateRentalDays,
  convertDevicesForUI,
  createReceiptDevices,
  formatDateRange,
} from '@/features/rental/store/reservation/utils/dataFormatters';
import {
  convertFromReducerDateRange,
  convertToReducerDateRange,
} from '@/features/rental/store/reservation/utils/typeConverters';

import type { DateRange } from 'react-day-picker';

interface ReservationPageProps {
  storeId: number;
  initialDateRange?: DateRange;
}

export default function ReservationPage({ storeId, initialDateRange }: ReservationPageProps) {
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // 커스텀 훅들
  const { state, dispatch, isFormValid } = useReservationForm();
  const { devices, isLoadingDevices } = useReservationDevices({
    storeId,
    dateRange: convertFromReducerDateRange(state.dateRange),
  });

  // 초기 날짜 범위 설정
  useEffect(() => {
    if (initialDateRange?.from && initialDateRange?.to) {
      console.log('초기 날짜 범위 설정:', initialDateRange);
      dispatch({
        type: 'SET_DATE_RANGE',
        payload: {
          from: initialDateRange.from,
          to: initialDateRange.to,
        },
      });
    }
  }, [initialDateRange, dispatch]);

  // 결제 처리를 위한 훅 (날짜 범위가 유효할 때만 사용)
  const paymentConfig =
    state.dateRange?.from && state.dateRange?.to
      ? {
          storeId,
          selectedDevices: state.selectedDevices,
          dateRange: { from: state.dateRange.from, to: state.dateRange.to },
          onSuccess: () => {
            dispatch({ type: 'RESET' });
            setShowReceiptModal(false);
          },
        }
      : null;

  const { isSubmitting, handlePayment } = useReservationPayment(
    paymentConfig || {
      storeId,
      selectedDevices: {},
      dateRange: { from: new Date(), to: new Date() },
      onSuccess: () => {},
    },
  );

  // 데이터 변환
  const convertedDevices = convertDevicesForUI(devices);
  const receiptDevices = createReceiptDevices(state.selectedDevices, devices);

  // 디버깅: 현재 날짜 범위 상태 로깅
  console.log('ReservationPage - 현재 날짜 범위:', state.dateRange);
  console.log('ReservationPage - 변환된 날짜 범위:', convertFromReducerDateRange(state.dateRange));

  return (
    <>
      <ReservationForm
        dateRange={convertFromReducerDateRange(state.dateRange)}
        onDateRangeChange={(range) =>
          dispatch({ type: 'SET_DATE_RANGE', payload: convertToReducerDateRange(range) })
        }
        devices={convertedDevices}
        selectedDevices={state.selectedDevices}
        onDeviceCountChange={(deviceId, count) =>
          dispatch({ type: 'SET_DEVICE_COUNT', payload: { deviceId, count } })
        }
        agreed={state.agreed}
        onToggleAgreed={() => dispatch({ type: 'SET_AGREED', payload: !state.agreed })}
        isFormValid={isFormValid}
        onReservationClick={() => setShowReceiptModal(true)}
        isLoadingDevices={isLoadingDevices}
      />

      <ReservationModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        periodDate={formatDateRange(convertFromReducerDateRange(state.dateRange))}
        periodDays={calculateRentalDays(convertFromReducerDateRange(state.dateRange))}
        devices={receiptDevices}
        onPay={paymentConfig ? handlePayment : async () => {}}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
