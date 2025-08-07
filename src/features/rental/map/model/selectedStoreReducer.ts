import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';

export interface SelectedStoreState {
  selectedDevices: StoreDevice[];
  originalDevices: StoreDevice[]; // 원본 디바이스 정보 추가
  selectedStoreId: number | null;
  selectedStoreDetail?: StoreDetail;
}

export type SelectedStoreAction =
  | { type: 'SELECT_STORE'; devices: StoreDevice[]; storeId: number; storeDetail?: StoreDetail }
  | { type: 'UPDATE_FILTERED_DEVICES'; filteredDevices: StoreDevice[] }
  | { type: 'RESET' };

export const initialSelectedStoreState: SelectedStoreState = {
  selectedDevices: [],
  originalDevices: [],
  selectedStoreId: null,
  selectedStoreDetail: undefined,
};

export function selectedStoreReducer(
  state: SelectedStoreState,
  action: SelectedStoreAction,
): SelectedStoreState {
  switch (action.type) {
    case 'SELECT_STORE':
      return {
        selectedDevices: action.devices,
        originalDevices: action.devices, // 원본 디바이스 정보 저장
        selectedStoreId: action.storeId,
        selectedStoreDetail: action.storeDetail,
      };
    case 'UPDATE_FILTERED_DEVICES':
      return {
        ...state,
        selectedDevices: action.filteredDevices,
      };
    case 'RESET':
      return initialSelectedStoreState;
    default:
      return state;
  }
}
