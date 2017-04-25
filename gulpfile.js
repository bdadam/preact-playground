require('babel-register');
require('ignore-styles');

const nodemon = require('gulp-nodemon');
const gulp = require('gulp');

let ENV = process.env.NODE_ENV || 'production';

gulp.task('start', cb => {
    
    let started = false;

    return nodemon({
        script: 'index.js',
        ext: 'js',
        env: { 'NODE_ENV': ENV, PORT: 3300 },
        ignore: ['dist/']
    }).on('start', () => {

        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('set-dev', () => {
    ENV = process.env.NODE_ENV = 'development';
});

gulp.task('webpack', () => {
    const webpackStream = require('webpack-stream');
    const webpack2 = require('webpack');
    const webpackConfig = require('./webpack.config');

    webpackConfig.watch = true;

    return gulp.src('src/client.js')
        .pipe(webpackStream(webpackConfig, webpack2))
        // .on('error', (e) => { console.error(e); })
        // .on('error', (e) => { gulp.emit('end') })
        .pipe(gulp.dest('dist/'));
});

gulp.task('bs', () => {
    const bs = require('browser-sync').create();

    bs.init({
        port: 3000,
        proxy: 'localhost:3300',
        open: false,
        files: ['**/*.js', '**/*.scss'],
        reloadDebounce: 500
    });

    // bs.watch(['**/*.js', '**/*.scss']);
    // bs.watch(['./src/**/*.js', './src/**/*.scss']);
});

gulp.task('default', ['start', 'webpack']);

// gulp.task('dev', ['set-dev', 'webpack', 'bs']);
// gulp.task('dev', ['set-dev', 'webpack', 'start', 'bs']);
gulp.task('dev', ['set-dev', 'start', 'bs']);