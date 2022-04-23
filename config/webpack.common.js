// shared config (dev and prod)
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    alias: {
      dist: resolve(__dirname, '../', 'dist'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
    },
  },
  context: resolve(__dirname, '../'),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|woff)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './dist/index.html' }),
    new ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: 'warning',
  },
}
