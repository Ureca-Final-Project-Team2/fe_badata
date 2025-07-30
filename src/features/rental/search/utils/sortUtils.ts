/**
 * 로그인 상태에 따른 주소 이력 정렬 기준을 반환합니다.
 * @returns 로그인된 사용자는 'createdAt,desc', 로그인되지 않은 사용자는 'lastUsed,desc'
 */
export const getAddressHistorySortBy = (): string => {
  // 서버 사이드에서는 기본값 반환
  if (typeof window === 'undefined') {
    return 'lastUsed,desc';
  }

  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? 'createdAt,desc' : 'lastUsed,desc';
};

/**
 * 주소 이력 쿼리 키를 생성합니다.
 * @param size 페이지 크기 (기본값: 5)
 * @returns 쿼리 키 배열
 */
export const getAddressHistoryQueryKey = (size: number = 5): [string, number, string] => {
  return ['addressHistory', size, getAddressHistorySortBy()];
};
