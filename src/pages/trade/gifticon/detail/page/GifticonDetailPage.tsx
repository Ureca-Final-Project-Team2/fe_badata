'use client';

import { useState } from 'react';

import Image from 'next/image';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import BuyButtonWithPayment from '@/widgets/trade/payment/ui/BuyButtonWithPayment';
import { TradeDetailDrawer } from '@/widgets/trade/post-detail/ui/TradeDetailDrawer';
import { TradeDetailProductSection } from '@/widgets/trade/post-detail/ui/TradeDetailProductSection';
import { TradeDetailSellerSection } from '@/widgets/trade/post-detail/ui/TradeDetailSellerSection';
import { useFollowState } from '@/widgets/user/model/useFollowState';

import type { PostType, TradeDetailPost } from '@/widgets/trade/post-detail/lib/types';

interface Props {
  tradeId: string;
  postUserId: number;
  post: TradeDetailPost;
  postType: PostType;
  sellerName: string;
}

export const TradeDetailPage = ({ postUserId, post, postType, sellerName }: Props) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { isFollowing, setIsFollowing } = useFollowState(postUserId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  const handleMore = () => {
    setIsMoreOpen(true);
  };

  return (
    <BaseLayout
      header={
        <PageHeader
          title="상세보기"
          onBack={() => history.back()}
          variant="with-actions"
          onShareClick={handleShare}
          onMoreClick={handleMore}
        />
      }
      showBottomNav={!isMoreOpen}
      paddingX={false}
      className="bg-[var(--main-2)]"
    >
      {/* 썸네일 이미지 */}
      <div className="w-full h-[400px] relative overflow-hidden">
        <Image
          src={
            !post.postImage || post.postImage === '' || post.postImage === 'no image'
              ? '/assets/trade-detail.jpg'
              : post.postImage
          }
          alt="thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, 430px"
          className="object-cover"
          priority
        />
      </div>

      {/* 통합 정보 카드 - 이미지 위로 25px 겹침 */}
      <div className="relative -mt-[50px] bg-white rounded-t-[50px] shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.1)]">
        {/* 상품 정보 섹션 */}
        <div className="px-6 pt-7">
          <TradeDetailProductSection
            postType={postType}
            brand={postType === 'GIFTICON' ? post.partner : post.mobileCarrier}
            name={post.title}
            price={post.price}
            expireDate={post.deadLine}
            issueDate={post.issueDate}
            description={post.comment}
            capacity={post.capacity}
          />
        </div>

        {/* 판매자 정보 섹션 */}
        <div className="px-6 pb-6">
          <TradeDetailSellerSection
            sellerId={postUserId}
            sellerName={sellerName}
            isFollowing={isFollowing ?? false}
            onFollowChange={setIsFollowing}
          />
        </div>
      </div>

      {/* 구매하기 버튼 */}
      <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-20">
        <BuyButtonWithPayment
          postId={post.id}
          title={post.title}
          price={post.price}
          initialIsLiked={post.isLiked}
          isSold={post.isSold}
        />
      </div>

      <TradeDetailDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        postUserId={postUserId}
        postId={post.id}
        postType={postType}
      />
    </BaseLayout>
  );
};
