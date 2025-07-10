'use client';

import { X } from 'lucide-react';
import { ImageBox } from '@ui/ImageBox/ImageBox';
import { cn } from '@/shared/lib/cn';

interface RentalProductProps {
  imageUrl?: string;
  title: string;
  price: number;
  onRemove?: () => void;
}

export function RentalProduct({ imageUrl, title, price, onRemove }: RentalProductProps) {
  const formattedPrice = `${price.toLocaleString()}원`;

  return (
    <div className="w-[379px] h-[116px] py-[8px] flex items-start gap-[8px]">
      {/* 이미지 */}
      <div className="w-[100px] h-[100px] shrink-0">
        <ImageBox size="sm" url={imageUrl} />
      </div>

      {/* 콘텐츠 */}
      <div className="w-[240px] h-[100px] flex flex-col justify-between overflow-hidden">
        <p
          className={cn(
            'text-black font-regular leading-snug line-clamp-2',
            'overflow-hidden text-ellipsis',
          )}
        >
          {title}
        </p>
        <p className="text-[var(--point-1)] font-semibold">{formattedPrice}</p>
      </div>

      {/* X 버튼 (flex item으로 정렬) */}
      <button
        onClick={onRemove}
        className="w-[25px] h-[25px] flex items-center justify-center"
        aria-label="삭제"
      >
        <X size={20} className="text-[color:var(--gray)]" />
      </button>
    </div>
  );
}
