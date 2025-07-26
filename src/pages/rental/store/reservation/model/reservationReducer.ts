import type { DateRange } from 'react-day-picker';

export interface State {
  selectedDevices: Record<string, number>; // deviceId -> count
  dateRange: DateRange | undefined;
  agreed: boolean;
  isSubmitting: boolean;
}

export type Action =
  | { type: 'SET_DATE_RANGE'; payload: DateRange | undefined }
  | { type: 'SET_DEVICE_COUNT'; payload: { deviceId: number; count: number } }
  | { type: 'SET_AGREED'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET' };

export const initialState: State = {
  dateRange: undefined,
  selectedDevices: {},
  agreed: false,
  isSubmitting: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'SET_DEVICE_COUNT': {
      const { deviceId, count } = action.payload;
      const updated = { ...state.selectedDevices };
      const deviceKey = deviceId.toString();
      if (count > 0) {
        updated[deviceKey] = count;
      } else {
        delete updated[deviceKey];
      }
      return { ...state, selectedDevices: updated };
    }
    case 'SET_AGREED':
      return { ...state, agreed: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
