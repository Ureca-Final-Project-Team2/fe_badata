'use client';

import { useIsPostOwner } from '@features/auth/hooks/useIsPostOwner';
import { Drawer, DrawerButton } from '@ui/Drawer';
import { Flag, Pencil, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postUserId: number;
}

export const TradeDetailDrawer = ({ isOpen, onClose, postUserId }: Props) => {
  const isOwner = useIsPostOwner(postUserId);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} variant="default">
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
          <DrawerButton icon={<Flag />} variant="point" onClick={() => alert('신고')}>
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
