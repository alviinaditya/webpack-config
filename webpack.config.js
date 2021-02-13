const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin  = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = require('./config/env');

const htmlPageNames = fs.readdirSync(path.resolve(__dirname, env.paths.in, 'templates'));
const multipleHtmlPlugin = htmlPageNames.map((name)=> new HtmlWebpackPlugin({
    inject: true,
    filename: name,
    template: path.resolve(env.paths.in, 'templates', name),
    favicon: path.resolve(env.paths.in, 'images', 'favicon.ico'),
    hash: false,
}));

module.exports = {
    target: 'web',
    entry: path.resolve(env.paths.in, 'js', 'main.js'),
    output: {
        filename: 'js/app.js',
        path: env.paths.out
    },
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: require("fibers"),
                            },
                        }
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/app.css'
        }),
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
        }),
        new ImageMinimizerPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            minimizerOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['svgo', {
                        plugins: [{removeViewBox: false}],
                    }],
                ],
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(env.paths.in, 'images'),
                    to: path.resolve(env.paths.out, 'images'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                }
            ],
        }),
    ].concat(multipleHtmlPlugin),
};