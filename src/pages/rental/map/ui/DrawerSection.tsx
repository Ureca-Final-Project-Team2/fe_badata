'use client';

import { mockStoreList } from '@/pages/rental/map/__mocks__/storeList.mock';
import { DragBottomSheet } from '@/pages/rental/map/ui/DragBottomSheet';

export const DrawerSection = () => {
  // 필요하다면 open 상태, storeList 등 prop으로 받을 수 있음
  return <DragBottomSheet open={true} storeList={mockStoreList} />;
};
