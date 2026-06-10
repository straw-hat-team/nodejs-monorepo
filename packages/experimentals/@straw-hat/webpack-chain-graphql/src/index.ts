import type Config from 'webpack-chain';

export function graphql(config: Config) {
  config.module
    .rule('graphql')
    .test(/\.(graphql|gql)$/)
    .use('graphql-tag')
    .loader('graphql-tag/loader')
    .options({
      exclude: /node_modules/,
    });
}
