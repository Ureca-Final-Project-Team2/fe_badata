'use client';

import { useEffect, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { fetchStoreDetail } from '@/pages/rental/map/api/apis';
import { mockStoreDetail } from '@/pages/rental/map/utils/detaIl';
import ReservationPage from '@/pages/rental/store/reservation/page/ReservationPage';
import ReviewPage from '@/pages/rental/store/review/page/ReviewPage';
import { likeStore } from '@/pages/rental/store/store-detail/page/api/apis';
import ContentSection from '@/pages/rental/store/store-detail/page/ContentSection';
import ImageSection from '@/pages/rental/store/store-detail/page/ImageSection';
import InfoSection from '@/pages/rental/store/store-detail/page/InfoSection';
import { useLikeHooks } from '@/shared/model/useLikeHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab/FlatTab';
import { Header_Detail } from '@/shared/ui/Header_Detail';

import type { StoreDetail } from '@/pages/rental/map/lib/types';

interface StoreDetailPageProps {
  storeId: number;
}

export default function StoreDetailPage({ storeId }: StoreDetailPageProps) {
  const [tab, setTab] = useState('상세정보');
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabList = [
    { id: '예약', label: '예약', value: '예약' },
    { id: '상세정보', label: '상세정보', value: '상세정보' },
    { id: '리뷰', label: '리뷰', value: '리뷰' },
  ];

  // 가맹점 상세 정보 조회
  useEffect(() => {
    const loadStoreDetail = async () => {
      try {
        setIsLoading(true);

        // 사용자 현재 위치 가져오기
        const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
          return new Promise((resolve) => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                () => {
                  // 위치 정보 가져오기 실패 시 서울시청 좌표 사용
                  resolve({ lat: 37.5665, lng: 126.978 });
                },
                {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 300000, // 5분간 캐시
                },
              );
            } else {
              // Geolocation을 지원하지 않는 경우 서울시청 좌표 사용
              resolve({ lat: 37.5665, lng: 126.978 });
            }
          });
        };

        const userLocation = await getUserLocation();
        const detail = await fetchStoreDetail(storeId, userLocation.lat, userLocation.lng);
        setStoreDetail(detail);
      } catch (error) {
        console.error('가맹점 상세 정보 조회 실패:', error);
        // 에러 시 mock 데이터 사용
        setStoreDetail(mockStoreDetail);
      } finally {
        setIsLoading(false);
      }
    };

    if (storeId) {
      loadStoreDetail();
    }
  }, [storeId]);

  // 찜 기능 관리
  const { liked, toggle } = useLikeHooks({
    defaultLiked: false, // 초기값은 찜하지 않은 상태
    onChange: async (liked) => {
      try {
        // 인증 상태 디버깅
        const authState = useAuthStore.getState();
        const localToken = localStorage.getItem('accessToken');

        console.log('=== 인증 디버깅 ===');
        console.log('Auth Store State:', authState);
        console.log('LocalStorage Token:', localToken);
        console.log('Is Logged In:', authState.isLoggedIn);
        console.log('Access Token:', authState.accessToken);

        const response = await likeStore(storeId);
        console.log('찜 상태 변경:', liked ? '찜함' : '찜 해제', response);
      } catch (error) {
        console.error('찜 API 호출 실패:', error);
        // 에러 발생 시 상태를 원래대로 되돌리거나 사용자에게 알림
      }
    },
  });

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading) {
    return (
      <BaseLayout header={<Header_Detail title="로딩 중..." />} paddingX={false}>
        <div className="flex items-center justify-center h-64">
          <div>가맹점 정보를 불러오는 중...</div>
        </div>
      </BaseLayout>
    );
  }

  if (!storeDetail) {
    return (
      <BaseLayout header={<Header_Detail title="오류" />} paddingX={false}>
        <div className="flex items-center justify-center h-64">
          <div>가맹점 정보를 불러올 수 없습니다.</div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      header={<Header_Detail title={storeDetail.storeName || '매장 상세정보'} />}
      paddingX={false}
    >
      {/* FlatTab 가운데 정렬 및 고정 */}
      <div className="fixed max-w-[428px] mx-auto top-[70px] left-0 right-0 z-20 flex justify-center bg-[var(--white)]">
        <FlatTab items={tabList} value={tab} onValueChange={setTab} />
      </div>
      {/* 이미지 영역은 패딩 없이 전체 너비 */}
      <div className="pt-[50px] pb-16 overflow-y-auto">
        {tab === '상세정보' && (
          <div className="w-full">
            <ImageSection imageUrl={storeDetail.imageUrl} />
          </div>
        )}
        {/* 아래 컨텐츠는 패딩 적용 */}
        <div className="px-6">
          {tab === '예약' && <ReservationPage />}
          {tab === '상세정보' && (
            <>
              <InfoSection
                reviewRating={storeDetail.reviewRating}
                distanceFromMe={storeDetail.distanceFromMe}
                phoneNumber={storeDetail.phoneNumber}
                liked={liked}
                onLikeToggle={toggle}
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
