import { useCallback } from 'react';

import { makeToast } from '@/shared/lib/makeToast';

interface UseDeviceQuantityProps {
  count: number;
  maxCount: number;
  isSoldOut: boolean;
  onCountChange: (newCount: number) => void;
}

interface UseDeviceQuantityReturn {
  canIncrement: boolean;
  handleDecrement: (e: React.MouseEvent) => void;
  handleIncrement: (e: React.MouseEvent) => void;
}

export const useDeviceQuantity = ({
  count,
  maxCount,
  isSoldOut,
  onCountChange,
}: UseDeviceQuantityProps): UseDeviceQuantityReturn => {
  const canIncrement = count < maxCount && !isSoldOut;

  const handleDecrement = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onCountChange(Math.max(0, count - 1));
    },
    [count, onCountChange],
  );

  const handleIncrement = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (count >= maxCount) {
        makeToast('남은 수량까지만 선택할 수 있습니다.', 'warning');
        return;
      }
      onCountChange(count + 1);
    },
    [count, onCountChange, maxCount],
  );

  return {
    canIncrement,
    handleDecrement,
    handleIncrement,
  };
};
