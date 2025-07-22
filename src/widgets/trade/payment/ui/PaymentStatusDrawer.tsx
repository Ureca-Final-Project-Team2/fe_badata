import Image from 'next/image';

import Lottie from 'lottie-react';
import confettiAnimation from 'public/assets/CongratsAnimation.json';

import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface PaymentStatusDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function PaymentStatusDrawer({ open, onClose }: PaymentStatusDrawerProps) {
  return (
    <Drawer isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-18">
          <Lottie animationData={confettiAnimation} loop={false} />
        </div>
        <Image
          src="/assets/logo-badata.png"
          alt="캐릭터"
          width={200}
          height={200}
          className="mb-4"
        />
        <h2 className="text-[var(--main-5)] text-2xl font-bold mb-2">결제 성공!</h2>
        <p className="text-[var(--gray-mid)] mb-6">주문이 정상적으로 접수되었습니다.</p>
        <button
          className="w-full py-3 rounded-xl bg-[var(--main-5)] text-white font-bold text-lg mb-6"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </Drawer>
  );
}
