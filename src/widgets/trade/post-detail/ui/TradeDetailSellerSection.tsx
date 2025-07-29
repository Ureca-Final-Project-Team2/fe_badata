'use client';

import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import { ICONS } from '@/shared/config/iconPath';
import { useUserTradePostsQuery } from '@/widgets/trade/post-detail/model/queries';
import SellerPostCard from '@/widgets/trade/ui/SellerPostCard';
import UserProfileCard from '@/widgets/user/ui/UserProfileCard';

import type { AllPost } from '@/entities/trade-post/lib/types';

interface TradeDetailSellerSectionProps {
  sellerId: number;
  sellerName: string;
  isFollowing: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

export const TradeDetailSellerSection = ({
  sellerId,
  sellerName,
  isFollowing,
}: TradeDetailSellerSectionProps) => {
  const { data, isLoading, error } = useUserTradePostsQuery(sellerId);
  const { toggleLike, getCachedLikeState } = useTradePostLikeHooks();

  const posts = data?.soldingPostsResponse?.postsResponse || [];

  // 캐시에서 최신 좋아요 상태를 가져오는 함수
  const getUpdatedPost = (post: AllPost) => {
    const cachedLikeState = getCachedLikeState(post.id, post.isLiked);
    return {
      ...post,
      isLiked: cachedLikeState,
    };
  };

  return (
    <div className="mt-20">
      <UserProfileCard userId={sellerId} name={sellerName} isFollowing={isFollowing} />

      {/* 판매자의 다른 상품 리스트 */}
      <div className="mt-6">
        <h3 className="font-body-semibold text-[var(--black)] mb-2">판매자의 다른 상품</h3>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div className="text-[var(--gray-mid)] text-center py-4">
            상품 정보를 불러올 수 없습니다.
          </div>
        ) : posts.length === 0 ? (
          <div className="text-[var(--gray-mid)] text-center py-4">
            판매 중인 다른 상품이 없습니다.
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 mb-20 no-scrollbar">
            {posts.map((item) => {
              const updatedPost = getUpdatedPost(item);
              return (
                <SellerPostCard
                  key={item.id}
                  imageUrl={item.postImage === 'no image' ? ICONS.LOGO.DETAIL : item.postImage}
                  title={item.title}
                  partner={item.partner || ''}
                  price={item.price}
                  likeCount={item.likesCount}
                  isLiked={updatedPost.isLiked}
                  onLikeChange={() => toggleLike(updatedPost)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
