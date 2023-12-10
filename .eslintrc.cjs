module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'import/no-unresolved': 0,
    'no-use-before-define': ['error', { functions: false }],
    'import/extensions': ['error', 'never'],
    'no-shadow': 'off',
    'import/prefer-default-export': 0,
    'global-require': 0,
    'no-console': 'off',
    'no-else-return': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-var': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
