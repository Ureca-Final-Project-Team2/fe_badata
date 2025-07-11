'use client';

import { SectionDivider } from '@ui/SectionDivider';
import Image from 'next/image';

interface TradeDetailProductSectionProps {
  thumbnailUrl?: string;
  brand?: string;
  name?: string;
  price?: number;
  expireDate?: string;
  description?: string;
}

export const TradeDetailProductSection = ({
  thumbnailUrl = '/assets/trade_detail.jpg',
  brand = 'CU',
  name = '모바일 금액권 3천원권',
  price = 2050,
  expireDate = '2025.09.28',
  description = 'CU에서 사용 가능한 모바일 금액권 3000원 쿠폰입니다. 전국 매장에서 사용 가능하며 현금처럼 사용하실 수 있습니다.',
}: TradeDetailProductSectionProps) => {
  return (
    <section>
      {/* 썸네일 이미지 */}
      <div className="w-full h-[340px] mt-4 relative rounded-xl overflow-hidden">
        <Image src={thumbnailUrl} alt="기프티콘" fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="mt-6">
        {/* 제휴사, 쿠폰명 + 가격 그룹 */}
        <div className="space-y-2">
          <div className="text-sm text-gray-500">{brand}</div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{name}</p>
            <span className="text-lg font-semibold text-[var(--main-1)]">
              {price.toLocaleString()}원
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-black">사용 기한</span>
            <span className="text-sm text-gray-500">{expireDate}</span>
          </div>
        </div>

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
