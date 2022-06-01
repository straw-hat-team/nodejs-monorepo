module.exports = {
  extends: ['airbnb', 'airbnb/hooks', '@straw-hat/eslint-config-base'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'react/prop-types': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      },
    },
  ],
  rules: {
    'react/destructuring-assignment': ['error', 'never'],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'ignore',
        explicitSpread: 'ignore',
      },
    ],
    'react/jsx-fragments': ['error', 'syntax'],
  },
};
