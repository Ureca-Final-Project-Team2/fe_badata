import { useEffect, useState } from 'react';

/**
 * 특정 값(value)을 delay 후에 반환하는 debounce 훅
 * 빈 문자열일 때는 디바운싱을 스킵하고 즉시 반환
 */
export const useDebouncedValue = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 빈 문자열이거나 falsy한 값일 때는 즉시 반환
    if (value === '' || value === null || value === undefined) {
      setDebouncedValue(value);
      return;
    }

    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 검색어 전용 디바운스 훅
 * 빈 문자열일 때는 즉시 반환하여 불필요한 API 호출을 방지
 */
export const useDebouncedSearch = (searchTerm: string, delay: number = 300): string => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchTerm);

  useEffect(() => {
    // 빈 문자열일 때는 즉시 반환
    if (searchTerm.trim() === '') {
      setDebouncedSearch('');
      return;
    }

    const timeout = setTimeout(() => setDebouncedSearch(searchTerm), delay);
    return () => clearTimeout(timeout);
  }, [searchTerm, delay]);

  return debouncedSearch;
};
