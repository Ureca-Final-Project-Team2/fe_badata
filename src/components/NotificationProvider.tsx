'use client';

import { useFCM } from '@/shared/hooks/useFCM';
import { InAppNotification } from '@/shared/ui/InAppNotification';

export function NotificationProvider() {
  const { message, clearMessage } = useFCM();

  if (!message || !message.title) return null;

  return (
    <InAppNotification title={message.title} content={message.body || ''} onClose={clearMessage} />
  );
}
