import { useEffect, useRef, useState } from 'react';

import { useLocation } from '@/features/rental/map/hooks/useLocationHooks';

// 사용자 위치 관리를 위한 커스텀 훅
export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({
    lat: null as number | null,
    lng: null as number | null,
  });

  const {
    userLocation: locationData,
    userAddress,
    isLoading: locationLoading,
    error: locationError,
    refreshLocation,
  } = useLocation();

  // URL 파라미터 처리 상태 추적
  const urlParamsProcessedRef = useRef(false);

  // 사용자 위치 가져오기 (URL 파라미터와 관계없이 항상 실제 사용자 위치 사용)
  useEffect(() => {
    if (!urlParamsProcessedRef.current) {
      if (locationData) {
        setUserLocation({
          lat: locationData.lat,
          lng: locationData.lng,
        });
        urlParamsProcessedRef.current = true;
      } else if (navigator.geolocation) {
        // 한 번만 실행되도록 플래그 설정
        urlParamsProcessedRef.current = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log('위치 정보를 가져올 수 없습니다:', error.message);
            // fallback: 서울시청 좌표
            setUserLocation({
              lat: 37.5665,
              lng: 126.978,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5분 캐시 허용
          },
        );
      }
    }
  }, [locationData]);

  return {
    userLocation,
    setUserLocation,
    userAddress,
    locationLoading,
    locationError,
    refreshLocation,
  };
};
