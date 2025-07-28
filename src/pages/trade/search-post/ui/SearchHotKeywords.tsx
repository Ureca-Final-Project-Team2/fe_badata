import { Flame } from 'lucide-react';

import { Badge } from '@/shared/ui/Badge';

interface SearchHotKeywordsProps {
  keywords: string[];
  onKeywordClick?: (keyword: string) => void;
}

export const SearchHotKeywords = ({ keywords, onKeywordClick }: SearchHotKeywordsProps) => {
  const handleKeywordClick = (keyword: string) => {
    onKeywordClick?.(keyword);
  };

  return (
    <section className="mb-6">
      <div className="flex items-center gap-1 mb-2 text-[1.25rem] font-medium">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-black font-semibold">실시간 hot 검색어</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge
            key={index}
            size="xs"
            color="grayLight"
            onClick={() => handleKeywordClick(keyword)}
            className="cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </section>
  );
};
