import type { MobileCarrier } from '../../register/data/lib/types';

export type PriceRange =
  | '0_3000'
  | '3000_7000'
  | '7000_10000'
  | '10000_15000'
  | 'OVER_15000'
  | null;

export interface DataFilterState {
  carriers: MobileCarrier[];
  capacities: string[];
  priceRange: PriceRange;
}

export const initialDataFilterState: DataFilterState = {
  carriers: [],
  capacities: [],
  priceRange: null,
};

export type DataFilterAction =
  | { type: 'TOGGLE_CARRIER'; payload: MobileCarrier }
  | { type: 'TOGGLE_CAPACITY'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: PriceRange }
  | { type: 'SET_ALL_FILTERS'; payload: Partial<DataFilterState> }
  | { type: 'RESET' };

export function dataFilterReducer(
  state: DataFilterState,
  action: DataFilterAction,
): DataFilterState {
  switch (action.type) {
    case 'TOGGLE_CARRIER':
      return {
        ...state,
        carriers: state.carriers.includes(action.payload)
          ? state.carriers.filter((c) => c !== action.payload)
          : [...state.carriers, action.payload],
      };
    case 'TOGGLE_CAPACITY':
      return {
        ...state,
        capacities: state.capacities.includes(action.payload)
          ? state.capacities.filter((c) => c !== action.payload)
          : [...state.capacities, action.payload],
      };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_ALL_FILTERS':
      return {
        ...initialDataFilterState,
        ...action.payload,
      };
    case 'RESET':
      return initialDataFilterState;
    default:
      return state;
  }
}
