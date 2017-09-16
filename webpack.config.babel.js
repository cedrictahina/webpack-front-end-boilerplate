import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'scripts/main.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader" 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.html'
    })
  ]
};