let mode = "development";
if(process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,

    module: {
        rules: [
            {
                test: /\.js$/,
                excluede: /node_modules/,
                use: {
                    loader: "babel_loader",
                },
            }
        ],
    },
    devtool: false,
    devServer: {
        contentBase: "./dist",
    },
};