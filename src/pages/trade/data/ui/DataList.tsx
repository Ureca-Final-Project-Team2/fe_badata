import { ArrowDownUp, ListFilter } from 'lucide-react';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { Product } from '@/shared/ui/Product';

type SortOption = 'latest' | 'popular';

interface DataListProps {
  sortOption: SortOption;
  onSortClick: () => void;
}

export function DataList({ sortOption, onSortClick }: DataListProps) {
  const { posts, isLoading } = useTradePostsQuery();

  if (isLoading) {
    return <div className="py-4 text-center text-[var(--black)]">로딩 중...</div>;
  }
  if (!posts || posts.length === 0) {
    return <div className="py-4 text-center text-[var(--black)]">게시물이 없습니다.</div>;
  }

  const dataPosts = posts.filter((p) => p.postCategory === 'DATA');
  const sorted = [...dataPosts].sort((a, b) =>
    sortOption === 'latest'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : b.likesCount - a.likesCount,
  );

  return (
    <section className="bg-white px-6">
      <div className="flex flex-row justify-between py-2">
        <button onClick={onSortClick} className="flex flex-row gap-1 items-center font-semibold">
          <ArrowDownUp size={16} />
          {sortOption === 'latest' ? '최신순' : '인기순'}
        </button>

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {sorted.map((item) => (
          <Product
            key={item.id}
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
