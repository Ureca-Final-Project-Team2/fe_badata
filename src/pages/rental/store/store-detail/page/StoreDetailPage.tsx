'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { mockStoreDetail } from '@/pages/rental/map/__mocks__/detail.mock';
import ContentSection from '@/pages/rental/store/store-detail/page/ContentSection';
import ImageSection from '@/pages/rental/store/store-detail/page/ImageSection';
import InfoSection from '@/pages/rental/store/store-detail/page/InfoSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab/FlatTab';
import { Header_Detail } from '@/shared/ui/Header_Detail';

export default function StoreDetailPage() {
  const params = useParams();
  const storeId = params.storeId;
  const [tab, setTab] = useState('상세정보');
  const tabList = [
    { label: '예약', value: '예약' },
    { label: '상세정보', value: '상세정보' },
    { label: '리뷰', value: '리뷰' },
  ];

  return (
    <BaseLayout
      header={<Header_Detail title={mockStoreDetail.storeName || '매장 상세정보'} />}
      paddingX={false}
    >
      {/* FlatTab 가운데 정렬 및 고정 */}
      <div className="fixed max-w-[428px] mx-auto top-[70px] left-0 right-0 z-20 flex justify-center bg-[var(--white)]">
        <FlatTab items={tabList} value={tab} onValueChange={setTab} />
      </div>
      {/* 이미지 영역은 패딩 없이 전체 너비 */}
      <div className="pt-[50px] pb-16 overflow-y-auto">
        <div className="w-full">
          <ImageSection imageUrl={mockStoreDetail.imageUrl} />
        </div>
        {/* 아래 컨텐츠는 패딩 적용 */}
        <div className="px-6">
          <InfoSection
            reviewRating={mockStoreDetail.reviewRating}
            distanceFromMe={mockStoreDetail.distanceFromMe}
            phoneNumber={mockStoreDetail.phoneNumber}
          />
          <ContentSection store={mockStoreDetail} />
        </div>
      </div>
    </BaseLayout>
  );
}
