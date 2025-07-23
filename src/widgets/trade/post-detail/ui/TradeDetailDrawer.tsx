'use client';

import { useRouter } from 'next/navigation';

import { Flag, Pencil, Trash2 } from 'lucide-react';

import { useIsPostOwner } from '@/entities/auth/model/useIsPostOwner';
import { PATH } from '@/shared/config/path';
import { Drawer, DrawerButton } from '@/shared/ui/Drawer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postUserId: number;
  postId: number;
}

export const TradeDetailDrawer = ({ isOpen, onClose, postUserId, postId }: Props) => {
  const router = useRouter();
  const isOwner = useIsPostOwner(postUserId);

  const handleReport = () => {
    onClose();
    router.push(PATH.TRADE.REPORT.replace(':id', String(postId)));
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {isOwner ? (
          <div>
            <DrawerButton icon={<Pencil />} onClick={() => alert('게시글 수정')}>
              게시글 수정
            </DrawerButton>
            <DrawerButton icon={<Trash2 />} variant="point" onClick={() => alert('삭제')}>
              삭제
            </DrawerButton>
          </div>
        ) : (
          <DrawerButton icon={<Flag />} variant="point" onClick={handleReport}>
            신고하기
          </DrawerButton>
        )}

        <DrawerButton variant="close" onClick={onClose}>
          닫기
        </DrawerButton>
      </div>
    </Drawer>
  );
};
