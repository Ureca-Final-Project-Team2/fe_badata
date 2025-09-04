'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * requestAnimationFrame으로 호출을 프레임당 1회로 묶는다.
 */
export function useRafThrottle<A extends readonly unknown[]>(fn: (...args: A) => void) {
  const rafIdRef = useRef<number | null>(null);
  const lastArgsRef = useRef<A | null>(null);

  const throttled = useCallback(
    (...args: A) => {
      lastArgsRef.current = args;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          const argsToUse = lastArgsRef.current;
          if (argsToUse) fn(...argsToUse);
        });
      }
    },
    [fn],
  );

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return throttled;
}
