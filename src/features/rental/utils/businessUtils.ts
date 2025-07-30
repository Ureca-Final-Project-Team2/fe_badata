/**
 * 비즈니스 영업 상태를 나타내는 인터페이스
 */
export interface BusinessStatus {
  status: '영업 중' | '영업 전' | '영업 종료';
  color: string;
}

/**
 * 영업 시간을 파싱하여 분으로 변환하는 함수
 * @param timeString "HH:mm:ss" 또는 "HH:mm" 형식의 시간 문자열
 * @returns 자정부터의 총 분
 */
export const parseTimeToMinutes = (timeString: string): number => {
  const [hour, minute] = timeString.split(':').map(Number);
  return hour * 60 + minute;
};

/**
 * 현재 시간을 기준으로 영업 상태를 판단하는 함수
 * @param startTime 영업 시작 시간 ("HH:mm:ss" 형식)
 * @param endTime 영업 종료 시간 ("HH:mm:ss" 형식)
 * @returns 영업 상태와 표시할 색상
 */
export const getBusinessStatus = (startTime: string, endTime: string): BusinessStatus => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = parseTimeToMinutes(startTime);
  let endMinutes = parseTimeToMinutes(endTime);

  // 자정을 넘나드는 경우 처리 (예: 22:00-02:00)
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // 다음날로 연장
    if (nowMinutes < startMinutes) {
      const adjustedNow = nowMinutes + 24 * 60;
      if (adjustedNow >= startMinutes && adjustedNow <= endMinutes) {
        return { status: '영업 중', color: 'text-[var(--main-5)]' };
      }
    }
  }

  // 일반적인 경우 처리
  if (nowMinutes < startMinutes) {
    return { status: '영업 전', color: 'text-[var(--gray)]' };
  }

  if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
    return { status: '영업 중', color: 'text-[var(--main-5)]' };
  }

  return { status: '영업 종료', color: 'text-[var(--gray)]' };
};

/**
 * 시간 문자열을 표시용 형태로 포맷하는 함수
 * @param timeString "HH:mm:ss" 형식의 시간 문자열
 * @returns "HH:mm" 형식으로 변환된 문자열
 */
export const formatDisplayTime = (timeString: string): string => {
  return timeString.slice(0, 5);
};
