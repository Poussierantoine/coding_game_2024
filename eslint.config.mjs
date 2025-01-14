import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {rules: {
    'indent': ['error', 2],
    'semi': [
      'error',
      'always'
    ],
    'no-use-before-define': 'off',
    'import/extensions': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    quotes: ['error', 'single']
  }},
];