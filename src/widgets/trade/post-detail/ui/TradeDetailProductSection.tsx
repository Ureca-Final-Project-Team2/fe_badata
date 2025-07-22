'use client';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';
import { SectionDivider } from '@/shared/ui/SectionDivider';

interface TradeDetailProductSectionProps {
  postType: 'GIFTICON' | 'DATA';
  thumbnailUrl?: string;
  brand?: string;
  name?: string;
  price?: number;
  expireDate?: string;
  issueDate?: string;
  description?: string;
  capacity?: number;
}

export const TradeDetailProductSection = ({
  postType,
  thumbnailUrl = ICONS.LOGO.DETAIL,
  brand = 'CU',
  name = '모바일 금액권 3천원권',
  price = 2050,
  expireDate = '2025.09.28',
  issueDate,
  description = 'CU에서 사용 가능한 모바일 금액권 3000원 쿠폰입니다. 전국 매장에서 사용 가능하며 현금처럼 사용하실 수 있습니다.',
  capacity,
}: TradeDetailProductSectionProps) => {
  const brandKey = brand === 'KT' || brand === 'UPLUS' || brand === 'SKT' ? brand : 'UPLUS';
  const brandImageSrc = ICONS.TRADE.BRAND_LOGO[brandKey];
  return (
    <section>
      {/* 썸네일 이미지 */}
      <div className="w-full h-[340px] mt-4 relative rounded-xl overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, 430px"
          className="object-cover"
          priority
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="mt-6">
        {/* 브랜드, 상품명, 가격 */}
        <div className="flex flex-col gap-1 mb-6">
          <div className="h-6">
            <Image
              src={brandImageSrc}
              alt={brand}
              width={20}
              height={100}
              style={{ height: 'auto' }}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold">{name}</span>
          <span className="text-md text-[var(--main-5)] font-semibold">
            {price?.toLocaleString()}원
          </span>
        </div>

        {/* 데이터 타입일 경우 용량 */}
        {postType === 'DATA' && capacity !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-black">데이터 용량</span>
            <span className="text-sm text-[var(--gray-dark)]">{capacity}GB</span>
          </div>
        )}

        {/* 기프티콘 타입일 경우 발행일 */}
        {postType === 'GIFTICON' && issueDate && (
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-black">발행일</span>
            <span className="text-sm text-gray-500">{issueDate}</span>
          </div>
        )}

        {/* 사용기한 공통 */}
        {expireDate && (
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-black">사용 기한</span>
            <span className="text-sm text-gray-500">{expireDate}</span>
          </div>
        )}

        {/* 제품 상세 설명 (optional) */}
        {description && (
          <div className="mt-6 space-y-6">
            <SectionDivider size="full" thickness="thick" className="mb-4" />
            <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {description}
            </div>
            <SectionDivider size="full" thickness="thick" className="mb-4" />
          </div>
        )}
      </div>
    </section>
  );
};
