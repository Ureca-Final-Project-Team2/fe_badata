interface SearchResultProps {
  search: string;
}

export const SearchResult = ({ search }: SearchResultProps) => {
  if (!search) return null;

  return (
    <section className="mb-6">
      {/* <h3 className="text-[1.25rem] font-semibold mb-4">검색 결과</h3> */}
      <p className="text-gray-500 text-sm">&quot;{search}&quot;에 대한 검색 결과가 없습니다.</p>
    </section>
  );
};
