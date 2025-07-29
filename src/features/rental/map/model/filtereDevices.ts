import type { StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

/**
 * 장비 목록을 필터 상태에 따라 필터링하는 함수
 * 모든 필터 조건(가격, 데이터 용량, 데이터 타입, 최대 접속 기기 수, 별점)을 적용
 */
export function filterDevices(
  devices: StoreDevice[],
  filterState: RentalFilterState,
): StoreDevice[] {
  return devices.filter((device: StoreDevice) => {
    // 가격 필터링
    if (filterState.minPrice !== undefined && filterState.minPrice > 0) {
      if (!device.price || device.price < filterState.minPrice) return false;
    }
    if (filterState.maxPrice !== undefined && filterState.maxPrice > 0) {
      if (!device.price || device.price > filterState.maxPrice) return false;
    }

    // 데이터 용량 필터링
    if (filterState.dataAmount && filterState.dataAmount !== '무제한') {
      const requiredCapacity = parseInt(filterState.dataAmount.replace('GB', ''));
      if (!device.dataCapacity || device.dataCapacity < requiredCapacity) return false;
    } else if (filterState.dataAmount === '무제한') {
      // 무제한인 경우 모든 장비 허용 (서버에서 이미 필터링됨)
    }

    // 데이터 타입 필터링 (5G/4G)
    if (filterState.dataType) {
      if (!device.dataType || device.dataType !== filterState.dataType) return false;
    }

    // 최대 접속 가능 기기 수 필터링
    if (filterState.maxSupportConnection) {
      if (
        !device.maxSupportConnection ||
        device.maxSupportConnection < filterState.maxSupportConnection
      )
        return false;
    }

    // 별점 필터링
    if (filterState.star && filterState.star > 0) {
      if (!device.reviewRating || device.reviewRating < filterState.star) return false;
    }

    return true;
  });
}
