import { Flame } from 'lucide-react';

interface SearchHotKeywordsProps {
  keywords: string[];
}

export const SearchHotKeywords = ({ keywords }: SearchHotKeywordsProps) => {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-1 mb-2 text-sm font-medium">
        <Flame className="w-4 h-4 text-orange-500" />
        <span>실시간 hot 검색어</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span key={index} className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-600">
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
};
