import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAddressHistory, type AddressHistoryResponse } from '@/pages/rental/search/api/apis';

// 주소 이력 삭제 hook
export const useDeleteAddressHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressHistoryResponse, Error, number>({
    mutationFn: deleteAddressHistory,
    onSuccess: (data) => {
      console.log('주소 이력 삭제 성공:', data);
      // 주소 이력 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['addressHistory'] });
    },
    onError: (error) => {
      console.error('주소 이력 삭제 실패:', error);
    },
  });
};
