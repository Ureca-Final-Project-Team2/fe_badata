import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchStoreList } from '@/pages/rental/map/api/apis';
import { normalizeApiParams } from '@/pages/rental/map/utils/paramNormalizer';

import type { StoreListParams, StoreListResponse } from '@/pages/rental/map/lib/types';

export const useFetchStoreListHooks = (initialParams: StoreListParams, deps: unknown[] = []) => {
  const [stores, setStores] = useState<StoreListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(() => initialParams.page ?? 0);

  // initialParams.page 변경 시 동기화
  useEffect(() => {
    if (initialParams.page !== undefined) {
      setPage(initialParams.page);
    }
  }, [initialParams.page]);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchList = useCallback(async (params: StoreListParams) => {
    setIsLoading(true);
    try {
      // 백엔드 요청 형식에 맞게 파라미터 변환
      const normalizedParams = normalizeApiParams(params);

      const res = await fetchStoreList(normalizedParams);
      setStores(res.stores ?? []);
      setHasNext(res.hasNext ?? false);
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
