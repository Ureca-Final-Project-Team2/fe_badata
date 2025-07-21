import { useState } from 'react';

import { Drawer } from './Drawer';
import { DrawerButton } from './DrawerButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
        <Drawer isOpen={open} onClose={() => setOpen(false)}>
          <div style={{ padding: 24 }}>
            <DrawerButton variant="default" onClick={() => setOpen(true)}>
              게시물 수정하기
            </DrawerButton>
            <DrawerButton variant="point" onClick={() => setOpen(true)}>
              삭제하기
            </DrawerButton>
            <DrawerButton variant="close" onClick={() => setOpen(true)}>
              닫기
            </DrawerButton>
          </div>
        </Drawer>
      </>
    );
  },
};
