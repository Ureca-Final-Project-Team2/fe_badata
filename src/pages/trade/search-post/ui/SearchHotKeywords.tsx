import { Flame } from 'lucide-react';

import { Badge } from '@/shared/ui/Badge';

interface SearchHotKeywordsProps {
  keywords: string[];
}

export const SearchHotKeywords = ({ keywords }: SearchHotKeywordsProps) => {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-1 mb-2 text-[1.25rem] font-medium">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-black font-semibold">실시간 hot 검색어</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge key={index} size="xs" color="grayLight">
            {keyword}
          </Badge>
        ))}
      </div>
    </section>
  );
};
