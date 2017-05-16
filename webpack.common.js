const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const extractScss = new ExtractTextPlugin('[name].css');

module.exports = {
    watch: false,
    cache: true,
    devtool: 'cheap-eval-source-map',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
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
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },

                        'postcss-loader',

                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
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
    ]
};