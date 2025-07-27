import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

export interface Store {
  id: number;
  name: string;
  latitude: number;
  longititude: number;
}
export interface StoreDevice {
  storeDeviceId: number;
  deviceName: string;
  dataCapacity: number;
  imageUrl: string;
  price: number;
  leftCount: number;
}
export interface DragBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  storeList?: StoreCardProps[];
}
export interface StoreCardProps {
  id: number;
  store: Store;
  storeDetail: StoreDetail;
  deviceCount: number;
  onLikeClick?: () => void;
  isLiked?: boolean;
  className?: string;
}
export interface ScoreProps {
  value?: number;
  onChange?: (score: number) => void;
  readOnly?: boolean;
}

// STORELIST API 관련 타입들
export interface FetchStoreListParams {
  // 필수 파라미터 - 사용자 위치
  centerLat: number;
  centerLng: number;

  // 필터 조건들
  isOpeningNow?: boolean;
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  dataCapacity?: number[];
  is5G?: boolean | null;
  maxSupportConnection?: number[];

  // 페이지네이션
  page?: number;
  size?: number;
  sort?: string[];
}

export interface StoreListItem {
  id: number;
  longititude: number;
  latitude: number;
  name: string;
  openTime: string;
  closeTime: string;
  distanceFromMe: number;
  detailAddress: string;
  leftDeviceCount: number;
  opening: boolean;
}

export interface StoreListResponse {
  leftDeviceCount: number;
  closeTime: string;
  detailAddress: string;
  longititude: number;
  latitude: number;
  name: string;
  id: number;
  showStoreResponses: StoreListItem[];
  hasNext: boolean;
}
