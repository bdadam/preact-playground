const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            mangle: {
                screw_ie8: true,
            },
            compress: {
                screw_ie8: true
            },
            warningsFilter: () => {}
        })
    ]
});
