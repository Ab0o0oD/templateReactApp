const path = require("path");
const autoprefixer = require('autoprefixer');
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(css|less)$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer({ grid: true })],
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader']
            },
        ]
    },
    resolve: {extensions: ["*", ".js", ".jsx", '.ts', '.tsx', '.json']},
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true,
        stats: 'minimal'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};