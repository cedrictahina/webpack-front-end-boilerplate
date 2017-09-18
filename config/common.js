import {
  PATH
} from './constants';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';
import webpack from 'webpack';
import data from '../src/data/db';

export const config = {
  context: PATH.app,
  entry: `${PATH.app}/scripts/main.js`,
  output: {
    path: `${PATH.build}`,
    filename: 'scripts/[name].[hash:8].js'
  },
  devtool: 'source-map'
  
};

export const loadCSS = () => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include: PATH.app,
      use: ['style-loader',
      { 
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }],
  },
});

export const loadJS = ({ lintOptions } = {}) => ({
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [
        "babel-loader",
        { 
          loader: "eslint-loader",
          options: lintOptions
        }
      ],
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
              pretty: true,
              data: { db : data }
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