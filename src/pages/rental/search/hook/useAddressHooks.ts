import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAddressHistory, type AddressHistoryResponse } from '@/pages/rental/search/api/apis';

import type { PlaceSearchResult } from '@/pages/rental/search/utils/address/searchPlaces';

// 주소 이력 생성 hook
export const useCreateAddressHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressHistoryResponse, Error, PlaceSearchResult>({
    mutationFn: async (place: PlaceSearchResult) => {
      // 현재 주소 이력 데이터 확인
      const currentData = queryClient.getQueryData(['addressHistory', 5, 'lastUsed,desc']);

      // 가장 최근 주소와 중복 확인
      if (currentData) {
        type AddressHistoryPage = {
          content: {
            getAddressResponses: {
              address_name: string;
              place_name: string;
            }[];
          };
        };
        type AddressHistoryInfiniteData = {
          pages: AddressHistoryPage[];
        };

        const allPages = (currentData as AddressHistoryInfiniteData).pages;
        if (allPages.length > 0 && allPages[0]?.content?.getAddressResponses?.length > 0) {
          const mostRecentItem = allPages[0].content.getAddressResponses[0];

          // place_name과 address_name을 모두 비교하여 정확한 중복 체크
          if (
            mostRecentItem.place_name === place.place_name &&
            mostRecentItem.address_name === place.address_name
          ) {
            console.log('가장 최근 주소와 동일합니다. 추가하지 않습니다:', place.place_name);
            // 중복인 경우 성공 응답을 반환하되 실제로는 추가하지 않음
            return {
              code: 20000,
              message: '이미 존재하는 주소입니다.',
              content: 0,
            };
          }
        }
      }

      // 주소 이력 생성 API 호출 (선택한 장소의 전체 정보 사용)
      const requestData = {
        address_name: place.address_name,
        id: place.id,
        phone: place.phone,
        place_name: place.place_name,
        road_address_name: place.road_address_name,
        x: parseFloat(place.x),
        y: parseFloat(place.y),
      };

      return createAddressHistory(requestData);
    },
    onMutate: async (place) => {
      // 낙관적 업데이트를 위한 이전 데이터 백업
      await queryClient.cancelQueries({ queryKey: ['addressHistory', 5, 'lastUsed,desc'] });
      const previousData = queryClient.getQueryData(['addressHistory', 5, 'lastUsed,desc']);

      // 낙관적으로 새 주소를 맨 위에 추가
      queryClient.setQueryData(['addressHistory', 5, 'lastUsed,desc'], (old: unknown) => {
        if (!old || typeof old !== 'object' || !('pages' in old)) return old;

        const oldData = old as {
          pages: Array<{
            content?: {
              getAddressResponses?: Array<{
                addressId: number;
                address_name: string;
                id: string;
                phone: string;
                place_name: string;
                road_address_name: string;
                x: number;
                y: number;
                lastUsed?: number;
              }>;
            };
          }>;
        };

        const newAddressItem = {
          addressId: Date.now(), // 임시 ID
          address_name: place.address_name,
          id: place.id,
          phone: place.phone,
          place_name: place.place_name,
          road_address_name: place.road_address_name,
          x: parseFloat(place.x),
          y: parseFloat(place.y),
          lastUsed: Date.now(),
        };

        // 첫 번째 페이지에 새 주소 추가
        const updatedPages = [...oldData.pages];
        if (updatedPages.length > 0 && updatedPages[0]?.content?.getAddressResponses) {
          // 중복 체크 - place_name과 address_name을 모두 비교
          const existingIndex = updatedPages[0].content.getAddressResponses.findIndex(
            (item) =>
              item.place_name === place.place_name && item.address_name === place.address_name,
          );

          if (existingIndex === -1) {
            // 중복이 아닌 경우 맨 위에 추가
            updatedPages[0] = {
              ...updatedPages[0],
              content: {
                ...updatedPages[0].content,
                getAddressResponses: [
                  newAddressItem,
                  ...updatedPages[0].content.getAddressResponses,
                ],
              },
            };
          }
        }

        return {
          ...oldData,
          pages: updatedPages,
        };
      });

      return { previousData };
    },
    onSuccess: (data) => {
      console.log('주소 이력 생성 성공:', data);

      // 성공 시 캐시 무효화하여 서버 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['addressHistory', 5, 'lastUsed,desc'] });
    },
    onError: (error, place, context) => {
      console.error('주소 이력 생성 실패:', error);

      // 에러 시 이전 데이터로 롤백
      if (context && typeof context === 'object' && 'previousData' in context) {
        queryClient.setQueryData(['addressHistory', 5, 'lastUsed,desc'], context.previousData);
      }
    },
    onSettled: () => {
      // 완료 후 캐시 무효화하여 최신 데이터 확보
      queryClient.invalidateQueries({ queryKey: ['addressHistory', 5, 'lastUsed,desc'] });
    },
  });
};
