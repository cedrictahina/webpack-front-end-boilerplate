import {
  PATH
} from './constants';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

export const config = ({
  output: {
    filename: './scripts/[name].js',
  }
});

export const extractCSS = () => {
  const plugin = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash:8].css',
    allChunks: true
  });
  return {
    module: {
      rules: [{
        test: /\.scss$/,
        include: PATH.src,
        use: plugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
          publicPath: '/build/styles'
        })
      }, ],
    },
    plugins: [plugin]
  };
};

export const lintScriptsOptions = {
  emitWarning: true,
  failOnWarning: false,
  failOnError: true,
  cache: true,
  fix: true
};