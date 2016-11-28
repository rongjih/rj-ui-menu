import { createFilter } from 'rollup-pluginutils'
import stylus from 'stylus'

export default function rjStylus(options = {}) {
  if (!options.include) options.include = '**/*.styl'
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'rollup-plugin-rj-stylus',
    options: function(options) {
      // avoid sourceMap warning
      options.sourceMap = false;
    },
    transform: function(code, id) {
      if (!filter(id)) return null;
      // compile stylus to css: https://github.com/stylus/stylus/blob/master/docs/js.md
      return new Promise(function(resolve, reject) {
        const compiler = stylus(code)
        if (options.fn) compiler.use(options.fn)
        compiler.render(function(err, css) {
          if (err) reject(err)
          else resolve({
            code: css,
            map: { mappings: '' }
          })
        })
      })
    }
  }
}