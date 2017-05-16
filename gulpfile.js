require('babel-register');
require('ignore-styles');

const gulp = require('gulp');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 3000;

const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

const getWebpackConfig = () => {
    const webpackDevConfig = require('./webpack.common');
    const webpackProdConfig = require('./webpack.config');

    const config = isProduction()
        ? webpackProdConfig
        : Object.assign(webpackDevConfig, { watch: true });

    return config;
};

gulp.task('nodemon', cb => {
    const nodemon = require('gulp-nodemon');

    return nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['dist/', 'node_modules/']
    });
});

gulp.task('set-devmode', () => {
    process.env.NODE_ENV = 'development';
});

gulp.task('webpack', () => {
    const webpackStream = require('webpack-stream');
    const webpack = require('webpack');

    return gulp.src('src/client.js')
               .pipe(webpackStream(getWebpackConfig(), webpack))
               .on('error', (e) => { })
               .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', () => {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const compiler = webpack(getWebpackConfig());

    const wmw = webpackDevMiddleware(compiler, {
        stats: {
            children: false,
            chunks: false,
            colors: true
        }
    });

    const browserSync = require('browser-sync').create();

    browserSync.init({
        port: 3000,
        open: false,
        ghostMode: false,
        snippetOptions: {
            async: true
        },
        middleware: [
            require("compression")(),
            {
                route: '/static',
                handle: wmw
            },
            require('./src/server', require).default
        ],
        files: ['src/**/*'],
        server: 'dist',
        reloadOnRestart: true
    });
});


gulp.task('jest', () => {
    const jest = require('jest');
    const jestConfig = require('./package.json').jest;
    jestConfig.watch = true;
    
    jest.runCLI(jestConfig, ['./']);
});

gulp.task('default', ['start', 'webpack']);
gulp.task('build', ['webpack']);

gulp.task('dev-client', ['set-devmode', 'browser-sync']);
gulp.task('dev-server', ['set-devmode', 'webpack', 'nodemon']);
gulp.task('dev', ['dev-client']);
