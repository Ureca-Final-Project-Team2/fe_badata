'use client';

import React, { useState } from 'react';
import { TradeDetailProductSection } from '@features/trade/components/TradeDetailProductSection';
import { TradeDetailSellerSection } from '@features/trade/components/TradeDetailSellerSection';
import { TradeDetailDrawer } from '@features/trade/components/TradeDetailDrawer';
import { PostType, TradePost } from '@features/trade/apis/getTradeDetail';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { PageHeader } from '@ui/Header';
import { BuyButton } from '@ui/BuyButton';

interface Props {
  tradeId: string;
  postUserId: number;
  post: TradePost;
  postType: PostType;
  sellerName: string;
}

export const TradeDetailPage = ({ tradeId, postUserId, post, postType, sellerName }: Props) => {
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
      className="h-[calc(100vh-70px)]"
      showBottomNav={!isMoreOpen}
    >
      <TradeDetailProductSection
        postType={postType}
        thumbnailUrl={post.postImage === 'no image' ? '/assets/trade_detail.jpg' : post.postImage}
        brand={postType === 'gifticon' ? post.partner : post.mobileCarrier}
        name={post.title}
        price={post.price}
        expireDate={post.deadLine}
        issueDate={post.issueDate} // gifticon 거래일 경우에만 존재 (undefined 허용)
        description={post.comment}
        capacity={post.capacity} // data 거래일 경우에만 존재 (undefined 허용)
      />

      <TradeDetailSellerSection
        sellerName={sellerName}
        likesCount={post.likesCount}
        isFollowing={false} // 실제 follow API 연동 전까지 false 고정
      />

      {/* 구매하기 버튼 */}
      <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-20">
        <BuyButton variant="primary" size="lg_thin" onClick={() => console.log('구매하기')}>
          구매하기
        </BuyButton>
      </div>

      <TradeDetailDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        postUserId={postUserId}
      />
    </BaseLayout>
  );
};
