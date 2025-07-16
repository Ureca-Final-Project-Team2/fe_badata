import { ChevronRight } from 'lucide-react';

import { useTradeDeadlineQuery } from '@features/trade/model/useTradeQueries';
import { ImageCard } from '@ui/ImageCard';
import { ProductInfo } from '@ui/ProductInfo';

export function TradeDeadlineBanner() {
  const { deadlinePosts, isLoading } = useTradeDeadlineQuery();

  if (isLoading) {
    return <div className="py-4 text-center text-[var(--gray)]">로딩 중...</div>;
  }
  if (!deadlinePosts || deadlinePosts.length === 0) {
    return <div className="py-4 text-center text-[var(--gray)]">게시물이 없습니다.</div>;
  }

  return (
    <section className="bg-white px-6">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-[20px] font-semibold">마감임박 데려가세요!</h2>
        <ChevronRight />
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {deadlinePosts.map((item) => (
          <div key={item.id} className="w-[98px]">
            <ImageCard key={item.id} size="sm" url={item.postImage} defaultLiked={item.isLiked} />
            <div className="mt-1">
              <ProductInfo brand={item.partner} name={item.title} price={item.price} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
