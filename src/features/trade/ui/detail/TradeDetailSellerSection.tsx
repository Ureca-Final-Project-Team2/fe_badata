'use client';

import { ImageBox } from '@ui/ImageBox';
import { LikeButton } from '@ui/LikeButton';
import { ProductInfo } from '@ui/ProductInfo';
import { Profile } from '@ui/Profile';
import { useUserTradePostsQuery } from '@features/trade/model/useUserTradePostQuery';

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
      <Profile
        size="sm"
        avatarSize="sm"
        name={sellerName}
        subtitle={`좋아요 ${likesCount}`}
        showFollowButton
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
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {posts.map((item) => (
              <div
                key={item.id}
                className="w-[98px] flex-shrink-0 flex flex-col gap-2 mb-10 items-center"
              >
                <div className="relative w-[100px] h-[100px]">
                  <ImageBox
                    size="sm"
                    url={
                      item.postImage === 'no image' ? '/assets/trade_detail.jpg' : item.postImage
                    }
                  />
                  <div className="absolute bottom-2.5 right-2.5 z-10">
                    <LikeButton defaultLiked={item.isLiked} />
                  </div>
                </div>
                <div className="w-[98px] mt-1">
                  <ProductInfo
                    brand={item.partner || ''}
                    name={item.title}
                    price={item.price}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
