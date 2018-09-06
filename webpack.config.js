/**
 * This is to generate the umd bundle only
 */
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        index: "./dist/lib/src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "dharma.umd.js",
        libraryTarget: "umd",
        library: "Dharma",
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".js"],
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),
    ],
    externals: {
        http: "http",
        https: "https",
    },
};
