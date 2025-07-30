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

// 마커 캐시 관리를 위한 클래스
export class MarkerCache {
  private markers = new Map<
    string,
    {
      marker: kakao.maps.Marker;
      overlay: kakao.maps.CustomOverlay;
      infowindow: kakao.maps.InfoWindow;
      storeId: number;
      deviceCount: number;
      isLiked: boolean;
      isCluster: boolean;
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
      marker: kakao.maps.Marker;
      overlay: kakao.maps.CustomOverlay;
      infowindow: kakao.maps.InfoWindow;
      deviceCount: number;
      isLiked: boolean;
      isCluster: boolean;
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
      markerData.marker.setMap(null);
      markerData.overlay.setMap(null);
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
      // 디바이스 개수 업데이트
      if (markerData.deviceCount !== newDeviceCount) {
        markerData.overlay.setContent(`<div style="${OVERLAY_STYLES}">${newDeviceCount}</div>`);
        markerData.deviceCount = newDeviceCount;
      }

      // liked 상태나 클러스터 상태가 변경된 경우 마커 이미지 업데이트
      const shouldUpdateImage =
        (isLiked !== undefined && markerData.isLiked !== isLiked) ||
        (isCluster !== undefined && markerData.isCluster !== isCluster);

      if (shouldUpdateImage) {
        // 로그인 상태 확인
        const isLoggedIn =
          typeof window !== 'undefined' && localStorage.getItem('auth-storage')
            ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
            : false;

        // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 like_active 표시
        const shouldShowLikeActive = isLoggedIn && (isLiked ?? markerData.isLiked);

        markerData.marker.setImage(
          createMarkerImage(shouldShowLikeActive, isCluster ?? markerData.isCluster),
        );
        if (isLiked !== undefined) markerData.isLiked = shouldShowLikeActive;
        if (isCluster !== undefined) markerData.isCluster = isCluster;
      }
    }
  }

  // 모든 마커 제거
  clearAll(): void {
    this.markers.forEach((markerData) => {
      markerData.marker.setMap(null);
      markerData.overlay.setMap(null);
    });
    this.markers.clear();
  }

  // 특정 스토어 ID들의 마커만 제거
  removeMarkersExcept(keepStoreIds: Set<number>): void {
    const keysToRemove: string[] = [];
    this.markers.forEach((markerData, key) => {
      if (!keepStoreIds.has(markerData.storeId)) {
        markerData.marker.setMap(null);
        markerData.overlay.setMap(null);
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach((key) => this.markers.delete(key));
  }

  // 현재 마커 개수 반환
  getMarkerCount(): number {
    return this.markers.size;
  }
}

// 맵별 마커 캐시 관리
export const markerCaches = new WeakMap<kakao.maps.Map, MarkerCache>();

// 마커 이미지 생성 함수 (캐싱)
const markerImageCache = new Map<string, kakao.maps.MarkerImage>();
export const createMarkerImage = (
  isLiked: boolean = false,
  isCluster: boolean = false,
): kakao.maps.MarkerImage => {
  let cacheKey: string;
  let markerImageSrc: string;

  // 로그인 상태 확인
  const isLoggedIn =
    typeof window !== 'undefined' && localStorage.getItem('auth-storage')
      ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
      : false;

  // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 like_active 표시
  const shouldShowLikeActive = isLoggedIn && isLiked;

  if (isCluster) {
    // 클러스터 마커 (줌 레벨 5 이상) - 좋아요 상태에 따라 아이콘 결정
    cacheKey = shouldShowLikeActive ? 'cluster_liked_marker' : 'cluster_default_marker';
    markerImageSrc = shouldShowLikeActive
      ? typeof ICONS.ETC.LIKE_ACTIVE === 'string'
        ? ICONS.ETC.LIKE_ACTIVE
        : ICONS.ETC.LIKE_ACTIVE.src
      : typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
        ? ICONS.ETC.LIKE_NONACTIVE
        : ICONS.ETC.LIKE_NONACTIVE.src;
  } else {
    // 일반 마커 (줌 레벨 3 이하) - 좋아요 상태에 따라 아이콘 결정
    cacheKey = shouldShowLikeActive ? 'liked_marker' : 'default_marker';
    markerImageSrc = shouldShowLikeActive
      ? typeof ICONS.ETC.LIKE_ACTIVE === 'string'
        ? ICONS.ETC.LIKE_ACTIVE
        : ICONS.ETC.LIKE_ACTIVE.src
      : typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
        ? ICONS.ETC.LIKE_NONACTIVE
        : ICONS.ETC.LIKE_NONACTIVE.src;
  }

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
