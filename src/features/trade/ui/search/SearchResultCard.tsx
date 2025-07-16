import { CouponPost, DataPost } from '@features/trade/lib/types';
import { useRouter } from 'next/navigation';

interface SearchResultCardProps {
  post: DataPost | CouponPost;
}

export const SearchResultCard = ({ post }: SearchResultCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    const path = `/trade/${post.postCategory === 'DATA' ? 'data' : 'coupon'}/${post.id}`;
    router.push(path);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white border border-[var(--gray-light)] rounded-lg p-4 hover:shadow-md hover:border-[var(--main-3)] cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-[var(--black)] group-hover:text-[var(--main-2)] transition-colors line-clamp-1">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-[var(--main-2)]">
              {post.price.toLocaleString()}원
            </span>
            <span className="text-xs text-[var(--gray-mid)] bg-[var(--gray-light)] px-2 py-1 rounded-full">
              {post.postCategory === 'DATA' ? '데이터' : '쿠폰'}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 bg-[var(--gray-light)] rounded-full flex items-center justify-center group-hover:bg-[var(--main-3)]/20 transition-colors">
            <svg
              className="w-4 h-4 text-[var(--gray)] group-hover:text-[var(--main-3)] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="h-px bg-[var(--gray-light)] mb-2"></div>
        <p className="text-xs text-[var(--gray-mid)]">자세히 보기</p>
      </div>
    </div>
  );
};
