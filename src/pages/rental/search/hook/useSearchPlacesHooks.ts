import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  searchPlaces,
  type PlaceSearchResult,
  type SearchPlacesParams,
} from '@/pages/rental/search/utils/address/searchPlaces';

// 디바운싱 훅
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 스로틀링 훅
const useThrottle = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
  const [lastRun, setLastRun] = useState(0);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      if (now - lastRun >= delay) {
        setLastRun(now);
        callback(...args);
      }
    },
    [callback, delay, lastRun],
  );
};

// 키워드 검색 훅
export const useSearchPlaces = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  // 디바운스된 키워드 (500ms) - 공백 제거
  const debouncedKeyword = useDebounce(keyword.trim(), 500);

  // 검색 실행 함수
  const performSearch = useCallback(
    async (searchKeyword: string, pageNum: number = 1, append: boolean = false) => {
      const trimmedKeyword = searchKeyword.trim();
      if (!trimmedKeyword) {
        setSearchResults([]);
        return;
      }

      if (pageNum === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const params: SearchPlacesParams = {
          keyword: trimmedKeyword,
          page: pageNum,
          size: 15,
        };

        const results = await searchPlaces(params);

        if (append) {
          setSearchResults((prev) => [...prev, ...results]);
        } else {
          setSearchResults(results);
        }

        setHasNext(results.length === 15 && pageNum < 3);
      } catch (error) {
        console.error('검색 오류:', error);
        if (!append) {
          setSearchResults([]);
        }
        // API 호출 제한 에러인 경우 사용자에게 알림
        if (error instanceof Error && error.message.includes('API 호출 제한')) {
          console.warn('API 호출 제한으로 인해 검색이 일시적으로 중단되었습니다.');
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  // 스로틀링된 검색 함수 (300ms)
  const throttledSearch = useThrottle(performSearch, 300);

  // 디바운스된 키워드가 변경될 때 검색 실행
  useEffect(() => {
    const trimmedKeyword = keyword.trim();
    if (debouncedKeyword !== trimmedKeyword && debouncedKeyword) {
      setPage(1);
      setHasNext(true);
      throttledSearch(debouncedKeyword, 1, false);
    }
  }, [debouncedKeyword, keyword, throttledSearch]);

  // 다음 페이지 로드 함수
  const loadNextPage = useCallback(() => {
    if (!hasNext || isLoadingMore || isLoading) return;

    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(keyword.trim(), nextPage, true);
  }, [hasNext, isLoadingMore, isLoading, page, keyword, performSearch]);

  // 키워드 설정 함수
  const setKeywordOptimized = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  // 검색 결과 메모이제이션
  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

  // 로딩 상태 메모이제이션
  const memoizedIsLoading = useMemo(() => isLoading, [isLoading]);

  // 더 로딩 상태 메모이제이션
  const memoizedIsLoadingMore = useMemo(() => isLoadingMore, [isLoadingMore]);

  // 다음 페이지 존재 여부 메모이제이션
  const memoizedHasNext = useMemo(() => hasNext, [hasNext]);

  return {
    keyword,
    setKeyword: setKeywordOptimized,
    searchResults: memoizedSearchResults,
    isLoading: memoizedIsLoading,
    isLoadingMore: memoizedIsLoadingMore,
    hasNext: memoizedHasNext,
    loadNextPage,
  };
};
