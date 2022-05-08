const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // Key: './src/Key.js',
    // Keyboard: './src/Keyboard.js',
    // KeyElement: './src/KeyElement.js',
    // data: './src/data/keyboard-content.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Virtual Keyboard',
      favicon: './assets/favicon.gif',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader',
          'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
