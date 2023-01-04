module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx'],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 150 }],
    'import/extensions': ['error', {
      js: 'always',
      jsx: 'always',
      json: 'always',
      scss: 'always',
    }],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      settings: {
        'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
      },
      plugins: ['@typescript-eslint', 'react'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
      ],
      rules: {
        'max-len': ['error', { code: 150 }],
        'import/extensions': ['error', {
          js: 'always',
          jsx: 'always',
          json: 'always',
          scss: 'always',
        }],
      },
    },
  ],
};
