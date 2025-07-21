import { RecentSearchBadge } from '@/shared/ui/Badge';

interface SearchRecentKeywordsProps {
  keywords: string[];
  onDeleteKeyword?: (keyword: string) => void;
  onDeleteAll?: () => void;
  onClickKeyword?: (keyword: string) => void;
}

export const SearchRecentKeywords = ({
  keywords,
  onDeleteKeyword,
  onDeleteAll,
  onClickKeyword,
}: SearchRecentKeywordsProps) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2 text-[1.25rem] text-muted-foreground">
        <span className="text-black font-semibold">최근 검색어</span>
        <button className="text-xs text-gray-400" onClick={onDeleteAll}>
          전체 삭제
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
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
