import { Skeleton } from './Skeleton';

export function TradePostCardSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      {/* 이미지 스켈레톤 */}
      <Skeleton className="aspect-square w-full rounded-lg" />

      {/* 제목 스켈레톤 */}
      <Skeleton className="h-4 w-3/4" />

      {/* 파트너 스켈레톤 */}
      <Skeleton className="h-3 w-1/2" />

      {/* 가격 스켈레톤 */}
      <Skeleton className="h-5 w-2/3" />

      {/* 좋아요 수 스켈레톤 */}
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}
