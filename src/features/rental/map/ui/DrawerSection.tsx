'use client';

import { DragBottomSheet } from '@/features/rental/map/ui/DragBottomSheet';

import type { StoreCardProps } from '@/features/rental/map/lib/types';

interface DrawerSectionProps {
  storeList: StoreCardProps[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isError?: boolean;
  error?: Error | null;
  open?: boolean;
  onClose?: () => void;
  onLoadMore?: () => void; // 무한 스크롤을 위한 콜백 추가
  onSortClick?: () => void; // 정렬 기준 클릭 핸들러
  currentSort?: string; // 현재 정렬 기준
}

export const DrawerSection = ({
  storeList,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  isError = false,
  error = null,
  open,
  onClose,
  onLoadMore,
  onSortClick,
  currentSort,
}: DrawerSectionProps) => {
  return (
    <DragBottomSheet
      storeList={storeList}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      isError={isError}
      error={error}
      open={open}
      onClose={onClose}
      onLoadMore={onLoadMore}
      onSortClick={onSortClick}
      currentSort={currentSort}
    />
  );
};
