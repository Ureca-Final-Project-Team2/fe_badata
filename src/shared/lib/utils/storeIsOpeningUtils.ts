/**
 * 영업 상태 확인 함수 (한국 시간 기준)
 * @param startTime - 시작 시간 (HH:mm:ss 형식)
 * @param endTime - 종료 시간 (HH:mm:ss 형식)
 * @returns 영업 중이면 true, 아니면 false
 */
export const isStoreOpen = (startTime: string, endTime: string): boolean => {
  const now = new Date();
  // 브라우저가 이미 한국 시간으로 설정되어 있으므로 현재 시간을 그대로 사용
  const currentTimeString = now.toTimeString().split(' ')[0];
  // startTime과 endTime을 비교
  const isOpen = currentTimeString >= startTime && currentTimeString <= endTime;
  return isOpen;
};
