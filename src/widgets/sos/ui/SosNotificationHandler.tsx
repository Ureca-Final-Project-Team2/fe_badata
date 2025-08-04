'use client';

import { useSosStore } from '../model/sosStore';
import { useSseSosListener } from '../model/useSseSosListener';

import { makeCustomToast } from './makeCustomToast';

export const SosNotificationHandler = () => {
  const setSosId = useSosStore((s) => s.setSosId);
  const openRespondModal = useSosStore((s) => s.openRespondModal);
  
  useSseSosListener((rawData: string) => {
    const clean = rawData.replace(/^data:\s*/, '').trim();
    console.log('📡 SSE 수신 원본:', rawData);
    console.log('📡 SSE 수신 clean:', clean);

    // 예외 문자열 필터링
    if (clean === '누군가 SOS를 요청하였습니다.') {
      makeCustomToast('🚨 누군가 SOS 요청했어요!', 'warning');
      return;
    }

    if (clean === 'SSE 연결 성공') {
      console.log('ℹ️ 서버 연결 확인 메시지 무시됨');
      return;
    }
    
    if (!rawData.includes('{')) {
      console.warn('⚠️ JSON 형식 아님:', rawData);
    }

    try {
      const data = JSON.parse(clean);
      if (!data || typeof data !== 'object') return;

      switch (data.type) {
        case 'REQUEST':
          makeCustomToast('🚨 SOS 요청이 도착했습니다!', 'warning', {
            position: 'top-center',
            duration: 4000,
          });
          setSosId(data.sosId);
          openRespondModal();
          break;

        case 'RESPOND':
          makeCustomToast(
            data.isSuccess ? '🆘 SOS 요청이 수락되었습니다!' : '❌ SOS 요청이 거절되었습니다.',
            data.isSuccess ? 'success' : 'warning',
            { position: 'top-center', duration: 4000 },
          );
          break;

        default:
          console.warn('⚠️ 알 수 없는 SOS 이벤트 타입:', data.type);
          break;
      }
    } catch {
      console.error('❌ JSON 파싱 실패:', clean);
    }
  });
  return null; 
}