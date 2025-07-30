import { RecentSearchBadge } from '@/shared/ui/Badge';

interface SearchRecentKeywordsProps {
  keywords: string[];
  onDeleteKeyword?: (keyword: string) => void;
  onDeleteAll?: () => void;
  onClickKeyword?: (keyword: string) => void;
  isLoading?: boolean;
}

export const SearchRecentKeywords = ({
  keywords,
  onDeleteKeyword,
  onDeleteAll,
  onClickKeyword,
  isLoading = false,
}: SearchRecentKeywordsProps) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-2 font-body-medium">
        <span className="text-[var(--black)] font-body-semibold">최근 검색어</span>
        <button className="font-small-regular text-[var(--gray-mid)]" onClick={onDeleteAll}>
          전체 삭제
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-6 w-20 animate-pulse rounded-full bg-[var(--main-1)]" />
            ))
          : keywords.map((keyword, index) => (
              <RecentSearchBadge
                key={index}
                label={keyword}
                onDelete={onDeleteKeyword || (() => {})}
                onClick={onClickKeyword}
              />
            ))}
      </div>
    </section>
  );
};
