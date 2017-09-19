import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import { PATH } from './constants';
import data from '../src/data/db';

export const config = {
  context: PATH.src,
  entry: `${PATH.src}/scripts/main.js`,
  output: {
    path: `${PATH.build}`,
    filename: 'scripts/[name].[hash:8].js'
  },
  devtool: 'source-map',
  plugins: [
    new StylelintPlugin(lintStylesOptions),
  ]  
};

const lintStylesOptions = {
  context: path.resolve(__dirname, `${PATH.src}/styles`),
  syntax: 'scss',
  emitErrors: false
};

export const loadStyles = () => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include: PATH.src,
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

export const loadScripts = ({ lintOptions } = {}) => ({
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

export const loadViews = () => {
  const views = fs.readdirSync(`${PATH.src}/views`)
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

export const loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,

        include: PATH.src,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
});

export const loadImages = ({ isProd } = { isProd: false }) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include: PATH.src,
        use: {
          loader: isProd ? 'file-loader' : 'url-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },
});