/*
  가맹점 정보
*/
export interface Store {
  id: number;
  name: string;
  latitude: number;
  longititude: number;
  leftDeviceCount: number;
  liked: boolean;
  isCluster?: boolean; // 클러스터 여부
}

/*
  지도 API 응답 - 줌 레벨 3 이하 (개별 가맹점)
*/
export interface MapStoreResponse {
  id: number;
  longititude: number;
  latitude: number;
  name: string;
  leftDeviceCount: number;
  liked: boolean;
}

/*
  지도 API 응답 - 줌 레벨 4 이상 (클러스터링)
*/
export interface MapClusterResponse {
  id: number; // 클러스터링 아이디 (의미 없는 데이터)
  longititude: number; // 클러스터링된 위경도 중심값
  latitude: number; // 클러스터링된 위경도 중심값
  name: null; // 이름은 의미가 없어서 null로 전달
  leftDeviceCount: number; // 클러스터링 내에 조건에 맞는 남은 갯수
  liked: boolean; // 클러스터 내 좋아요 상태 (true/false)
}

/*
  지도 API 공통 응답 타입
*/
export type MapStoreItem = MapStoreResponse | MapClusterResponse;

/*
  지도 API 응답
*/
export interface MapStoresResponse {
  code: number;
  message: string | null;
  content: MapStoreItem[];
}

/*
  가맹점 장비 정보
*/
export interface StoreDevice {
  storeDeviceId: number;
  deviceName: string;
  dataCapacity: number;
  imageUrl: string;
  price: number; // 가격 정보
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
  onLikeToggle?: (storeId: number, isLiked: boolean) => void;
  isLiked?: boolean;
  className?: string;
}

/*
  평점 컴포넌트 프로퍼티
*/
export interface ScoreProps {
  value?: number;
  onChange?: (score: number) => void;
  readOnly?: boolean;
}

/*
  가맹점 목록 조회 파라미터 (무한 스크롤)
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
  page?: number; // 무한 스크롤용 페이지 번호
  size?: number; // 무한 스크롤용 페이지 크기
  sort: string[];
}

// StoreListParams는 FetchStoreListParams와 동일하므로 별칭으로 정의
export type StoreListParams = FetchStoreListParams;

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
  liked: boolean;
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
  liked: boolean;
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
  지도 가맹점 목록 조회 파라미터
*/
export interface FetchStoresParams {
  // 지도 영역 좌표
  swLat?: number;
  swLng?: number;
  neLat?: number;
  neLng?: number;

  // 필터 조건
  isOpeningNow?: boolean;
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  dataCapacity?: number[];
  is5G?: boolean;
  maxSupportConnection?: number[];
  zoomLevel?: number; // 줌 레벨 추가
}

/*
  가맹점 장비 목록 리스트 파라미터
*/
export interface FetchStoreDevicesParams extends FetchStoresParams {
  isOpeningNow?: boolean;
}
