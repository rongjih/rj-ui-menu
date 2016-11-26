import { baseConfig, umdConfig, babelPlugin } from './rollup.base.js';

const config = Object.assign({}, baseConfig, umdConfig)
config.plugins.push(babelPlugin)

export { config as default }