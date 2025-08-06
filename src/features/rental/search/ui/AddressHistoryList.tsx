import React, { useMemo } from 'react';

import AddressHistoryItem from './AddressHistoryItem';
import AddressInfoSection from './AddressInfoSection';

// 주소 이력 목록 컴포넌트
const AddressHistoryList = React.memo(
  ({
    addressHistoryInfinite,
    onAddressClick,
    onDelete,
    isFetchingNextPage,
  }: {
    addressHistoryInfinite: {
      pages?: Array<{
        content?: {
          getAddressResponses?: Array<{
            addressId: number;
            address_name: string;
            place_name: string;
            road_address_name: string;
            phone: string;
          }>;
        };
      }>;
    };
    onAddressClick: (item: { addressId: number; address_name: string }) => void;
    onDelete: (addressId: number, e: React.MouseEvent) => void;
    isFetchingNextPage: boolean;
  }) => {
    const hasAddressHistory = useMemo(() => {
      const result =
        addressHistoryInfinite?.pages &&
        addressHistoryInfinite.pages.some(
          (page) =>
            page?.content?.getAddressResponses && page.content.getAddressResponses.length > 0,
        );
      return result;
    }, [addressHistoryInfinite?.pages]);

    if (!hasAddressHistory) {
      return <AddressInfoSection />;
    }

    return (
      <div>
        <div className="space-y-2">
          {addressHistoryInfinite.pages?.map((page, pageIndex) =>
            page?.content?.getAddressResponses?.map((item, itemIndex) => {
              const globalIndex =
                pageIndex * (page?.content?.getAddressResponses?.length || 0) + itemIndex;
              return (
                <div
                  key={item.addressId}
                  className={`animate-slide-in-up animate-stagger-${Math.min(globalIndex + 1, 5)}`}
                >
                  <AddressHistoryItem
                    item={item}
                    onAddressClick={onAddressClick}
                    onDelete={onDelete}
                  />
                </div>
              );
            }),
          )}
          {/* 무한스크롤 로딩 표시 */}
          {isFetchingNextPage && (
            <div className="text-center py-4 animate-fade-in">
              <p className="text-[var(--gray-dark)]">로딩 중...</p>
            </div>
          )}
        </div>
      </div>
    );
  },
);

AddressHistoryList.displayName = 'AddressHistoryList';

export default AddressHistoryList;
