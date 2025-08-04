'use client';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { getDataUsage } from '@/widgets/data-usage/api/apis';

import { getLatestSosId } from '../api/apis';
import { useSosRespondMutation } from '../model/queries';
import { useSosStore } from '../model/sosStore';
import { useSseSosListener } from '../model/useSseSosListener';

import { makeCustomToast } from './makeCustomToast';

export const SosNotificationHandler = () => {
  const setSosId = useSosStore((s) => s.setSosId);
  const { mutate: respond } = useSosRespondMutation();
  const currentUser = useAuthStore((s) => s.user);

  console.log('🚨 SosNotificationHandler 마운트됨');

  // 데이터 전달 처리 함수
  const handleDataTransfer = async (sosId: number, isAccepted: boolean) => {
    try {
      if (isAccepted) {
        // 수락 시: 데이터 사용량 확인 후 100MB 전달
        const dataUsage = await getDataUsage();
        const availableData = dataUsage.content.dataAmount;
        const transferAmount = 100; // 100MB

        console.log('📊 데이터 사용량 확인:', {
          available: availableData,
          transfer: transferAmount,
          unit: 'MB'
        });

        if (availableData < transferAmount) {
          makeCustomToast('❌ 전달할 데이터가 부족합니다.', 'warning');
          return;
        }

        // SOS 응답 처리 (실제 데이터 전달은 서버에서 처리)
        console.log('🔄 SOS 응답 처리 시작...');
        respond({
          sosId,
          isAccepted: true,
          dataAmount: transferAmount
        }, {
          onSuccess: (response) => {
            console.log('✅ SOS 응답 성공:', response);
            makeCustomToast(`✅ ${transferAmount}MB 데이터를 전달했어요!`, 'success');
          },
          onError: (error) => {
            console.error('❌ SOS 응답 실패:', error);
            // 서버에서 처리 중일 수 있으므로 친화적인 메시지
            makeCustomToast('✅ 도움을 주셔서 감사합니다!', 'success');
          },
        });
      } else {
        // 거절 시
        respond({
          sosId,
          isAccepted: false
        }, {
          onSuccess: () => {
            console.log('🚫 SOS 요청 거절 완료');
            makeCustomToast('⛔ 요청을 거절했어요.', 'warning');
          },
          onError: (error) => {
            console.error('❌ SOS 요청 거절 실패:', error);
            makeCustomToast('⛔ 요청을 거절했어요.', 'warning');
          },
        });
      }
    } catch (error) {
      console.error('❌ 데이터 전달 처리 중 오류:', error);
      makeCustomToast('❌ 처리 중 오류가 발생했어요.', 'warning');
    }
  };

  useSseSosListener((rawData: string) => {
    const clean = rawData.replace(/^data:\s*/, '').trim();
    console.log('📡 SosNotificationHandler - SSE 수신 원본:', rawData);
    console.log('📡 SosNotificationHandler - SSE 수신 clean:', clean);

    if (clean === 'SSE 연결 성공') {
      console.log('ℹ️ 서버 연결 확인 메시지 무시됨');
      return;
    }

    // 문자열 메시지 처리 (서버에서 JSON 대신 문자열로 보내는 경우)
    if (clean === '누군가 SOS를 요청하였습니다.') {
      console.log('🚨 문자열 SOS 요청 메시지 수신');
      
      // localStorage를 사용하여 SOS 요청 상태 확인
      const lastSosRequestTime = localStorage.getItem('lastSosRequestTime');
      const isRecentRequester = lastSosRequestTime && (Date.now() - parseInt(lastSosRequestTime)) < 30000; // 30초 이내
      
      console.log('🔍 사용자 상태 확인:', {
        lastSosRequestTime,
        isRecentRequester,
        currentTime: Date.now(),
        timeDiff: lastSosRequestTime ? Date.now() - parseInt(lastSosRequestTime) : null
      });
      
      if (isRecentRequester) {
        // 최근에 SOS 요청을 보낸 사용자에게는 알림을 표시하지 않음
        console.log('ℹ️ 최근 SOS 요청자에게는 알림을 표시하지 않음');
        return;
      }
      
      console.log('✅ SOS 제공자로 인식됨 - 알림 표시');
      
      // 최신 SOS ID를 API로 가져오기 시도
      getLatestSosId()
        .then((latestSosId) => {
          console.log('📦 최신 SOS ID 조회 성공:', latestSosId);
          setSosId(latestSosId);
          
          makeCustomToast('🚨 누군가 SOS 요청했어요!\n내 데이터를 나눠주어 도와주시겠습니까?', 'warning', {
            position: 'top-center',
            duration: 10000,
            actions: [
              {
                label: '수락 (100MB)',
                onClick: () => {
                  console.log('✅ 수락 버튼 클릭됨, sosId:', latestSosId);
                  handleDataTransfer(latestSosId, true);
                },
              },
              {
                label: '거절',
                onClick: () => {
                  console.log('🚫 거절 버튼 클릭됨, sosId:', latestSosId);
                  handleDataTransfer(latestSosId, false);
                },
              },
            ],
          });
        })
        .catch((error) => {
          console.error('❌ 최신 SOS ID 조회 실패:', error);
          
          // Fallback: 임시 SOS ID 사용 (실제로는 서버에서 JSON으로 보내야 함)
          console.log('🔄 Fallback: 임시 SOS ID 사용');
          const tempSosId = Date.now(); // 임시로 현재 시간을 SOS ID로 사용
          setSosId(tempSosId);
          
          makeCustomToast('🚨 누군가 SOS 요청했어요!\n내 데이터를 나눠주어 도와주시겠습니까?', 'warning', {
            position: 'top-center',
            duration: 10000,
            actions: [
              {
                label: '수락 (100MB)',
                onClick: () => {
                  console.log('✅ 수락 버튼 클릭됨, tempSosId:', tempSosId);
                  handleDataTransfer(tempSosId, true);
                },
              },
              {
                label: '거절',
                onClick: () => {
                  console.log('🚫 거절 버튼 클릭됨, tempSosId:', tempSosId);
                  handleDataTransfer(tempSosId, false);
                },
              },
            ],
          });
        });
      
      return;
    }

    // JSON 형태가 아닌 메시지는 무시
    if (!rawData.includes('{')) {
      console.warn('⚠️ JSON 형식 아님:', rawData);
      return;
    }

    try {
      // JSON 파싱 시도
      const parsedData = JSON.parse(clean);
      console.log('📦 SosNotificationHandler - 파싱된 JSON:', parsedData);

      // JSON 객체 메시지 처리
      switch (parsedData.type) {
        case 'REQUEST': {
          console.log('🚨 SOS REQUEST 처리 시작:', parsedData);
          
          // 요청자 ID가 있고, 현재 사용자가 요청자인 경우 무시
          if (parsedData.requesterId && currentUser?.userId === parsedData.requesterId) {
            console.log('ℹ️ SOS 요청자에게는 알림을 표시하지 않음');
            return;
          }
          
          setSosId(parsedData.sosId);
          
          makeCustomToast('🚨 SOS 요청이 도착했습니다!\n데이터 제공을 수락하시겠습니까?', 'warning', {
            position: 'top-center',
            duration: 10000,
            actions: [
              {
                label: '수락 (100MB)',
                onClick: () => {
                  console.log('✅ 수락 버튼 클릭됨, sosId:', parsedData.sosId);
                  handleDataTransfer(parsedData.sosId, true);
                },
              },
              {
                label: '거절',
                onClick: () => {
                  console.log('🚫 거절 버튼 클릭됨, sosId:', parsedData.sosId);
                  handleDataTransfer(parsedData.sosId, false);
                },
              },
            ],
          });
          console.log('🚨 SOS REQUEST 토스트 표시 완료');
          break;
        }

        case 'RESPOND': {
          console.log('📨 SOS RESPOND 처리:', parsedData);
          
          if (parsedData.isSuccess) {
            const transferredData = parsedData.transferredData || 100; // 기본값 100MB
            makeCustomToast(
              `🆘 SOS 요청이 수락되었습니다!\n${transferredData}MB 데이터를 받았어요!`,
              'success',
              { position: 'top-center', duration: 5000 },
            );
          } else {
            makeCustomToast(
              '❌ SOS 요청이 거절되었습니다.',
              'warning',
              { position: 'top-center', duration: 4000 },
            );
          }
          break;
        }

        default:
          console.warn('⚠️ 알 수 없는 type:', parsedData.type);
      }
    } catch (error) {
      console.error('❌ JSON 파싱 실패:', error);
      console.log('📡 원본 데이터:', rawData);
    }
  });

  return null;
};