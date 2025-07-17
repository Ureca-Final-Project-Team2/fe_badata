import { HTTPError } from '@lib/HTTPError';

import type { ErrorResponse } from '@/shared/lib/axios/responseTypes';
import type { AxiosError } from 'axios';

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    throw new HTTPError(500, undefined, null, '네트워크 오류가 발생했습니다');
  }

  const { data, status } = error.response;
  throw new HTTPError(status, data.code, data.content, data.message);
};
