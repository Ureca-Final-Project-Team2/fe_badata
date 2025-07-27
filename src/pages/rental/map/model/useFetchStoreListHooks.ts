import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchStoreList } from '@/pages/rental/map/api/apis';

import type { StoreListParams, StoreListResponse } from '@/pages/rental/map/lib/types';

export const useFetchStoreListHooks = (initialParams: StoreListParams, deps: unknown[] = []) => {
  const [stores, setStores] = useState<StoreListResponse['showStoreResponses']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(initialParams.page ?? 0);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchList = useCallback(async (params: StoreListParams) => {
    setIsLoading(true);
    try {
      // 백엔드 요청 형식에 맞게 파라미터 변환
      const mergedParams: Record<string, unknown> = {};
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) return; // undefined만 제외

        if (value === null) {
          mergedParams[key] = ''; // null은 빈 문자열로
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            mergedParams[key] = ''; // 빈 배열은 빈 문자열로
          } else if (key === 'sort') {
            mergedParams[key] = value.join(','); // sort 배열은 쉼표로 구분
          } else {
            mergedParams[key] = value; // 다른 배열은 그대로
          }
        } else {
          mergedParams[key] = value; // 일반 값은 그대로
        }
      });

      const res = await fetchStoreList(mergedParams as unknown as StoreListParams);
      setStores(res.showStoreResponses || []);
      setHasNext(res.hasNext);
    } catch (e) {
      setStores([]);
      setHasNext(false);
      console.error('[fetchStoreList] API 호출 에러:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchList({ ...initialParams, page });
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...deps]);

  const fetchNextPage = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  return {
    stores,
    isLoading,
    hasNext,
    page,
    fetchNextPage,
    refresh: () => fetchList({ ...initialParams, page }),
    setPage,
  };
};
