// ref https://github.com/rollup/rollup-starter-project
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-html';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

let meta = require('../package.json');
const moduleName = meta['moduleName']
export default {
  entry: 'src/menu.js',
  format: 'umd',
  dest: meta['main'],
  external: Object.keys(meta.dependencies),
  // used for UMD/IIFE bundles
  globals: { vue: "Vue" },
  // The name to use for the module for UMD/IIFE bundles
  moduleName: moduleName,
  sourceMap: true,
  onwarn: true,
  // https://github.com/rollup/rollup/wiki/Plugins
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
    }),
    // https://github.com/rollup/rollup-plugin-babel
    babel({ exclude: 'node_modules/**' })
  ]
};