import { useRouter } from 'next/navigation';

import { ListFilter } from 'lucide-react';

import { PATH } from '@/shared/config/path';
import { Product } from '@/shared/ui/Product';
import { SortButton } from '@/shared/ui/SortButton';

import type { AllPost } from '@/entities/trade-post/lib/types';

interface GifticonListProps {
  items: AllPost[];
  isLoading: boolean;
  sortLabel: string;
  onSortClick: () => void;
}

export function GifticonList({ items, isLoading, sortLabel, onSortClick }: GifticonListProps) {
  const router = useRouter();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (items.length === 0) {
    return <div>쿠폰 게시물이 없습니다.</div>;
  }

  return (
    <section className="bg-white">
      <div className="flex flex-row justify-between py-2">
        <SortButton onClick={onSortClick} label={sortLabel} />

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="flex flex-col gap-4 py-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id)))}
            className="cursor-pointer"
          >
            <Product
              brand={item.partner}
              name={item.title}
              price={item.price}
              imageSrc={item.postImage}
              likeCount={item.likesCount}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
