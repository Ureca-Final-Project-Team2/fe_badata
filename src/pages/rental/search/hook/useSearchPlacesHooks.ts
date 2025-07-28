import { useCallback, useEffect, useState } from 'react';

import {
  searchPlaces,
  type PlaceSearchResult,
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

  // 디바운스된 키워드 (500ms)
  const debouncedKeyword = useDebounce(keyword, 500);

  // 검색 실행 함수
  const performSearch = useCallback(async (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchPlaces(searchKeyword);
      setSearchResults(results);
    } catch (error) {
      console.error('검색 오류:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 스로틀링된 검색 함수 (300ms)
  const throttledSearch = useThrottle(performSearch, 300);

  // 디바운스된 키워드가 변경될 때 검색 실행
  useEffect(() => {
    if (debouncedKeyword !== keyword) {
      throttledSearch(debouncedKeyword);
    }
  }, [debouncedKeyword, keyword, throttledSearch]);

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
    handleSearchFocus,
    handleSearchBlur,
  };
};
