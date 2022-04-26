// production config
const { merge } = require('webpack-merge')
const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './front-end/index.tsx',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../', 'build'),
    publicPath: '/',
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new GenerateSW({
      exclude: ['.htaccess'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'dist/.htaccess',
        },
        {
          from: 'dist/robots.txt',
        },
        {
          from: 'dist/manifest.json',
        },
        {
          from: 'dist/img',
          to: 'img',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
})
