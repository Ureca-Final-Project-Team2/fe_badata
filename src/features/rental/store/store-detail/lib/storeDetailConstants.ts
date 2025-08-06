/**
 * 탭 타입 정의
 */
export type TabValue = '예약' | '상세정보' | '리뷰';

/**
 * StoreDetail 페이지 탭 관련 상수
 */
export const STORE_DETAIL_TABS = [
  { id: '예약', label: '예약', value: '예약' as TabValue },
  { id: '상세정보', label: '상세정보', value: '상세정보' as TabValue },
  { id: '리뷰', label: '리뷰', value: '리뷰' as TabValue },
];

/**
 * 기본 탭 값
 */
export const DEFAULT_TAB: TabValue = '상세정보';

/**
 * 페이지 메시지 상수
 */
export const STORE_DETAIL_MESSAGES = {
  LOADING: '가맹점 정보를 불러오는 중...',
  ERROR: '가맹점 정보를 불러올 수 없습니다.',
  HEADER_LOADING: '로딩 중...',
  HEADER_ERROR: '오류',
  HEADER_DEFAULT: '매장 상세정보',
} as const;

/**
 * 스타일 관련 상수
 */
export const STORE_DETAIL_STYLES = {
  TAB_CONTAINER:
    'fixed max-w-[428px] mx-auto top-[70px] left-0 right-0 z-20 flex justify-center bg-[var(--white)]',
  CONTENT_CONTAINER: 'pb-16 overflow-y-auto',
  PADDING_CONTAINER: 'px-6',
} as const;
