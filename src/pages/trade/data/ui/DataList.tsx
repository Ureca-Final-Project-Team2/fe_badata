import { useRouter } from 'next/navigation';

import { ListFilter } from 'lucide-react';

import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';
import { PATH } from '@/shared/config/path';
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
  const router = useRouter();

  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  if (isLoading) {
    return <div className="py-4 text-center text-[var(--black)]">로딩 중...</div>;
  }
  if (items.length === 0) {
    return <div className="py-4 text-center text-[var(--black)]">게시물이 없습니다.</div>;
  }

  const handleLikeToggle = (item: AllPost) => {
    if (item.isLiked) {
      deleteLikeMutation.mutate(item.id);
    } else {
      postLikeMutation.mutate(item.id);
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
          <div
            key={item.id}
            onClick={() => router.push(PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id)))}
          >
            <TradePostCard
              key={item.id}
              imageUrl={item.postImage}
              title={item.title}
              mobileCarrier={item.mobileCarrier}
              price={item.price}
              likeCount={item.likesCount}
              isLiked={item.isLiked}
              onLikeToggle={() => handleLikeToggle(item)}
              onCardClick={() => handleCardClick(item)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
