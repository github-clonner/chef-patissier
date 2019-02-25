const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackMultiConfig = require('../webpack/webpack-multi-config');
const config = require('../../lib/configLoader');
const pathToUrl = require('../../lib/pathToUrl');
const browserSyncConfig = config.getConfig('browserSync');

const browserSyncTask = (done) => {
    const webpackConfig = webpackMultiConfig('development');
    const compiler = webpack(webpackConfig);
    const proxyConfig = browserSyncConfig.proxy || null;

    if (typeof(proxyConfig) === 'string') {
        browserSyncConfig.proxy = {
            target: proxyConfig
        };

        delete browserSyncConfig.server;
    }

    const server = browserSyncConfig.proxy || browserSyncConfig.server;

    server.middleware = [
        require('webpack-dev-middleware')(compiler, {
            stats: 'minimal',
            publicPath: pathToUrl('/', webpackConfig.output.publicPath)
        }),
        require('webpack-hot-middleware')(compiler)
    ];

    browserSync.init(browserSyncConfig);

    done();
};

module.exports = browserSyncTask;
