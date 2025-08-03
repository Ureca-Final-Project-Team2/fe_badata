import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function PurchasedGifticonDetailSkeleton() {
  return (
    <BaseLayout
      header={<PageHeader title="나의 기프티콘" onBack={() => history.back()} />}
      showBottomNav
      paddingX={false}
      className="bg-[var(--main-2)]"
    >
      <div className="animate-pulse">
        {/* 썸네일 이미지 스켈레톤 */}
        <div className="w-full h-[400px] bg-[var(--gray-light)]" />

        {/* 통합 정보 카드 스켈레톤 */}
        <div className="relative -mt-[50px] bg-[var(--white)] rounded-t-[50px] shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.1)] min-h-[calc(100vh-400px)]">
          <div className="px-6 pt-7">
            {/* 브랜드 태그 스켈레톤 */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--white)] border border-[var(--gray)] rounded-full">
                <div className="h-6 w-6 bg-[var(--gray-light)] rounded-full" />
                <div className="h-4 w-16 bg-[var(--gray-light)] rounded" />
              </div>
            </div>

            {/* 제목 스켈레톤 */}
            <div className="h-6 bg-[var(--gray-light)] rounded mb-4 w-3/4" />

            {/* 금액 정보 스켈레톤 */}
            <div className="flex justify-between items-center mb-3">
              <div className="h-4 w-8 bg-[var(--gray-light)] rounded" />
              <div className="h-4 w-20 bg-[var(--gray-light)] rounded" />
            </div>

            {/* 사용 기한 스켈레톤 */}
            <div className="flex justify-between items-center mb-3">
              <div className="h-4 w-16 bg-[var(--gray-light)] rounded" />
              <div className="h-4 w-24 bg-[var(--gray-light)] rounded" />
            </div>

            {/* 쿠폰 구매일 스켈레톤 */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 w-20 bg-[var(--gray-light)] rounded" />
              <div className="h-4 w-24 bg-[var(--gray-light)] rounded" />
            </div>

            {/* 쿠폰 보기 버튼 스켈레톤 */}
            <div className="w-full h-12 bg-[var(--gray-light)] rounded-[10px] mb-3" />

            {/* 첫 열어본 날짜 정보 스켈레톤 */}
            <div className="h-10 bg-[var(--gray-light)] rounded-[10px] mb-6" />
          </div>

          {/* 문의 섹션 스켈레톤 */}
          <div className="px-6 pb-6">
            <div className="h-2 bg-[var(--gray-light)] rounded mb-6" />

            <div className="flex justify-between items-center mb-6">
              <div className="h-4 w-48 bg-[var(--gray-light)] rounded" />
              <div className="h-4 w-16 bg-[var(--gray-light)] rounded" />
            </div>

            <div className="h-2 bg-[var(--gray-light)] rounded mb-6" />

            {/* 유의사항 스켈레톤 */}
            <div>
              <div className="h-5 w-20 bg-[var(--gray-light)] rounded mb-3" />
              <div className="space-y-3">
                <div className="h-4 bg-[var(--gray-light)] rounded w-full" />
                <div className="h-4 bg-[var(--gray-light)] rounded w-5/6" />
                <div className="h-4 bg-[var(--gray-light)] rounded w-4/5" />
                <div className="h-4 bg-[var(--gray-light)] rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
