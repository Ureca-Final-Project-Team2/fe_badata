/**
 * 사용자의 현재 위치를 가져오는 유틸리티 함수
 * 위치 정보 가져오기에 실패하면 서울시청 좌표를 기본값으로 사용
 */
export interface LocationCoords {
  lat: number;
  lng: number;
}

export const DEFAULT_LOCATION: LocationCoords = {
  lat: 37.5665, // 서울시청 위도
  lng: 126.978, // 서울시청 경도
};

export const getUserLocation = (): Promise<LocationCoords> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      // Geolocation을 지원하지 않는 경우
      console.warn('이 브라우저에서는 위치 정보를 지원하지 않습니다. 기본 위치를 사용합니다.');
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        // 위치 정보 가져오기 실패 시
        console.warn('현재 위치를 가져올 수 없습니다. 기본 위치를 사용합니다.', error);
        resolve(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 300000, // 5분간 캐시
      },
    );
  });
};

/**
 * 두 좌표 간의 거리를 계산하는 함수 (Haversine formula)
 * @param lat1 첫 번째 점의 위도
 * @param lng1 첫 번째 점의 경도
 * @param lat2 두 번째 점의 위도
 * @param lng2 두 번째 점의 경도
 * @returns 거리(미터)
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
