import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CoinToggle } from './CoinToggle';

const meta: Meta<typeof CoinToggle> = {
  title: 'UI/CoinToggle',
  component: CoinToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '토글의 활성화 상태',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: '토글 상태가 변경될 때 호출되는 콜백',
    },
    disabled: {
      control: 'boolean',
      description: '토글의 비활성화 상태',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '토글을 클릭하여 상태를 변경할 수 있습니다.',
      },
    },
  },
};
