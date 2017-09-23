import {
  PATH
} from './constants';
import glob from 'glob';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin  from 'purifycss-webpack';
import { CriticalPlugin } from 'webpack-plugin-critical';
import autoprefixer from 'autoprefixer';

export const config = ({
  output: {
    filename: './scripts/[name].js',
  }
});

export const extractStyles = () => {
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

export const optimizeImages = () => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: 'image-webpack-loader',
          options: {
            progressive: true,
            pngquant: {
              quality: '65-90',
              speed: 4,
            }
          }
        }
      }
    ]
  }
});

export const purifyStyles = () => ({
  plugins: [
    new PurifyCSSPlugin({
      paths: glob.sync(`${PATH.src}/**/*.pug`, { nodir: true }),
      styleExtensions: ['.css', '.scss'],
      minimize: true
    })
  ]
});

export const generateCriticalStyle = () => {
  const views = fs.readdirSync(`${PATH.src}/views`)
  .filter(function (file) {
    return file.substr(-4) === '.pug';
  })
  .map(file => file.replace('.pug', '.html'));
  return {
    plugins: views.map(view => {
      return new CriticalPlugin({
        src: view,
        inline: true,
        minify: true,
        dest: view
      })
    })
  }
};

export const loadScripts = () => ({
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    }],
  }
});