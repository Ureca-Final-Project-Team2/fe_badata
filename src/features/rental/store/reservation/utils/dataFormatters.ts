import type { RentalDevice } from '@/features/rental/store/reservation/lib/types';

/**
 * ========================================
 * 데이터 변환 함수들
 * ========================================
 */

/**
 * RentalDevice를 DeviceSelectSection에서 사용하는 Device 타입으로 변환
 */
export const convertDevicesForUI = (devices: RentalDevice[]) => {
  return devices.map((device) => ({
    id: device.storeDeviceId,
    deviceName: device.deviceName,
    imageUrl: device.imageUrl,
    dataCapacity: device.dataCapacity,
    price: device.price,
    remainCount: device.availableCount,
    totalCount: device.totalCount, // 가맹점 보유 총 기기 수 추가
  }));
};

/**
 * 영수증에 표시할 장비 목록 생성
 */
export const createReceiptDevices = (
  selectedDevices: Record<number, number>,
  devices: RentalDevice[],
) => {
  return Object.entries(selectedDevices)
    .map(([deviceId, count]) => {
      const device = devices.find((d) => d.storeDeviceId === +deviceId);
      if (!device || count === 0) return undefined;
      return {
        name: device.deviceName || '',
        price: device.price ? `${device.price.toLocaleString()}원` : '가격 정보 없음',
        count,
      };
    })
    .filter((d): d is NonNullable<typeof d> => !!d);
};

/**
 * ========================================
 * 날짜/시간 포맷팅 함수들
 * ========================================
 */

/**
 * 날짜를 ISO 8601 형식으로 변환 (API 요청용, Z 제거)
 */
export const formatDateForReservation = (date: Date): string => {
  return date.toISOString().slice(0, -1); // 'Z' 제거
};

/**
 * 날짜 범위를 사용자 친화적 문자열로 포맷 (UI 표시용)
 */
export const formatDateRange = (dateRange: { from: Date | null; to: Date | null } | null) => {
  if (!dateRange?.from || !dateRange?.to) return '';
  return `${dateRange.from.toLocaleDateString()} ~ ${dateRange.to.toLocaleDateString()}`;
};

/**
 * 대여 기간 일수 계산
 */
export const calculateRentalDays = (dateRange: { from: Date | null; to: Date | null } | null) => {
  if (!dateRange?.from || !dateRange?.to) return '';
  const days =
    Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${days}일`;
};
