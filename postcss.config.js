module.exports = {
    plugins: [
        require('autoprefixer'),
        require('doiuse')({
            browsers: ['ie >= 11', '> 2%'],
            ignore: ['rem', 'flexbox']
        })
    ]
};