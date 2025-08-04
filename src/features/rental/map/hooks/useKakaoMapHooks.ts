import { useCallback, useEffect, useRef, useState } from 'react';

import { getClusterClickActive } from '@/features/rental/map/lib/clusterMarker';

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

export const useKakaoMapHooks = (
  initialLat?: number,
  initialLng?: number,
  userLat?: number,
  userLng?: number,
) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const initializedRef = useRef(false);
  const scriptLoadingRef = useRef(false);

  // 메모이제이션된 초기화 함수
  const initializeMap = useCallback(() => {
    if (!mapRef.current || initializedRef.current || scriptLoadingRef.current) {
      return;
    }

    // 클러스터 클릭이 활성화되어 있으면 맵 재초기화 건너뛰기
    const isClusterClick = getClusterClickActive();
    if (isClusterClick) {
      console.log('🔍 클러스터 클릭 활성화 - 맵 재초기화 건너뜀');
      return;
    }

    // 검색 위치가 없고 사용자 위치도 없으면 초기화 지연
    if (!initialLat && !initialLng && (!userLat || !userLng)) {
      return;
    }

    scriptLoadingRef.current = true;

    // 이미 로드된 스크립트가 있는지 확인
    if (window.kakao && window.kakao.maps) {
      createMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        scriptLoadingRef.current = false;
        createMap();
      });
    };

    script.onerror = () => {
      console.error('카카오맵 스크립트 로드 실패');
      scriptLoadingRef.current = false;
    };

    document.head.appendChild(script);
  }, [initialLat, initialLng, userLat, userLng]);

  // 맵 생성 함수
  const createMap = useCallback(() => {
    if (!mapRef.current || initializedRef.current) {
      return;
    }

    // 클러스터 클릭 상태 재확인
    const isClusterClick = getClusterClickActive();
    if (isClusterClick) {
      console.log('🔍 스크립트 로드 중 클러스터 클릭 활성화 - 맵 초기화 중단');
      return;
    }

    // 초기 좌표 결정: 검색 위치 > 사용자 현재 위치 > 기본값
    let initialCenter: kakao.maps.LatLng;

    if (initialLat && initialLng && !isClusterClick) {
      // 검색 위치가 있고 클러스터 클릭이 아닐 때만 검색 위치로 초기 카메라 설정
      initialCenter = new window.kakao.maps.LatLng(initialLat, initialLng);
    } else if (userLat && userLng) {
      // 검색 위치가 없거나 클러스터 클릭이 활성화되어 있으면 사용자 위치로 초기 카메라 설정
      initialCenter = new window.kakao.maps.LatLng(userLat, userLng);
    } else {
      // 둘 다 없으면 기본값 사용
      initialCenter = new window.kakao.maps.LatLng(37.5665, 126.978);
    }

    const map = new window.kakao.maps.Map(mapRef.current!, {
      center: initialCenter,
      level: 4,
    });

    // 초기화 완료 표시
    initializedRef.current = true;
    setMap(map);
    setIsMapReady(true);

    // 성능 최적화를 위한 이벤트 리스너 등록 (로그 제거)
    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      // 줌 레벨 변경 시 필요한 작업만 수행
    });

    // bounds 변경 이벤트 리스너 등록 (로그 제거)
    window.kakao.maps.event.addListener(map, 'bounds_changed', () => {
      // bounds 변경 시 필요한 작업만 수행
    });

    // 지도 타일 로드 완료 이벤트 (로그 제거)
    window.kakao.maps.event.addListener(map, 'tilesloaded', () => {
      // 타일 로드 완료 시 필요한 작업만 수행
    });
  }, [initialLat, initialLng, userLat, userLng]);

  useEffect(() => {
    // 디바운스된 초기화 (성능 최적화)
    const timeoutId = setTimeout(() => {
      initializeMap();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [initializeMap]);

  // 클린업 함수
  useEffect(() => {
    return () => {
      // 맵 인스턴스는 자동으로 정리됨
      console.log('🗺️ 맵 훅 클린업 완료');
    };
  }, []);

  return { mapRef, map, isMapReady };
};
