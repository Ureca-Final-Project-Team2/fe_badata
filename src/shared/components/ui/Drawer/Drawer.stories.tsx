import { useState } from 'react';
import { Flag, Pencil, Trash2 } from 'lucide-react';
import { Drawer, DrawerButton } from '@ui/Drawer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  title: 'Shared/Drawer',
  component: Drawer,
};

export default meta;
type Story = StoryObj;

export const DarkMode_OneOption: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>신고 Drawer 열기 (다크모드)</button>
        {open && (
          <Drawer onClose={() => setOpen(false)} variant="dark">
            <div className="overflow-hidden">
              <DrawerButton icon={<Flag />} variant="point" onClick={() => alert('신고')}>
                신고하기
              </DrawerButton>
            </div>
            <DrawerButton variant="close" onClick={() => setOpen(false)} theme="dark">
              닫기
            </DrawerButton>
          </Drawer>
        )}
      </>
    );
  },
};

export const DarkMode_TwoOptions: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>수정/삭제 Drawer 열기 (다크모드)</button>
        {open && (
          <Drawer onClose={() => setOpen(false)} variant="dark">
            <div className="overflow-hidden">
              <DrawerButton icon={<Pencil />} onClick={() => alert('수정')} theme="dark">
                게시글 수정
              </DrawerButton>
              <DrawerButton
                icon={<Trash2 />}
                variant="point"
                onClick={() => alert('삭제')}
                theme="dark"
              >
                삭제
              </DrawerButton>
            </div>
            <DrawerButton variant="close" onClick={() => setOpen(false)} theme="dark">
              닫기
            </DrawerButton>
          </Drawer>
        )}
      </>
    );
  },
};

export const LightMode_OneOption: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>신고 Drawer 열기 (라이트모드)</button>
        {open && (
          <Drawer onClose={() => setOpen(false)} variant="light">
            <div className="overflow-hidden">
              <DrawerButton
                icon={<Flag />}
                variant="point"
                onClick={() => alert('신고')}
                theme="light"
              >
                신고하기
              </DrawerButton>
            </div>
            <DrawerButton variant="close" onClick={() => setOpen(false)} theme="light">
              닫기
            </DrawerButton>
          </Drawer>
        )}
      </>
    );
  },
};

export const LightMode_TwoOptions: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>수정/삭제 Drawer 열기 (라이트모드)</button>
        {open && (
          <Drawer onClose={() => setOpen(false)} variant="light">
            <div className="overflow-hidden">
              <DrawerButton icon={<Pencil />} onClick={() => alert('수정')} theme="light">
                게시글 수정
              </DrawerButton>
              <DrawerButton
                icon={<Trash2 />}
                variant="point"
                onClick={() => alert('삭제')}
                theme="light"
              >
                삭제
              </DrawerButton>
            </div>
            <DrawerButton variant="close" onClick={() => setOpen(false)} theme="light">
              닫기
            </DrawerButton>
          </Drawer>
        )}
      </>
    );
  },
};
