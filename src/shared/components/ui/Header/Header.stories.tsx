//src/components/ui/Header/Header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

const MockLoginButton = () => (
  <button
    style={{
      height: '35px',
      width: '70px',
      padding: '12px 16px',
      borderRadius: '6px',
      backgroundColor: '#fff',
      fontSize: '11px',
      fontWeight: 800,
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
      border: 'none',
    }}
  >
    로그인
  </button>
);

const MockHeader = () => (
  <header
    style={{
      width: '100%',
      height: '70px',
      padding: '0 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}
  >
    <div
      style={{
        width: '120px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src="/BADATA.svg"
        alt="BADATA 로고"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
    <MockLoginButton />
  </header>
);

const meta: Meta<typeof MockHeader> = {
  title: 'Components/Header',
  component: MockHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MockHeader>;

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
      <MockHeader />
      <main style={{ flex: 1 }} />
    </div>
  ),
};
