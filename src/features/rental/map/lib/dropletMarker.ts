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
  storeName?: string, // 가맹점명 추가
): kakao.maps.CustomOverlay => {
  // 마커 컨테이너 생성
  const markerContainer = document.createElement('div');
  markerContainer.className = 'droplet-marker';
  markerContainer.dataset.storeId = storeId.toString();

  // 컨테이너 스타일 설정
  markerContainer.style.cssText = `
    position: relative;
    display: inline-block;
    width: 200px;
    height: 60px;
  `;

  // 물방울 마커 생성
  const dropletElement = createDropletShape(deviceCount, isLiked, isSelected);
  dropletElement.style.cssText += `
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: ${isSelected ? 0 : 1};
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
  `;

  // 말풍선 마커 생성
  const bubbleElement = createSpeechBubbleShape(storeName || '', isLiked);
  bubbleElement.style.cssText += `
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) ${isSelected ? 'scale(1)' : 'scale(0.8)'};
    opacity: ${isSelected ? 1 : 0};
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: ${isSelected ? 'auto' : 'none'};
    z-index: 20;
  `;

  // 요소들을 컨테이너에 추가
  markerContainer.appendChild(dropletElement);
  markerContainer.appendChild(bubbleElement);

  // 클릭 이벤트 추가
  if (onClick) {
    let isProcessing = false; // 중복 클릭 방지 플래그

    markerContainer.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // 이벤트 버블링 방지 및 다른 리스너 실행 방지

      // 중복 클릭 방지
      if (isProcessing) {
        return;
      }

      isProcessing = true;

      try {
        // 클릭 시 즉시 말풍선으로 변환
        dropletElement.style.opacity = '0';
        dropletElement.style.transform = 'translateX(-50%) scale(0.8)';
        bubbleElement.style.opacity = '1';
        bubbleElement.style.transform = 'translateX(-50%) scale(1)';
        bubbleElement.style.pointerEvents = 'auto';

        // localStorage 저장은 RentalPage.tsx에서 처리 (중복 방지)

        // 비동기 처리 완료 후 플래그 리셋
        setTimeout(() => {
          isProcessing = false;
        }, 1000);

        onClick();
      } catch (error) {
        console.error('onClick 함수 실행 중 오류:', error);
        isProcessing = false;
      }
    });
  } else {
    console.warn('onClick 함수가 제공되지 않음 - storeId:', storeId);
  }

  // CustomOverlay 생성
  const dropletOverlay = new window.kakao.maps.CustomOverlay({
    content: markerContainer,
    position: position,
    xAnchor: 0.5,
    yAnchor: 0.5, // 항상 중앙 정렬
  });

  // 지도에 오버레이 추가
  dropletOverlay.setMap(map);

  return dropletOverlay;
};

/**
 * 물방울 모양 생성
 */
const createDropletShape = (
  deviceCount: number,
  isLiked: boolean,
  isSelected: boolean,
): HTMLElement => {
  const dropletElement = document.createElement('div');

  // 크기 결정 (선택된 경우 Large, 기본 Small)
  const size = isSelected ? 'large' : 'small';
  const sizeStyles = {
    small: { width: '30px', height: '30px', fontSize: '16px' },
    large: { width: '40px', height: '40px', fontSize: '20px' },
  };

  // 색상 결정 (좋아요한 경우 main-5, 기본 회색)
  const backgroundColor = isLiked ? '#238CFA' : '#6b7280';

  dropletElement.style.cssText = `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    /* 물방울 모양 만들기 - 세워진 상태 */
    border-radius: 50% 50% 0 50%;
    transform: rotate(45deg);
    
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
  `;

  // 숫자 표시 (디바이스 개수)
  const numberElement = document.createElement('span');
  numberElement.style.cssText = `
    color: white;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1;
    user-select: none;
    
    /* 숫자도 회전 제거 - 똑바로 보이게 */
    transform: none;
    font-size: ${sizeStyles[size].fontSize};
  `;

  const displayText = deviceCount.toString();
  numberElement.textContent = displayText;

  dropletElement.appendChild(numberElement);
  return dropletElement;
};

/**
 * 말풍선 모양 생성
 */
const createSpeechBubbleShape = (storeName: string, isLiked: boolean): HTMLElement => {
  const bubbleElement = document.createElement('div');

  const backgroundColor = isLiked ? '#238CFA' : '#6b7280';
  const textColor = 'white';

  // 텍스트 길이에 따른 동적 너비 계산
  const baseWidth = 60;
  const charWidth = 8;
  const padding = 24;
  const maxWidth = 180;
  const minWidth = 80;

  const calculatedWidth = Math.min(
    maxWidth,
    Math.max(minWidth, baseWidth + storeName.length * charWidth + padding),
  );

  bubbleElement.style.cssText = `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    /* 말풍선 모양 */
    background-color: ${backgroundColor};
    color: ${textColor};
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    white-space: nowrap;
    width: ${calculatedWidth}px;
    min-height: 36px;
    
    /* 그림자 효과 */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    border: 2px solid white;
  `;

  // 가맹점명 표시
  const textElement = document.createElement('span');
  textElement.style.cssText = `
    color: ${textColor};
    font-weight: 600;
    font-size: 13px;
    line-height: 1.3;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  `;
  textElement.textContent = storeName;
  bubbleElement.appendChild(textElement);

  // 말풍선 꼬리 추가
  const tail = document.createElement('div');
  tail.style.cssText = `
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${backgroundColor};
    z-index: 1000;
  `;
  bubbleElement.appendChild(tail);

  // 꼬리 테두리 (흰색)
  const tailBorder = document.createElement('div');
  tailBorder.style.cssText = `
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-top: 11px solid white;
    z-index: 999;
  `;
  bubbleElement.appendChild(tailBorder);

  return bubbleElement;
};

/**
 * 물방울 마커 업데이트 (크기 및 색상 변경)
 */
export const updateDropletMarker = (
  overlay: kakao.maps.CustomOverlay,
  isLiked: boolean,
  isSelected: boolean,
  deviceCount?: number,
  storeName?: string, // 가맹점명 추가
): void => {
  const markerContainer = overlay.getContent() as HTMLElement;
  if (!markerContainer) return;

  // 물방울 요소와 말풍선 요소 찾기
  const dropletElement = markerContainer.querySelector(
    '.droplet-marker > div:first-child',
  ) as HTMLElement;
  const bubbleElement = markerContainer.querySelector(
    '.droplet-marker > div:last-child',
  ) as HTMLElement;

  if (dropletElement && bubbleElement) {
    // 물방울 요소 업데이트
    if (isSelected) {
      dropletElement.style.opacity = '0';
      dropletElement.style.transform = 'translateX(-50%) scale(0.8)';
    } else {
      dropletElement.style.opacity = '1';
      dropletElement.style.transform = 'translateX(-50%) scale(1)';
    }

    // 말풍선 요소 업데이트
    if (isSelected && storeName) {
      bubbleElement.style.opacity = '1';
      bubbleElement.style.transform = 'translateX(-50%) scale(1)';
      bubbleElement.style.pointerEvents = 'auto';
    } else {
      bubbleElement.style.opacity = '0';
      bubbleElement.style.transform = 'translateX(-50%) scale(0.8)';
      bubbleElement.style.pointerEvents = 'none';
    }

    // 물방울 크기 업데이트 (선택 상태에 따라)
    const size = isSelected ? 'large' : 'small';
    const sizeStyles = {
      small: { width: '30px', height: '30px', fontSize: '16px' },
      large: { width: '40px', height: '40px', fontSize: '20px' },
    };

    if (!isSelected) {
      // 선택 해제 시 물방울 크기를 작게 변경
      dropletElement.style.width = sizeStyles[size].width;
      dropletElement.style.height = sizeStyles[size].height;

      // 숫자 요소 크기도 업데이트
      const numberElement = dropletElement.querySelector('span');
      if (numberElement) {
        numberElement.style.fontSize = sizeStyles[size].fontSize;
      }
    }
  }
};
