import { useReducer } from 'react';

import { initialSelectedStoreState, selectedStoreReducer } from './selectedStoreReducer';

export function useSelectedStore() {
  return useReducer(selectedStoreReducer, initialSelectedStoreState);
}
