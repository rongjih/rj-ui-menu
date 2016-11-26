// ref https://github.com/rollup/rollup-starter-project
import json from 'rollup-plugin-json';
import html from 'rollup-plugin-html';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
// https://github.com/rollup/rollup-plugin-babel
const babel = require('rollup-plugin-babel');
// https://github.com/TrySound/rollup-plugin-uglify
const uglify = require('rollup-plugin-uglify');

const meta = require('../package.json');
const external = Object.keys(meta.dependencies)
const banner = `/*!
 * ${meta.name} v${meta.version}
 * ${meta.homepage}
 *
 * Copyright (c) 2016 ${meta.author.name} <${meta.author.email}>
 * Released under the ${meta.license} license
 * @license ${meta.homepage}/blob/master/LICENSE
 */`
const globals = { vue: 'Vue' }
const sourceMap = true
const moduleName = meta['umdName']

export const name = meta['name']
export const babelPlugin = babel({ exclude: 'node_modules/**' })
export const uglifyPlugin = uglify({
  output: {
    // keep rollup banner
    // https://github.com/TrySound/rollup-plugin-uglify/issues/7#issuecomment-221088635
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
export const baseConfig = {
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

export const esConfig = {
  sourceMap: sourceMap,
  format: 'es',
  dest: `dist/${meta.name}.es2015.js`,
  banner
}

export const umdConfig = {
  sourceMap: sourceMap,
  format: 'umd',
  dest: `dist/${meta.name}.umd.js`,
  // The name to use for the module for UMD/IIFE bundles
  moduleName: moduleName,
  // used for UMD/IIFE bundles
  globals: globals,
  banner
}