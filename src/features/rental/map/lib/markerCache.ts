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
  updateMarker(storeId: number, newDeviceCount: number): void {
    const key = this.getMarkerKey(storeId);
    const markerData = this.markers.get(key);
    if (markerData && markerData.deviceCount !== newDeviceCount) {
      // 오버레이 내용 업데이트
      markerData.overlay.setContent(`<div style="${OVERLAY_STYLES}">${newDeviceCount}</div>`);
      markerData.deviceCount = newDeviceCount;
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
export const createMarkerImage = (): kakao.maps.MarkerImage => {
  const cacheKey = 'default_marker';
  if (markerImageCache.has(cacheKey)) {
    return markerImageCache.get(cacheKey)!;
  }

  const markerImageSrc =
    typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
      ? ICONS.ETC.LIKE_NONACTIVE
      : ICONS.ETC.LIKE_NONACTIVE.src;

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
