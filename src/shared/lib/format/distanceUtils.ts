/**
 * 거리를 적절한 단위로 포맷팅하는 유틸리티 함수들
 */

export interface FormattedDistance {
  value: string;
  unit: 'm' | 'km';
  fullText: string;
}

/**
 * 미터 단위의 거리를 적절한 단위(m/km)로 포맷팅
 * @param distanceInMeters 미터 단위의 거리
 * @returns 포맷팅된 거리 정보
 */
export const formatDistance = (distanceInMeters: number): FormattedDistance => {
  // 1000m(1km) 이상이면 km 단위로 표시
  if (distanceInMeters >= 1000) {
    const distanceInKm = distanceInMeters / 1000;
    const value = distanceInKm.toFixed(1);
    return {
      value,
      unit: 'km',
      fullText: `${value}km`,
    };
  }

  // 1000m 미만이면 m 단위로 표시 (소수점 1자리)
  const value = distanceInMeters.toFixed(1);
  return {
    value,
    unit: 'm',
    fullText: `${value}m`,
  };
};

/**
 * 거리 정보를 간단한 문자열로 반환
 * @param distanceInMeters 미터 단위의 거리
 * @returns 포맷팅된 거리 문자열 (예: "1.2km", "350.5m")
 */
export const formatDistanceString = (distanceInMeters: number): string => {
  return formatDistance(distanceInMeters).fullText;
};
