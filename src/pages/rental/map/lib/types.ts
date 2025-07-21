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
