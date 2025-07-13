import { Store } from '@features/stores/types/store';

export const renderStoreMarkers = (map: any, stores: Store[]) => {
  if (!map || !window.kakao || stores.length === 0) return;

  stores.forEach((store) => {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    const marker = new window.kakao.maps.Marker({
      map,
      position,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${store.name}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
  });
};
