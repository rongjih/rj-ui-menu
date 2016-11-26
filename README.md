# rj-ui-menu

Menu component base on vue.

## Development

```shell
$ npm run dev
```

That will do several things for demo:
- start [demo server](http://127.0.0.1:3000/demo/index.html)
- build file `'dist/rj-ui-menu.umd.js'` 
- watch all file changes in 'src' directory, rebuild automatically
- start [livereload server](http://localhost:35729), then watch all file changes in 'dist' and 'demo' directory, refresh browser automatically

## Release

```shell
$ npm run realease
```

That will do below things:
- clean 'dist' directory
- build files:
  - dist/rj-ui-menu.umd.js
  - dist/rj-ui-menu.umd.js.map
  - dist/rj-ui-menu.umd.min.js
  - dist/rj-ui-menu.umd.min.js.map
  - dist/rj-ui-menu.es2015.js
  - dist/rj-ui-menu.es2015.js.map