'use client';

import { ImageBox } from '@ui/ImageBox';
import { LikeButton } from '@ui/LikeButton';
import { ProductInfo } from '@ui/ProductInfo';
import { Profile } from '@ui/Profile';

interface TradeDetailSellerSectionProps {
  sellerName: string;
  likesCount: number;
  isFollowing: boolean; // 팔로우 여부
}

export const TradeDetailSellerSection = ({
  sellerName,
  likesCount,
  isFollowing,
}: TradeDetailSellerSectionProps) => {
  const sampleItems = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    brand: 'CU',
    name: '기프티콘 3천원권',
    price: 2050,
    image: '/assets/sample.png',
    liked: i % 2 === 0,
  }));

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

        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className="w-[120px] flex-shrink-0 flex flex-col gap-2 mb-10 items-center"
            >
              <div className="relative w-[100px] h-[100px]">
                <ImageBox size="sm" url={item.image} />

                {/* 좋아요 버튼 */}
                <div className="absolute bottom-2.5 right-2.5 z-10">
                  <LikeButton defaultLiked={item.liked} />
                </div>
              </div>

              <ProductInfo brand={item.brand} name={item.name} price={item.price} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
