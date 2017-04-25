module.exports = {
    plugins: [
        require('autoprefixer'),
        require('doiuse')({
            browsers: [
                '>1%',
                'ie >=11',
                'ios >=9'
            ],
            ignore: ['flexbox']
        })
    ]
};