import type { DateRange } from 'react-day-picker';

/**
 * 컴포넌트에서 사용하는 DateRange 타입을 reducer용 DateRange로 변환
 */
export const convertToReducerDateRange = (
  range: { from: Date | null; to: Date | null } | null,
): DateRange | undefined => {
  if (!range) return undefined;

  return {
    from: range.from || undefined,
    to: range.to || undefined,
  };
};

/**
 * reducer의 DateRange를 컴포넌트용 타입으로 변환
 */
export const convertFromReducerDateRange = (
  range: DateRange | undefined,
): { from: Date | null; to: Date | null } | null => {
  if (!range) return null;

  return {
    from: range.from || null,
    to: range.to || null,
  };
};
