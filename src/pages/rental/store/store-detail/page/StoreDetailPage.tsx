'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchStoreDetail } from '@/pages/rental/map/api/apis';
import ReservationPage from '@/pages/rental/store/reservation/page/ReservationPage';
import ReviewPage from '@/pages/rental/store/review/page/ReviewPage';
import {
  DEFAULT_TAB,
  STORE_DETAIL_STYLES,
  STORE_DETAIL_TABS,
  type TabValue,
} from '@/pages/rental/store/store-detail/lib/storeDetailConstants';
import { useStoreLikeHooks } from '@/pages/rental/store/store-detail/model/useStoreLikeHooks';
import ContentSection from '@/pages/rental/store/store-detail/page/ContentSection';
import ImageSection from '@/pages/rental/store/store-detail/page/ImageSection';
import InfoSection from '@/pages/rental/store/store-detail/page/InfoSection';
import {
  StoreDetailError,
  StoreDetailLoading,
} from '@/pages/rental/store/store-detail/page/StoreDetailStates';
import { getUserLocation } from '@/pages/rental/utils/locationUtils';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab/FlatTab';
import { Header_Detail } from '@/shared/ui/Header_Detail';

import type { StoreDetail } from '@/pages/rental/map/lib/types';

interface StoreDetailPageProps {
  storeId: number;
}

export default function StoreDetailPage({ storeId }: StoreDetailPageProps) {
  const [tab, setTab] = useState<TabValue>(DEFAULT_TAB);
  const [storeDetail, setStoreDetail] = useState<StoreDetail>();
  const [isLoading, setIsLoading] = useState(true);

  // 가맹점 상세 정보 조회 함수 메모이제이션
  const loadStoreDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const userLocation = await getUserLocation();
      const detail = await fetchStoreDetail(storeId, userLocation.lat, userLocation.lng);
      setStoreDetail(detail);
    } catch (error) {
      console.error('가맹점 상세 정보 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  // 가맹점 상세 정보 조회
  useEffect(() => {
    if (storeId) {
      loadStoreDetail();
    }
  }, [storeId, loadStoreDetail]);

  // 찜 기능 관리 - useStoreLikeHooks 사용
  const {
    liked,
    isLoading: isLikeLoading,
    toggleLike,
    setLiked,
  } = useStoreLikeHooks({
    storeId,
    initialLiked: storeDetail?.liked ?? false,
  });

  // 서버에서 받은 찜 상태를 반영
  useEffect(() => {
    if (storeDetail?.liked !== undefined) {
      setLiked(storeDetail.liked);
    }
  }, [storeDetail?.liked, setLiked]);

  // 탭 변경 핸들러 메모이제이션
  const handleTabChange = useCallback((newTab: string) => {
    if (STORE_DETAIL_TABS.some((tab) => tab.value === newTab)) {
      setTab(newTab as TabValue);
    }
  }, []);

  // 헤더 타이틀 메모이제이션
  const headerTitle = useMemo(() => {
    return storeDetail?.name ?? '';
  }, [storeDetail?.name]);

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading) {
    return <StoreDetailLoading />;
  }

  if (!storeDetail) {
    return <StoreDetailError />;
  }

  return (
    <BaseLayout header={<Header_Detail title={headerTitle} />} paddingX={false}>
      {/* FlatTab 가운데 정렬 및 고정 */}
      <div className={STORE_DETAIL_STYLES.TAB_CONTAINER}>
        <FlatTab items={STORE_DETAIL_TABS} value={tab} onValueChange={handleTabChange} />
      </div>

      {/* 이미지 영역은 패딩 없이 전체 너비 */}
      <div className={STORE_DETAIL_STYLES.CONTENT_CONTAINER}>
        {tab === '상세정보' && (
          <div className="w-full">
            <ImageSection imageUrl={storeDetail.imageUrl} />
          </div>
        )}

        {/* 아래 컨텐츠는 패딩 적용 */}
        <div className={STORE_DETAIL_STYLES.PADDING_CONTAINER}>
          {tab === '예약' && <ReservationPage storeId={storeId} />}
          {tab === '상세정보' && (
            <>
              <InfoSection
                reviewRating={storeDetail.reviewRating ?? 0}
                distanceFromMe={storeDetail.distanceFromMe ?? 0}
                phoneNumber={storeDetail.phoneNumber ?? ''}
                liked={liked}
                isLikeLoading={isLikeLoading}
                onLikeToggle={toggleLike}
              />
              <ContentSection store={storeDetail} />
            </>
          )}
          {tab === '리뷰' && <ReviewPage />}
        </div>
      </div>
    </BaseLayout>
  );
}
