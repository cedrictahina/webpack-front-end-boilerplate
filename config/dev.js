import {
  PATH
} from './constants';

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
      use: ['style-loader', 'css-loader', 'sass-loader'],
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
