'use client';

import { Heart } from 'lucide-react';

import { ImageBox } from '@/shared/ui/ImageBox';
import { ProductInfo } from '@/shared/ui/ProductInfo';

export interface ProductProps {
  imageSrc: string;
  brand?: string;
  name: string;
  price: number;
  likeCount: number;
}

export function Product({ imageSrc, brand, name, price, likeCount }: ProductProps) {
  return (
    <div className="relative flex w-full gap-4 pt-2 pb-4">
      {/* 왼쪽 이미지 */}
      <ImageBox url={imageSrc} size="sm" />

      {/* 가운데 정보 */}
      <div className="flex flex-col justify-between flex-1">
        <ProductInfo brand={brand} name={name} price={price} size="md" />
      </div>

      {/* 오른쪽 하단 하트 + 숫자 */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <Heart size={16} className="text-gray" fill="gray" stroke="gray" />
        <span className="text-xs text-gray">{likeCount}</span>
      </div>
    </div>
  );
}
