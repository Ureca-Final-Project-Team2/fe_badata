'use client';

import { useState } from 'react';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import BuyButtonWithPayment from '@/widgets/trade/payment/ui/BuyButtonWithPayment';
import { TradeDetailDrawer } from '@/widgets/trade/post-detail/ui/TradeDetailDrawer';
import { TradeDetailProductSection } from '@/widgets/trade/post-detail/ui/TradeDetailProductSection';
import { TradeDetailSellerSection } from '@/widgets/trade/post-detail/ui/TradeDetailSellerSection';

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
    >
      <TradeDetailProductSection
        postType={postType}
        thumbnailUrl={
          !post.postImage || post.postImage === '' || post.postImage === 'no image'
            ? '/assets/trade-detail.jpg'
            : post.postImage
        }
        brand={postType === 'GIFTICON' ? post.partner : post.mobileCarrier}
        name={post.title}
        price={post.price}
        expireDate={post.deadLine}
        issueDate={post.issueDate} // gifticon 거래일 경우에만 존재 (undefined 허용)
        description={post.comment}
        capacity={post.capacity} // data 거래일 경우에만 존재 (undefined 허용)
      />

      <TradeDetailSellerSection
        sellerId={postUserId}
        sellerName={sellerName}
        likesCount={post.likesCount}
        isFollowing={false} // 실제 follow API 연동 전까지 false 고정
      />

      {/* 구매하기 버튼 */}
      <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-20">
        <BuyButtonWithPayment postId={post.id} title={post.title} price={post.price} />
      </div>

      <TradeDetailDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        postUserId={postUserId}
        postId={post.id}
      />
    </BaseLayout>
  );
};
