import {
  PATH
} from './constants';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
        include: PATH.app,
        use: plugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/build/styles'
        })
      }, ],
    },
    plugins: [plugin]
  };
};