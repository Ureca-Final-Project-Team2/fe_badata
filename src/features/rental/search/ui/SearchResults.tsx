import React, { useMemo } from 'react';

import InfiniteScrollObserver from '@/features/rental/search/ui/InfiniteScrollObserver';
import SearchResultItem from '@/features/rental/search/ui/SearchResultItem';

import type { PlaceSearchResult } from '@/features/rental/search/utils/address/searchPlaces';

interface SearchResultsProps {
  results: PlaceSearchResult[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  hasNext?: boolean;
  onSelectPlace: (place: PlaceSearchResult) => void;
  onLoadMore?: () => void;
  keyword: string;
}

const SearchResults = React.memo(
  ({
    results,
    isLoading,
    isLoadingMore = false,
    hasNext = false,
    onSelectPlace,
    onLoadMore,
    keyword,
  }: SearchResultsProps) => {
    // 로딩 상태 렌더링
    const loadingContent = useMemo(
      () => (
        <div className="space-y-2">
          <div className="text-center py-4">
            <p className="text-[var(--gray-dark)]">검색 중...</p>
          </div>
        </div>
      ),
      [],
    );

    // 빈 결과 상태 렌더링
    const emptyContent = useMemo(
      () => (
        <div className="space-y-2">
          <div className="text-center py-4">
            <p className="text-[var(--gray-dark)]">검색 결과가 없습니다.</p>
          </div>
        </div>
      ),
      [],
    );

    // 검색 결과 목록 렌더링
    const resultsContent = useMemo(
      () => (
        <div className="space-y-2">
          {results.map((place) => (
            <SearchResultItem
              key={place.id}
              place={place}
              keyword={keyword}
              onSelectPlace={onSelectPlace}
            />
          ))}
          <InfiniteScrollObserver
            hasNext={hasNext}
            isLoadingMore={isLoadingMore}
            onLoadMore={onLoadMore}
          />
        </div>
      ),
      [results, keyword, onSelectPlace, hasNext, isLoadingMore, onLoadMore],
    );

    if (isLoading) {
      return loadingContent;
    }

    if (results.length === 0) {
      return emptyContent;
    }

    return resultsContent;
  },
);

SearchResults.displayName = 'SearchResults';

export default SearchResults;
