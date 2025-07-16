'use client';

import {
  addRecentKeyword,
  clearRecentKeywords,
  getRecentKeywords,
  removeRecentKeyword,
} from '@lib/localSearch';
import { useCallback, useEffect, useState } from 'react';

export const useRecentSearch = () => {
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
