const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLExtractPlugin = require("html-webpack-plugin");
const path = require("path");

let mode = "development";
let target = "web";
if(process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    target: target,
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({filename:"app.css"}),
        new HTMLExtractPlugin({template: "./src/index.html"}),
    ],

    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
    },
};