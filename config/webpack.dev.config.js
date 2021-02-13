const { merge } = require('webpack-merge');
const mainConfig = require('../webpack.config');
const env = require('./env');

module.exports = merge(mainConfig, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: env.paths.out,
        watchContentBase: true,
        publicPath: '/',
        open: true,
        historyApiFallback: true,
        compress: true,
        overlay: true,
        hot: false,
        watchOptions: {
            poll: 300,
        },
        ...env.server,
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
        ignored: /node_modules/,
    },
});