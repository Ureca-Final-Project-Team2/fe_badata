/*
  가맹점 정보
*/
export interface Store {
  id: number;
  name: string;
  latitude: number;
  longititude: number;
}
/*
  가맹점 장비 정보
*/
export interface StoreDevice {
  storeDeviceId: number;
  deviceName: string;
  dataCapacity: number;
  imageUrl: string;
}

/*
  드래그 바텀 시트 프로퍼티
*/
export interface DragBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  storeList?: StoreCardProps[];
}

/*
  가맹점 카드 컴포넌트 프로퍼티
*/
export interface StoreCardProps {
  id: number;
  store: Store;
  storeDetail: StoreDetail;
  deviceCount: number;
  onLikeClick?: () => void;
  isLiked?: boolean;
  className?: string;
}

/*
  가맹점 목록 리스트 파라미터
*/
export interface ScoreProps {
  value?: number;
  onChange?: (score: number) => void;
  readOnly?: boolean;
}

/*
  가맹점 목록 리스트 파라미터
*/
export interface StoreListParams {
  centerLat: number;
  centerLng: number;
  isOpeningNow?: boolean;
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  dataCapacity?: number[];
  is5G?: boolean | null;
  maxSupportConnection?: number[];
  page: number;
  size: number;
  sort: string[];
}

/*
  가맹점 목록 리스트
*/
export interface StoreListResponse {
  showStoreResponses: Store[];
  hasNext: boolean;
}

/*
  가맹점 상세 정보
*/
export interface StoreDetail {
  name: string;
  storeId: number;
  imageUrl: string;
  detailAddress: string;
  phoneNumber: string;
  distanceFromMe: number;
  reviewRating: number;
  isOpening: boolean;
  startTime: string; // "HH:mm:ss" 형식
  endTime: string; // "HH:mm:ss" 형식
  liked: boolean;
}

/*
  가맹점 목록 리스트 파라미터
*/
export interface FetchStoresParams {
  // 지도 영역 좌표
  swLat?: number;
  swLng?: number;
  neLat?: number;
  neLng?: number;

  // 필터 조건
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  dataCapacity?: number[];
  is5G?: boolean;
  maxSupportConnection?: number[];
}

/*
  가맹점 장비 목록 리스트 파라미터
*/
export interface FetchStoreDevicesParams extends FetchStoresParams {
  isOpeningNow?: boolean;
}
