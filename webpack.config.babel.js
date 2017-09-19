import merge from 'webpack-merge';
import * as common from './config/common';
import * as dev from './config/dev';
import * as prod from './config/prod';

const devConfig = merge([
  common.config,
  common.loadScripts({ lintOptions: dev.lintScriptsOptions}),
  common.loadViews(),
  dev.server({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  dev.loadStyles()  
]);

const prodConfig = merge([
  common.config,
  common.loadScripts({ lintOptions: prod.lintScriptsOptions}),
  common.loadViews(),
  prod.extractCSS()  
]);

export default (env) => {
  if (env === 'production') return prodConfig
  return devConfig;
};