import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from '@shared/lib/axiosInstance';
import { HTTPError } from '@shared/lib/HTTPError';
import { ApiResponse } from '@shared/types/api';
import { SUCCESS_CODE } from '@shared/constants/api';
import { ErrorMessageMap } from '@shared/constants/errorCodes';

interface ErrorResponse {
  status: number;
  code?: number;
  message?: string;
  content?: null;
}

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    throw new HTTPError(500, undefined, null, '네트워크 오류가 발생했습니다');
  }

  const { data, status } = error.response;
  throw new HTTPError(status, data.code, data.content, data.message);
};

axiosInstance.interceptors.response.use(<T>(response: AxiosResponse<ApiResponse<T>>): T => {
  const { code, message, content } = response.data;

  if (code !== SUCCESS_CODE) {
    const fallbackMessage =
      ErrorMessageMap[code as keyof typeof ErrorMessageMap] ??
      message ??
      '알 수 없는 오류가 발생했습니다.';
    throw new HTTPError(response.status, code, null, fallbackMessage);
  }

  return content as T;
}, handleAPIError);
