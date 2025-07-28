import { useCallback, useEffect, useRef } from 'react';

import { MapPin, Phone } from 'lucide-react';

import type { PlaceSearchResult } from '@/pages/rental/search/utils/address/searchPlaces';

interface SearchResultsProps {
  results: PlaceSearchResult[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  onSelectPlace: (place: PlaceSearchResult) => void;
  onLoadMore?: () => void;
  keyword: string;
}

const SearchResults = ({
  results,
  isLoading,
  isLoadingMore = false,
  hasNext = false,
  onSelectPlace,
  onLoadMore,
  keyword,
}: SearchResultsProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  // 검색어 강조 표시 함수
  const highlightKeyword = (text: string) => {
    if (!keyword.trim()) return text;

    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-[var(--main-5)] font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // Intersection Observer를 사용한 무한스크롤
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNext && !isLoadingMore && onLoadMore) {
        onLoadMore();
      }
    },
    [hasNext, isLoadingMore, onLoadMore],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="text-center py-4">
          <p className="text-[var(--gray-dark)]">검색 중...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="space-y-2">
        <div className="text-center py-4">
          <p className="text-[var(--gray-dark)]">검색 결과가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {results.map((place) => (
        <div
          key={place.id}
          className="p-3 border-b border-[var(--gray-light)] cursor-pointer hover:bg-[var(--gray-light)] transition-colors"
          onClick={() => onSelectPlace(place)}
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[var(--gray-dark)] mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              {/* 장소명 */}
              <h3 className="text-[var(--black)] font-small-semibold mb-1 truncate">
                {highlightKeyword(place.place_name)}
              </h3>

              {/* 도로명 주소 */}
              {place.road_address_name && (
                <p className="text-[var(--gray-dark)] font-small-regular mb-1">
                  {highlightKeyword(place.road_address_name)}
                </p>
              )}

              {/* 지번 주소 */}
              <p className="text-[var(--gray-dark)] font-small-regular mb-1">
                지번 {highlightKeyword(place.address_name)}
              </p>

              {/* 전화번호 */}
              {place.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[var(--main-5)]" />
                  <span className="text-[var(--main-5)] font-small-semibold">{place.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 무한스크롤 관찰자 요소 */}
      {hasNext && (
        <div ref={observerRef} className="py-4 text-center">
          {isLoadingMore ? (
            <p className="text-[var(--gray-dark)]">더 많은 결과를 불러오는 중...</p>
          ) : (
            <div className="h-4" /> // 관찰자 역할만 하는 빈 요소
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
