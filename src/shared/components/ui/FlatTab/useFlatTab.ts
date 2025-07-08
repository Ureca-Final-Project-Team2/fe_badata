import * as React from 'react';
import { TabItem } from './types';

export const useFlatTab = (
  items: TabItem[],
  controlledValue?: string,
  defaultValue?: string,
  onValueChange?: (value: string) => void,
) => {
  const [internalValue, setInternalValue] = React.useState(
    controlledValue ?? defaultValue ?? items[0]?.id ?? '',
  );

  const currentValue = controlledValue ?? internalValue;

  const handleValueChange = React.useCallback(
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

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const activeItem = items.find((item) => item.id === currentValue);

  return { currentValue, activeItem, handleValueChange };
};
