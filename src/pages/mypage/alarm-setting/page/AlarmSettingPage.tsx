'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/entities/auth/model/authStore';
import { testApiConnection } from '@/pages/mypage/alarm-setting/api/apis';
import { NOTIFICATION_SETTINGS_DEFAULT } from '@/pages/mypage/alarm-setting/lib/constants';
import { useNotificationSettingQuery, useUpdateNotificationSettingMutation } from '@/pages/mypage/alarm-setting/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';


export default function AlarmSettingPage() {
  const router = useRouter();
  const { isLoggedIn, accessToken } = useAuthStore();
  const { data: notificationSetting, isLoading, error } = useNotificationSettingQuery();
  const updateNotificationMutation = useUpdateNotificationSettingMutation();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const [state, setState] = useState(NOTIFICATION_SETTINGS_DEFAULT);

  console.log('🔍 AlarmSettingPage 렌더링:', {
    isLoggedIn,
    hasAccessToken: !!accessToken,
    accessTokenLength: accessToken?.length,
    accessTokenStart: accessToken?.substring(0, 20) + '...',
    accessTokenEnd: accessToken?.substring((accessToken?.length || 0) - 20),
    isAuthInitialized,
    isLoading,
    hasError: !!error,
    errorMessage: error?.message,
    notificationSetting,
    state
  });

  // API 연결 테스트 함수
  const handleApiTest = async () => {
    console.log('🧪 API 연결 테스트 시작');
    try {
      const result = await testApiConnection();
      setTestResult(JSON.stringify(result, null, 2));
      console.log('✅ API 연결 테스트 결과:', result);
    } catch (error) {
      console.error('❌ API 연결 테스트 실패:', error);
      setTestResult(`테스트 실패: ${error}`);
    }
  };

  // 로그인 상태 초기화 확인
  useEffect(() => {
    // localStorage에서 토큰 확인
    const storedToken = localStorage.getItem('accessToken');
    const isAuthenticated = isLoggedIn && accessToken;
    const hasStoredToken = !!storedToken;
    
    console.log('🔐 인증 상태 확인:', {
      isLoggedIn,
      hasAccessToken: !!accessToken,
      accessTokenLength: accessToken?.length,
      accessTokenStart: accessToken?.substring(0, 20) + '...',
      hasStoredToken,
      storedTokenLength: storedToken?.length,
      isAuthenticated
    });
    
    // 인증 상태가 초기화되었는지 확인
    if (isAuthenticated || (!isLoggedIn && !hasStoredToken)) {
      console.log('✅ 인증 상태 초기화 완료');
      setIsAuthInitialized(true);
    }
  }, [isLoggedIn, accessToken]);

  // 로그인 상태 확인 (초기화 후에만)
  useEffect(() => {
    if (isAuthInitialized && (!isLoggedIn || !accessToken)) {
      console.log('❌ 로그인되지 않음, 로그인 페이지로 리다이렉트');
      router.replace('/auth/kakao/callback');
      return;
    }
  }, [isAuthInitialized, isLoggedIn, accessToken, router]);

  useEffect(() => {
    if (notificationSetting?.isNotificationEnabled !== undefined) {
      console.log('📱 서버에서 받은 알림 설정:', notificationSetting.isNotificationEnabled);
      setState(prev => ({
        ...prev,
        news: notificationSetting.isNotificationEnabled,
      }));
    }
  }, [notificationSetting]);

  const toggleSwitch = (key: keyof typeof state, val: boolean) => {
    console.log('🔄 스위치 토글:', { key, val });
    
    if (key === 'news') {
      // BADATA 알림 API 연동
      console.log('📡 BADATA 알림 API 호출:', { isEnabled: val });
      updateNotificationMutation.mutate({ isEnabled: val });
    }
    setState((prev) => ({ ...prev, [key]: val }));
  };

  // 인증 상태가 초기화되지 않은 경우 로딩 표시
  if (!isAuthInitialized) {
    console.log('⏳ 인증 상태 초기화 대기 중...');
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center">로그인 확인 중...</div>
        </div>
      </BaseLayout>
    );
  }

  // 로그인되지 않은 경우 로딩 표시
  if (!isLoggedIn || !accessToken) {
    console.log('⏳ 로그인 상태 확인 중...');
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center">로그인 확인 중...</div>
        </div>
      </BaseLayout>
    );
  }

  if (isLoading) {
    console.log('⏳ 알림 설정 로딩 중...');
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center">로딩 중...</div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    console.error('❌ 알림 설정 로드 실패:', error);
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center text-red-500 mb-4">알림 설정을 불러오는데 실패했습니다.</div>
          <div className="text-center text-gray-500 mb-4 text-sm">
            오류: {error.message}
          </div>
          
          {/* 에러 발생 시에도 개발자 도구 표시 */}
          <div className="w-full max-w-[400px] p-4 bg-gray-100 rounded-lg mt-4">
            <h3 className="font-label-semibold mb-2">🔧 개발자 도구</h3>
            <div className="flex gap-2 mb-2">
              <button
                onClick={handleApiTest}
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
              >
                API 연결 테스트
              </button>
              <button
                onClick={() => {
                  const token = localStorage.getItem('accessToken');
                  if (token) {
                    try {
                      const parts = token.split('.');
                      if (parts.length === 3) {
                        const payload = JSON.parse(atob(parts[1]));
                        const currentTime = Math.floor(Date.now() / 1000);
                        const isExpired = payload.exp < currentTime;
                        
                        console.log('🔐 토큰 상세 분석:', {
                          tokenLength: token.length,
                          payload,
                          currentTime: new Date().toISOString(),
                          tokenExpTime: new Date(payload.exp * 1000).toISOString(),
                          isExpired,
                          timeRemaining: payload.exp - currentTime
                        });
                        
                        setTestResult(JSON.stringify({
                          tokenLength: token.length,
                          payload,
                          currentTime: new Date().toISOString(),
                          tokenExpTime: new Date(payload.exp * 1000).toISOString(),
                          isExpired,
                          timeRemaining: payload.exp - currentTime
                        }, null, 2));
                      }
                    } catch (error) {
                      console.error('토큰 파싱 실패:', error);
                      setTestResult(`토큰 파싱 실패: ${error}`);
                    }
                  } else {
                    console.log('토큰이 없습니다');
                    setTestResult('토큰이 없습니다');
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded text-sm"
              >
                토큰 상태 확인
              </button>
            </div>
            {testResult && (
              <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
                {testResult}
              </pre>
            )}
          </div>
        </div>
      </BaseLayout>
    );
  }

  console.log('✅ 알림 설정 페이지 렌더링 완료:', { state, notificationSetting });

  return (
    <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div>
          <div className="px-4 pt-6 pb-10">
            <h2 className="font-body-semibold mb-6">알림 설정</h2>
            
            {/* 개발자 도구 - 항상 표시 */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-label-semibold mb-2">🔧 개발자 도구</h3>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleApiTest}
                  className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
                >
                  API 연결 테스트
                </button>
                <button
                  onClick={() => {
                    const token = localStorage.getItem('accessToken');
                    if (token) {
                      try {
                        const parts = token.split('.');
                        if (parts.length === 3) {
                          const payload = JSON.parse(atob(parts[1]));
                          const currentTime = Math.floor(Date.now() / 1000);
                          const isExpired = payload.exp < currentTime;
                          
                          console.log('🔐 토큰 상세 분석:', {
                            tokenLength: token.length,
                            payload,
                            currentTime: new Date().toISOString(),
                            tokenExpTime: new Date(payload.exp * 1000).toISOString(),
                            isExpired,
                            timeRemaining: payload.exp - currentTime
                          });
                          
                          setTestResult(JSON.stringify({
                            tokenLength: token.length,
                            payload,
                            currentTime: new Date().toISOString(),
                            tokenExpTime: new Date(payload.exp * 1000).toISOString(),
                            isExpired,
                            timeRemaining: payload.exp - currentTime
                          }, null, 2));
                        }
                      } catch (error) {
                        console.error('토큰 파싱 실패:', error);
                        setTestResult(`토큰 파싱 실패: ${error}`);
                      }
                    } else {
                      console.log('토큰이 없습니다');
                      setTestResult('토큰이 없습니다');
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded text-sm"
                >
                  토큰 상태 확인
                </button>
              </div>
              {testResult && (
                <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
                  {testResult}
                </pre>
              )}
            </div>
            
            <ul className="flex flex-col gap-5">
              <AlarmItem
                title="BADATA에서 보내는 소식"
                desc="데이터 SOS 요청, 업데이트 등 알림"
                checked={state.news}
                onChange={(val) => toggleSwitch('news', val)}
                disabled={updateNotificationMutation.isPending}
              />
              <AlarmItem
                title="맞춤 데이터 거래 글"
                desc="사용자 맞춤 글 추천"
                checked={state.match}
                onChange={(val) => toggleSwitch('match', val)}
              />
              <AlarmItem
                title="관심 게시글 가격 하락 알림"
                desc="관심 게시물의 새 글 등 알림"
                checked={state.price}
                onChange={(val) => toggleSwitch('price', val)}
              />
              <AlarmItem
                title="마감 임박 게시글"
                desc="마감 임박인 게시물 추천"
                checked={state.random}
                onChange={(val) => toggleSwitch('random', val)}
              />
            </ul>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

interface AlarmItemProps {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

function AlarmItem({ title, desc, checked, onChange, disabled }: AlarmItemProps) {
  return (
    <li className="flex justify-between items-start">
      <div className="pr-4">
        <p className="font-label-semibold">{title}</p>
        <p className="font-small-regular text-[#9b9b9b] leading-[16px]">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
    </li>
  );
}
