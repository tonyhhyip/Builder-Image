//@flow
'use strict';

const UglifyPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const merge = require('webpack-merge');

const base = {
    plugins: [
        new OccurenceOrderPlugin(),
        new DedupePlugin(),
        new AggressiveMergingPlugin()
    ],
    entry: {
        app: './assets/js/app'
    },
    output: {
        path: `${__dirname}/public/js`,
        publicPath: '/js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js'],
        fallback: ['node_modules']
    },
    resolveLoader: {
        fallback: ['node_modules']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    }
};

const dev = merge.smart({
    entry: {
        app: ['webpack-dev-server/client?http://localhost:8080/']
    },
    devtool: 'inline-source-map',
    debug: true,
    plugin: [
        new HotModuleReplacementPlugin()
    ]
}, base);

const production = merge.smart({
    devtool: 'source-map',
    plguins: [
        new UglifyPlugin({
            minimize: true
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}, base);

module.exports = {
    base,
    dev,
    production
};
