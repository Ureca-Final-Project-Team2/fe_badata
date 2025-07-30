export interface LikeStoreItem {
  id: number;
  storeId: number;
  name: string;
  availableDevice: number;
  storeImage: string;
  startTime: string;
  endTime: string;
  detailAddress: string;
}

export interface LikeStoreResponse {
  code: number;
  message: string | null;
  content: {
    item: LikeStoreItem[];
    nextCursor: number;
    hasNext: boolean;
  };
} 