interface SearchRecentKeywordsProps {
  keywords: string[];
}

export const SearchRecentKeywords = ({ keywords }: SearchRecentKeywordsProps) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
        <span>최근 검색어</span>
        <button className="text-xs text-gray-400">전체 삭제</button>
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
