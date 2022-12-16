const prettier = require('./prettier.config');

module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['prettier', 'import', 'unused-imports', 'react', 'react-hooks'],
  ignorePatterns: ['dist/*', '.eslintrc.js', 'package.json', 'yarn.lock'],
  rules: {
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    'prettier/prettier': ['warn', prettier],
    'no-return-await': 'error',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-empty-interface': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    curly: 'error',
    'import/extensions': 0,
    'global-require': [0],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-var': 'error',
    radix: 'error',
    semi: 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'default-case': 'warn',
    'no-trailing-spaces': 1,
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-bitwise': 'error',
    'no-multiple-empty-lines': 2,
    'no-debugger': 1,
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-implicit-dependencies': 0,
    'react/sort-comp': [0],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-one-expression-per-line': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-wrap-multilines': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/prop-types': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
  },
};
