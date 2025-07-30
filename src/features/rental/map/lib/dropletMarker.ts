/**
 * 물방울 모양 가맹점 마커 생성
 * 좋아요 상태에 따라 색상 변경, 클릭 시 크기 변경
 */
export const createDropletMarker = (
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  storeId: number,
  isLiked: boolean = false,
  isSelected: boolean = false,
  onClick?: () => void,
  deviceCount: number = 0,
): kakao.maps.CustomOverlay => {
  console.log('💧 물방울 마커 생성:', storeId, '디바이스 개수:', deviceCount, '좋아요:', isLiked);

  // 마커 컨테이너 생성
  const markerContainer = document.createElement('div');
  markerContainer.className = 'droplet-marker';
  markerContainer.dataset.storeId = storeId.toString();

  // 크기 결정 (선택된 경우 Large, 기본 Small)
  const size = isSelected ? 'large' : 'small';
  const sizeStyles = {
    small: { width: '24px', height: '24px', fontSize: '10px' },
    large: { width: '40px', height: '40px', fontSize: '14px' },
  };

  // 색상 결정 (좋아요한 경우 main-5, 기본 회색)
  const backgroundColor = isLiked ? '#238CFA' : '#6b7280';

  markerContainer.style.cssText = `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    /* 물방울 모양 만들기 */
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    
    /* 그림자 효과 */
    box-shadow: ${
      isSelected
        ? isLiked
          ? '0 6px 20px rgba(35, 140, 250, 0.5)'
          : '0 6px 20px rgba(0, 0, 0, 0.4)'
        : '0 3px 10px rgba(0, 0, 0, 0.3)'
    };
    border: 2px solid white;
    
    background-color: ${backgroundColor};
    width: ${sizeStyles[size].width};
    height: ${sizeStyles[size].height};
    z-index: ${isSelected ? 1001 : 1000};
  `;

  // 숫자 표시 (디바이스 개수 또는 하트 아이콘)
  const numberElement = document.createElement('span');
  numberElement.style.cssText = `
    color: white;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1;
    user-select: none;
    
    /* 숫자는 회전을 되돌려서 정상적으로 보이게 */
    transform: rotate(45deg);
    font-size: ${sizeStyles[size].fontSize};
  `;

  // 좋아요한 경우 하트 아이콘, 아니면 디바이스 개수
  numberElement.textContent = isLiked ? '♥' : deviceCount.toString();

  markerContainer.appendChild(numberElement);

  // 클릭 이벤트 추가
  if (onClick) {
    markerContainer.addEventListener('click', onClick);
  }

  // CustomOverlay 생성
  const dropletOverlay = new window.kakao.maps.CustomOverlay({
    content: markerContainer,
    position: position,
    xAnchor: 0.5,
    yAnchor: 0.5,
  });

  // 지도에 오버레이 추가
  dropletOverlay.setMap(map);

  console.log('💧 물방울 마커 생성 완료:', storeId, '위치:', position.getLat(), position.getLng());

  return dropletOverlay;
};

/**
 * 물방울 마커 업데이트 (크기 및 색상 변경)
 */
export const updateDropletMarker = (
  overlay: kakao.maps.CustomOverlay,
  isLiked: boolean,
  isSelected: boolean,
  deviceCount?: number,
): void => {
  const markerContainer = overlay.getContent() as HTMLElement;
  if (!markerContainer) return;

  const size = isSelected ? 'large' : 'small';
  const sizeStyles = {
    small: { width: '24px', height: '24px', fontSize: '10px' },
    large: { width: '40px', height: '40px', fontSize: '14px' },
  };

  const backgroundColor = isLiked ? '#238CFA' : '#6b7280';

  // 스타일 업데이트
  markerContainer.style.width = sizeStyles[size].width;
  markerContainer.style.height = sizeStyles[size].height;
  markerContainer.style.backgroundColor = backgroundColor;
  markerContainer.style.boxShadow = isSelected
    ? isLiked
      ? '0 6px 20px rgba(35, 140, 250, 0.5)'
      : '0 6px 20px rgba(0, 0, 0, 0.4)'
    : '0 3px 10px rgba(0, 0, 0, 0.3)';

  // 숫자 업데이트
  const numberElement = markerContainer.querySelector('span');
  if (numberElement) {
    numberElement.textContent = isLiked ? '♥' : deviceCount?.toString() || '0';
    numberElement.style.fontSize = sizeStyles[size].fontSize;
  }
};
