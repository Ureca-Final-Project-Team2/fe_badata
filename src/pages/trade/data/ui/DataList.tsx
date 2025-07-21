import { ArrowDownUp, ListFilter } from 'lucide-react';

import { Product } from '@/shared/ui/Product';

import type { AllPost } from '@/entities/trade-post/lib/types';

interface DataListProps {
  items: AllPost[];
  isLoading: boolean;
  sortLabel: string;
  onSortClick: () => void;
}

export function DataList({ items, isLoading, sortLabel, onSortClick }: DataListProps) {
  if (isLoading) {
    return <div className="py-4 text-center text-[var(--black)]">로딩 중...</div>;
  }
  if (items.length === 0) {
    return <div className="py-4 text-center text-[var(--black)]">게시물이 없습니다.</div>;
  }

  return (
    <section className="bg-white">
      <div className="flex flex-row justify-between py-2">
        <button onClick={onSortClick} className="flex flex-row gap-1 items-center font-semibold">
          <ArrowDownUp size={16} />
          {sortLabel}
        </button>

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Product
            key={item.id}
            name={item.title}
            price={item.price}
            imageSrc={item.postImage}
            likeCount={item.likesCount}
          />
        ))}
      </div>
    </section>
  );
}
