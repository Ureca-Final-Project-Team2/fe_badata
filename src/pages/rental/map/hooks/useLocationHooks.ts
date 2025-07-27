'use client';

import { useCallback, useEffect, useState } from 'react';

export interface Location {
  lat: number;
  lng: number;
}

interface UseLocationReturn {
  userLocation: Location | null;
  userAddress: string;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => void;
}

export function useLocation(): UseLocationReturn {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [userAddress, setUserAddress] = useState<string>('현재위치');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 좌표를 주소로 변환하는 함수 (Kakao REST API 사용)
  const getAddressFromCoords = useCallback(async (lat: number, lng: number) => {
    try {
      const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY;
      if (!KAKAO_REST_API_KEY) {
        console.warn('Kakao REST API 키가 설정되지 않았습니다.');
        setUserAddress('현재위치');
        return;
      }

      const x = lng.toString();
      const y = lat.toString();
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.documents && data.documents.length > 0) {
          const roadAddress = data.documents[0].road_address?.address_name;
          const bunjiAddress = data.documents[0].address?.address_name;

          // 도로명 주소가 있으면 도로명 주소를, 없으면 지번 주소를 사용
          const finalAddress = roadAddress || bunjiAddress || '현재위치';
          setUserAddress(finalAddress);
        } else {
          console.log('주소 정보가 없습니다.');
          setUserAddress('현재위치');
        }
      } else {
        console.error('REST API 요청 실패:', response.status, response.statusText);
        setUserAddress('현재위치');
      }
    } catch (error) {
      console.error('주소 변환 실패:', error);
      setUserAddress('현재위치');
    }
  }, []);

  // GPS 위치 가져오기
  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation이 지원되지 않습니다.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const location = { lat: latitude, lng: longitude };
        setUserLocation(location);
        setIsLoading(false);
      },
      (error) => {
        console.log('GPS 위치 획득 실패, fallback 사용:', error);
        setError('위치를 가져올 수 없습니다.');

        // fallback: 서울시청 좌표
        const fallbackLocation = { lat: 37.5665, lng: 126.978 };
        setUserLocation(fallbackLocation);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분
      },
    );
  }, []);

  // 위치 새로고침
  const refreshLocation = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // 초기 위치 가져오기
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // userLocation이 변경될 때마다 주소 변환 시도
  useEffect(() => {
    if (userLocation) {
      getAddressFromCoords(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, getAddressFromCoords]);

  return {
    userLocation,
    userAddress,
    isLoading,
    error,
    refreshLocation,
  };
}
