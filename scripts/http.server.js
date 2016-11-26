// https://github.com/koajs/static
var serve = require('koa-static');
var path = require('path');
// https://github.com/alexmingoia/koa-router
var Router = require('koa-router');
var koa = require('koa');
var app = koa();
const hostname = '127.0.0.1';
const port = 3000;

// static files
const rooDir = path.resolve(__dirname, "../");
app.use(serve(rooDir));

// dynamic data
var dataRouter = new Router({
  prefix: '/data'
});
dataRouter.get('/grid.json', function*(next) {
  var date = [1, 2, 3, 4, 5];

  // respone
  this.type = "json";
  this.body = JSON.stringify(date);
});
app.use(dataRouter.routes()).use(dataRouter.allowedMethods());

// start http server
app.listen(port, hostname, () => {
  console.log(`view demo at http://${hostname}:${port}/demo/index.html`);
});

app.on('error', function(err) {
  log.error('server error', err);
});