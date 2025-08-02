'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  usePurchasedGifticonDetailQuery,
  usePurchasedGifticonImageQuery,
} from '@/entities/user/model/queries';
import { BRAND_MAPPING } from '@/shared/config/brandMapping';
import { ICONS } from '@/shared/config/iconPath';
import { getPartnerDefaultImage } from '@/shared/lib/getPartnerDefaultImage';
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

  const handleSupportInquiry = () => {
    // TODO: 문의 접수 페이지로 이동
    console.log('문의 접수 클릭');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/\s/g, '');
  };

  if (isLoading) {
    return (
      <BaseLayout
        header={<PageHeader title="나의 기프티콘" onBack={() => router.back()} />}
        showBottomNav
        paddingX={false}
        className="bg-[var(--main-2)]"
      >
        <div className="animate-pulse">
          <div className="w-full h-[400px] bg-[var(--gray-light)]" />
          <div className="relative -mt-[50px] bg-[var(--white)] rounded-t-[50px] shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.1)]">
            <div className="px-6 pt-7">
              <div className="h-4 bg-[var(--gray-light)] rounded mb-3 w-20" />
              <div className="h-6 bg-[var(--gray-light)] rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-[var(--gray-light)] rounded" />
                <div className="h-4 bg-[var(--gray-light)] rounded" />
                <div className="h-4 bg-[var(--gray-light)] rounded" />
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
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

      {/* 통합 정보 카드 - 이미지 위로 50px 겹침 */}
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
            className="w-full bg-[var(--main-5)] text-[var(--white)] font-body-semibold py-3 rounded-[10px] mb-3"
          >
            쿠폰보기
          </button>

          {/* 첫 열어본 날짜 정보 */}
          <p className="text-[var(--gray-mid)] font-label-regular text-center mb-6">
            {formatDate(gifticonDetail.boughtAt)}에 처음 열어본 쿠폰이에요
          </p>
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
            <h2 className="text-[var(--black)] font-body-bold mb-3">유의 사항</h2>
            <p className="text-[var(--gray-dark)] font-body-regular text-sm leading-relaxed">
              {gifticonDetail.comment ||
                '상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명'}
            </p>
          </div>
        </div>
      </div>

      {/* 쿠폰 보기 모달 */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        <div className="p-4">
          {/* 모달 헤더 */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[var(--black)] font-body-bold text-lg">쿠폰</h2>
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
              <div className="w-full h-64 rounded-[15px] overflow-hidden bg-[var(--gray-light)] relative">
                <Image
                  src={
                    gifticonImage?.postImage ||
                    getPartnerDefaultImage(gifticonDetail.partner as KoreanBrandName)
                  }
                  alt={gifticonDetail.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getPartnerDefaultImage(
                      gifticonDetail.partner as KoreanBrandName,
                    );
                  }}
                />
              </div>

              {/* 쿠폰 번호 */}
              {gifticonImage?.couponNumber && (
                <div className="text-center">
                  <p className="text-[var(--gray-dark)] font-body-regular mb-2">쿠폰 번호</p>
                  <p className="text-[var(--black)] font-body-bold text-lg">
                    {gifticonImage.couponNumber}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </BaseLayout>
  );
}
