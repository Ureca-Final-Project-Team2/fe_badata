// 디바운싱을 위한 타이머 관리
const debounceTimers = new WeakMap<any, NodeJS.Timeout>();

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  key?: any,
): ((...args: Parameters<T>) => void) => {
  return (...args: Parameters<T>) => {
    const timerKey = key || func;

    // 기존 타이머가 있다면 취소
    const existingTimer = debounceTimers.get(timerKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // 새로운 타이머 설정
    const newTimer = setTimeout(() => {
      func(...args);
      debounceTimers.delete(timerKey);
    }, delay);

    debounceTimers.set(timerKey, newTimer);
  };
};

export const clearDebounceTimer = (key: any) => {
  const timer = debounceTimers.get(key);
  if (timer) {
    clearTimeout(timer);
    debounceTimers.delete(key);
  }
};
