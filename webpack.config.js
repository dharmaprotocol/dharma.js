/**
 * This is to generate the umd bundle only
 */
const webpack = require('webpack');
const path = require('path');

let entry = {
    index: './src/index.ts',
};

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dharma.umd.js',
        libraryTarget: 'umd',
        library: 'Dharma',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: "tsconfig.prod.json"
                        },
                    },
                ],
                exclude: [
                    /node_modules/,
                    /__test__/,
                    /__mocks__/
                ]
            },
        ],
    },
};
