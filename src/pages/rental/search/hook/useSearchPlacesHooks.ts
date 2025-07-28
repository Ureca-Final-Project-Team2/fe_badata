import { useCallback, useEffect, useState } from 'react';

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

// 키워드 검색 훅 (무한스크롤 지원)
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

        // 카카오 API는 최대 45개 결과를 반환하므로, 15개씩 3페이지까지만 가능
        setHasNext(results.length === 15 && pageNum < 3);
      } catch (error) {
        console.error('검색 오류:', error);
        if (!append) {
          setSearchResults([]);
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

  // 검색창 클릭 시 포커스 처리
  const handleSearchFocus = useCallback(() => {
    // 검색창 포커스 시 특별한 처리 없음
  }, []);

  // 검색창에서 포커스가 벗어날 때 처리
  const handleSearchBlur = useCallback(() => {
    // 검색창 블러 시 특별한 처리 없음
  }, []);

  return {
    keyword,
    setKeyword,
    searchResults,
    isLoading,
    isLoadingMore,
    hasNext,
    loadNextPage,
    handleSearchFocus,
    handleSearchBlur,
  };
};
