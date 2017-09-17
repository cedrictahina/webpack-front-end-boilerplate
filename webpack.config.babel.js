import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; 
import webpack from 'webpack';
import path from 'path';

console.log('env' + process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/build/styles'
});
var cssConfig = isProd ? cssProd : cssDev

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
      },
      { 
        test: /\.scss$/,
        exclude: /node_modules/,
        use: cssProd
      },
      { 
        test: /\.pug$/,
        use: [
          {
            loader:'html-loader',
            options: {
              minimize: false
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]                
      }    
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.pug'
    }),
    new ExtractTextPlugin({
      filename: 'styles/main.css',
      disable: !isProd,
      allChunks: true
    })
    // new webpack.NamedModulesPlugin()
  ]
};