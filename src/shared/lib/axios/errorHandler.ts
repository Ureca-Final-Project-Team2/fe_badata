import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/shared/lib/axios/models';
import { HTTPError } from '@lib/HTTPError';

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    throw new HTTPError(500, undefined, null, '네트워크 오류가 발생했습니다');
  }

  const { data, status } = error.response;
  throw new HTTPError(status, data.code, data.content, data.message);
};
