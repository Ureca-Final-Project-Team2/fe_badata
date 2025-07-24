export const mockImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
];

import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

export const MOCK_DEVICE: StoreDevice = {
  storeDeviceId: 1,
  deviceName: '포켓 와이파이 기기 A',
  dataCapacity: 2,
  imageUrl: mockImages[0],
};

export const MOCK_STORE_DETAIL: StoreDetail = {
  storeId: 1,
  imageUrl: mockImages[0],
  detailAddress: '서울특별시 강남구 테헤란로 123',
  phoneNumber: '02-1234-5678',
  distanceFromMe: 120,
  reviewRating: 4.7,
  isOpening: true,
  startTime: '09:00:00',
  endTime: '21:00:00',
};
