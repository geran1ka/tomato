const path = require('path'); // позволяет правильно рассчитывать пути независио от системы
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const target = mode === 'development' ? 'web' : 'browserslist';
const devtool = mode === 'development' ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool, // для записи source-map
  devServer: {
    hot: true, // автоматическое перезагрузка страницы после внесения изменений
  },
  entry: ['@babel/polyfill', './src/index.js'], // точка входа, основной файл js
  output: {
    path: path.resolve(__dirname, 'dist'), // путь до папки dist
    clean: true, // очистка файлов папки dist при сборке
    filename: '[name][contenthash].js', // файл с результатом сборки
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // для указания файла html
    }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
