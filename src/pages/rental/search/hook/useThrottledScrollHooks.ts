import { useCallback, useEffect, useRef } from 'react';

// 스크롤 이벤트 throttle 훅
const useThrottledScroll = (callback: () => void, delay: number = 100) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRunRef = useRef(0);

  const throttledCallback = useCallback(() => {
    const now = Date.now();
    if (now - lastRunRef.current >= delay) {
      lastRunRef.current = now;
      callback();
    } else if (timeoutRef.current === null) {
      timeoutRef.current = setTimeout(
        () => {
          lastRunRef.current = Date.now();
          callback();
          timeoutRef.current = null;
        },
        delay - (now - lastRunRef.current),
      );
    }
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

export default useThrottledScroll;
