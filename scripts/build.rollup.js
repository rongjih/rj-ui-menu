const rollup = require('rollup').rollup;
const json = require('rollup-plugin-json');
const html = require('rollup-plugin-html');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
// https://github.com/rollup/rollup-plugin-babel
const babel = require('rollup-plugin-babel');
// https://github.com/TrySound/rollup-plugin-uglify
const uglify = require('rollup-plugin-uglify');

const meta = require('../package.json')
const external = Object.keys(meta.dependencies)
const banner = `/*!
 * ${meta.name} v${meta.version}
 * ${meta.homepage}
 *
 * Copyright (c) 2016 ${meta.author.name} <${meta.author.email}>
 * Released under the ${meta.license} license
 * @license ${meta.homepage}/blob/master/LICENSE
 */`
const moduleName = meta['moduleName']
const globals = { vue: 'Vue' }
const sourceMap = true
const babelPlugin = babel({ exclude: 'node_modules/**' })
const uglifyPlugin = uglify({
  output: {
    // keep rollup banner
    comments: function(node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type == "comment2") {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(text);
      }
    }
  }
})

const config = {
  entry: 'src/menu.js',
  external: external,
  plugins: [
    // https://github.com/rollup/rollup-plugin-json
    json({
      exclude: 'node_modules/**'
    }),
    // https://github.com/bdadam/rollup-plugin-html
    html({
      include: '**/*.html',
      exclude: 'node_modules/**',
      // https://github.com/kangax/html-minifier#options-quick-reference
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: false,
        minifyCSS: true,
        minifyJS: true
      }
    }),
    // https://github.com/rollup/rollup-plugin-node-resolve
    // Locate modules using the Node resolution algorithm (https://nodejs.org/api/modules.html#modules_all_together), 
    // for using third party modules in node_modules
    nodeResolve({ jsnext: true, main: true }),
    // https://github.com/rollup/rollup-plugin-commonjs
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs(),
    // https://github.com/egoist/rollup-plugin-postcss
    postcss({
      extensions: ['.css'],
      plugins: [
        cssnext({ warnForDuplicates: false }),
        cssnano()
      ],
    })
  ]
}

const esConfig = {
  sourceMap: sourceMap,
  format: 'es',
  dest: `dist/${meta.name}.es2015.js`,
  banner
}

const umdConfig = {
  sourceMap: sourceMap,
  format: 'umd',
  dest: `dist/${meta.name}.umd.js`,
  // The name to use for the module for UMD/IIFE bundles
  moduleName: moduleName,
  // used for UMD/IIFE bundles
  globals: globals,
  banner
}

// https://github.com/rollup/rollup/wiki/JavaScript-API
// build es2015
rollup(config).then(bundle => bundle.write(esConfig))

// build umd
.then(() => rollup(addPlugins(config, babelPlugin)))
  .then(bundle => bundle.write(umdConfig))

// min umd build
.then(() => rollup(addPlugins(config, [babelPlugin, uglifyPlugin])))
  .then(bundle => bundle.write(Object.assign({}, umdConfig, {
    dest: `dist/${meta.name}.umd.min.js`
  })))

.catch(error => { console.error(error) })

function addPlugins(config, plugins) {
  return Object.assign({}, config, {
    plugins: config.plugins.concat(plugins)
  })
}