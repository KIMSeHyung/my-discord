import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsEslintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

// FlatCompat를 생성합니다. (baseDirectory는 config 파일의 위치)
const compat = new FlatCompat({
  baseDirectory: new URL('.', import.meta.url).pathname,
});

export default [
  {
    ignores: [
      '**/eslint.config.js',
      '**/eslint.config.mjs',
      'dist/**',
      'node_modules/**',
    ],
  },
  // ESLint 기본 권장 설정 (flat config 형식)
  js.configs.recommended,
  // 공유 설정(extends로 작성된)을 FlatCompat을 통해 포함합니다.
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:prettier/recommended'),
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        sourceType: 'module',
      },
    },
    plugins: {
      // '@typescript-eslint' 플러그인은 위의 추천 설정에 포함됨
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'warn',
    },
  },
  // eslint-config-prettier는 독립된 flat config 객체이므로 그대로 포함할 수 있습니다.
  eslintConfigPrettier,
];
