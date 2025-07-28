import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAddressHistory, type AddressHistoryResponse } from '@/pages/rental/search/api/apis';

import type { PlaceSearchResult } from '@/pages/rental/search/utils/address/searchPlaces';

// 주소 이력 생성 hook
export const useCreateAddressHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressHistoryResponse, Error, PlaceSearchResult>({
    mutationFn: async (place: PlaceSearchResult) => {
      // 현재 주소 이력 데이터 확인
      const currentData = queryClient.getQueryData(['addressHistoryInfinite']);

      // 가장 최근 주소와 중복 확인
      if (currentData) {
        type AddressHistoryPage = {
          content: {
            getAddressResponses: { address_name: string }[];
          };
        };
        type AddressHistoryInfiniteData = {
          pages: AddressHistoryPage[];
        };

        const allPages = (currentData as AddressHistoryInfiniteData).pages;
        if (allPages.length > 0 && allPages[0]?.content?.getAddressResponses?.length > 0) {
          const mostRecentAddressName = allPages[0].content.getAddressResponses[0].address_name;

          if (mostRecentAddressName === place.address_name) {
            console.log('가장 최근 주소와 동일합니다. 추가하지 않습니다:', place.address_name);
            console.log('가장 최근 주소:', mostRecentAddressName);
            console.log('입력한 주소:', place.address_name);
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

      console.log('서버로 전송하는 데이터:', requestData);

      return createAddressHistory(requestData);
    },
    onSuccess: (data) => {
      console.log('주소 이력 생성 성공:', data);
      // 주소 이력 생성 후 무한스크롤 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['addressHistoryInfinite'] });
    },
    onError: (error) => {
      console.error('주소 이력 생성 실패:', error);
    },
  });
};
