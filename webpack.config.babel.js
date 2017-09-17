import merge from 'webpack-merge';
import * as common from './config/common';
import * as dev from './config/dev';
import * as prod from './config/prod';

const devConfig = merge([
  common.config,
  common.loadJS(),
  common.loadPUG(),
  dev.server({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  dev.loadCSS()  
]);

const prodConfig = merge([
  common.config,
  common.loadJS(),
  common.loadPUG(),
  prod.extractCSS()  
]);

export default (env) => {
  if (env === 'production') return prodConfig
  return devConfig;
};