'use client';

import { SectionDivider } from '@/shared/components/ui/SectionDivider';
import Image from 'next/image';

export const TradeDetailProductSection = () => {
  return (
    <section>
      {/* 썸네일 이미지 */}
      <div className="w-full h-[340px] mt-4 relative rounded-xl overflow-hidden">
        <Image src="/assets/trade_detail.jpg" alt="기프티콘" fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="mt-6">
        {/* 제휴사, 쿠폰명 + 가격 그룹 */}
        <div className="space-y-2">
          {/* 제휴사 */}
          <div className="text-sm text-gray-500">CU</div>

          {/* 쿠폰명 + 가격 */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">모바일 금액권 3천원권</p>
            <span className="text-lg font-semibold text-[var(--main-1)]">2,050원</span>
          </div>
        </div>

        {/* SectionDivider와 사용기한 */}
        <div className="mt-6 space-y-6">
          <SectionDivider size="full" thickness="thick" />

          {/* 사용 기한 */}
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-black">사용 기한</span>
            <span className="text-sm text-gray-500">2025.09.28</span>
          </div>
        </div>
      </div>
    </section>
  );
};
