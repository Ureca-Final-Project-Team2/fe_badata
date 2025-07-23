import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export const userApis = {
  // 팔로우/언팔로우 토글
  createFollow: async (userId: number) => {
    const response = await axiosInstance.post(END_POINTS.USER.FOLLOW(userId));
    return response.data;
  },

  // 팔로잉 목록 조회
  readFollowings: async (cursor?: number, size: number = 10) => {
    const params = new URLSearchParams();
    params.append('followType', 'FOLLOWINGS');
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const response = await axiosInstance.get(`${END_POINTS.USER.GET_FOLLOWS}?${params}`);
    return response.data;
  },

  // 특정 사용자 팔로우 상태 확인
  readFollowStatus: async (targetUserId: number) => {
    // 충분히 큰 size로 팔로잉 목록을 가져와서 검색
    const params = new URLSearchParams();
    params.append('followType', 'FOLLOWINGS');
    params.append('size', '100');

    const response = await axiosInstance.get(`${END_POINTS.USER.GET_FOLLOWS}?${params}`);
    const followings = response.data.content?.item || [];

    // 특정 사용자가 팔로잉 목록에 있는지 확인
    const isFollowing = followings.some((user: { userId: number }) => user.userId === targetUserId);

    return {
      code: 20000,
      message: null,
      content: {
        following: isFollowing,
      },
    };
  },
};
