'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_ADDRESS = '서울 강남구 대치동 889-45';

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
  const [userAddress, setUserAddress] = useState<string>(DEFAULT_ADDRESS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 디바운싱과 쓰로틀링을 위한 ref들
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastCoordsRef = useRef<{ lat: number; lng: number } | null>(null);
  const isInitializedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isDev = process.env.NODE_ENV === 'development';

  // 좌표를 주소로 변환하는 함수 (Kakao REST API 사용) - 강화된 디바운싱 적용
  const getAddressFromCoords = useCallback(async (lat: number, lng: number) => {
    // 이전 디바운스 타이머가 있다면 취소
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 이전 요청이 있다면 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 강화된 쓰로틀링: 10초 내에 같은 좌표로 호출되면 무시
    const now = Date.now();
    const lastCoords = lastCoordsRef.current;
    const isSameCoords =
      lastCoords &&
      Math.abs(lastCoords.lat - lat) < 0.0001 &&
      Math.abs(lastCoords.lng - lng) < 0.0001;

    if (isSameCoords && now - lastCallTimeRef.current < 10000) {
      return;
    }

    // 강화된 디바운싱: 3초 후에 실행
    debounceRef.current = setTimeout(async () => {
      try {
        // 새로운 AbortController 생성
        abortControllerRef.current = new AbortController();

        const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY;
        if (!KAKAO_REST_API_KEY) {
          if (isDev) console.warn('Kakao REST API 키가 설정되지 않았습니다.');
          setUserAddress(DEFAULT_ADDRESS);
          return;
        }

        const x = lng.toString();
        const y = lat.toString();
        const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
          signal: abortControllerRef.current.signal,
        });

        if (response.ok) {
          const data = await response.json();

          if (data.documents && data.documents.length > 0) {
            const roadAddress = data.documents[0].road_address?.address_name;
            const bunjiAddress = data.documents[0].address?.address_name;

            // 도로명 주소가 있으면 도로명 주소를, 없으면 지번 주소를 사용
            const finalAddress = roadAddress || bunjiAddress || DEFAULT_ADDRESS;
            setUserAddress(finalAddress);
          } else {
            setUserAddress(DEFAULT_ADDRESS);
          }
        } else if (response.status === 429) {
          if (isDev) console.warn('🚫 API 호출 제한 도달, 주소 변환 건너뜀');
          setUserAddress(DEFAULT_ADDRESS);
        } else {
          if (isDev) console.error('REST API 요청 실패:', response.status, response.statusText);
          setUserAddress(DEFAULT_ADDRESS);
        }

        // 성공한 호출 정보 저장
        lastCallTimeRef.current = Date.now();
        lastCoordsRef.current = { lat, lng };
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setUserAddress(DEFAULT_ADDRESS);
      }
    }, 3000); // 3초 디바운싱으로 증가
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
        console.log('GPS 위치 획득 실패:', error);
        setError('위치를 가져올 수 없습니다.');

        // fallback: 서울시청 좌표
        const fallbackLocation = { lat: 37.5665, lng: 126.978 };
        setUserLocation(fallbackLocation);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000, // 타임아웃 단축
        maximumAge: 60000, // 1분 캐시 허용 (더 빠른 응답)
      },
    );
  }, []);

  // 위치 새로고침
  const refreshLocation = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // 초기 위치 가져오기 (한 번만)
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      getCurrentLocation();
    }
  }, [getCurrentLocation]);

  // userLocation이 변경될 때마다 주소 변환 시도 (강화된 쓰로틀링 적용)
  useEffect(() => {
    if (userLocation && isInitializedRef.current) {
      const now = Date.now();
      const lastCoords = lastCoordsRef.current;
      const isSameCoords =
        lastCoords &&
        Math.abs(lastCoords.lat - userLocation.lat) < 0.0001 &&
        Math.abs(lastCoords.lng - userLocation.lng) < 0.0001;

      // 같은 좌표이고 15초 내에 호출된 경우 무시
      if (isSameCoords && now - lastCallTimeRef.current < 15000) {
        return;
      }

      getAddressFromCoords(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, getAddressFromCoords]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    userLocation,
    userAddress,
    isLoading,
    error,
    refreshLocation,
  };
}
