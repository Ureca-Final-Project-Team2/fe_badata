import type { DateRange } from 'react-day-picker';

/**
 * 컴포넌트에서 사용하는 DateRange 타입을 reducer용 DateRange로 변환
 */
export const convertToReducerDateRange = (
  range: { from: Date | null; to: Date | null } | null,
): DateRange | undefined => {
  console.log('convertToReducerDateRange - 입력:', range);

  if (!range) {
    console.log('convertToReducerDateRange - null 반환');
    return undefined;
  }

  const result = {
    from: range.from || undefined,
    to: range.to || undefined,
  };

  console.log('convertToReducerDateRange - 결과:', result);
  return result;
};

/**
 * reducer의 DateRange를 컴포넌트용 타입으로 변환
 */
export const convertFromReducerDateRange = (
  range: DateRange | undefined,
): { from: Date | null; to: Date | null } | null => {
  console.log('convertFromReducerDateRange - 입력:', range);

  if (!range) {
    console.log('convertFromReducerDateRange - null 반환');
    return null;
  }

  const result = {
    from: range.from || null,
    to: range.to || null,
  };

  console.log('convertFromReducerDateRange - 결과:', result);
  return result;
};
