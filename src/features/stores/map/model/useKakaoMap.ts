import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: kakao.maps.Map;
  }
}

export const useKakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 4,
        });
        setMap(map);
      });
    };

    document.head.appendChild(script);
  }, []);

  return { mapRef, map };
};
