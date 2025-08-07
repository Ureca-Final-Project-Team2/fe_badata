import { useCallback } from 'react';

interface UseZoomProps {
  mapInstance: kakao.maps.Map | null;
}

export const useZoom = ({ mapInstance }: UseZoomProps) => {
  // 줌인 핸들러
  const handleZoomIn = useCallback(() => {
    if (mapInstance) {
      const currentLevel = mapInstance.getLevel();
      const newLevel = Math.max(1, currentLevel - 1); // 줌인 (레벨 감소)
      mapInstance.setLevel(newLevel, {
        animate: {
          duration: 500,
        },
      });
    }
  }, [mapInstance]);

  // 줌아웃 핸들러
  const handleZoomOut = useCallback(() => {
    if (mapInstance) {
      const currentLevel = mapInstance.getLevel();
      const newLevel = Math.min(20, currentLevel + 1); // 줌아웃 (레벨 증가)
      mapInstance.setLevel(newLevel, {
        animate: {
          duration: 500,
        },
      });
    }
  }, [mapInstance]);

  return {
    handleZoomIn,
    handleZoomOut,
  };
};
