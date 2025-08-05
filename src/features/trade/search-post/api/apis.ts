import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { BasePost } from '@/entities/trade-post/lib/types';

export const getSearchTradePosts = async (keyword: string): Promise<BasePost[]> => {
  if (!keyword || keyword.trim() === '') {
    return [];
  }

  console.log('검색 API 호출:', { keyword, endpoint: END_POINTS.TRADES.SEARCH(keyword) });

  const response = await axiosInstance.get(END_POINTS.TRADES.SEARCH(keyword));

  console.log('검색 API 응답:', {
    status: response.status,
    data: response.data,
    content: response.data?.content,
    item: response.data?.content?.item,
  });

  // 새로운 API 구조: content.item 배열에서 게시물 추출
  const posts = response.data?.content?.item || [];

  console.log('반환할 게시물:', posts);

  return posts;
};
