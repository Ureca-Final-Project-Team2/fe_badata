'use client';

let lastSseMessage = '';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { getDataUsage } from '@/widgets/data-usage/api/apis';

import { useSosRespondMutation } from '../model/queries';
import { useSosStore } from '../model/sosStore';
import { useSseSosListener } from '../model/useSseSosListener';

import { makeCustomToast } from './makeCustomToast';

export const SosNotificationHandler = () => {
  const setSosId = useSosStore((s) => s.setSosId);
  const { mutate: respond } = useSosRespondMutation();
  const currentUser = useAuthStore((s) => s.user);

  // 응답 처리
  const handleDataTransfer = async (sosId: number, isAccepted: boolean) => {
    try {
      const transferAmount = 100;

      if (isAccepted) {
        const dataUsage = await getDataUsage();
        const availableData = dataUsage.content.dataAmount;

        if (availableData < transferAmount) {
          makeCustomToast('❌ 전달할 데이터가 부족합니다.', 'warning');
          return;
        }

        respond(
          { sosId, isAccepted: true, dataAmount: transferAmount },
          {
            onSuccess: () =>
              makeCustomToast(`✅ ${transferAmount}MB 데이터를 전달했어요!`, 'success'),
            onError: () => makeCustomToast('✅ 도움을 주셔서 감사합니다!', 'success'),
          },
        );
      } else {
        respond(
          { sosId, isAccepted: false },
          {
            onSuccess: () => makeCustomToast('⛔ 요청을 거절했어요.', 'warning'),
            onError: () => makeCustomToast('⛔ 요청을 거절했어요.', 'warning'),
          },
        );
      }
    } catch (error) {
      console.error('❌ 응답 처리 중 오류:', error);
      makeCustomToast('❌ 처리 중 오류가 발생했어요.', 'warning');
    }
  };

  // SSE 메시지 처리
  useSseSosListener((rawData: string) => {
    const clean = rawData.replace(/^data:\s*/, '').trim();

    // 중복 메시지 방지
    if (clean === lastSseMessage) {
      console.log('⚠️ 중복 메시지 → 무시됨:', clean);
      return;
    }
    lastSseMessage = clean;

    // 문자열 메시지 예외 처리
    if (!clean.includes('{')) {
      console.log('⚠️ JSON 아님 → 문자열 메시지 분기 진입:', clean);

      const { lastRequestedSosId } = useSosStore.getState();
      const lastUserId = Number(localStorage.getItem('lastSosRequestTime') ?? '0');

      // 현재 유저가 마지막 요청자라면 무시
      if (Date.now() - lastUserId < 3000) {
        console.log('ℹ️ 요청자 본인으로 추정됨 → 문자열 토스트 무시');
        return;
      }

      if (/sos|요청|도움/i.test(clean)) {
        console.log('🚨 SOS 문자열 포함 → 토스트 띄우기 시도');

        const tempSosId = Date.now();
        setSosId(tempSosId);

        makeCustomToast(
          '🚨 누군가 SOS 요청을 보냈어요!\n데이터 제공을 수락하시겠습니까?',
          'warning',
          {
            position: 'top-center',
            duration: 10000,
            actions: [
              {
                label: '수락 (100MB)',
                onClick: () => handleDataTransfer(tempSosId, true),
              },
              {
                label: '거절',
                onClick: () => handleDataTransfer(tempSosId, false),
              },
            ],
          },
        );
      }

      return;
    }

    // JSON 처리
    try {
      const data = JSON.parse(clean);

      switch (data.type) {
        case 'REQUEST':
          if (data.requesterId === currentUser?.userId) {
            console.log('ℹ️ 요청자 본인 → 알림 무시');
            return;
          }

          setSosId(data.sosId);

          makeCustomToast(
            '🚨 SOS 요청이 도착했습니다!\n데이터 제공을 수락하시겠습니까?',
            'warning',
            {
              position: 'top-center',
              duration: 10000,
              actions: [
                {
                  label: '수락 (100MB)',
                  onClick: () => handleDataTransfer(data.sosId, true),
                },
                {
                  label: '거절',
                  onClick: () => handleDataTransfer(data.sosId, false),
                },
              ],
            },
          );
          break;

        case 'RESPOND':
          if (data.isSuccess) {
            const amount = data.transferredData || 100;
            makeCustomToast(
              `🆘 SOS 요청이 수락되었습니다!\n${amount}MB 데이터를 받았어요!`,
              'success',
              { position: 'top-center', duration: 5000 },
            );
          } else {
            makeCustomToast('❌ SOS 요청이 거절되었습니다.', 'warning', {
              position: 'top-center',
              duration: 4000,
            });
          }
          break;

        default:
      }
    } catch (e) {
      console.error('❌ JSON 파싱 실패:', e);
    }
  });

  return null;
};
