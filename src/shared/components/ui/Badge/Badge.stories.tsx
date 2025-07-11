import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'main1',
        'grayMid',
        'main1Solid',
        'main1Hover',
        'main3',
        'grayLight',
        'grayDarkSolid',
      ],
      defaultValue: 'main1Solid',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    color: 'main1Solid',
    size: 'md',
    children: 'Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap items-center">
        <Badge color="main1">예약</Badge>
        <Badge color="grayMid">정렬</Badge>
        <Badge color="main1Solid">정렬</Badge>
        <Badge color="main1Hover">정렬</Badge>
        <Badge color="main3">정렬</Badge>
        <Badge color="grayLight">정렬</Badge>
        <Badge color="grayDarkSolid">정렬</Badge>
      </div>
    </div>
  ),
};
