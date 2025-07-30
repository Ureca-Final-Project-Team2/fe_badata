import { useMemo } from 'react';

import dayjs from 'dayjs';

export function useExpireDateHooks(expireDate?: string) {
  return useMemo(() => {
    if (!expireDate) return null;
    const diff = dayjs(expireDate).diff(dayjs(), 'day');
    return diff < 0 ? '기간만료' : `D-${diff}`;
  }, [expireDate]);
}
