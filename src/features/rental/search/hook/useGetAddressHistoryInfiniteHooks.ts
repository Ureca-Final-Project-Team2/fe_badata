import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { getAddressHistoryList } from '@/features/rental/search/api/apis';

export const useGetAddressHistoryInfinite = (size: number, sort: string = 'lastUsed,desc') => {
  const lastCallRef = useRef<{ size: number; sort: string } | null>(null);

  // 디바운싱된 로그 출력
  useEffect(() => {
    const currentCall = { size, sort };
    const lastCall = lastCallRef.current;

    // 동일한 파라미터로 중복 호출 방지
    if (!lastCall || lastCall.size !== currentCall.size || lastCall.sort !== currentCall.sort) {
      lastCallRef.current = currentCall;

      if (process.env.NODE_ENV === 'development') {
        const timeoutId = setTimeout(() => {
          console.log('useGetAddressHistoryInfinite 호출:', currentCall);
        }, 50);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [size, sort]);

  return useInfiniteQuery({
    queryKey: ['addressHistory', size, sort],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getAddressHistoryList(pageParam, size, sort);
      return result;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.content?.hasNext) return undefined;
      return lastPage.content.getAddressResponses.length > 0
        ? lastPage.content.getAddressResponses.length / size
        : undefined;
    },
    initialPageParam: 0,
  });
};
