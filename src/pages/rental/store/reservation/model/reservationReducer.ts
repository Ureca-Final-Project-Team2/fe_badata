import type { DateRange } from 'react-day-picker';

export interface State {
  dateRange: DateRange | undefined;
  selectedDeviceId: number | null;
  agreed: boolean;
  isSubmitting: boolean;
}

export type Action =
  | { type: 'SET_DATE_RANGE'; payload: DateRange | undefined }
  | { type: 'SET_SELECTED_DEVICE'; payload: number | null }
  | { type: 'SET_AGREED'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET' };

export const initialState: State = {
  dateRange: undefined,
  selectedDeviceId: null,
  agreed: false,
  isSubmitting: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'SET_SELECTED_DEVICE':
      return { ...state, selectedDeviceId: action.payload };
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
