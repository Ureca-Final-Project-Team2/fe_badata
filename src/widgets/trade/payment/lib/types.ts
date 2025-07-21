export interface IamportResponse {
  code?: number;
  message?: string;
  imp_uid?: string;
}

export interface IamportRequestPayParams {
  channelKey: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
}
