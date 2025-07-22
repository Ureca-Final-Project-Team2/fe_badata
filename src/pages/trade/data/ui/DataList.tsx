import { ListFilter } from 'lucide-react';

import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';
import { SortButton } from '@/shared/ui/SortButton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { AllPost } from '@/entities/trade-post/lib/types';

interface DataListProps {
  items: AllPost[];
  isLoading: boolean;
  sortLabel: string;
  onSortClick: () => void;
  onItemClick?: (item: AllPost) => void;
}

export function DataList({ items, isLoading, sortLabel, onSortClick, onItemClick }: DataListProps) {
  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  if (isLoading) {
    return <div className="py-4 text-center text-[var(--black)]">로딩 중...</div>;
  }
  if (items.length === 0) {
    return <div className="py-4 text-center text-[var(--black)]">게시물이 없습니다.</div>;
  }

  const handleLikeChange = (postId: number, currentLikeStatus: boolean) => {
    if (currentLikeStatus) {
      deleteLikeMutation.mutate(postId);
    } else {
      postLikeMutation.mutate(postId);
    }
  };

  const handleCardClick = (item: AllPost) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };
  return (
    <section className="bg-white">
      <div className="flex flex-row justify-between py-2">
        <SortButton label={sortLabel} onClick={onSortClick} />

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        {items.map((item) => (
          <TradePostCard
            key={item.id}
            imageUrl={item.postImage}
            title={item.title}
            partner={item.partner}
            price={item.price}
            likeCount={item.likesCount}
            isLiked={item.isLiked}
            onLikeChange={(liked) => handleLikeChange(item.id, !liked)}
            onCardClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
