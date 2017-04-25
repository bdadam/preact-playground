const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const extractScss = new ExtractTextPlugin('[name].css');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/client.js',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',

    // node: {
    //     Buffer: false,
    //     process: false,
    //     __filename: false,
    //     __dirname: false,
    // },

    // stats: {
    //     children: false,
    //     chunks: false,
    //     source: false,
    // },

    // stats: 'minimal',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: extractScss.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: ['style-loader']
                })
            }
        ]
    },
    plugins: [
        extractScss,
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'test title',
            filename: 'test.html'
        })
    ].concat(isProd ? [new webpack.optimize.UglifyJsPlugin()] : [])
}