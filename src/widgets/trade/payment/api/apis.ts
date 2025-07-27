/**
 * 결제 검증(impUid와 postId를 서버에 전달하여 결제 성공 여부를 확인)
 * @param impUid 포트원 결제 성공 시 받은 imp_uid
 * @param postId 결제한 게시글의 고유 ID
 * @returns {Promise<any>} 결제 검증 결과 응답 객체
 */

import { END_POINTS } from '@/shared/api/endpoints';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export async function verifyPayment(impUid: string, postId: number) {
  try {
    const res = await axiosInstance.post(END_POINTS.TRADES.VERIFY_PAYMENT(impUid, postId));
    return res;
  } catch (error: unknown) {
    let message = '결제 검증 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}

/**
 * 결제 고유 ID(merchantUid)를 발급받는 API 호출
 * @param postId 결제할 게시글의 고유 ID
 * @param useCoin 사용할 코인 금액
 * @returns {Promise<{ merchantUid: string, amount: number }>} 결제에 사용할 merchantUid와 amount를 포함한 응답 객체
 */

export async function createPayment(postId: number, useCoin: number = 0) {
  try {
    console.log('createPayment 요청:', {
      url: END_POINTS.TRADES.CREATE_PAYMENT(postId),
      body: { useCoin },
      postId,
    });

    // useCoin은 항상 전송 (0이어도 필수 필드)
    const res = await axiosInstance.post(END_POINTS.TRADES.CREATE_PAYMENT(postId), {
      useCoin,
    });

    console.log('createPayment 성공 응답:', res);
    return res;
  } catch (error: unknown) {
    console.error('createPayment 에러 상세:', error);

    // AxiosError인 경우 서버 응답에서 에러 코드 확인
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      const errorCode = axiosError.response?.data?.code;
      const errorMessage = axiosError.response?.data?.message;

      console.log('서버 에러 코드:', errorCode);
      console.log('서버 에러 메시지:', errorMessage);

      // ErrorMessageMap에서 에러 메시지 가져오기
      const message =
        ErrorMessageMap[errorCode as keyof typeof ErrorMessageMap] ||
        errorMessage ||
        'merchantUid 발급 중 오류가 발생했습니다.';
      throw new Error(message);
    }

    let message = 'merchantUid 발급 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}
