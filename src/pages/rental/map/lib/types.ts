import type { StoreDetail } from '../../store/store-detail/lib/types';

export interface Store {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
export interface StoreDevice {
  storeDeviceId: number;
  deviceName: string;
  dataCapacity: number;
  imageUrl: string;
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
