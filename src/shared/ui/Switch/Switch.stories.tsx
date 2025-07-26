import { Switch } from '@/components/ui/switch';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};

export const WithLabels: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch checked={checked} onCheckedChange={setChecked} labels={['판매중', '판매완료']} />
    );
  },
};
