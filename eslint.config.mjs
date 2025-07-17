import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import fsdImport from 'eslint-plugin-fsd-import';
import perfectionist from 'eslint-plugin-perfectionist';
import storybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      perfectionist,
      'fsd-import': fsdImport,
      '@typescript-eslint': tseslint,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'react',
            'next',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          customGroups: [
            {
              groupName: 'react',
              elementNamePattern: '^react$',
            },
            {
              groupName: 'next',
              elementNamePattern: '^next',
            },
          ],
          newlinesBetween: 1,
          internalPattern: ['^@/'],
        },
      ],
      // FSD 아키텍처 위배시 에러
      'fsd-import/fsd-relative-path': 'error',
      'fsd-import/public-api-imports': 'error',
      'fsd-import/layer-imports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
];

export default eslintConfig;
