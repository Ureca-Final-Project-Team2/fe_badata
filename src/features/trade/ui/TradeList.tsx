'use client';

import { ListFilter } from 'lucide-react';

import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import { SortButton } from '@/shared/ui/SortButton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';

interface TradeListProps {
  items: PostItem[];
  isLoading: boolean;
  sortLabel: string;
  onSortClick: () => void;
  onItemClick?: (item: PostItem) => void;
}

export function TradeList({
  items,
  isLoading,
  sortLabel,
  onSortClick,
  onItemClick,
}: TradeListProps) {
  const { toggleLike, isItemLoading } = useTradePostLikeHooks();

  if (isLoading) {
    return <div className="text-center text-[var(--gray)] py-6">로딩 중...</div>;
  }

  if (items.length === 0) {
    return <div className="text-center text-[var(--gray)] py-6">게시물이 없습니다.</div>;
  }

  const handleCardClick = (item: PostItem) => {
    onItemClick?.(item);
  };

  return (
    <section className="bg-white">
      <div className="flex flex-row justify-between py-2">
        <SortButton onClick={onSortClick} label={sortLabel} />
        <div className="flex flex-row gap-1 items-center font-label-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        {items.map((item) => (
          <TradePostCard
            key={item.id}
            partner={item.partner}
            mobileCarrier={item.mobileCarrier}
            title={item.title}
            price={item.price}
            imageUrl={item.postImage}
            likeCount={item.likesCount}
            isLiked={item.isLiked}
            onLikeToggle={() => toggleLike(item)}
            onCardClick={() => handleCardClick(item)}
            isLikeLoading={isItemLoading(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
