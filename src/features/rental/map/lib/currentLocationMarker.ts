/**
 * 현재 위치 마커 생성
 * OceanWaveMarker Large 사이즈 기반 CustomOverlay로 구현
 */
export const createCurrentLocationMarker = (
  map: kakao.maps.Map,
  userLat?: number,
  userLng?: number,
): kakao.maps.CustomOverlay => {
  console.log('📍 현재 위치 마커 생성:', { userLat, userLng });

  // 마커 컨테이너 생성
  const markerContainer = document.createElement('div');
  markerContainer.className = 'current-location-marker';
  markerContainer.style.cssText = `
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: 9999;
  `;

  // 파동 요소들 생성 (7개) - 더 짙은 색상
  const waveSizes = [24, 32, 40, 48, 56, 64, 72];
  const waveColors = [
    'rgba(114, 193, 242, 0.9)', // main-4 with higher opacity
    'rgba(173, 231, 255, 0.85)', // main-3 with higher opacity
    'rgba(198, 234, 248, 0.8)', // main-2 with higher opacity
    'rgba(237, 247, 251, 0.75)', // main-1 with higher opacity
    'rgba(114, 193, 242, 0.85)', // main-4 with higher opacity
    'rgba(173, 231, 255, 0.8)', // main-3 with higher opacity
    'rgba(198, 234, 248, 0.75)', // main-2 with higher opacity
  ];

  for (let i = 0; i < 7; i++) {
    const wave = document.createElement('div');
    wave.className = 'wave';
    wave.style.cssText = `
      position: absolute;
      border-radius: 50%;
      opacity: 0;
      width: ${waveSizes[i]}px;
      height: ${waveSizes[i]}px;
      background: radial-gradient(circle, ${waveColors[i]} 0%, transparent 70%);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3), 0 0 15px rgba(62, 159, 220, 0.2);
      animation: wave-pulse 2s infinite ease-out;
      animation-delay: ${i * 0.3}s;
    `;

    markerContainer.appendChild(wave);
  }

  // 중앙 마커 생성 - main-5 색상
  const locationMarker = document.createElement('div');
  locationMarker.className = 'location-marker';
  locationMarker.style.cssText = `
    position: relative;
    z-index: 10;
    width: 20px;
    height: 20px;
    background: #238CFA;
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0 3px 12px rgba(62, 159, 220, 0.4);
    animation: marker-pulse 2s infinite ease-in-out;
  `;

  markerContainer.appendChild(locationMarker);

  // CSS 애니메이션 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wave-pulse {
      0% {
        transform: scale(0.3);
        opacity: 0.8;
      }
      20% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.4;
      }
      80% {
        opacity: 0.2;
      }
      100% {
        transform: scale(1.8);
        opacity: 0;
      }
    }
    
    @keyframes marker-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 3px 12px rgba(62, 159, 220, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.3);
      }
      50% {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(62, 159, 220, 0.6), inset 0 0 12px rgba(255, 255, 255, 0.5);
      }
    }
  `;

  if (!document.head.querySelector('#current-location-marker-styles')) {
    style.id = 'current-location-marker-styles';
    document.head.appendChild(style);
  }

  // 마커 위치 결정: 사용자 GPS 좌표가 있으면 사용, 없으면 지도 중심 사용
  const markerPosition =
    userLat && userLng ? new window.kakao.maps.LatLng(userLat, userLng) : map.getCenter();

  // CustomOverlay 생성 - zIndex를 최상위로 설정
  const currentLocationOverlay = new window.kakao.maps.CustomOverlay({
    content: markerContainer,
    position: markerPosition,
    xAnchor: 0.5,
    yAnchor: 0.5,
    zIndex: 9999,
  });

  // 지도에 오버레이 추가
  currentLocationOverlay.setMap(map);

  return currentLocationOverlay;
};
