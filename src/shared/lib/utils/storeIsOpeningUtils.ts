/**
 * 영업 상태 확인 함수 (한국 시간 기준)
 * @param startTime - 시작 시간 (HH:mm:ss 형식)
 * @param endTime - 종료 시간 (HH:mm:ss 형식)
 * @returns 영업 중이면 true, 아니면 false
 */
export const isStoreOpen = (startTime: string, endTime: string): boolean => {
  // 입력 유효성 검사
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    throw new Error('Invalid time format. Expected HH:mm:ss');
  }

  // 한국 시간 기준으로 현재 시간 가져오기
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  const currentTime =
    koreaTime.getUTCHours() * 3600 + koreaTime.getUTCMinutes() * 60 + koreaTime.getUTCSeconds();

  const [startHour, startMin, startSec] = startTime.split(':').map(Number);
  const [endHour, endMin, endSec] = endTime.split(':').map(Number);
  const startSeconds = startHour * 3600 + startMin * 60 + startSec;
  const endSeconds = endHour * 3600 + endMin * 60 + endSec;

  // 자정을 넘나드는 경우 처리
  if (startSeconds > endSeconds) {
    return currentTime >= startSeconds || currentTime <= endSeconds;
  }

  return currentTime >= startSeconds && currentTime <= endSeconds;
};
