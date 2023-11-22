const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/index.ts',
  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'public', 'dist'), // Путь для выходного файла сборки
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './main.html',
      publicPath: '/public/dist'
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, './public'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },
  mode: 'development'
  
};