import { Clock, ListFilter } from 'lucide-react';

import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import { EmptyState } from '@/shared/ui/EmptyState';
import { SortButton } from '@/shared/ui/SortButton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

interface DeadlineListProps {
  items: DeadlinePost[];
  isLoading: boolean;
  sortLabel: string;
  onSortClick: () => void;
  onItemClick?: (item: DeadlinePost) => void;
  onFilterClick?: () => void;
}

export function DeadlineList({
  items,
  isLoading,
  sortLabel,
  onSortClick,
  onItemClick,
  onFilterClick,
}: DeadlineListProps) {
  const { toggleLike, isItemLoading } = useTradePostLikeHooks();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (items.length === 0) {
    return (
      <section className="bg-[var(--white)]">
        <div className="flex flex-row justify-between py-2">
          <SortButton onClick={onSortClick} label={sortLabel} />

          {onFilterClick && (
            <button
              onClick={onFilterClick}
              className="flex flex-row gap-1 items-center font-label-semibold cursor-pointer"
            >
              조건
              <ListFilter size={14} />
            </button>
          )}
        </div>
        <EmptyState
          title="마감 임박 게시물이 없습니다"
          icon={<Clock className="w-6 h-6 text-[var(--gray-dark)]" />}
        />
      </section>
    );
  }

  const handleCardClick = (item: DeadlinePost) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <section className="bg-[var(--white)]">
      <div className="flex flex-row justify-between py-2">
        <SortButton onClick={onSortClick} label={sortLabel} />

        {onFilterClick && (
          <button
            onClick={onFilterClick}
            className="flex flex-row gap-1 items-center font-label-semibold cursor-pointer"
          >
            조건
            <ListFilter size={14} />
          </button>
        )}
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
