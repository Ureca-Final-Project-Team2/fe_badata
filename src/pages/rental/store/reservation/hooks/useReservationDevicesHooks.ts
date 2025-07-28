import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchRentalDevices } from '@/pages/rental/store/reservation/api/apis';
import { formatDateForReservation } from '@/pages/rental/store/reservation/utils/dataFormatters';
import { makeToast } from '@/shared/lib/makeToast';

import type { RentalDevice } from '@/pages/rental/store/reservation/lib/types';

interface UseReservationDevicesProps {
  storeId: number;
  dateRange?: { from: Date | null; to: Date | null } | null;
}

interface UseReservationDevicesReturn {
  devices: RentalDevice[];
  isLoadingDevices: boolean;
  loadDevices: (startDate?: Date, endDate?: Date) => Promise<void>;
}

export const useReservationDevices = ({
  storeId,
  dateRange,
}: UseReservationDevicesProps): UseReservationDevicesReturn => {
  const [devices, setDevices] = useState<RentalDevice[]>([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(false);

  // 이전 devices를 유지하여 부드러운 전환 (깜빡거림 방지)
  const [prevDevices, setPrevDevices] = useState<RentalDevice[]>([]);
  const [displayDevices, setDisplayDevices] = useState<RentalDevice[]>([]);

  // 초기 로딩 완료 플래그
  const hasInitialLoaded = useRef(false);
  // 현재 요청 중인지 체크하는 플래그 (중복 요청 방지)
  const isRequestingRef = useRef(false);
  // 마지막 요청 파라미터를 저장해서 중복 요청 방지
  const lastRequestRef = useRef<string>('');

  // 예약 가능한 장비 목록 조회 함수
  const loadDevices = useCallback(
    async (startDate?: Date, endDate?: Date) => {
      try {
        setIsLoadingDevices(true);

        // 날짜가 제공되지 않으면 undefined로 설정하여 모든 장비 조회
        const params =
          startDate && endDate
            ? {
                rentalStartDate: formatDateForReservation(startDate),
                rentalEndDate: formatDateForReservation(endDate),
              }
            : undefined;

        const deviceList = await fetchRentalDevices(storeId, params);
        setDevices(deviceList);
      } catch (error) {
        console.error('예약 가능한 장비 목록 조회 실패:', error);
        makeToast('장비 목록을 불러오는데 실패했습니다.', 'warning');
        setDevices([]);
      } finally {
        setIsLoadingDevices(false);
      }
    },
    [storeId],
  );

  // 통합된 장비 조회 함수 (부드러운 전환 지원)
  const fetchDevicesSafely = useCallback(
    async (params?: { rentalStartDate: string; rentalEndDate: string }) => {
      // 요청 키 생성 (중복 요청 방지용)
      const requestKey = `${storeId}-${params ? `${params.rentalStartDate}-${params.rentalEndDate}` : 'all'}`;

      // 이미 요청 중이거나 같은 요청이면 중단
      if (isRequestingRef.current || lastRequestRef.current === requestKey) {
        return;
      }

      try {
        isRequestingRef.current = true;
        lastRequestRef.current = requestKey;

        // 로딩 시작 - 하지만 즉시 UI 업데이트하지 않고 짧은 delay 후
        const loadingTimeout = setTimeout(() => {
          if (isRequestingRef.current) {
            setIsLoadingDevices(true);
          }
        }, 150); // 150ms 후에만 로딩 표시

        console.log('🔄 예약 장비 조회 시작:', { storeId, params, requestKey });

        const deviceList = await fetchRentalDevices(storeId, params);

        // 로딩 타임아웃 클리어
        clearTimeout(loadingTimeout);

        // 부드러운 전환을 위해 이전 데이터 저장 및 새 데이터 설정
        setDevices((currentDevices) => {
          setPrevDevices(currentDevices);
          setDisplayDevices(deviceList); // 즉시 업데이트
          return deviceList;
        });
      } catch (error) {
        console.error('예약 가능한 장비 목록 조회 실패:', error);
        makeToast('장비 목록을 불러오는데 실패했습니다.', 'warning');
        setDevices([]);
        // 에러 시에는 현재 displayDevices 유지 (깜빡거림 방지)
      } finally {
        setIsLoadingDevices(false);
        isRequestingRef.current = false;
      }
    },
    [storeId],
  );

  // 초기 로딩: 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    if (!hasInitialLoaded.current) {
      fetchDevicesSafely(); // 모든 장비 조회
      hasInitialLoaded.current = true;
    }
  }, [fetchDevicesSafely]);

  // 날짜 변경 시에만 장비 조회
  useEffect(() => {
    if (!hasInitialLoaded.current) return; // 초기 로딩 완료 후에만 실행

    if (dateRange?.from && dateRange?.to) {
      // 날짜가 선택된 경우: 필터링된 장비 조회
      const params = {
        rentalStartDate: formatDateForReservation(dateRange.from),
        rentalEndDate: formatDateForReservation(dateRange.to),
      };
      fetchDevicesSafely(params);
    } else if (dateRange === null) {
      // 날짜가 초기화된 경우: 모든 장비 조회
      fetchDevicesSafely();
    }
  }, [fetchDevicesSafely, dateRange?.from, dateRange?.to]);

  return {
    devices: displayDevices, // 부드러운 전환을 위한 displayDevices 반환
    isLoadingDevices,
    loadDevices,
  };
};
