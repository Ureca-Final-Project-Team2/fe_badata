/**
 * 검색된 장소 마커 생성
 * 말풍선 모양으로 장소 이름 표시
 */
export const createPlaceMarker = (
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  placeName: string,
  onClick?: () => void,
): kakao.maps.CustomOverlay => {
  console.log('📍 장소 마커 생성:', {
    placeName,
    position: { lat: position.getLat(), lng: position.getLng() },
  });

  // 마커 컨테이너 생성
  const markerContainer = document.createElement('div');
  markerContainer.className = 'place-marker';
  markerContainer.dataset.placeName = placeName;

  // 컨테이너 스타일 설정
  markerContainer.style.cssText = `
    position: relative;
    display: inline-block;
    width: 200px;
    height: 60px;
  `;

  // 말풍선 마커 생성
  const bubbleElement = createPlaceBubbleShape(placeName);
  bubbleElement.style.cssText += `
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: auto;
    z-index: 30;
  `;

  // 요소들을 컨테이너에 추가
  markerContainer.appendChild(bubbleElement);

  // 클릭 이벤트 추가
  if (onClick) {
    markerContainer.addEventListener('click', (e) => {
      e.stopPropagation(); // 이벤트 버블링 방지

      try {
        onClick();
      } catch (error) {
        console.error('📍 onClick 함수 실행 중 오류:', error);
      }
    });
  }

  // CustomOverlay 생성
  const placeOverlay = new window.kakao.maps.CustomOverlay({
    content: markerContainer,
    position: position,
    xAnchor: 0.5,
    yAnchor: 0.5, // 항상 중앙 정렬
  });

  // 지도에 오버레이 추가
  placeOverlay.setMap(map);

  return placeOverlay;
};

/**
 * 장소 말풍선 모양 생성
 */
const createPlaceBubbleShape = (placeName: string): HTMLElement => {
  const bubbleElement = document.createElement('div');

  const backgroundColor = '#238CFA'; // main-5 색상
  const textColor = 'white';

  // 텍스트 길이에 따른 동적 너비 계산
  const baseWidth = 60;
  const charWidth = 8;
  const padding = 24;
  const maxWidth = 180;
  const minWidth = 80;

  const calculatedWidth = Math.min(
    maxWidth,
    Math.max(minWidth, baseWidth + placeName.length * charWidth + padding),
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

  // 장소명 표시
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
  textElement.textContent = placeName;
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
