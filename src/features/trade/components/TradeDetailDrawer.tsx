'use client';

import { useIsPostOwner } from '@features/auth/hooks/useIsPostOwner';
import { Drawer, DrawerButton } from '@ui/Drawer';
import { Flag, Pencil, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postUserEmail: string;
}

export const TradeDetailDrawer = ({ isOpen, onClose, postUserEmail }: Props) => {
  const isOwner = useIsPostOwner(postUserEmail); // 게시글 작성자 여부 판단: 이메일 기준

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
