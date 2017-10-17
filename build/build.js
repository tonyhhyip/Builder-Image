/* eslint no-shadow: ["error", {"allow": ["resolve"]}] */
const fs = require('fs');
const webpack = require('webpack');
const shell = require('shelljs');
const glob = require('glob');
const { Environment, FileSystemLoader } = require('nunjucks');
const config = require('./webpack.prod.conf');

process.env.NODE_ENV = 'production';

const assetsPath = './public';

function buildAssets() {
  return new Promise((resolve, reject) => {
    shell.rm('-rf', assetsPath);
    shell.mkdir('-p', assetsPath);
    shell.config.silent = true;

    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString({
          modules: true,
          children: true,
          chunks: true,
          chunkModules: true,
        }));
        resolve();
      }
    });
  });
}

function loadAssets() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${assetsPath}/assets.json`, 'UTF-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const assets = JSON.parse(data);
      const scripts = Object.keys(assets).reduce((obj, key) => {
        obj[key] = assets[key].js;
        return obj;
      }, {});
      const styles = Object.keys(assets).reduce((obj, key) => {
        if ('css' in assets[key]) {
          obj[key] = assets[key].css;
        }
        return obj;
      });
      resolve({ scripts, styles });
    });
  });
}

function buildPages(assets) {
  return new Promise((resolve) => {
    const layoutsLoader = new FileSystemLoader('assets/layouts');
    const pagesLoader = new FileSystemLoader('assets/pages');

    const env = new Environment([pagesLoader, layoutsLoader]);
    glob('assets/pages/**/*.jinja', (files) => {
      const promises = files.map(file => new Promise((resolve, reject) => {
        const res = env.render(file.replace('assets/pages', ''), { assets });
        fs.writeFile(file.replace('jinja', 'html').replace('assets/pages', 'public'), res, 'UTF-8', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }));
      Promise.all(promises)
        .then(() => console.log('All pages is rendered'))
        .then(resolve);
    });
  });
}

buildAssets()
  .then(loadAssets)
  .then(buildPages)
