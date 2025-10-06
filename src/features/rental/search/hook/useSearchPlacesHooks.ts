import { useCallback, useEffect, useRef, useState } from 'react';

import {
  searchPlaces,
  type PlaceSearchResult,
  type SearchPlacesParams,
} from '@/features/rental/search/utils/address/searchPlaces';

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

// 키워드 검색 훅
export const useSearchPlaces = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(1);

  // 같은 요청 (키워드, 페이지)이 중복으로 발생하는 것을 방지 가드
  const lastReqRef = useRef<string | null>(null);

  // 디바운스된 키워드 (500ms) - 공백 제거
  const debouncedKeyword = useDebounce(keyword.trim(), 500);

  // 이전 요청 취소용 컨트롤러
  const controllerRef = useRef<AbortController | null>(null);

  // 검색 실행 함수
  const performSearch = useCallback(
    async (searchKeyword: string, pageNum: number = 1, append: boolean = false) => {
      const trimmedKeyword = searchKeyword.trim();
      if (!trimmedKeyword) {
        setSearchResults([]);
        return;
      }

      // StrictMode 재마운트/이펙트 재실행 시 같은 요청 스킵
      const reqKey = `${trimmedKeyword}::${pageNum}::${append ? 'append' : 'replace'}`;
      if (lastReqRef.current === reqKey) {
        return;
      }
      lastReqRef.current = reqKey;

      // 이전 요청 취소
      controllerRef.current?.abort();
      // 새 컨트롤러 생성
      const controller = new AbortController();
      controllerRef.current = controller;

      // API 호출
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
          signal: controller.signal,
        };

        const results = await searchPlaces(params);

        if (append) {
          setSearchResults((prev) => [...prev, ...results]);
        } else {
          setSearchResults(results);
        }

        setHasNext(results.length === 15 && pageNum < 3);
      } catch (error) {
        if ((error as Error)?.name !== 'AbortError') {
          console.error('검색 오류:', error);
          if (!append) {
            setSearchResults([]);
          }
          // API 호출 제한 에러인 경우 사용자에게 알림
          if (error instanceof Error && error.message.includes('API 호출 제한')) {
            console.warn('API 호출 제한으로 인해 검색이 일시적으로 중단되었습니다.');
          }
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  // 디바운스된 키워드가 변경될 때 검색 실행
  useEffect(() => {
    if (!debouncedKeyword) {
      setSearchResults([]);
      // 현재 진행 중인 요청이 있으면 취소
      controllerRef.current?.abort();
      return;
    }
    setPage(1);
    setHasNext(true);
    performSearch(debouncedKeyword, 1, false);
    // 이 이펙트가 재실행/언마운트 될 때 진행 중 요청 취소
    return () => {
      controllerRef.current?.abort();
    };
  }, [debouncedKeyword, performSearch]);

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

  return {
    keyword,
    setKeyword: setKeywordOptimized,
    searchResults,
    isLoading,
    isLoadingMore,
    hasNext,
    loadNextPage,
  };
};
