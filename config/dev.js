import {
  PATH
} from './constants';
import autoprefixer from 'autoprefixer';
import api from '../src/server/api';

export const server = ({
  host,
  port
}) => ({

  devServer: {
    watchOptions: {
      ignored: /node_modules/,
    },
    host,
    port,
    open: true,
    stats: 'errors-only',
    watchContentBase: true,
    historyApiFallback: true,
    setup(app) {
      api(app);
    }
  }
});


export const loadStyles = () => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include: PATH.src,
      use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
            sourceMap: true
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],
    }],
  },
});

export const lintScriptsOptions = {
  emitWarning: true,
  failOnWarning: false,
  failOnError: false,
  cache: true,
  fix: true
};

export const loadScripts = () => ({
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [
        "babel-loader",
        { 
          loader: "eslint-loader",
          options: lintScriptsOptions
        }
      ],
    }],
  }
});