import type { Store } from '@/features/rental/map/lib/types';

// 클러스터 클릭 플래그 (전역 변수)
let isClusterClickActive = false;

// 바다 파동 클러스터 마커 생성 함수
export const createClusterMarker = (
  store: Store,
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  totalLeftCount: number,
): kakao.maps.CustomOverlay => {
  console.log('🔍 줌 레벨 4 이상 - 바다 파동 클러스터 마커 생성 시작');

  // 값에 따른 색상과 크기 결정 (main 색상 사용)
  const getClusterStyle = (count: number) => {
    if (count <= 10) {
      return {
        // main-1 기반 (가장 연한 색)
        centerGradient:
          'radial-gradient(circle, #edf7fb 0%, #c6eaf8 60%, rgba(198, 234, 248, 0.8) 100%)',
        middleGradient:
          'radial-gradient(circle, rgba(198, 234, 248, 0.6) 0%, rgba(173, 231, 255, 0.4) 70%, transparent 100%)',
        outerGradient:
          'radial-gradient(circle, rgba(173, 231, 255, 0.3) 0%, rgba(114, 193, 242, 0.15) 70%, transparent 100%)',
        size: 35,
        category: '매우 낮음',
      };
    } else if (count <= 30) {
      return {
        // main-2 기반
        centerGradient:
          'radial-gradient(circle, #c6eaf8 0%, #ade7ff 60%, rgba(173, 231, 255, 0.9) 100%)',
        middleGradient:
          'radial-gradient(circle, rgba(173, 231, 255, 0.7) 0%, rgba(114, 193, 242, 0.5) 70%, transparent 100%)',
        outerGradient:
          'radial-gradient(circle, rgba(114, 193, 242, 0.4) 0%, rgba(62, 159, 220, 0.2) 70%, transparent 100%)',
        size: 38,
        category: '낮음',
      };
    } else if (count <= 60) {
      return {
        // main-3 기반
        centerGradient:
          'radial-gradient(circle, #ade7ff 0%, #72c1f2 60%, rgba(114, 193, 242, 0.9) 100%)',
        middleGradient:
          'radial-gradient(circle, rgba(114, 193, 242, 0.8) 0%, rgba(62, 159, 220, 0.6) 70%, transparent 100%)',
        outerGradient:
          'radial-gradient(circle, rgba(62, 159, 220, 0.5) 0%, rgba(114, 193, 242, 0.25) 70%, transparent 100%)',
        size: 42,
        category: '중간',
      };
    } else if (count <= 100) {
      return {
        // main-4 기반
        centerGradient:
          'radial-gradient(circle, #72c1f2 0%, #3e9fdc 60%, rgba(62, 159, 220, 0.95) 100%)',
        middleGradient:
          'radial-gradient(circle, rgba(62, 159, 220, 0.9) 0%, rgba(114, 193, 242, 0.7) 70%, transparent 100%)',
        outerGradient:
          'radial-gradient(circle, rgba(114, 193, 242, 0.6) 0%, rgba(173, 231, 255, 0.3) 70%, transparent 100%)',
        size: 46,
        category: '높음',
      };
    } else {
      return {
        // main-5 기반 (가장 진한 색)
        centerGradient:
          'radial-gradient(circle, #3e9fdc 0%, #2986cc 60%, rgba(41, 134, 204, 0.95) 100%)',
        middleGradient:
          'radial-gradient(circle, rgba(41, 134, 204, 0.9) 0%, rgba(62, 159, 220, 0.7) 70%, transparent 100%)',
        outerGradient:
          'radial-gradient(circle, rgba(62, 159, 220, 0.6) 0%, rgba(114, 193, 242, 0.3) 70%, transparent 100%)',
        size: Math.min(60, 40 + Math.floor(count / 100) * 4),
        category: '매우 높음',
      };
    }
  };

  const style = getClusterStyle(totalLeftCount);

  // 클러스터 마커 컨테이너 생성
  const clusterMarkerContainer = document.createElement('div');
  clusterMarkerContainer.className = 'ocean-cluster-marker';

  clusterMarkerContainer.style.cssText = `
    position: relative;
    width: ${style.size + 50}px;
    height: ${style.size + 50}px;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(1);
  `;

  // 외부 그라데이션 레이어 (가장 큰 파동)
  const outerWave = document.createElement('div');
  outerWave.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${style.size + 40}px;
    height: ${style.size + 40}px;
    background: ${style.outerGradient};
    border-radius: 50%;
    pointer-events: none;
    z-index: 10;
  `;

  // 중간 그라데이션 레이어
  const middleWave = document.createElement('div');
  middleWave.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${style.size + 25}px;
    height: ${style.size + 25}px;
    background: ${style.middleGradient};
    border-radius: 50%;
    pointer-events: none;
    z-index: 20;
  `;

  // 중앙 마커
  const centerMarker = document.createElement('div');
  centerMarker.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${style.size}px;
    height: ${style.size}px;
    background: ${style.centerGradient};
    border-radius: 50%;
    color: #000;
    font-weight: bold;
    font-size: ${style.size <= 40 ? '13px' : '15px'};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 30;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(62, 159, 220, 0.15);
  `;
  centerMarker.textContent = totalLeftCount.toString();

  // 컨테이너에 요소들 추가
  clusterMarkerContainer.appendChild(outerWave);
  clusterMarkerContainer.appendChild(middleWave);
  clusterMarkerContainer.appendChild(centerMarker);

  // 호버 효과 추가
  clusterMarkerContainer.addEventListener('mouseenter', () => {
    clusterMarkerContainer.style.transform = 'scale(1.1)';
    centerMarker.style.boxShadow = '0 8px 25px rgba(62, 159, 220, 0.2)';
  });

  clusterMarkerContainer.addEventListener('mouseleave', () => {
    clusterMarkerContainer.style.transform = 'scale(1)';
    centerMarker.style.boxShadow = '0 4px 15px rgba(62, 159, 220, 0.15)';
  });

  // 클릭 효과 추가
  clusterMarkerContainer.addEventListener('mousedown', () => {
    clusterMarkerContainer.style.transform = 'scale(0.95)';
  });

  clusterMarkerContainer.addEventListener('mouseup', () => {
    clusterMarkerContainer.style.transform = 'scale(1.1)';
  });

  // 클러스터 마커 클릭 핸들러
  clusterMarkerContainer.addEventListener('click', (e) => {
    console.log('🔍 클러스터 마커 클릭 이벤트 발생!');
    e.stopPropagation();
    e.preventDefault();

    // 클러스터 클릭 플래그를 즉시 설정
    isClusterClickActive = true;
    console.log('🔍 클러스터 클릭 플래그 즉시 설정됨:', isClusterClickActive);

    console.log(
      '🔍 바다 파동 클러스터 마커 클릭:',
      store.id,
      'leftDeviceCount:',
      totalLeftCount,
      '카테고리:',
      style.category,
    );

    // 클러스터 클릭 시 줌인
    const currentZoomLevel = map.getLevel();
    const targetZoomLevel = Math.max(2, currentZoomLevel - 2); // 더 확실한 줌인

    map.setCenter(position);
    map.setLevel(targetZoomLevel);

    console.log('🔍 클러스터 클릭 후 지도 이동:', {
      center: {
        lat: position.getLat(),
        lng: position.getLng(),
      },
      currentZoomLevel,
      targetZoomLevel,
      zoomLevelChanged: targetZoomLevel !== currentZoomLevel,
    });

    // 15초 후 플래그 해제
    setTimeout(() => {
      isClusterClickActive = false;
      console.log('🔍 클러스터 클릭 플래그 해제됨');
    }, 15000);
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
    '🔍 바다 파동 클러스터 마커 지도에 추가 완료:',
    store.id,
    'leftDeviceCount:',
    totalLeftCount,
    '카테고리:',
    style.category,
    '크기:',
    style.size,
  );

  return marker;
};

// 클러스터 클릭 플래그 확인 함수
export const getClusterClickActive = () => isClusterClickActive;
