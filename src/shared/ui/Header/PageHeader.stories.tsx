import { PageHeader } from './PageHeader';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        width: '375px',
        height: '812px',
        margin: '0 auto',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
      <PageHeader title="텍스트" onBack={() => alert('뒤로가기')} />
      <main style={{ flex: 1 }} />
    </div>
  ),
};
