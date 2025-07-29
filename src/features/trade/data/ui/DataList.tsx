import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { AllPost } from '@/entities/trade-post/lib/types';

interface DataListProps {
  items: AllPost[];
  isLoading: boolean;
  onItemClick?: (item: AllPost) => void;
}

export function DataList({ items, isLoading, onItemClick }: DataListProps) {
  const { toggleLike, isItemLoading } = useTradePostLikeHooks();

  if (isLoading) {
    return <div className="py-4 text-center text-[var(--black)]">로딩 중...</div>;
  }
  if (items.length === 0) {
    return <div className="py-4 text-center text-[var(--black)]">게시물이 없습니다.</div>;
  }

  const handleCardClick = (item: AllPost) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-2 gap-4 py-4">
        {items.map((item) => (
          <TradePostCard
            key={item.id}
            imageUrl={item.postImage}
            title={item.title}
            mobileCarrier={item.mobileCarrier}
            price={item.price}
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
