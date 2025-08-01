'use client';


import { useSosNotificationStore } from '@/widgets/sos/model/sosNotificationStore';
import { SosResponseModal } from '@/widgets/sos/ui/SosResponseModal';

export function SosNotificationHandler() {
  const { currentSosRequest, isResponseModalOpen, closeResponseModal, clearSosRequest } = useSosNotificationStore();
  
  const handleResponseModalClose = () => {
    closeResponseModal();
    clearSosRequest();
  };

  return (
    <>
      {currentSosRequest && (
        <SosResponseModal
          isOpen={isResponseModalOpen}
          onClose={handleResponseModalClose}
          sosId={currentSosRequest.sosId}
          requesterName={currentSosRequest.requesterName}
        />
      )}
    </>
  );
} 