import type { Store } from '@/features/rental/map/lib/types';

// 클러스터 마커 생성 함수
export const createClusterMarker = (
  store: Store,
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  totalLeftCount: number,
  zoomLevel: number,
): kakao.maps.CustomOverlay => {
  console.log('🔍 줌 레벨 4 이상 - 클러스터 마커 생성 시작');

  // 줌 레벨 4 이상: 커스텀 클러스터 마커 생성 (클러스터링 없이 직접 표시)
  const clusterMarkerContainer = document.createElement('div');
  clusterMarkerContainer.className = 'cluster-marker';

  // 값에 따른 색상과 크기 결정
  let backgroundColor = '';
  let size = 40;

  if (totalLeftCount <= 10) {
    backgroundColor = '#4CAF50'; // 초록색 (낮은 값)
    size = 35;
  } else if (totalLeftCount <= 100) {
    backgroundColor = '#FFC107'; // 노란색 (중간 값)
    size = 40;
  } else {
    backgroundColor = '#FF9800'; // 주황색 (높은 값)
    size = Math.min(60, 35 + Math.floor(totalLeftCount / 100) * 5); // 최대 60px
  }

  clusterMarkerContainer.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${backgroundColor};
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-weight: bold;
    line-height: ${size}px;
    border: 2px solid #fff;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
    font-size: ${size <= 40 ? '12px' : '14px'};
    user-select: none;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // leftDeviceCount 표시
  clusterMarkerContainer.textContent = totalLeftCount.toString();
  console.log(
    '🔍 클러스터 마커 텍스트 설정:',
    totalLeftCount.toString(),
    '색상:',
    backgroundColor,
    '크기:',
    size,
  );

  // 클러스터 마커 클릭 핸들러
  clusterMarkerContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('🔍 클러스터 마커 클릭:', store.id, 'leftDeviceCount:', totalLeftCount);

    // 클러스터 클릭 시 줌인
    map.setCenter(position);
    map.setLevel(zoomLevel - 1);

    console.log('🔍 클러스터 클릭 후 지도 이동:', {
      center: {
        lat: position.getLat(),
        lng: position.getLng(),
      },
      newZoomLevel: zoomLevel - 1,
    });
  });

  // 커스텀 오버레이로 클러스터 마커 생성
  const marker = new window.kakao.maps.CustomOverlay({
    content: clusterMarkerContainer,
    position: position,
    xAnchor: 0.5,
    yAnchor: 0.5,
  });

  // 지도에 오버레이 추가
  marker.setMap(map);
  console.log(
    '🔍 클러스터 마커 지도에 추가 완료:',
    store.id,
    'leftDeviceCount:',
    totalLeftCount,
    '색상:',
    backgroundColor,
    '크기:',
    size,
  );

  return marker;
};
