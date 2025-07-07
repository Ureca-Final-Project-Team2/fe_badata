import type { Preview } from '@storybook/nextjs';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo', // 접근성 경고는 UI에만 표시
    },
  },
};

export default preview;
