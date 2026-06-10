/* eslint-disable global-require */

module.exports = function createPreset(api) {
  api.assertVersion(7);

  const presets = [
    [
      require('@babel/preset-env').default,
      {
        loose: true,
        // TODO: Uncomment `modules` config once Node ESM is in LTS
        // modules: false,
        targets: {
          node: 'current',
        },
      },
    ],
  ];

  const plugins = [
    require('@babel/plugin-proposal-optional-chaining').default,
    require('@babel/plugin-proposal-nullish-coalescing-operator').default,
    require('@babel/plugin-proposal-numeric-separator').default,
    require('@babel/plugin-syntax-dynamic-import').default,
    [
      require('@babel/plugin-proposal-class-properties').default,
      {
        loose: true,
      },
    ],
    api.env('test') && require('babel-plugin-dynamic-import-node').default,
  ].filter(Boolean);

  const overrides = [
    {
      test: /\.tsx?$/,
      presets: [
        [require('@babel/preset-typescript').default, { isTSX: true, jsxPragma: 'React', allExtensions: true }],
      ],
      plugins: [[require('@babel/plugin-proposal-decorators').default, { legacy: true }]],
    },
  ];

  return {
    presets,
    plugins,
    overrides,
    comments: false,
  };
};
