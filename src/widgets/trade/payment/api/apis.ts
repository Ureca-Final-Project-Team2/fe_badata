/**
 * 결제 검증(impUid와 postId를 서버에 전달하여 결제 성공 여부를 확인)
 * @param impUid 포트원 결제 성공 시 받은 imp_uid
 * @param postId 결제한 게시글의 고유 ID
 * @returns {Promise<any>} 결제 검증 결과 응답 객체
 */

import { END_POINTS } from '@/shared/api/endpoints';
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
 * @returns {Promise<{ merchantUid: string }>} 결제에 사용할 merchantUid를 포함한 응답 객체
 */

export async function createPayment(postId: number) {
  try {
    const res = await axiosInstance.post(END_POINTS.TRADES.CREATE_PAYMENT(postId));
    return res;
  } catch (error: unknown) {
    let message = 'merchantUid 발급 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(message);
  }
}
