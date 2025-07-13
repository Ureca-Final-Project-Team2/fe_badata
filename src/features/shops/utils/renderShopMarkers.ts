import type { Shop } from '@models/shop';

export const renderShopMarkers = (map: any, shops: Shop[]) => {
  if (!map || !window.kakao || shops.length === 0) return;

  shops.forEach((shop) => {
    const position = new window.kakao.maps.LatLng(shop.latitude, shop.longititude);

    const marker = new window.kakao.maps.Marker({
      map,
      position,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${shop.name}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
  });
};
