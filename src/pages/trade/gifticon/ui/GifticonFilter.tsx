interface GifticonFilterProps {
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
}

const categories = [
  ['전체', 'OTT/뮤직', '도서/아티클'],
  ['자기개발', '식품', '생활/편의'],
  ['패션/뷰티', '키즈', '반려동물'],
];

export function GifticonFilter({ selectedCategory, onSelectCategory }: GifticonFilterProps) {
  return (
    <div className="flex flex-col bg-white">
      {categories.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-row">
          {row.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex-1 py-1.5 border font-medium
                ${
                  selectedCategory === cat
                    ? 'bg-[var(--main-1)] text-white border-[var(--main-1)] shadow'
                    : 'bg-white text-[var(--gray)] border-[var(--gray-light)] hover:bg-[var(--gray-light)]'
                }
                transition-colors duration-100
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
