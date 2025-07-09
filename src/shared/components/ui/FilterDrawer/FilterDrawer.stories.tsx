import React, { useState } from 'react';
import { FilterDrawer } from '@ui/FilterDrawer/FilterDrawer';
import { FilterDrawerButton } from '@ui/FilterDrawer/FilterDrawerButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterDrawer> = {
  title: 'Shared/FilterDrawer',
  component: FilterDrawer,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<'high' | 'low' | 'recent'>('recent');

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          필터 Drawer 열기
        </button>

        {open && (
          <FilterDrawer onClose={() => setOpen(false)}>
            <h1 className="font-semibold mb-2 text-xl">정렬</h1>
            <div className="flex flex-col gap-2">
              <FilterDrawerButton
                selected={selected === 'high'}
                onClick={() => setSelected('high')}
              >
                평점 높은순
              </FilterDrawerButton>
              <FilterDrawerButton selected={selected === 'low'} onClick={() => setSelected('low')}>
                평점 낮은순
              </FilterDrawerButton>
              <FilterDrawerButton
                selected={selected === 'recent'}
                onClick={() => setSelected('recent')}
              >
                최신순
              </FilterDrawerButton>
            </div>
          </FilterDrawer>
        )}
      </>
    );
  },
};
