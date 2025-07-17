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

  useEffect(() => {
    setKeywords(getRecentKeywords());
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
    add,
    remove,
    clear,
  };
};
