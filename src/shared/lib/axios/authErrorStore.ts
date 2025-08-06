import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';
import type { GifticonCategory } from '@/features/trade/register/gifticon/lib/types';

// API 요청 정보 저장 타입
interface PendingApiRequest {
  type:
    | 'STORE_LIKE'
    | 'SOS_REQUEST'
    | 'POST_LIKE'
    | 'RESERVATION'
    | 'FOLLOW'
    | 'RESTOCK'
    | 'TRADE_POST'
    | 'PURCHASE';
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  params?: Record<string, unknown>;
  timestamp: number;
}

// openAuthModal에서 받는 타입 (timestamp 제외)
interface AuthModalRequest {
  type:
    | 'STORE_LIKE'
    | 'SOS_REQUEST'
    | 'POST_LIKE'
    | 'RESERVATION'
    | 'FOLLOW'
    | 'RESTOCK'
    | 'TRADE_POST'
    | 'PURCHASE';
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  params?: Record<string, unknown>;
}

interface AuthErrorState {
  isAuthModalOpen: boolean;
  pendingRequest: PendingApiRequest | null;
  pendingNavigation: string | null;
  onAuthModalClose: (() => void) | null;

  // 모달 관련
  openAuthModal: (request: AuthModalRequest, onClose?: () => void) => void;
  openAuthModalForNavigation: (path: string, onClose?: () => void) => void;
  closeAuthModal: () => void;

  // 요청 실행 관련
  executePendingRequest: () => Promise<void>;
  clearPendingRequest: () => void;

  // 네비게이션 관련
  executePendingNavigation: () => void;
  clearPendingNavigation: () => void;
}

export const useAuthErrorStore = create<AuthErrorState>()(
  persist(
    (set, get) => ({
      isAuthModalOpen: false,
      pendingRequest: null,
      pendingNavigation: null,
      onAuthModalClose: null,

      openAuthModal: (request: AuthModalRequest, onClose?: () => void) => {
        console.log('🔒 Auth modal 열기:', { type: request.type, url: request.url });

        set({
          isAuthModalOpen: true,
          pendingRequest: {
            ...request,
            timestamp: Date.now(),
          },
          onAuthModalClose: onClose || null,
        });
      },

      openAuthModalForNavigation: (path: string, onClose?: () => void) => {
        console.log('🔒 Auth modal 열기 (네비게이션):', { path });

        set({
          isAuthModalOpen: true,
          pendingNavigation: path,
          onAuthModalClose: onClose || null,
        });
      },

      closeAuthModal: () => {
        const { onAuthModalClose } = get();
        console.log('🔒 Auth modal 닫기');

        // 모달 닫힐 때 콜백 실행
        if (onAuthModalClose) {
          onAuthModalClose();
        }

        set({
          isAuthModalOpen: false,
          onAuthModalClose: null,
          // pendingRequest와 pendingNavigation은 유지 (로그인 후 실행을 위해)
        });
      },

      executePendingRequest: async () => {
        const { pendingRequest, pendingNavigation } = get();

        // 네비게이션 우선 처리
        if (pendingNavigation) {
          get().executePendingNavigation();
          return;
        }

        if (!pendingRequest) {
          console.log('⚠️ 실행할 pending request가 없음');
          return;
        }

        // 5분 이상 된 요청은 무시
        const now = Date.now();
        if (now - pendingRequest.timestamp > 5 * 60 * 1000) {
          console.log('⏰ Pending request가 너무 오래됨, 삭제');
          get().clearPendingRequest();
          return;
        }

        try {
          console.log('🔄 Pending request 실행 시작:', pendingRequest.type);

          // 타입별로 API 실행
          await executeApiByType(pendingRequest);

          console.log('✅ Pending request 실행 성공');

          // 성공 후 토스트 메시지 표시
          showSuccessToast(pendingRequest.type);
        } catch (error) {
          console.error('❌ Pending request 실행 실패:', error);

          // 실패 시 토스트 메시지 표시
          showErrorToast(pendingRequest.type);
        } finally {
          // 성공/실패 관계없이 정리
          get().clearPendingRequest();
        }
      },

      clearPendingRequest: () => {
        console.log('🗑️ Pending request 정리');
        set({
          pendingRequest: null,
          pendingNavigation: null,
          isAuthModalOpen: false,
          onAuthModalClose: null,
        });
      },

      executePendingNavigation: () => {
        const { pendingNavigation } = get();

        if (!pendingNavigation) {
          console.log('⚠️ 실행할 pending navigation이 없음');
          return;
        }

        console.log('🔄 Pending navigation 실행:', pendingNavigation);

        // Next.js router를 사용하여 네비게이션
        if (typeof window !== 'undefined') {
          window.location.href = pendingNavigation;
        }

        get().clearPendingNavigation();
      },

      clearPendingNavigation: () => {
        console.log('🗑️ Pending navigation 정리');
        set({
          pendingNavigation: null,
          isAuthModalOpen: false,
          onAuthModalClose: null,
        });
      },
    }),
    {
      name: 'auth-error-storage',
      partialize: (state) => ({
        pendingRequest: state.pendingRequest,
      }),
    },
  ),
);

// API 타입별 실행 함수
async function executeApiByType(request: PendingApiRequest) {
  const { type, url, data, method } = request;

  switch (type) {
    case 'STORE_LIKE': {
      const { toggleStoreLike } = await import('@/features/rental/map/api/apis');
      const storeId = extractStoreIdFromUrl(url);
      const isLiked = (data as { isLiked?: boolean })?.isLiked ?? false;

      console.log('🔄 STORE_LIKE 실행:', { storeId, isLiked });
      await toggleStoreLike(storeId, isLiked);

      // 마커 상태 업데이트
      const { updateMarkerLikeStatus } = await import('@/features/rental/map/lib/markerCache');
      updateMarkerLikeStatus(storeId, isLiked);
      break;
    }

    case 'SOS_REQUEST': {
      // SOS 요청 API 호출
      const { sosMutations } = await import('@/widgets/sos/model/mutations');
      const result = await sosMutations.requestSos(data as { storeId: number; message?: string });

      if (!result.success) {
        throw new Error(result.error || 'SOS 요청 전송에 실패했습니다.');
      }
      break;
    }

    case 'POST_LIKE': {
      // 원래 코드의 API 함수 사용
      const { postTradePostLike, deleteTradePostLike } = await import(
        '@/entities/trade-post/api/apis'
      );
      const postId = extractPostIdFromUrl(url);

      if (method === 'POST') {
        await postTradePostLike(postId);
      } else if (method === 'DELETE') {
        await deleteTradePostLike(postId);
      }
      break;
    }

    case 'RESERVATION': {
      // 원래 코드의 API 함수 사용
      const { createReservationWithValidation } = await import(
        '@/features/rental/store/reservation/utils/reservationService'
      );
      await createReservationWithValidation(
        data as {
          storeId: number;
          storeDevices: Array<{
            storeDeviceId: number;
            count: number;
          }>;
          rentalStartDate: string;
          rentalEndDate: string;
        },
      );
      break;
    }

    case 'FOLLOW': {
      // 원래 코드의 API 함수 사용
      const { tradePostApis } = await import('@/entities/trade-post/api/apis');
      const userId = extractUserIdFromUrl(url);
      await tradePostApis.postFollowToggle(userId);
      break;
    }

    case 'RESTOCK': {
      // 원래 코드의 API 함수 사용
      const { requestRestockNotification } = await import(
        '@/features/rental/store/reservation/api/apis'
      );
      const result = await requestRestockNotification(
        data as {
          storeDeviceId: number;
          count: number;
          desiredStartDate: string;
          desiredEndDate: string;
        },
      );

      if (!result.success) {
        throw new Error(result.error || '재입고 알림 신청에 실패했습니다.');
      }
      break;
    }

    case 'TRADE_POST': {
      // URL에 따라 데이터 등록과 기프티콘 등록을 구분
      if (url.includes('/gifticon')) {
        // 기프티콘 등록 API 호출
        const { postTradeGifticon } = await import('@/features/trade/register/gifticon/api/apis');
        await postTradeGifticon(
          data as {
            title: string;
            mobileCarrier: MobileCarrier;
            deadLine: string;
            capacity: number;
            price: number;
            comment?: string;
            category: GifticonCategory;
            partner: string;
            gifticonNumber: string;
            file: File;
          },
        );
      } else {
        // 데이터 등록 API 호출
        const { postTradeData } = await import('@/features/trade/register/data/api/apis');
        await postTradeData(
          data as {
            title: string;
            mobileCarrier: MobileCarrier;
            deadLine: string;
            capacity: number;
            price: number;
            comment?: string;
          },
        );
      }
      break;
    }

    case 'PURCHASE': {
      const { createPayment } = await import('@/widgets/trade/payment/api/apis');
      const { postId, useCoin } = data as { postId: number; useCoin: number };
      await createPayment(postId, useCoin);
      break;
    }

    default:
      throw new Error(`Unknown request type: ${type}`);
  }
}

// URL에서 ID 추출 헬퍼 함수들
function extractStoreIdFromUrl(url: string): number {
  const match = url.match(/\/stores\/(\d+)/);
  if (!match) throw new Error('Invalid store URL');
  return parseInt(match[1], 10);
}

function extractPostIdFromUrl(url: string): number {
  const match = url.match(/\/posts\/(\d+)/) || url.match(/\/trades\/(\d+)/);
  if (!match) throw new Error('Invalid post URL');
  return parseInt(match[1], 10);
}

function extractUserIdFromUrl(url: string): number {
  const match = url.match(/\/users\/(\d+)/);
  if (!match) throw new Error('Invalid user URL');
  return parseInt(match[1], 10);
}

// 성공/실패 토스트 메시지
async function showSuccessToast(type: string) {
  const { makeToast } = await import('@/shared/lib/makeToast');

  const messages = {
    STORE_LIKE: '좋아요가 처리되었습니다.',
    SOS_REQUEST: 'SOS 요청이 전송되었습니다.',
    POST_LIKE: '게시글 좋아요가 처리되었습니다.',
    RESERVATION: '예약이 완료되었습니다.',
    FOLLOW: '팔로우가 처리되었습니다.',
    RESTOCK: '재입고 알림이 설정되었습니다.',
    TRADE_POST: '게시물이 성공적으로 등록되었습니다.',
    PURCHASE: '결제가 완료되었습니다.',
  };

  const message = messages[type as keyof typeof messages] || '요청이 완료되었습니다.';

  console.log('✅ 성공 토스트 표시:', message);
  makeToast(message, 'success');
}

async function showErrorToast(type: string) {
  const { makeToast } = await import('@/shared/lib/makeToast');

  const messages = {
    STORE_LIKE: '좋아요 처리 중 오류가 발생했습니다.',
    SOS_REQUEST: 'SOS 요청 중 오류가 발생했습니다.',
    POST_LIKE: '게시글 좋아요 처리 중 오류가 발생했습니다.',
    RESERVATION: '예약 중 오류가 발생했습니다.',
    FOLLOW: '팔로우 처리 중 오류가 발생했습니다.',
    RESTOCK: '재입고 알림 설정 중 오류가 발생했습니다.',
    TRADE_POST: '게시물 등록 중 오류가 발생했습니다.',
    PURCHASE: '결제 처리 중 오류가 발생했습니다.',
  };

  const message = messages[type as keyof typeof messages] || '요청 처리 중 오류가 발생했습니다.';

  console.log('✅ 에러 토스트 표시:', message);
  makeToast(message, 'warning');
}
