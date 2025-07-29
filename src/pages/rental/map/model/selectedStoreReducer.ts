import type { StoreDetail, StoreDevice } from '@/pages/rental/map/lib/types';

export interface SelectedStoreState {
  selectedDevices: StoreDevice[];
  selectedStoreId: number | null;
  selectedStoreDetail?: StoreDetail;
}

export type SelectedStoreAction =
  | { type: 'SELECT_STORE'; devices: StoreDevice[]; storeId: number; storeDetail?: StoreDetail }
  | { type: 'RESET' };

export const initialSelectedStoreState: SelectedStoreState = {
  selectedDevices: [],
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
        selectedStoreId: action.storeId,
        selectedStoreDetail: action.storeDetail,
      };
    case 'RESET':
      return initialSelectedStoreState;
    default:
      return state;
  }
}
