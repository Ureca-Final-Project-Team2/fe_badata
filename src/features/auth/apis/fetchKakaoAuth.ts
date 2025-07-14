import { axiosInstance } from '@/shared/lib/axios/axiosInstance';
import { User } from '@/features/auth/models/user';

interface KakaoAuthResponse {
  accesstoken: string;
  content: User;
}

export const fetchKakaoAuth = async (code: string): Promise<KakaoAuthResponse> => {
  const response = await axiosInstance.get('/api/v1/auth/token/issue', {
    params: { code, provider: 'kakao' },
  });

  return {
    accesstoken: response.headers['accesstoken'],
    content: response.data.content,
  };
};
