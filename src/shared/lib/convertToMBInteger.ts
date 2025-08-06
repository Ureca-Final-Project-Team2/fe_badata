/**
 * 용량 단위를 MB 정수로 변환하는 함수
 * @param value - 변환할 값
 * @param unit - 단위 ('MB' | 'GB')
 * @returns MB 단위의 정수 값
 */
export const convertToMBInteger = (value: string, unit: 'MB' | 'GB'): number => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 0;

  const mbValue = unit === 'GB' ? numericValue * 1024 : numericValue;
  return Math.floor(mbValue);
};
