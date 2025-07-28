'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  addRecentKeyword,
  clearRecentKeywords,
  getRecentKeywords,
  removeRecentKeyword,
} from '@/shared/lib/localstorageSearch';

export const useRecentSearchHooks = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 데이터를 가져오는 동안 로딩 상태 유지
    const loadKeywords = () => {
      try {
        const recentKeywords = getRecentKeywords();
        setKeywords(recentKeywords);
      } catch (error) {
        console.error('Failed to load recent keywords:', error);
        setKeywords([]);
      } finally {
        setIsLoading(false);
      }
    };

    // 약간의 지연을 주어 스켈레톤 UI가 보이도록 함
    const timer = setTimeout(loadKeywords, 90);

    return () => clearTimeout(timer);
  }, []);

  const add = useCallback((keyword: string) => {
    setKeywords(addRecentKeyword(keyword));
  }, []);

  const remove = useCallback((keyword: string) => {
    setKeywords(removeRecentKeyword(keyword));
  }, []);

  const clear = useCallback(() => {
    clearRecentKeywords();
    setKeywords([]);
  }, []);

  return {
    keywords,
    isLoading,
    add,
    remove,
    clear,
  };
};
