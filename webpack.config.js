const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractScss = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: './src/client.js',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'dist')
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
                    use: ['css-loader', 'sass-loader'],
                    fallback: ['style-loader']
                })
            }
        ]
    },
    plugins: [
        extractScss,
        new HtmlWebpackPlugin({
            title: 'test title',
            filename: 'test.html'
        })
    ].concat(
        process.env.NODE_ENV === 'production' ? [
            new webpack.optimize.UglifyJsPlugin()
        ] : []
    )
}