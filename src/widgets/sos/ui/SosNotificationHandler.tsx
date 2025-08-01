import { makeToast } from '@/shared/lib/makeToast';

import { useSosStore } from '../model/sosStore';
import { useSseSosListener } from '../model/useSseSosListener';

export const SosNotificationHandler = () => {
  const openRespondModal = useSosStore((s) => s.openRespondModal);

  useSseSosListener((rawData: string) => {
    console.log('📡 SSE 수신 문자열:', rawData);

    // 문자열 기반 조건 처리
    if (rawData.includes('SOS')) {
      makeToast('🚨 SOS 요청이 도착했습니다!', 'warning');
      openRespondModal();
    }
  });

  return null;
};
