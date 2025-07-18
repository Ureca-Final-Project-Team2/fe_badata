import { AlertCircle, Search } from 'lucide-react';

import { SearchResultCard } from '@/pages/trade/search-post/ui/SearchResultCard';
import { SearchSkeletonCard } from '@/pages/trade/search-post/ui/SearchSkeletonCard';

import type { DataPost, GifticonPost } from '@/entities/trade-post/lib/types';

interface SearchResultProps {
  search: string;
  posts?: DataPost[] | GifticonPost[];
  isLoading: boolean;
  isError: boolean;
}

export const SearchResult = ({ search, posts, isLoading, isError }: SearchResultProps) => {
  if (!search) return null;

  if (isLoading) {
    return (
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--black)]">검색 결과</h3>
          <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="grid gap-3">
          <SearchSkeletonCard />
          <SearchSkeletonCard />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <AlertCircle className="w-6 h-6 text-[var(--red)]" />
          </div>
          <p className="text-[var(--red)] text-sm font-medium">검색 중 오류가 발생했습니다</p>
          <p className="text-[var(--gray-mid)] text-xs mt-1">다시 시도해주세요</p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm font-medium">검색 결과가 없습니다</p>
          <p className="text-gray-500 text-xs mt-1">
            &quot;{search}&quot;에 대한 결과를 찾을 수 없어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">검색 결과</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {posts.length}개 결과
        </span>
      </div>
      <div className="grid gap-3">
        {posts.map((post) => (
          <SearchResultCard key={post.id} post={post as DataPost | GifticonPost} />
        ))}
      </div>
    </section>
  );
};
