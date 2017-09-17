import {
  PATH
} from './constants';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';
import webpack from 'webpack';

export const config = {
  context: PATH.app,
  entry: `${PATH.app}/scripts/main.js`,
  output: {
    path: `${PATH.build}`,
    filename: 'scripts/[name].[hash:8].js'
  }
};

export const loadCSS = () => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include: PATH.app,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }],
  },
});

export const loadJS = () => ({
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader"
    }],
  },
});

export const loadPUG = () => {
  const views = fs.readdirSync(`${PATH.app}/views`)
    .filter(function (file) {
      return file.substr(-4) === '.pug';
    })
    .map(file => file.replace('.pug', ''));
  return {
    module: {
      rules: [{
        test: /\.pug$/,
        use: [{
            loader: 'html-loader',
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
      }]
    },
    plugins: views.map(view => {
      return new HtmlWebpackPlugin({
        filename: `${view}.html`,
        template: `views/${view}.pug`
      })
    })
  }
};