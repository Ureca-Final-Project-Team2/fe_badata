import { Flame } from 'lucide-react';

import { useSearchTrendsQuery } from '@/features/trade/search-post/model/queries';
import { Badge } from '@/shared/ui/Badge';

interface SearchHotKeywordsProps {
  onKeywordClick?: (keyword: string) => void;
}

export const SearchHotKeywords = ({ onKeywordClick }: SearchHotKeywordsProps) => {
  const { searchTrends, isLoading, error } = useSearchTrendsQuery();

  const handleKeywordClick = (keyword: string) => {
    onKeywordClick?.(keyword);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <section className="mb-6">
        <div className="flex items-center gap-1 mb-2 font-body-medium">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-[var(--black)] font-body-semibold">실시간 hot 검색어</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-6 w-16 animate-pulse rounded-full bg-[var(--gray-light)]"
            />
          ))}
        </div>
      </section>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <section className="mb-6">
        <div className="flex items-center gap-1 mb-2 font-body-medium">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-[var(--black)] font-body-semibold">실시간 hot 검색어</span>
        </div>
        <div className="font-caption-regular text-[var(--gray-dark)] text-center py-2">
          인기 검색어를 불러오는 중 문제가 발생했습니다.
        </div>
      </section>
    );
  }

  // 데이터가 없을 때 처리
  if (!searchTrends || searchTrends.length === 0) {
    return (
      <section className="mb-6">
        <div className="flex items-center gap-1 mb-2 font-body-medium">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-[var(--black)] font-body-semibold">실시간 hot 검색어</span>
        </div>
        <div className="font-caption-regular text-[var(--gray-dark)] text-center py-2">
          현재 인기 검색어가 없습니다.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <div className="flex items-center gap-1 mb-2 font-body-medium">
        <Flame className="w-5 h-5 text-orange-500" />
        <span className="text-[var(--black)] font-body-semibold">실시간 hot 검색어</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchTrends.slice(0, 5).map((keyword: string, index: number) => (
          <Badge
            key={`${keyword}-${index}`}
            size="xs"
            color="grayLight"
            onClick={() => handleKeywordClick(keyword)}
            className="cursor-pointer hover:brightness-95 transition-colors"
          >
            #{keyword}
          </Badge>
        ))}
      </div>
    </section>
  );
};
