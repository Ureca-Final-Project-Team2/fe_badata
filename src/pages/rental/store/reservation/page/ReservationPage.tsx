'use client';

import { useCallback, useEffect, useReducer, useState } from 'react';

import { fetchRentalDevices } from '@/pages/rental/store/reservation/api/apis';
import { initialState, reducer } from '@/pages/rental/store/reservation/model/reservationReducer';
import CalendarSection from '@/pages/rental/store/reservation/page/CalendarSection';
import DeviceSelectSection from '@/pages/rental/store/reservation/page/DeviceSelectSection';
import NoticeSection from '@/pages/rental/store/reservation/page/NoticeSection';
import ReceiptSection from '@/pages/rental/store/reservation/page/ReceiptSection';
import {
  createReservationWithValidation,
  formatDateForReservation,
} from '@/pages/rental/store/reservation/utils/reservationUtils';
import { makeToast } from '@/shared/lib/makeToast';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';

import type { RentalDevice } from '@/pages/rental/store/reservation/lib/types';

interface ReservationPageProps {
  storeId: number;
}

const ReservationPage = ({ storeId }: ReservationPageProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devices, setDevices] = useState<RentalDevice[]>([]);

  const isDateSelected = !!(state.dateRange && state.dateRange.from && state.dateRange.to);
  const isDeviceSelected = Object.keys(state.selectedDevices).length > 0;

  const isDateFuture = (() => {
    if (!state.dateRange || !state.dateRange.from || !state.dateRange.to) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.dateRange.from >= today && state.dateRange.to >= today;
  })();

  const isFormValid = isDateSelected && isDeviceSelected && state.agreed && isDateFuture;

  // RentalDevice를 DeviceSelectSection에서 사용하는 Device 타입으로 변환
  const convertedDevices = devices.map((device) => ({
    id: device.storeDeviceId,
    deviceName: device.deviceName,
    imageUrl: device.imageUrl,
    dataCapacity: device.dataCapacity,
    price: device.price,
    remainCount: device.availableCount, // availableCount를 remainCount로 매핑
  }));

  // 예약 가능한 장비 목록 조회 함수
  const loadDevices = useCallback(
    async (startDate?: Date, endDate?: Date) => {
      try {
        // 날짜가 제공되지 않으면 undefined로 설정하여 모든 장비 조회
        const params =
          startDate && endDate
            ? {
                rentalStartDate: formatDateForReservation(startDate),
                rentalEndDate: formatDateForReservation(endDate),
              }
            : undefined;

        console.log('예약 가능한 장비 조회 파라미터:', params);
        const deviceList = await fetchRentalDevices(storeId, params);
        console.log('조회된 예약 가능한 장비 목록:', deviceList);
        setDevices(deviceList);
      } catch (error) {
        console.error('예약 가능한 장비 목록 조회 실패:', error);
        makeToast('장비 목록을 불러오는데 실패했습니다.', 'warning');
        setDevices([]);
      }
    },
    [storeId],
  );

  // 예약탭 진입 시 전체 예약 가능한 장비 목록 조회
  useEffect(() => {
    console.log('예약탭 진입 - 모든 예약 가능한 장비 조회');
    loadDevices(); // 날짜 없이 호출하면 모든 예약 가능한 장비 조회
  }, [loadDevices]);

  // 날짜 변경 시 해당 날짜의 예약 가능한 장비 목록 조회
  useEffect(() => {
    if (state.dateRange?.from && state.dateRange?.to) {
      console.log('날짜 선택됨 - 필터링된 예약 가능한 장비 조회:', {
        from: state.dateRange.from,
        to: state.dateRange.to,
      });
      loadDevices(state.dateRange.from, state.dateRange.to);
    } else if (state.dateRange === null || state.dateRange === undefined) {
      // 날짜가 완전히 선택 해제된 경우 전체 예약 가능한 장비 목록 조회
      console.log('날짜 선택 해제 - 모든 예약 가능한 장비 조회');
      loadDevices();
    }
    // from만 있고 to가 없는 경우는 아무것도 하지 않음 (선택 중)
  }, [state.dateRange?.from, state.dateRange?.to, loadDevices]);

  const receiptDevices = Object.entries(state.selectedDevices)
    .map(([deviceId, count]) => {
      const device = devices.find((d) => d.storeDeviceId === Number(deviceId));
      if (!device || count === 0) return undefined;
      return {
        name: device.deviceName || '',
        price: device.price ? `${device.price.toLocaleString()}원` : '가격 정보 없음', // 실제 가격 정보 사용
        count,
      };
    })
    .filter((d) => !!d);

  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      // 예약 요청 데이터 구성 (이미 예약하기 버튼에서 유효성 검증 완료)
      const reservationData = {
        storeId,
        storeDevices: Object.entries(state.selectedDevices)
          .filter(([, count]) => count > 0)
          .map(([deviceId, count]) => ({
            storeDeviceId: Number(deviceId),
            count,
          })),
        rentalStartDate: formatDateForReservation(state.dateRange!.from!),
        rentalEndDate: formatDateForReservation(state.dateRange!.to!),
      };

      console.log('예약 요청 데이터:', reservationData);

      // 로그인 상태 체크 (디버깅용)
      const accessToken = localStorage.getItem('accessToken');
      console.log('로그인 상태:', {
        hasAccessToken: !!accessToken,
        tokenLength: accessToken?.length,
        tokenPreview: accessToken?.substring(0, 20) + '...',
      });

      // 예약 API 호출
      const result = await createReservationWithValidation(reservationData);

      if (result.success) {
        makeToast('예약이 완료되었습니다!', 'success');
        console.log('예약 성공! 예약 ID:', result.reservationId);

        // 성공 후 초기화
        dispatch({ type: 'RESET' });
        setShowReceiptModal(false);
      } else {
        // 유효성 검증 또는 API 에러
        const errorMessage = result.errors?.join(', ') || '예약에 실패했습니다.';
        console.error('예약 실패 상세:', {
          errors: result.errors,
          errorMessage,
        });

        // 로그인 관련 에러인지 확인
        const isLoginError = result.errors?.some(
          (error) =>
            error.includes('로그인이 필요합니다') ||
            error.includes('인증') ||
            error.includes('권한') ||
            error.includes('Unauthorized'),
        );

        if (isLoginError) {
          makeToast('로그인이 필요합니다. 로그인 후 다시 시도해주세요.', 'warning');
          // TODO: 로그인 페이지로 리다이렉트하거나 로그인 모달 표시
        } else {
          makeToast(errorMessage, 'warning');
        }
      }
    } catch (error) {
      console.error('예약 처리 중 오류 발생:', error);
      makeToast('예약 처리 중 오류가 발생했습니다.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 날짜 선택 */}
      <CalendarSection
        dateRange={state.dateRange}
        onChange={(range) => dispatch({ type: 'SET_DATE_RANGE', payload: range })}
      />
      {/* 기기 선택 */}
      <DeviceSelectSection
        devices={convertedDevices}
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
              onPay={handlePayment}
              onClose={() => setShowReceiptModal(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
      {/* 로딩 오버레이 */}
      {isSubmitting && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
            <span className="font-body-regular text-[var(--black)]">예약 처리 중...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
