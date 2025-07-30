'use client';

import { useRouter } from 'next/navigation';

import { Gift, List, Plus } from 'lucide-react';

import { PATH } from '@/shared/config/path';
import { FloatingActionButton } from '@/shared/ui/FloatingActionButton';

export function TradeFloatingButton() {
  const router = useRouter();

  const fabActions = [
    {
      icon: <Gift />,
      label: '데이터',
      onClick: () => {
        router.push(PATH.TRADE.DATA_REGISTER);
      },
    },
    {
      icon: <List />,
      label: '쿠폰',
      onClick: () => {
        router.push(PATH.TRADE.GIFTICON_REGISTER);
      },
    },
  ];

  const triggerAction = {
    icon: <Plus />,
    label: '글쓰기',
    onClick: () => {},
  };

  return <FloatingActionButton mode="expand" actions={fabActions} triggerAction={triggerAction} />;
}
