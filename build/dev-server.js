const path = require('path');
const express = require('express');
const { Environment, FileSystemLoader } = require('nunjucks');
const serveStatic = require('serve-static');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devConfig = require('./webpack.dev.conf');
const config = require('../config');

const app = express();

/**
 * Setup Nunjucks Template engine
 */

const layoutsLoader = new FileSystemLoader('assets/layouts', { watch: true });
const pagesLoader = new FileSystemLoader('assets/pages', { watch: true });

const env = new Environment([pagesLoader, layoutsLoader]);

function TemplateEngine(name, options) {
  this.name = name;
  this.path = name;
  this.defaultEngine = options.defaultEngine;
  this.ext = path.extname(name);
  if (!this.ext) {
    this.ext = (this.defaultEngine[0] !== '.' ? '.' : '') + this.defaultEngine;
    this.name += this.ext;
  }
}

TemplateEngine.prototype.render = function render(opts, cb) {
  env.render(this.name, opts, cb);
};

app.set('views', './assets/pages');
app.set('view', TemplateEngine);
app.set('nunjecksEnv', env);

/**
 * Setup Static Endpoint
 */
app.use('/images', serveStatic('assets/images'));
app.use('/data', serveStatic('assets/data'));
app.use(serveStatic('static'));

/**
 * Setup Webpack Middlewares
 */

const compiler = webpack(devConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  quiet: true,
});
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {},
});

app.use(devMiddleware);
app.use(hotMiddleware);

devMiddleware.waitUntilValid(() => console.log('Server is Ready'));

app.get('*', (req, res) => {
  let url = req.path;
  if (!/\.html$/.test(url)) {
    if (url.endsWith('/')) {
      url += 'index.html';
    } else {
      res.redirect(`${url}/`);
      return;
    }
  }
  res.render(url.replace(/html$/, 'jinja'));
});

app.listen(config.dev.port);
