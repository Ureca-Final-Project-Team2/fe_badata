'use client';

import { useState } from 'react';

import ReservationForm from '@/pages/rental/store/reservation/components/ReservationForm';
import ReservationModal from '@/pages/rental/store/reservation/components/ReservationModal';
import { useReservationDevices } from '@/pages/rental/store/reservation/hooks/useReservationDevices';
import { useReservationForm } from '@/pages/rental/store/reservation/hooks/useReservationForm';
import { useReservationPayment } from '@/pages/rental/store/reservation/hooks/useReservationPayment';
import {
  calculateRentalDays,
  convertDevicesForUI,
  createReceiptDevices,
  formatDateRange,
} from '@/pages/rental/store/reservation/utils/dataFormatters';
import {
  convertFromReducerDateRange,
  convertToReducerDateRange,
} from '@/pages/rental/store/reservation/utils/typeConverters';

interface ReservationPageProps {
  storeId: number;
}

const ReservationPage = ({ storeId }: ReservationPageProps) => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // 커스텀 훅들
  const { state, dispatch, isFormValid } = useReservationForm();
  const { devices, isLoadingDevices } = useReservationDevices({
    storeId,
    dateRange: convertFromReducerDateRange(state.dateRange),
  });

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
};

export default ReservationPage;
