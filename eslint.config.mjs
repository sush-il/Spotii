import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      eqeqeq: ['warn', 'always'],
      'max-len': ['warn', { code: 150, tabWidth: 2, ignoreComments: true }],
      'comma-dangle': ['warn', 'never']
    }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
]);
