import {
  PATH
} from './constants';
import autoprefixer from 'autoprefixer';


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
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    watchContentBase: true

  }
});

export const loadCSS = () => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include: PATH.app,
      use: [
        {
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


export const loadJS = () => ({
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader"
    }],
  },
});