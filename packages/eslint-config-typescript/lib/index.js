module.exports = {
  extends: ['@straw-hat/eslint-config-base', 'plugin:import/typescript', 'eslint-plugin-tsdoc'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
      },
      rules: {
        // Fixes definition files imports
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'no-unused-vars': 'off',
        'tsdoc/syntax': 'warn',
      },
    },
  ],
};
