export type MobileCarrier = 'LGU+';

export interface PostTradeDataRequest {
  title: string;
  mobileCarrier: MobileCarrier;
  deadLine: Date;
  capacity: number;
  price: number;
  comment: string;
  file: string;
}
