import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { HTTPError } from '@/shared/lib/HTTPError';

import type { ErrorCode } from '@/shared/config/errorCodes';
import type { ErrorResponse } from '@/shared/lib/axios/responseTypes';
import type { AxiosError } from 'axios';

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    throw new HTTPError(500, undefined, null, '네트워크 오류가 발생했습니다');
  }

  const { data, status } = error.response;

  const fallbackMessage =
    ErrorMessageMap[data.code as ErrorCode] ?? data.message ?? '알 수 없는 오류가 발생했습니다.';

  throw new HTTPError(status, data.code, data.content, fallbackMessage);
};
