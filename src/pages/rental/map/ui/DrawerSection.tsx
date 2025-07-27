'use client';

import { DragBottomSheet } from '@/pages/rental/map/ui/DragBottomSheet';

import type { StoreCardProps } from '@/pages/rental/map/lib/types';

interface DrawerSectionProps {
  storeList: StoreCardProps[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export const DrawerSection = ({
  storeList,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  isError = false,
  error = null,
}: DrawerSectionProps) => {
  return (
    <DragBottomSheet
      storeList={storeList}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      isError={isError}
      error={error}
    />
  );
};
