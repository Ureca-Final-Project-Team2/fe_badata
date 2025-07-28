import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAddressHistory, type AddressHistoryResponse } from '@/pages/rental/search/api/apis';
import { getPosition } from '@/pages/rental/search/utils/address/getPosition';

// 주소 이력 생성 hook
export const useCreateAddressHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressHistoryResponse, Error, string>({
    mutationFn: async (address: string) => {
      // 주소를 좌표로 변환
      const position = await getPosition(address);
      console.log('position', position);
      if (!position) {
        throw new Error('주소를 좌표로 변환할 수 없습니다.');
      }

      // 주소 이력 생성 API 호출
      return createAddressHistory({
        detailAddress: address,
        latitude: position.latitude,
        longititude: position.longitude,
      });
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
