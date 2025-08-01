'use client';

import { useState } from 'react';

import Image from 'next/image';

import { getCarrierDefaultImage } from '@/shared/lib/getCarrierDefaultImage';
import { useShareHooks } from '@/shared/model/useShareHooks';
import { BottomNav } from '@/shared/ui/BottomNav';
import { PageHeader } from '@/shared/ui/Header';
import { SosDrawer } from '@/widgets/sos/ui/SosDrawer';
import { usePaymentReceipt } from '@/widgets/trade/payment/model/usePaymentReceipt';
import BuyButtonWithPayment from '@/widgets/trade/payment/ui/BuyButtonWithPayment';
import { PaymentReceiptWrapper } from '@/widgets/trade/payment/ui/PaymentReceiptWrapper';
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

export default function DataDetailPage({ postUserId, post, postType, sellerName }: Props) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { isFollowing, setIsFollowing } = useFollowState(postUserId);
  const { share } = useShareHooks();
  const { isPaymentModalOpen, usedCoin, coinData, handlePaymentSuccess, closeModal } =
    usePaymentReceipt();

  const handleShare = () => {
    share({
      title: post.title,
      price: post.price,
      imageUrl:
        !post.postImage || post.postImage === '' || post.postImage === 'no image'
          ? undefined
          : post.postImage,
    });
  };

  const handleMore = () => {
    setIsMoreOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-[var(--main-2)]">
      <div className="fixed top-0 left-0 right-0 z-20 max-w-[428px] mx-auto">
        <PageHeader
          title="상세보기"
          onBack={() => history.back()}
          variant="with-actions"
          onShareClick={handleShare}
          onMoreClick={handleMore}
        />
      </div>

      <main className="pt-[70px] pb-[70px] w-full max-w-[428px] mx-auto">
        {/* 썸네일 이미지 */}
        <div className="w-full h-[400px] relative overflow-hidden">
          <Image
            src={
              !post.postImage || post.postImage === '' || post.postImage === 'no image'
                ? getCarrierDefaultImage(post.mobileCarrier || 'UPLUS')
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
        <div className="relative -mt-[50px] bg-[var(--white)] rounded-t-[50px] shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.1)] min-h-screen">
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
          <div className="px-6 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20">
            <TradeDetailSellerSection
              sellerId={postUserId}
              sellerName={sellerName}
              isFollowing={isFollowing ?? false}
              onFollowChange={() => setIsFollowing(!isFollowing)}
            />
          </div>
        </div>
      </main>

      <div className="bg-[var(--white)] fixed bottom-0 left-0 right-0 z-50 max-w-[428px] mx-auto">
        <BottomNav />
      </div>

      {/* 구매하기 버튼 */}
      <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-20">
        <BuyButtonWithPayment
          postId={post.id}
          title={post.title}
          price={post.price}
          initialIsLiked={post.isLiked}
          isSold={post.isSold}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>

      {/* 결제 완료 모달 */}
      <PaymentReceiptWrapper
        isOpen={isPaymentModalOpen}
        onClose={closeModal}
        title={post.title}
        price={post.price}
        usedCoin={usedCoin}
        availableCoin={coinData?.content?.coin || 0}
      />

      <TradeDetailDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        postUserId={postUserId}
        postId={post.id}
        postType={postType}
      />

      {/* SOS Drawer 추가 */}
      <SosDrawer />
    </div>
  );
}
