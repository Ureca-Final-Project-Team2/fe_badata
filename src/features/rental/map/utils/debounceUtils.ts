// ✅ any 없이 타입 안전하게 개선된 debounce

// 디바운싱을 위한 타이머 관리
const debounceTimers = new WeakMap<object, NodeJS.Timeout>();

export const debounce = <TArgs extends unknown[], TReturn>(
  func: (...args: TArgs) => TReturn,
  delay: number,
  key?: object,
): ((...args: TArgs) => void) => {
  return (...args: TArgs) => {
    const timerKey = key || func;

    const existingTimer = debounceTimers.get(timerKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const newTimer = setTimeout(() => {
      try {
        const result = func(...args);

        // Promise 타입 가드 함수
        const isPromise = (value: unknown): value is Promise<unknown> => {
          return (
            value !== null &&
            typeof value === 'object' &&
            'then' in value &&
            typeof (value as Record<string, unknown>).then === 'function'
          );
        };

        if (isPromise(result)) {
          result.catch((error: unknown) => {
            console.error('Debounced async function execution error:', error);
          });
        }
      } catch (error) {
        console.error('Debounced function execution error:', error);
      }

      debounceTimers.delete(timerKey);
    }, delay);

    debounceTimers.set(timerKey, newTimer);
  };
};

export const clearDebounceTimer = (key: object) => {
  const timer = debounceTimers.get(key);
  if (timer) {
    clearTimeout(timer);
    debounceTimers.delete(key);
  }
};
