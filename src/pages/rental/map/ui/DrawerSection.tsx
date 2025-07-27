'use client';

import { DragBottomSheet } from '@/pages/rental/map/ui/DragBottomSheet';

import type { StoreCardProps } from '@/pages/rental/map/lib/types';

interface DrawerSectionProps {
  open: boolean;
  storeList: StoreCardProps[];
  onClose?: () => void;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export const DrawerSection = ({
  open,
  storeList,
  onClose,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  isError = false,
  error = null,
}: DrawerSectionProps) => {
  return (
    <DragBottomSheet
      open={open}
      storeList={storeList}
      onClose={onClose}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      isError={isError}
      error={error}
    />
  );
};
