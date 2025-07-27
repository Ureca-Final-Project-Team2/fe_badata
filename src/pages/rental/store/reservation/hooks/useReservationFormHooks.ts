import { useMemo, useReducer } from 'react';

import {
  initialState,
  reducer,
  type Action,
} from '@/pages/rental/store/reservation/model/reservationReducer';

interface UseReservationFormReturn {
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
  isDateSelected: boolean;
  isDeviceSelected: boolean;
  isDateFuture: boolean;
  isFormValid: boolean;
}

export const useReservationForm = (): UseReservationFormReturn => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isDateSelected = useMemo(() => {
    return !!(state.dateRange && state.dateRange.from && state.dateRange.to);
  }, [state.dateRange]);

  const isDeviceSelected = useMemo(() => {
    return Object.keys(state.selectedDevices).length > 0;
  }, [state.selectedDevices]);

  const isDateFuture = useMemo(() => {
    if (!state.dateRange || !state.dateRange.from || !state.dateRange.to) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.dateRange.from >= today && state.dateRange.to >= today;
  }, [state.dateRange]);

  const isFormValid = useMemo(() => {
    return isDateSelected && isDeviceSelected && state.agreed && isDateFuture;
  }, [isDateSelected, isDeviceSelected, state.agreed, isDateFuture]);

  return {
    state,
    dispatch,
    isDateSelected,
    isDeviceSelected,
    isDateFuture,
    isFormValid,
  };
};
