import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAddressHistory, type AddressHistoryResponse } from '@/pages/rental/search/api/apis';

// 주소 이력 삭제 hook
export const useDeleteAddressHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressHistoryResponse, Error, number>({
    mutationFn: deleteAddressHistory,
    onMutate: async (addressId) => {
      // 낙관적 업데이트를 위한 이전 데이터 백업
      await queryClient.cancelQueries({ queryKey: ['addressHistory', 5, 'lastUsed,desc'] });
      const previousData = queryClient.getQueryData(['addressHistory', 5, 'lastUsed,desc']);

      // 낙관적으로 주소 삭제
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

        // 모든 페이지에서 해당 주소 삭제
        const updatedPages = oldData.pages.map((page) => {
          if (page?.content?.getAddressResponses) {
            return {
              ...page,
              content: {
                ...page.content,
                getAddressResponses: page.content.getAddressResponses.filter(
                  (item) => item.addressId !== addressId,
                ),
              },
            };
          }
          return page;
        });

        return {
          ...oldData,
          pages: updatedPages,
        };
      });

      return { previousData };
    },
    onSuccess: (data) => {
      console.log('주소 이력 삭제 성공:', data);
      // 성공 시 캐시 무효화하여 서버 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['addressHistory', 5, 'lastUsed,desc'] });
    },
    onError: (error, addressId, context) => {
      console.error('주소 이력 삭제 실패:', error);

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
