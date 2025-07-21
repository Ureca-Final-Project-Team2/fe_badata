import { ListFilter } from 'lucide-react';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { Product } from '@/shared/ui/Product';
import { SortButton } from '@/shared/ui/SortButton';

type SortOption = 'latest' | 'popular';

interface GifticonListProps {
  sortOption: SortOption;
  onSortClick: () => void;
  selectedCategory: string;
}

export function GifticonList({ sortOption, onSortClick, selectedCategory }: GifticonListProps) {
  const { posts, isLoading } = useTradePostsQuery();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>쿠폰 게시물이 없습니다.</div>;
  }
  const gifticonPosts = posts.filter((p) => p.postCategory === 'GIFTICON');

  const filtered = gifticonPosts.filter(
    (p) => selectedCategory === '전체' || p.gifticonCategory === selectedCategory,
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOption === 'latest'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : b.likesCount - a.likesCount,
  );

  return (
    <section className="bg-white">
      <div className="flex flex-row justify-between py-2">
        <SortButton onClick={onSortClick} label={sortOption === 'latest' ? '최신순' : '인기순'} />

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="flex flex-col gap-4 py-4">
        {sorted.map((item) => (
          <Product
            key={item.id}
            brand={item.partner}
            name={item.title}
            price={item.price}
            imageSrc={item.postImage}
            likeCount={item.likesCount}
          />
        ))}
      </div>
    </section>
  );
}
