export type MobileCarrier = 'UPLUS' | 'KT' | 'SKT';

export interface PostTradeDataRequest {
  title: string;
  mobileCarrier: MobileCarrier;
  deadLine: string;
  capacity: number;
  price: number;
  comment?: string;
}
