'use client';

import { DragBottomSheet } from '@/pages/rental/map/ui/DragBottomSheet';

import type { StoreCardProps } from '@/pages/rental/map/lib/types';

interface DrawerSectionProps {
  open: boolean;
  storeList: StoreCardProps[];
  onClose?: () => void;
}

export const DrawerSection = ({ open, storeList, onClose }: DrawerSectionProps) => {
  return <DragBottomSheet open={open} storeList={storeList} onClose={onClose} />;
};
