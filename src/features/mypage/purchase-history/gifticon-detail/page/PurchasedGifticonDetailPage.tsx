'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ScanBarcode } from 'lucide-react';

import {
  usePurchasedGifticonDetailQuery,
  usePurchasedGifticonImageQuery,
} from '@/entities/user/model/queries';
import PurchasedGifticonDetailSkeleton from '@/features/mypage/purchase-history/gifticon-detail/ui/PurchasedGifticonDetailSkeleton';
import { BRAND_MAPPING } from '@/shared/config/brandMapping';
import { ICONS } from '@/shared/config/iconPath';
import { downloadImage } from '@/shared/lib/downloadImage';
import { formatDate, formatDateTime } from '@/shared/lib/formatDate';
import { getPartnerDefaultImage } from '@/shared/lib/getPartnerDefaultImage';
import { makeToast } from '@/shared/lib/makeToast';
import { isKoreanBrandName } from '@/shared/lib/typeGuards';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { Modal } from '@/shared/ui/Modal';
import { SectionDivider } from '@/shared/ui/SectionDivider';

import type { KoreanBrandName } from '@/shared/config/brandMapping';

interface Props {
  gifticonId: string;
}

export default function PurchasedGifticonDetailPage({ gifticonId }: Props) {
  const router = useRouter();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [firstViewedAt, setFirstViewedAt] = useState<string | null>(null);

  const {
    data: gifticonDetail,
    isLoading,
    isError,
    error,
  } = usePurchasedGifticonDetailQuery(gifticonId);

  const { data: gifticonImage, isLoading: isImageLoading } =
    usePurchasedGifticonImageQuery(gifticonId);

  const handleViewCoupon = () => {
    setShowCouponModal(true);
  };

  const handleConfirmViewCoupon = () => {
    // 첫 열어본 날짜가 없으면 현재 시간으로 설정
    if (!firstViewedAt) {
      const now = new Date().toISOString();
      setFirstViewedAt(now);
    }
    setShowWarning(false);
  };

  const handleSupportInquiry = () => {
    // TODO: 문의 접수 페이지로 이동
    console.log('문의 접수 클릭');
  };

  const handleCopyCouponNumber = async () => {
    if (gifticonImage?.couponNumber) {
      try {
        await navigator.clipboard.writeText(gifticonImage.couponNumber);
        makeToast('쿠폰 번호가 복사되었습니다.', 'success');
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
        makeToast('쿠폰 번호 복사에 실패했습니다.', 'warning');
      }
    }
  };

  const handleDownloadImage = async () => {
    if (gifticonImage?.postImage && gifticonDetail) {
      await downloadImage(
        gifticonImage.postImage,
        `${gifticonDetail.title}_쿠폰.png`,
        gifticonDetail.title,
        (method) => {
          switch (method) {
            case 'blob':
              makeToast('쿠폰 이미지가 다운로드되었습니다.', 'success');
              break;
            case 'share':
              makeToast('공유 메뉴가 열렸습니다. 갤러리에 저장을 선택하세요.', 'success');
              break;
            case 'newTab':
              makeToast('새 탭에서 이미지가 열렸습니다. 이미지를 길게 눌러 저장하세요.', 'success');
              break;
            case 'direct':
              makeToast('쿠폰 이미지 다운로드가 시작되었습니다.', 'success');
              break;
          }
        },
        () => {
          makeToast('쿠폰 이미지 다운로드에 실패했습니다.', 'warning');
        },
      );
    }
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
          <h1 className="text-[var(--black)] font-body-semibold mb-4">{gifticonDetail.title}</h1>

          {/* 금액 정보 */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-[var(--black)] font-label-medium">금액</span>
            <span className="text-[var(--main-5)] font-label-semibold">
              {gifticonDetail.price.toLocaleString()}원
            </span>
          </div>

          {/* 사용 기한 */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-[var(--black)] font-label-medium">사용 기한</span>
            <span className="text-[var(--black)] font-label-semibold">
              {formatDate(gifticonDetail.deadLine)}
            </span>
          </div>

          {/* 쿠폰 구매일 */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[var(--black)] font-label-medium">쿠폰 구매일</span>
            <span className="text-[var(--black)] font-label-semibold">
              {formatDate(gifticonDetail.boughtAt)}
            </span>
          </div>

          {/* 쿠폰 보기 버튼 */}
          <button
            onClick={handleViewCoupon}
            className="w-full bg-[var(--main-5)] text-[var(--white)] font-body-semibold py-3 rounded-[10px] mb-3 flex items-center justify-center gap-2"
          >
            <ScanBarcode size={22} className="flex-shrink-0" />
            쿠폰 보기
          </button>

          {/* 첫 열어본 날짜 정보 */}
          {firstViewedAt && (
            <p className="bg-[var(--gray-light)] rounded-[10px] text-[var(--gray-dark)] font-caption-regular text-center mb-6">
              {formatDateTime(firstViewedAt)}에 처음 열어본 쿠폰이에요
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
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-3">
              일부 매장에서는 기프티콘 사용이 불가능 할 수 있습니다.
            </p>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-3">
              가격 인상 전 발행된 쿠폰이라고 하더라도 동일한 제품으로 교환 시 추가금이 발생할 수
              있습니다.
            </p>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-3">
              반드시 동일 제품으로만 교환하셔야 하며, 앱이나 키오스크가 아닌 매장 직원을 통해
              포스기에서 직접 결제만 가능합니다.
            </p>
            <p className="text-[var(--gray-dark)] font-label-regular leading-relaxed mb-3">
              품목형의 상품인 경우 매장측으로 문의 후 구매하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>

      {/* 쿠폰 보기 모달 */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        <div className="p-4">
          {/* 모달 헤더 */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[var(--black)] font-body-semibold">쿠폰</h2>
            <button
              onClick={() => setShowCouponModal(false)}
              className="text-[var(--gray-mid)] hover:text-[var(--black)]"
            >
              ✕
            </button>
          </div>

          {isImageLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--main-3)]"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 기프티콘 이미지 */}
              <div className="w-full h-[400px] rounded-[15px] overflow-hidden bg-[var(--gray-light)] relative">
                <img
                  src={
                    gifticonImage?.postImage ||
                    getPartnerDefaultImage(gifticonDetail.partner as KoreanBrandName)
                  }
                  alt={gifticonDetail.title}
                  className={`w-full h-full object-cover ${showWarning ? 'blur-md' : ''}`}
                  onError={(e) => {
                    e.currentTarget.src = getPartnerDefaultImage(
                      gifticonDetail.partner as KoreanBrandName,
                    );
                  }}
                />

                {/* 경고 오버레이 */}
                {showWarning && (
                  <div className="absolute inset-0 bg-[var(--black)]/50 flex items-center justify-center">
                    <div className="rounded-[15px] p-6 mx-4 text-center max-w-sm">
                      <div className="w-12 h-12 bg-[var(--red)] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-body-semibold">⚠️</span>
                      </div>
                      <h3 className="text-[var(--black)] font-body-semibold mb-2">
                        쿠폰 보기 전 주의사항
                      </h3>
                      <p className="text-[var(--black)] font-label-regular mb-4 text-center">
                        쿠폰을 열어보시면 재판매 위험이 있으니 신중하게 확인해주세요.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowCouponModal(false)}
                          className="flex-1 bg-[var(--gray-light)] text-[var(--gray-dark)] font-body-semibold py-2 rounded-[8px]"
                        >
                          취소
                        </button>
                        <button
                          onClick={handleConfirmViewCoupon}
                          className="flex-1 bg-[var(--red)] text-[var(--white)] font-body-semibold py-2 rounded-[8px]"
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 쿠폰 번호 */}
              {gifticonImage?.couponNumber && !showWarning && (
                <div className="text-center">
                  <p className="text-[var(--gray-dark)] font-label-regular">쿠폰 번호</p>
                  <p className="text-[var(--black)] font-label-semibold">
                    {gifticonImage.couponNumber}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {!showWarning && (
          <div className="p-4 space-y-3">
            <button
              onClick={handleCopyCouponNumber}
              className="w-full bg-[var(--main-5)] text-[var(--white)] font-body-semibold py-3 rounded-[10px]"
            >
              복사하기
            </button>
            <button
              onClick={handleDownloadImage}
              className="w-full bg-[var(--white)] text-[var(--main-5)] font-body-semibold py-3 rounded-[10px] border border-[var(--main-5)]"
            >
              이미지 다운로드
            </button>
          </div>
        )}
      </Modal>
    </BaseLayout>
  );
}
