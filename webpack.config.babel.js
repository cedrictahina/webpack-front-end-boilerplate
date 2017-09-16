import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; 
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
      },
      { 
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/build/styles'
        })
      },
      { 
        test: /\.pug$/,
        use: [
          {
            loader:'html-loader'
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.pug'
    }),
    new ExtractTextPlugin({
      filename: './styles/main.css'
    })
  ]
};