import merge from 'webpack-merge';
import * as common from './config/common';
import * as dev from './config/dev';
import * as prod from './config/prod';

const devConfig = merge([
  common.config,
  dev.loadScripts(),
  common.loadViews(),
  common.loadFonts(),
  common.loadImages(),
  dev.server({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  dev.initBrowserSync(),
  dev.loadStyles()  
]);

const prodConfig = merge([
  common.config,
  prod.loadScripts(),
  common.loadViews(),
  common.loadFonts(),
  common.loadImages(),
  prod.optimizeImages(),
  prod.extractStyles(),
  prod.purifyStyles(),
  prod.generateCriticalStyle()
]);

export default (env) => {
  if (env === 'production') return prodConfig
  return devConfig;
};