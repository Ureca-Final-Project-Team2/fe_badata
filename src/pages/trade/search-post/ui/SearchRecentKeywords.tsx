import { Badge } from '@ui/Badge';
import { X } from 'lucide-react';

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
          <Badge key={index} size="xs" color="grayMid" className="flex items-center gap-1" onClick={() => onClickKeyword?.(keyword)}>
            <span>{keyword}</span>
            <button onClick={(e) => {
              e.stopPropagation();
              onDeleteKeyword?.(keyword);
            }} className="ml-1 hover:text-gray-800">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </section>
  );
};
