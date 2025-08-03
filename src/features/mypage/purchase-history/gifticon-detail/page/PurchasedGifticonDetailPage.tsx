'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ScanBarcode } from 'lucide-react';

import {
  usePurchasedGifticonDetailQuery,
  usePurchasedGifticonImageQuery,
  usePurchaseReportMutation,
} from '@/entities/user/model/queries';
import GifticonViewModal from '@/features/mypage/purchase-history/gifticon-detail/ui/GifticonViewModal';
import PurchasedGifticonDetailSkeleton from '@/features/mypage/purchase-history/gifticon-detail/ui/PurchasedGifticonDetailSkeleton';
import ReportModal from '@/features/mypage/purchase-history/gifticon-detail/ui/ReportModal';
import { BRAND_MAPPING } from '@/shared/config/brandMapping';
import { ICONS } from '@/shared/config/iconPath';
import { formatDate, formatDateTime } from '@/shared/lib/formatDate';
import { getPartnerDefaultImage } from '@/shared/lib/getPartnerDefaultImage';
import { makeToast } from '@/shared/lib/makeToast';
import { isKoreanBrandName } from '@/shared/lib/typeGuards';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { SectionDivider } from '@/shared/ui/SectionDivider';

import type { KoreanBrandName } from '@/shared/config/brandMapping';

interface Props {
  gifticonId: string;
}

export default function PurchasedGifticonDetailPage({ gifticonId }: Props) {
  const router = useRouter();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);

  const {
    data: gifticonDetail,
    isLoading,
    isError,
    error,
  } = usePurchasedGifticonDetailQuery(gifticonId);

  const { data: gifticonImage, isLoading: isImageLoading } =
    usePurchasedGifticonImageQuery(gifticonId);

  const purchaseReportMutation = usePurchaseReportMutation();

  const handleViewCoupon = () => {
    setShowCouponModal(true);
  };

  const handleConfirmViewCoupon = () => {
    setShowWarning(false);
  };

  const handleSupportInquiry = () => {
    setShowReportModal(true);
  };

  const handleSubmitReport = (reason: string) => {
    if (!reason.trim()) {
      makeToast('신고 사유를 입력해주세요.', 'warning');
      return;
    }

    if (!gifticonDetail) {
      makeToast('기프티콘 정보를 불러올 수 없습니다.', 'warning');
      return;
    }

    purchaseReportMutation.mutate(
      {
        postId: gifticonDetail.id,
        comment: reason,
      },
      {
        onSuccess: () => {
          makeToast('신고가 접수되었습니다.', 'success');
          setShowReportModal(false);
        },
        onError: (error) => {
          console.error('신고 제출 실패:', error);
          makeToast('신고 제출에 실패했습니다. 잠시 후 다시 시도해주세요.', 'warning');
        },
      },
    );
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  if (isLoading) {
    return <PurchasedGifticonDetailSkeleton />;
  }

  if (isError || !gifticonDetail) {
    return (
      <BaseLayout
        header={<PageHeader title="나의 기프티콘" onBack={() => router.back()} />}
        showBottomNav
        paddingX={false}
        className="bg-[var(--main-2)]"
      >
        <div className="text-center py-8">
          <p className="text-[var(--red)] mb-2">기프티콘 정보를 불러오는데 실패했습니다.</p>
          <p className="text-sm text-[var(--gray-mid)]">{error?.message}</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      header={<PageHeader title="나의 기프티콘" onBack={() => router.back()} />}
      showBottomNav
      paddingX={false}
      className="bg-[var(--main-2)]"
    >
      {/* 썸네일 이미지 */}
      <div className="w-full h-[400px] relative overflow-hidden">
        <Image
          src={getPartnerDefaultImage(gifticonDetail.partner as KoreanBrandName)}
          alt={gifticonDetail.title}
          fill
          sizes="(max-width: 768px) 100vw, 430px"
          className="object-cover"
          priority
          onError={(e) => {
            e.currentTarget.src = '/assets/trade-detail.jpg';
          }}
        />
      </div>

      {/* 통합 정보 카드 */}
      <div className="relative -mt-[50px] bg-[var(--white)] rounded-t-[50px] shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.1)] min-h-[calc(100vh-400px)]">
        {/* 상품 정보 섹션 */}
        <div className="px-6 pt-7">
          {/* 브랜드 태그 */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--white)] border border-[var(--gray)] rounded-full">
              {gifticonDetail.partner && isKoreanBrandName(gifticonDetail.partner) ? (
                <div className="h-6 flex items-center justify-center">
                  <Image
                    src={ICONS.GIFTICON.BRAND_LOGO[BRAND_MAPPING[gifticonDetail.partner]]}
                    alt={gifticonDetail.partner}
                    width={0}
                    height={24}
                    className="h-6 w-auto object-contain rounded-full"
                  />
                </div>
              ) : (
                <div className="h-6 flex items-center justify-center">
                  <Image
                    src={ICONS.GIFTICON.BRAND_LOGO.GIFTICON_DEFAULT}
                    alt="기프티콘 기본"
                    width={0}
                    height={24}
                    className="h-6 w-auto object-contain rounded-sm"
                  />
                </div>
              )}
              <span className="font-label-regular text-[var(--black)] flex items-center">
                {gifticonDetail.partner}
              </span>
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-[var(--black)] font-body-semibold mb-8">{gifticonDetail.title}</h1>

          {/* 금액 정보 */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[var(--black)] font-label-medium">금액</span>
            <span className="text-[var(--main-5)] font-label-semibold">
              {gifticonDetail.price.toLocaleString()}원
            </span>
          </div>

          {/* 사용 기한 */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[var(--black)] font-label-medium">사용 기한</span>
            <span className="text-[var(--black)] font-label-semibold">
              {formatDate(gifticonDetail.deadLine)}
            </span>
          </div>

          {/* 쿠폰 구매일 */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-[var(--black)] font-label-medium">쿠폰 구매일</span>
            <span className="text-[var(--black)] font-label-semibold">
              {gifticonDetail.boughtAt ? formatDate(gifticonDetail.boughtAt) : '정보 없음'}
            </span>
          </div>

          {/* 쿠폰 보기 버튼 */}
          <button
            onClick={handleViewCoupon}
            className="w-full bg-[var(--main-5)] text-[var(--white)] font-body-semibold py-3 rounded-[10px] mb-3 flex items-center justify-center gap-2"
          >
            <ScanBarcode size={22} className="flex-shrink-0" />
            기프티콘 보기
          </button>

          {/* 첫 열어본 날짜 정보 */}
          {gifticonDetail.barcodeViewTime && (
            <p className="bg-[var(--gray-light)] rounded-[10px] text-[var(--gray-dark)] font-caption-regular text-center mb-6 px-2 py-1">
              {formatDateTime(gifticonDetail.barcodeViewTime)}에 처음 열어본 쿠폰이에요
            </p>
          )}
        </div>

        {/* 문의 섹션 */}
        <div className="px-6 pb-6">
          <SectionDivider size="full" thickness="thickest" className="mb-6" />

          <div className="flex justify-between items-center mb-6">
            <span className="text-[var(--black)] font-label-medium">
              해당 쿠폰 사용에 문제가 있으신가요?
            </span>
            <button
              onClick={handleSupportInquiry}
              className="text-[var(--red)] font-label-semibold"
            >
              접수하기 &gt;
            </button>
          </div>

          <SectionDivider size="full" thickness="thickest" className="mb-6" />

          {/* 유의사항 */}
          <div>
            <h2 className="text-[var(--black)] font-label-semibold mb-3">유의 사항</h2>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-4">
              일부 매장에서는 기프티콘 사용이 불가능 할 수 있습니다.
            </p>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-4">
              가격 인상 전 발행된 쿠폰이라고 하더라도 동일한 제품으로 교환 시 추가금이 발생할 수
              있습니다.
            </p>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-4">
              반드시 동일 제품으로만 교환하셔야 하며, 앱이나 키오스크가 아닌 매장 직원을 통해
              포스기에서 직접 결제만 가능합니다.
            </p>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-4">
              품목형의 상품인 경우 매장측으로 문의 후 구매하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>

      {/* 기프티콘 보기 모달 */}
      <GifticonViewModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        gifticonDetail={gifticonDetail}
        gifticonImage={gifticonImage}
        isImageLoading={isImageLoading}
        showWarning={showWarning}
        onConfirmView={handleConfirmViewCoupon}
      />

      {/* 신고 접수 모달 */}
      <ReportModal
        isOpen={showReportModal}
        onClose={handleCloseReportModal}
        onSubmit={handleSubmitReport}
        isLoading={purchaseReportMutation.isPending}
      />
    </BaseLayout>
  );
}
