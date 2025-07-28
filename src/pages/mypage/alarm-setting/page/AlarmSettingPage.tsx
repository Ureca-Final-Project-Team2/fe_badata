'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/entities/auth/model/authStore';
import { useNotificationSettingQuery, useUpdateNotificationSettingMutation } from '@/pages/mypage/alarm-setting/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function AlarmSettingPage() {
  const router = useRouter();
  const { isLoggedIn, accessToken } = useAuthStore();
  const { data: notificationSetting, isLoading, error } = useNotificationSettingQuery();
  const updateNotificationMutation = useUpdateNotificationSettingMutation();

  const [state, setState] = useState({
    news: true,
    match: true,
    price: true,
    random: false,
  });

  // 로그인 상태 확인
  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      console.log('로그인되지 않음, 로그인 페이지로 리다이렉트');
      router.replace('/auth/kakao/callback');
      return;
    }
  }, [isLoggedIn, accessToken, router]);

  useEffect(() => {
    if (notificationSetting?.content?.isNotificationEnabled !== undefined) {
      setState(prev => ({
        ...prev,
        news: notificationSetting.content.isNotificationEnabled,
      }));
    }
  }, [notificationSetting]);

  const toggleSwitch = (key: keyof typeof state, val: boolean) => {
    if (key === 'news') {
      // BADATA 알림 API 연동
      updateNotificationMutation.mutate({ isEnabled: val });
    }
    setState((prev) => ({ ...prev, [key]: val }));
  };

  // 로그인되지 않은 경우 로딩 표시
  if (!isLoggedIn || !accessToken) {
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center">로그인 확인 중...</div>
        </div>
      </BaseLayout>
    );
  }

  if (isLoading) {
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center">로딩 중...</div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center text-red-500 mb-4">알림 설정을 불러오는데 실패했습니다.</div>
          <div className="text-center text-gray-500 mb-4 text-sm">
            오류: {error.message}
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout header={<PageHeader title="알림 설정" onBack={() => router.back()} />} showBottomNav>
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div>
          <div className="px-4 pt-6 pb-10">
            <h2 className="font-body-semibold mb-6">알림 설정</h2>
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
