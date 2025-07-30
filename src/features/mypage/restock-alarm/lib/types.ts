export interface RestockAlarmItem {
  id: number;
  deviceImage: string;
  price: number;
  deviceName: string;
  is5G: boolean;
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