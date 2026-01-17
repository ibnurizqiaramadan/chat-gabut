import { defineConfig, globalIgnores } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'

export default defineConfig([
  js.configs.recommended,
  globalIgnores([
    '.now/*',
    '**/*.css',
    '**/.changeset',
    '**/dist',
    'esm/*',
    'public/*',
    'tests/*',
    'scripts/*',
    '**/*.config.js',
    '**/.DS_Store',
    '**/node_modules',
    '**/coverage',
    '**/.next',
    '**/build',
    '**/out',
    'next-env.d.ts',
    '!**/.commitlintrc.cjs',
    '!**/.lintstagedrc.cjs',
    '!**/jest.config.js',
    '!**/plopfile.js',
    '!**/react-shim.js',
    '!**/tsup.config.ts',
  ]),
  {
    plugins: {
      '@next/next': nextPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      // Basic rules
      'no-console': 'warn',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-unused-vars': 'warn',

      // Formatting rules
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-debugger': ['error'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': ['error'],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'block-spacing': ['error', 'always'],
      camelcase: 'off',
      'eol-last': ['error', 'always'],
      'max-len': ['error', { code: 255, ignoreUrls: true, ignoreStrings: true }],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-tabs': ['error'],
      'no-trailing-spaces': ['error'],
      'object-curly-newline': ['error', { consistent: true }],
      'one-var': ['error', 'never'],
      'padded-blocks': ['error', 'never'],
      'quote-props': ['error', 'as-needed'],
    },
  },
])