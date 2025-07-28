export interface IamportResponse {
  code?: number;
  message?: string;
  imp_uid?: string;
  impUid?: string;
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

// 결제 생성 API 응답 타입
export interface CreatePaymentResponse {
  merchantUid: string;
  amount: number;
}

// 결제 검증 API 응답 타입
export interface VerifyPaymentResponse {
  paymentId: number;
}
