module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/quotes': ['error', 'single'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
} 