import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAddressHistory, type AddressHistoryResponse } from '@/pages/rental/search/api/apis';

// 주소 이력 삭제 hook
export const useDeleteAddressHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressHistoryResponse, Error, number>({
    mutationFn: deleteAddressHistory,
    onMutate: async (addressId) => {
      // 로그인 상태에 따라 쿼리 키 결정
      const accessToken = localStorage.getItem('accessToken');
      const sort = accessToken ? 'createdAt,desc' : 'lastUsed,desc';
      const queryKey = ['addressHistory', 5, sort];

      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      // 낙관적으로 주소 삭제
      queryClient.setQueryData(queryKey, (old: unknown) => {
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
      // 성공 시 서버 데이터로 다시 조회
      const accessToken = localStorage.getItem('accessToken');
      const sort = accessToken ? 'createdAt,desc' : 'lastUsed,desc';
      const queryKey = ['addressHistory', 5, sort];
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error, addressId, context) => {
      console.error('주소 이력 삭제 실패:', error);

      // 에러 시 이전 데이터로 롤백
      if (context && typeof context === 'object' && 'previousData' in context) {
        const accessToken = localStorage.getItem('accessToken');
        const sort = accessToken ? 'createdAt,desc' : 'lastUsed,desc';
        const queryKey = ['addressHistory', 5, sort];
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // 완료 후 추가 작업 없음 (onSuccess에서 이미 처리됨)
    },
  });
};
