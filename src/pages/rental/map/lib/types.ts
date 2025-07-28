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
  price?: number; // 가격 정보
  leftCount?: number; // 남은 재고 수량
  dataType?: '5G' | '4G/LTE'; // 데이터 타입
  maxSupportConnection?: number; // 최대 접속 가능 기기 수
  reviewRating?: number; // 별점 (0~5)
}

/*
  드래그 바텀 시트 프로퍼티
*/
export interface DragBottomSheetProps {
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
  가맹점 목록 리스트 파라미터
*/
export interface FetchStoreListParams {
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
  page?: number;
  size?: number;
  sort: string[];
}

/*
  가맹점 목록 아이템
*/
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
  storeImageUrl: string;
  opening: boolean;
}

/*
  가맹점 목록 리스트
*/
export interface StoreListResponse {
  leftDeviceCount: number;
  closeTime: string;
  detailAddress: string;
  latitude: number;
  name: string;
  longititude: number;
  id: number;
  showStoreResponses: StoreListItem[];
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
  phoneNumber?: string;
  distanceFromMe?: number;
  reviewRating?: number;
  isOpening: boolean;
  startTime: string; // "HH:mm:ss" 형식
  endTime: string; // "HH:mm:ss" 형식
  liked?: boolean;
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
