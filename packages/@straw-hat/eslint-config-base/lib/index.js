module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:unicorn/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        tsx: 'never',
        ts: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/test/**'],
      },
    ],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['self'] }],
  },
};
