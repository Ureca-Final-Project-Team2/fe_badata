import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';

export function useFilteredDevices(
  devices: StoreDevice[],
  filterState: RentalFilterState,
): StoreDevice[] {
  return devices.filter((device: StoreDevice) => {
    if (filterState.minPrice !== undefined && device.price < filterState.minPrice) return false;
    if (filterState.maxPrice !== undefined && device.price > filterState.maxPrice) return false;
    if (
      filterState.dataAmount &&
      device.dataCapacity &&
      `${device.dataCapacity}GB` !== filterState.dataAmount
    )
      return false;
    return true;
  });
}
