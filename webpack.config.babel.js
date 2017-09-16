import webpack from 'webpack';
import path from 'path';

export default {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, './build/scripts'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader" 
      }
    ]
  }
};