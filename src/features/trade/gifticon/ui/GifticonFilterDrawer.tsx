'use client';

import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { Slider } from '@/shared/ui/Slider';

interface GifticonFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  maxPrice: number;
  onPriceChange: (value: number) => void;
  onSubmit: (value: number) => void;
  onReset: () => void;
}

export const GifticonFilterDrawer = ({
  isOpen,
  onClose,
  maxPrice,
  onPriceChange,
  onSubmit,
  onReset,
}: GifticonFilterDrawerProps) => {
  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5 px-4 pb-6">
        {/* 헤더 */}
        <div className="flex items-center gap-2 border-b border-[var(--gray)] p-4 pb-2 mb-2">
          <span className="font-body-semibold">기프티콘 가격 필터</span>
          <button
            type="button"
            className="ml-auto text-2xl text-[var(--gray-dark)]"
            onClick={onClose}
            aria-label="필터 창 닫기"
          >
            ×
          </button>
        </div>

        {/* 슬라이더 */}
        <Slider
          min={0}
          max={50000}
          value={maxPrice}
          step={1000}
          label="최대 가격"
          onValueChange={onPriceChange}
          showTooltip
        />

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-4">
          <RegisterButton
            type="button"
            variant="outline"
            size="sm"
            isFormValid={true}
            className="flex-1"
            onClick={onReset}
          >
            초기화
          </RegisterButton>
          <RegisterButton
            type="button"
            variant="primary"
            size="sm"
            isFormValid={true}
            className="flex-1"
            onClick={() => onSubmit(maxPrice)}
          >
            적용하기
          </RegisterButton>
        </div>
      </div>
    </FilterDrawer>
  );
};
