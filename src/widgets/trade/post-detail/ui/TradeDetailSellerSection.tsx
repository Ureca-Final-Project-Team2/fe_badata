'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';
import { useSellerPostsQuery } from '@/entities/trade-post/model/queries';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import SellerPostCard from '@/widgets/trade/ui/SellerPostCard';
import UserProfileCard from '@/widgets/user/ui/UserProfileCard';

import type { SellerPostItem } from '@/entities/trade-post/lib/types';
import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

interface TradeDetailSellerSectionProps {
  sellerId: number;
  sellerName: string;
  isFollowing: boolean;
  onFollowChange?: () => void;
}

export const TradeDetailSellerSection = ({
  sellerId,
  sellerName,
  isFollowing,
  onFollowChange,
}: TradeDetailSellerSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSellerPostsQuery(sellerId, false, undefined, 10);
  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  const posts = data?.pages?.[0]?.item || [];

  const getUpdatedPost = (post: SellerPostItem) => {
    return {
      ...post,
      isLiked: post.isLiked,
    };
  };

  const handleCardClick = (post: SellerPostItem) => {
    const detailPath =
      post.postCategory === 'DATA' ? `/trade/data/${post.id}` : `/trade/gifticon/${post.id}`;
    router.push(detailPath);
  };

  const handleLikeToggle = async (postId: number, currentIsLiked: boolean) => {
    try {
      if (currentIsLiked) {
        await deleteLikeMutation.mutateAsync(postId);
      } else {
        await postLikeMutation.mutateAsync(postId);
      }

      queryClient.invalidateQueries({
        queryKey: ['seller', 'posts', sellerId, false, 10],
      });
    } catch {
      // 에러는 이미 위에서 처리됨
    }
  };

  return (
    <div className="mt-16">
      <UserProfileCard
        userId={sellerId}
        name={sellerName}
        isFollowing={isFollowing}
        onFollowClick={onFollowChange}
      />

      {/* 판매자의 다른 상품 리스트 */}
      <div className="mt-6">
        <h3 className="font-body-semibold text-[var(--black)] mb-2">판매자의 다른 상품</h3>

        {isLoading ? (
          <Spinner content="판매자의 다른 상품 로딩 중..." />
        ) : error ? (
          <div className="text-[var(--gray-mid)] text-center py-4">
            상품 정보를 불러올 수 없습니다.
          </div>
        ) : posts.length === 0 ? (
          <EmptyState title="판매 중인 다른 상품이 없습니다." />
        ) : (
          <div className="flex overflow-x-auto gap-4 mb-8 no-scrollbar">
            {posts.map((item) => {
              const updatedPost = getUpdatedPost(item);
              return (
                <SellerPostCard
                  key={item.id}
                  title={item.title}
                  partner={item.partner}
                  mobileCarrier={item.mobileCarrier as MobileCarrier}
                  price={item.price}
                  likeCount={item.likesCount}
                  isLiked={updatedPost.isLiked}
                  onLikeChange={() => handleLikeToggle(item.id, updatedPost.isLiked)}
                  onClick={() => handleCardClick(item)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
