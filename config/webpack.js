const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const extractScss = new ExtractTextPlugin('[name].css');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (isProd, watch) => {

    return {
        watch,
        cache: true,
        entry: './src/client.js',
        output: {
            filename: 'main.min.js',
            path: path.resolve(__dirname, 'dist')
        },
        devtool: 'source-map',
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
        ].concat(isProd ? [new webpack.optimize.UglifyJsPlugin()] : [])
    }
};