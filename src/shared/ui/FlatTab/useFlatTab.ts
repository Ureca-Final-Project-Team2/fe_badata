import { useCallback, useEffect, useState } from 'react';

import type { TabItem } from '@ui/FlatTab/types';

export const useFlatTab = (
  items: TabItem[],
  controlledValue?: string,
  defaultValue?: string,
  onValueChange?: (value: string) => void,
) => {
  const [internalValue, setInternalValue] = useState(
    controlledValue ?? defaultValue ?? items[0]?.id ?? '',
  );

  const currentValue = controlledValue ?? internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      const item = items.find((item) => item.id === newValue);
      if (item?.disabled) return;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange, items],
  );

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const activeItem = items.find((item) => item.id === currentValue);

  return { currentValue, activeItem, handleValueChange };
};
