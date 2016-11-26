// to enable ECMAScript 2015 modules in any version of Node.js
// `npm install --save reify`
// https://github.com/benjamn/reify
require("reify");

const rollup = require('rollup').rollup;

const base = require('./rollup.base.js');
const name = base.name
const baseConfig = base.baseConfig
const esConfig = base.esConfig
const umdConfig = base.umdConfig
const babelPlugin = base.babelPlugin
const uglifyPlugin = base.uglifyPlugin

// https://github.com/rollup/rollup/wiki/JavaScript-API
// build es2015
rollup(baseConfig).then(bundle => bundle.write(esConfig))

// build umd
.then(() => rollup(addPlugins(baseConfig, babelPlugin)))
  .then(bundle => bundle.write(umdConfig))

// min umd build
.then(() => rollup(addPlugins(baseConfig, [babelPlugin, uglifyPlugin])))
  .then(bundle => bundle.write(Object.assign({}, umdConfig, {
    dest: `dist/${name}.umd.min.js`
  })))

.catch(error => { console.error(error) })

function addPlugins(config, plugins) {
  return Object.assign({}, config, {
    plugins: config.plugins.concat(plugins)
  })
}