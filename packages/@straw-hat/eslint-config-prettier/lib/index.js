module.exports = {
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    curly: ['error', 'all'],
    'lines-around-comment': [
      'error',
      {
        // https://github.com/typescript-eslint/typescript-eslint/issues/1150
        beforeBlockComment: false,
        afterBlockComment: false,
        // https://github.com/typescript-eslint/typescript-eslint/issues/1150
        beforeLineComment: false,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: false,
        allowObjectStart: true,
        allowObjectEnd: false,
        allowArrayStart: true,
        allowArrayEnd: false,
        allowClassStart: true,
        allowClassEnd: false,
      },
    ],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
      },
    ],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-mixed-operators': 'error',
    'no-tabs': 'error',
    'no-unexpected-multiline': 'error',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
};
