import { makeToast } from '@/shared/lib/makeToast';

import { useSseSosListener } from '../model/useSseSosListener';

export const SosNotificationHandler = () => {
  useSseSosListener((data) => {
    if (data.type === 'REQUEST') {
      makeToast('🚨 새로운 SOS 요청이 도착했습니다!', 'warning');
    } else if (data.type === 'RESPOND' && data.isSuccess) {
      makeToast('🆘 요청에 응답했습니다!', 'success');
    }
  });

  return null;
};
