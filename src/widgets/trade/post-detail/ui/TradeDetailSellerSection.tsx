'use client';

import { useUserTradePostsQuery } from '@/widgets/trade/post-detail/model/queries';
import SellerPostCard from '@/widgets/trade/ui/SellerPostCard';
import UserProfileCard from '@/widgets/user/ui/UserProfileCard';

interface TradeDetailSellerSectionProps {
  sellerId: number; // 판매자 userId
  sellerName: string;
  likesCount: number;
  isFollowing: boolean; // 팔로우 여부
}

export const TradeDetailSellerSection = ({
  sellerId,
  sellerName,
  likesCount,
  isFollowing,
}: TradeDetailSellerSectionProps) => {
  const { data, isLoading, error } = useUserTradePostsQuery(sellerId);

  const posts = data?.soldingPostsResponse?.postsResponse || [];

  return (
    <section className="mt-30">
      {/* 판매자의 프로필 */}
      <UserProfileCard
        name={sellerName}
        tradeCount={likesCount}
        isFollowing={isFollowing}
        onFollowClick={() => alert('팔로우 기능 연결 예정')}
      />

      {/* 판매자의 다른 상품 리스트 */}
      <div className="mt-6">
        <h3 className="text-[20px] font-semibold text-black mb-6">판매자의 다른 상품</h3>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div className="text-gray-500 text-center py-4">상품 정보를 불러올 수 없습니다.</div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500 text-center py-4">판매 중인 다른 상품이 없습니다.</div>
        ) : (
          <div className="flex overflow-x-auto gap-4 mb-20 scrollbar-hide">
            {posts.map((item) => (
              <SellerPostCard
                key={item.id}
                imageUrl={
                  item.postImage === 'no image' ? '/assets/trade-detail.jpg' : item.postImage
                }
                title={item.title}
                partner={item.partner || ''}
                price={item.price}
                likeCount={item.likesCount}
                isLiked={item.isLiked}
                onLikeChange={() => alert('좋아요 기능 연결 예정')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
