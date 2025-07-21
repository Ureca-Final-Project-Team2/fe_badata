import { useState } from 'react';

import { FilterDrawer, FilterOption } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof FilterDrawer> = {
  title: 'Components/FilterDrawer',
  component: FilterDrawer,
};
export default meta;
type Story = StoryObj<typeof FilterDrawer>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<'인기순' | '최신순'>('인기순');
    return (
      <FilterDrawer isOpen={true} onClose={() => {}}>
        <div style={{ padding: 24 }}>
          <FilterOption selected={selected === '인기순'} onClick={() => setSelected('인기순')}>
            인기순
          </FilterOption>
          <FilterOption selected={selected === '최신순'} onClick={() => setSelected('최신순')}>
            최신순
          </FilterOption>
        </div>
      </FilterDrawer>
    );
  },
};
