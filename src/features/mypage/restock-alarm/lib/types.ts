export interface RestockAlarmItem {
  id: number;
  deviceImage: string;
  price: number;
  deviceName: string;
  is5G: boolean;
  storeName: string; 
  desiredCount: number; 
}

export interface RestockAlarmResponse {
  code: number;
  message: string | null;
  content: {
    item: RestockAlarmItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}
