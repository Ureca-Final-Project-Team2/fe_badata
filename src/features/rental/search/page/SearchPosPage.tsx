'use client';

import { lazy, Suspense } from 'react';

import { useSearchPos } from '@/features/rental/search/hook/useSearchPosHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';

// Lazy loaded components for performance optimization
const SearchInputField = lazy(() =>
  import('@/features/rental/search/ui/SearchInputField').then((module) => ({
    default: module.default,
  })),
);

const SearchResults = lazy(() =>
  import('@/features/rental/search/ui/SearchResults').then((module) => ({
    default: module.default,
  })),
);

const AddressHistoryList = lazy(() =>
  import('@/features/rental/search/ui/AddressHistoryList').then((module) => ({
    default: module.default,
  })),
);

// Loading fallback components
const SearchInputLoadingFallback = () => (
  <div className="w-full h-16 bg-[var(--gray-light)] rounded-lg animate-pulse mb-4" />
);

const SearchResultsLoadingFallback = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="h-16 bg-[var(--gray-light)] rounded-lg animate-pulse" />
    ))}
  </div>
);

const AddressHistoryLoadingFallback = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="h-12 bg-[var(--gray-light)] rounded-lg animate-pulse" />
    ))}
  </div>
);

export default function SearchPosPage() {
  const {
    keyword,
    searchResults,
    addressHistoryInfinite,
    hasAddressHistory,
    isSearchLoading,
    isLoadingMore,
    isFetchingNextPage,
    hasNext,
    handleSelectPlace,
    handleAddressHistoryClick,
    handleDeleteAddress,
    handleKeywordChange,
    loadNextPage,
    scrollRef,
  } = useSearchPos();

  return (
    <BaseLayout
      centered
      paddingX={true}
      showHeader={true}
      showBottomNav
      header={<Header_Detail title="주소 설정" />}
    >
      <div className="w-full h-full flex flex-col">
        {/* 고정 영역 - 검색창 */}
        <div className="flex-shrink-0">
          <Suspense fallback={<SearchInputLoadingFallback />}>
            <SearchInputField keyword={keyword} onKeywordChange={handleKeywordChange} />
          </Suspense>
        </div>

        {/* 스크롤 영역 - 목록만 (검색창 아래 여백 추가) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pt-5">
          {keyword.trim() ? (
            // 검색어가 있을 때 - 검색 결과 표시
            <Suspense fallback={<SearchResultsLoadingFallback />}>
              <SearchResults
                results={searchResults}
                isLoading={isSearchLoading}
                isLoadingMore={isLoadingMore}
                hasNext={hasNext}
                onSelectPlace={handleSelectPlace}
                onLoadMore={loadNextPage}
                keyword={keyword.trim()}
              />
            </Suspense>
          ) : (
            // 검색어가 없을 때 - 현재 위치 버튼과 최근 검색 주소 표시
            <>
              {/* 최근 검색 주소 제목 */}
              {hasAddressHistory && (
                <h2 className="font-small-medium text-[var(--black)] mb-4">최근 검색 주소</h2>
              )}

              {/* 주소 이력 목록 */}
              <Suspense fallback={<AddressHistoryLoadingFallback />}>
                <AddressHistoryList
                  addressHistoryInfinite={addressHistoryInfinite ?? { pages: [] }}
                  onAddressClick={handleAddressHistoryClick}
                  onDelete={handleDeleteAddress}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
