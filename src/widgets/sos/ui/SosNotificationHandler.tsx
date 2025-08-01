import { makeToast } from '@/shared/lib/makeToast';

import { useSosStore } from '../model/sosStore';
import { useSseSosListener } from '../model/useSseSosListener';

export const SosNotificationHandler = () => {
  const setSosId = useSosStore((s) => s.setSosId);
  const openRespondModal = useSosStore((s) => s.openRespondModal);

  useSseSosListener((data) => {
    if (data.type === 'REQUEST') {
      makeToast('🚨 SOS 요청이 도착했습니다!', 'warning');
      setSosId(data.sosId);
      openRespondModal();
    }
    if (data.type === 'RESPOND' && data.isSuccess) {
      makeToast('🆘 요청에 응답했습니다!', 'success');
    }
  });

  return null;
};
