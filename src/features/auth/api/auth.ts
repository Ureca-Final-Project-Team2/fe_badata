import { axiosInstance } from '@/shared/lib/axios/axiosInstance';
import { END_POINTS } from '@constants/api';
import { User } from '@features/auth/lib/user';

interface KakaoAuthResponse {
  accesstoken: string;
  content: User;
}

export const fetchKakaoAuth = async (code: string): Promise<KakaoAuthResponse> => {
  const response = await axiosInstance.get(END_POINTS.USER.LOGIN, {
    params: { code, provider: 'kakao' },
  });

  return {
    accesstoken: response.headers['accesstoken'],
    content: response.data.content,
  };
};
