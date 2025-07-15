interface SearchResultProps {
  search: string;
}

export const SearchResult = ({ search }: SearchResultProps) => {
  if (!search) return null;

  return (
    <section>
      <p className="text-gray-500 text-sm">"{search}"에 대한 검색 결과가 없습니다.</p>
    </section>
  );
};
