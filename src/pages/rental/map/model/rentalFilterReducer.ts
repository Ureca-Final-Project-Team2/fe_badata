// 타입 정의
export const RENTAL_DATA_AMOUNTS = ['5GB', '10GB', '20GB', '무제한'] as const;
export type RentalDataAmount = (typeof RENTAL_DATA_AMOUNTS)[number];

export const RENTAL_DATA_TYPES = ['5G', '4G/LTE'] as const;
export type RentalDataType = (typeof RENTAL_DATA_TYPES)[number];

export const RENTAL_MAX_SUPPORT_CONNECTIONS = [2, 5, 10] as const;
export type RentalMaxSupportConnection = (typeof RENTAL_MAX_SUPPORT_CONNECTIONS)[number];

import type { DateRange } from 'react-day-picker';

export interface RentalFilterState {
  star: number; // 0~5
  price: number;
  dataAmount?: RentalDataAmount;
  dataType?: RentalDataType;
  maxSupportConnection?: RentalMaxSupportConnection;
  dateRange?: DateRange;
  date?: Date;
}

export type RentalFilterAction =
  | { type: 'SET_STAR'; payload: number }
  | { type: 'SET_PRICE'; payload: number }
  | { type: 'SET_DATA_AMOUNT'; payload: RentalDataAmount }
  | { type: 'SET_DATA_TYPE'; payload: RentalDataType }
  | { type: 'SET_MAX_SUPPORT_CONNECTION'; payload: RentalMaxSupportConnection }
  | { type: 'SET_DATE_RANGE'; payload: DateRange | undefined }
  | { type: 'RESET' };

export const initialRentalFilterState: RentalFilterState = {
  star: 0,
  price: 0,
  dataAmount: undefined,
  dataType: undefined,
  maxSupportConnection: undefined,
  dateRange: undefined,
  date: undefined,
};

export function rentalFilterReducer(
  state: RentalFilterState,
  action: RentalFilterAction,
): RentalFilterState {
  switch (action.type) {
    case 'SET_STAR':
      return { ...state, star: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_DATA_AMOUNT':
      return { ...state, dataAmount: action.payload };
    case 'SET_DATA_TYPE':
      return { ...state, dataType: action.payload };
    case 'SET_MAX_SUPPORT_CONNECTION':
      return { ...state, maxSupportConnection: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'RESET':
      return initialRentalFilterState;
    default:
      return state;
  }
}
