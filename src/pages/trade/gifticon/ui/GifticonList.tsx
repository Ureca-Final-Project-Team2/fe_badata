import { useRouter } from 'next/navigation';

import { ListFilter } from 'lucide-react';

import { PATH } from '@/shared/config/path';
import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';
import { SortButton } from '@/shared/ui/SortButton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { AllPost } from '@/entities/trade-post/lib/types';

interface GifticonListProps {
  items: AllPost[];
  isLoading: boolean;
  sortLabel: string;
  onSortClick: () => void;
  onItemClick?: (item: AllPost) => void;
}

export function GifticonList({
  items,
  isLoading,
  sortLabel,
  onSortClick,
  onItemClick,
}: GifticonListProps) {
  const router = useRouter();

  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (items.length === 0) {
    return <div>쿠폰 게시물이 없습니다.</div>;
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
        <SortButton onClick={onSortClick} label={sortLabel} />

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id)))}
            className="cursor-pointer"
          >
            <TradePostCard
              partner={item.partner}
              title={item.title}
              price={item.price}
              imageUrl={item.postImage}
              likeCount={item.likesCount}
              isLiked={item.isLiked}
              onLikeChange={(liked) => handleLikeChange(item.id, !liked)}
              onCardClick={() => handleCardClick(item)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
