import { updateDropletMarker } from '@/features/rental/map/lib/dropletMarker';
import { ICONS } from '@/shared/config/iconPath';

// 상수 정의
const MARKER_SIZE = 36;
const OVERLAY_STYLES = `
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -95%);
  background: transparent;
  color: black;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
  text-align: center;
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  line-height: ${MARKER_SIZE}px;
`;

// 마커 타입 정의 (기존 Marker 또는 새로운 CustomOverlay)
type MarkerType = kakao.maps.Marker | kakao.maps.CustomOverlay;

// 마커 캐시 관리를 위한 클래스
export class MarkerCache {
  public markers = new Map<
    string,
    {
      marker: MarkerType;
      overlay: kakao.maps.CustomOverlay | null;
      infowindow: kakao.maps.InfoWindow;
      storeId: number;
      deviceCount: number;
      isLiked: boolean;
      isCluster: boolean;
      isSelected: boolean;
    }
  >();

  private map: kakao.maps.Map;

  constructor(map: kakao.maps.Map) {
    this.map = map;
  }

  // 마커 키 생성
  private getMarkerKey(storeId: number): string {
    return `store_${storeId}`;
  }

  // 마커가 존재하는지 확인
  hasMarker(storeId: number): boolean {
    return this.markers.has(this.getMarkerKey(storeId));
  }

  // 마커 추가
  addMarker(
    storeId: number,
    markerData: {
      marker: MarkerType;
      overlay: kakao.maps.CustomOverlay | null;
      infowindow: kakao.maps.InfoWindow;
      deviceCount: number;
      isLiked: boolean;
      isCluster: boolean;
      isSelected: boolean;
    },
  ): void {
    this.markers.set(this.getMarkerKey(storeId), {
      ...markerData,
      storeId,
    });
  }

  // 마커 제거
  removeMarker(storeId: number): void {
    const key = this.getMarkerKey(storeId);
    const markerData = this.markers.get(key);
    if (markerData) {
      // 마커 타입에 따라 제거
      if (markerData.marker instanceof window.kakao.maps.Marker) {
        markerData.marker.setMap(null);
      } else if (markerData.marker instanceof window.kakao.maps.CustomOverlay) {
        markerData.marker.setMap(null);
      }

      // 오버레이 제거
      if (markerData.overlay) {
        markerData.overlay.setMap(null);
      }

      this.markers.delete(key);
    }
  }

  // 마커 업데이트 (디바이스 개수 변경 시)
  updateMarker(
    storeId: number,
    newDeviceCount: number,
    isLiked?: boolean,
    isCluster?: boolean,
  ): void {
    const key = this.getMarkerKey(storeId);
    const markerData = this.markers.get(key);
    if (markerData) {
      // 디바이스 개수 업데이트 (기존 오버레이가 있는 경우에만)
      if (markerData.overlay && markerData.deviceCount !== newDeviceCount) {
        markerData.overlay.setContent(`<div style="${OVERLAY_STYLES}">${newDeviceCount}</div>`);
        markerData.deviceCount = newDeviceCount;
      }

      // liked 상태나 클러스터 상태가 변경된 경우 마커 업데이트
      const shouldUpdateImage =
        (isLiked !== undefined && markerData.isLiked !== isLiked) ||
        (isCluster !== undefined && markerData.isCluster !== isCluster);

      if (shouldUpdateImage) {
        // 물방울 마커인 경우 업데이트
        if (markerData.marker instanceof window.kakao.maps.CustomOverlay) {
          updateDropletMarker(
            markerData.marker,
            isLiked || markerData.isLiked,
            false,
            newDeviceCount,
            isCluster || markerData.isCluster,
          );
        } else {
          // 기존 마커인 경우 이미지 업데이트
          const markerImage = createMarkerImage(
            isLiked || markerData.isLiked,
            isCluster || markerData.isCluster,
          );
          (markerData.marker as kakao.maps.Marker).setImage(markerImage);
        }

        markerData.isLiked = isLiked !== undefined ? isLiked : markerData.isLiked;
        markerData.isCluster = isCluster !== undefined ? isCluster : markerData.isCluster;
      }
    }
  }

  // 마커 선택 상태 업데이트 (크기 변경)
  updateMarkerSelection(storeId: number, isSelected: boolean): void {
    const key = this.getMarkerKey(storeId);
    const markerData = this.markers.get(key);
    if (markerData && markerData.marker instanceof window.kakao.maps.CustomOverlay) {
      updateDropletMarker(
        markerData.marker,
        markerData.isLiked,
        isSelected,
        markerData.deviceCount,
        markerData.isCluster,
      );
    }
  }

  // 모든 마커 제거
  clearAll(): void {
    this.markers.forEach((markerData) => {
      // 마커 타입에 따라 제거
      if (markerData.marker instanceof window.kakao.maps.Marker) {
        markerData.marker.setMap(null);
      } else if (markerData.marker instanceof window.kakao.maps.CustomOverlay) {
        markerData.marker.setMap(null);
      }

      // 오버레이 제거
      if (markerData.overlay) {
        markerData.overlay.setMap(null);
      }
    });
    this.markers.clear();
  }

  // 특정 스토어 ID들의 마커만 제거
  removeMarkersExcept(keepStoreIds: Set<number>): void {
    const keysToRemove: string[] = [];
    this.markers.forEach((markerData, key) => {
      if (!keepStoreIds.has(markerData.storeId)) {
        // 마커 타입에 따라 제거
        if (markerData.marker instanceof window.kakao.maps.Marker) {
          markerData.marker.setMap(null);
        } else if (markerData.marker instanceof window.kakao.maps.CustomOverlay) {
          markerData.marker.setMap(null);
        }

        // 오버레이 제거
        if (markerData.overlay) {
          markerData.overlay.setMap(null);
        }
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach((key) => this.markers.delete(key));
  }

  // 현재 마커 개수 반환
  getMarkerCount(): number {
    return this.markers.size;
  }

  // 특정 스토어의 마커 데이터 반환
  getMarkerData(storeId: number) {
    const key = this.getMarkerKey(storeId);
    return this.markers.get(key);
  }
}

// 맵별 마커 캐시 관리
export const markerCaches = new WeakMap<kakao.maps.Map, MarkerCache>();

// 전역 마커 업데이트 이벤트 시스템
type MarkerUpdateCallback = (storeId: number, isLiked: boolean) => void;
const markerUpdateCallbacks = new Set<MarkerUpdateCallback>();

// 마커 업데이트 콜백 등록
export const registerMarkerUpdateCallback = (callback: MarkerUpdateCallback): void => {
  markerUpdateCallbacks.add(callback);
};

// 마커 업데이트 콜백 해제
export const unregisterMarkerUpdateCallback = (callback: MarkerUpdateCallback): void => {
  markerUpdateCallbacks.delete(callback);
};

// 전역 마커 좋아요 상태 업데이트 함수 (낙관적 업데이트용)
export const updateMarkerLikeStatus = (storeId: number, isLiked: boolean): void => {
  // 등록된 모든 콜백에 업데이트 이벤트 전파
  markerUpdateCallbacks.forEach((callback) => {
    try {
      callback(storeId, isLiked);
    } catch (error) {
      console.error('마커 업데이트 콜백 실행 중 오류:', error);
    }
  });
};

// 마커 이미지 생성 함수 (캐싱)
const markerImageCache = new Map<string, kakao.maps.MarkerImage>();

// 아이콘 경로를 가져오는 헬퍼 함수
const getIconPath = (icon: string | { src: string }): string => {
  return typeof icon === 'string' ? icon : icon.src;
};

export const createMarkerImage = (
  isLiked: boolean = false,
  isCluster: boolean = false,
): kakao.maps.MarkerImage => {
  let cacheKey: string;

  // 로그인 상태 확인
  const isLoggedIn =
    typeof window !== 'undefined' && localStorage.getItem('auth-storage')
      ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
      : false;

  // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 like_active 표시
  const shouldShowLikeActive = isLoggedIn && isLiked;

  if (isCluster) {
    cacheKey = shouldShowLikeActive ? 'cluster_liked_marker' : 'cluster_default_marker';
  } else {
    cacheKey = shouldShowLikeActive ? 'liked_marker' : 'default_marker';
  }

  // 아이콘 선택 로직 단순화
  const icon = shouldShowLikeActive ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE;
  const markerImageSrc = getIconPath(icon);

  if (markerImageCache.has(cacheKey)) {
    return markerImageCache.get(cacheKey)!;
  }

  const markerImage = new window.kakao.maps.MarkerImage(
    markerImageSrc,
    new window.kakao.maps.Size(MARKER_SIZE, MARKER_SIZE),
  );

  markerImageCache.set(cacheKey, markerImage);
  return markerImage;
};

// 디바이스 개수 오버레이 생성 함수
export const createDeviceCountOverlay = (position: kakao.maps.LatLng, deviceCount: number) => {
  return new window.kakao.maps.CustomOverlay({
    position,
    content: `<div style="${OVERLAY_STYLES}">${deviceCount}</div>`,
  });
};

// 인포윈도우 생성 함수
export const createInfoWindow = (storeName: string) => {
  return new window.kakao.maps.InfoWindow({
    content: `<div style="padding:5px;font-size:14px;">${storeName}</div>`,
  });
};
