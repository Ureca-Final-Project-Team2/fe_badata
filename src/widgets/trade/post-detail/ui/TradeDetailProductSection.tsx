'use client';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface TradeDetailProductSectionProps {
  postType: 'GIFTICON' | 'DATA';
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
  brand,
  name,
  price,
  expireDate,
  issueDate,
  description,
  capacity,
}: TradeDetailProductSectionProps) => {
  const brandKey = brand === 'KT' || brand === 'UPLUS' || brand === 'SKT' ? brand : null;
  const brandImageSrc = brandKey ? ICONS.TRADE.BRAND_LOGO[brandKey] : null;

  return (
    <>
      {/* 브랜드 */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[var(--gray)] rounded-full">
          {brandImageSrc ? (
            <div className="w-4 h-4">
              <Image
                src={brandImageSrc}
                alt={brand || '브랜드'}
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-xs font-medium text-[var(--gray-dark)]">?</span>
            </div>
          )}
          <span className="font-label-regular text-[var(--black)]">{brand}</span>
        </div>
      </div>

      {/* 상품명 */}
      <div className="mb-6">
        <span className="font-body-semibold text-[var(--black)]">{name}</span>
      </div>

      {/* 가격 */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-label-medium text-black">가격</span>
        <span className="font-label-semibold text-[var(--main-5)]">
          {price?.toLocaleString()}원
        </span>
      </div>

      {/* 기프티콘 타입일 경우 발행일 */}
      {postType === 'GIFTICON' && issueDate && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-label-medium text-black">발행일</span>
          <span className="font-label-semibold text-[var(--gray-dark)]">{issueDate}</span>
        </div>
      )}

      {/* 데이터 타입일 경우 용량 */}
      {postType === 'DATA' && capacity !== undefined && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-label-medium text-black">데이터 용량</span>
          <span className="font-label-semibold text-[var(--gray-dark)]">{capacity}GB</span>
        </div>
      )}

      {/* 사용기한 */}
      {expireDate && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-label-medium text-black">사용 기한</span>
          <span className="font-label-semibold text-[var(--gray-dark)]">{expireDate}</span>
        </div>
      )}

      {/* 제품 상세 설명 */}
      {description && (
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="whitespace-pre-wrap font-body-regular text-[var(--gray-dark)] leading-relaxed">
              {description}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
