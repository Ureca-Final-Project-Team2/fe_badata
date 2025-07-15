import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionDivider } from '@ui/SectionDivider';

const meta: Meta<typeof SectionDivider> = {
  title: 'Components/SectionDivider',
  component: SectionDivider,
};

export default meta;
type Story = StoryObj<typeof SectionDivider>;

export const Default: Story = {
  args: {
    size: 'default',
    color: 'default',
    thickness: 'medium',
  },
};

export const WithText: Story = {
  args: {
    size: 'full',
    color: 'default',
    thickness: 'medium',
    children: '구분 컴포넌트',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'default',
    thickness: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'default',
    thickness: 'medium',
  },
};

export const FullWidth: Story = {
  args: {
    size: 'full',
    color: 'default',
    thickness: 'medium',
  },
};

export const Thick: Story = {
  args: {
    size: 'default',
    color: 'default',
    thickness: 'thick',
  },
};

export const Thin: Story = {
  args: {
    size: 'default',
    color: 'default',
    thickness: 'thin',
  },
};
