import { useReducer, useState } from 'react';

import {
  dataFilterReducer,
  initialDataFilterState,
  type DataFilterState,
} from '../data/model/dataFilterReducer';

export const useDataFilterHooks = () => {
  const [state, dispatch] = useReducer(dataFilterReducer, initialDataFilterState);

  const [dataDrawerOpen, setDataDrawerOpen] = useState(false);

  const openDataDrawer = () => setDataDrawerOpen(true);
  const closeDataDrawer = () => setDataDrawerOpen(false);

  const submitDataFilter = (filters: DataFilterState) => {
    dispatch({ type: 'SET_ALL_FILTERS', payload: filters });
    closeDataDrawer();
  };

  return {
    dataFilterState: state,
    dataDispatch: dispatch,
    dataDrawerOpen,
    openDataDrawer,
    closeDataDrawer,
    submitDataFilter,
  };
};
