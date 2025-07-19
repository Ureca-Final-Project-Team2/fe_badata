export interface Store {
  id: number;
  name: string;
  latitude: number;
  longititude: number;
}
export interface StoreDevice {
  storeDeviceId: number;
  deviceName: string;
  dataCapacity: number;
  imageUrl: string;
}
