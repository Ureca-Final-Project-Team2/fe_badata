'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Switch } from '@/components/ui/switch';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function AlarmSettingPage() {
  const router = useRouter();
  const [state, setState] = useState({
    news: true,
    match: true,
    price: true,
    random: false,
  });

  const toggleSwitch = (key: keyof typeof state, val: boolean) => {
    setState((prev) => ({ ...prev, [key]: val }));
  };

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
}

function AlarmItem({ title, desc, checked, onChange }: AlarmItemProps) {
  return (
    <li className="flex justify-between items-start">
      <div className="pr-4">
        <p className="font-label-semibold">{title}</p>
        <p className="font-small-regular text-[#9b9b9b] leading-[16px]">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </li>
  );
}
