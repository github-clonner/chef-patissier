const browserSync = require('browser-sync');
const config = require('chef-patissier/lib/configLoader');
const taskEnabled = require('chef-patissier/lib/taskEnabled');
const pathToUrl = require('chef-patissier/lib/pathToUrl');
const browserSyncConfig = config.getConfig('browsersync');

const webpackTaskEnabled = taskEnabled('webpack');

const browserSyncTask = (done) => {
    const proxyConfig = browserSyncConfig.proxy || null;

    if (typeof(proxyConfig) === 'string') {
        browserSyncConfig.proxy = {
            target: proxyConfig
        };

        delete browserSyncConfig.server;
    }

    const server = browserSyncConfig.proxy || browserSyncConfig.server;

    if (webpackTaskEnabled) {
        const webpack = require('webpack');
        const webpackMultiConfig = require('chef-patissier-task-webpack/lib/webpack-multi-config');
        const webpackConfig = webpackMultiConfig('development');
        const compiler = webpack(webpackConfig);
        server.middleware = [
            require('webpack-dev-middleware')(compiler, {
                stats: 'minimal',
                publicPath: pathToUrl('/', webpackConfig.output.publicPath)
            }),
            require('webpack-hot-middleware')(compiler)
        ];
    }

    browserSync.init(browserSyncConfig);
    done();
};

module.exports = browserSyncTask;
module.exports.browserSync = browserSync;
