require('babel-register');
require('ignore-styles');

const nodemon = require('gulp-nodemon');
const gulp = require('gulp');

let ENV = process.env.NODE_ENV || 'production';

const config = {
    watch: false,
    production: ENV === 'production'
};

const bs = require('browser-sync').create();
const bs2 = require('browser-sync').create();

gulp.task('start', cb => {
    
    let started = false;

    return nodemon({
        script: 'index.js',
        ext: 'js',
        env: { 'NODE_ENV': ENV, PORT: 3000 },
        ignore: ['dist/', 'node_modules/']
    }).on('start', () => {

        if (!started) {
            bs2.init({
                port: 3300,
                open: false,
                ghostMode: false,
                reloadDebounce: 50,
                proxy: 'localhost:3000',
                files: ['dist/**/*', 'src/**/*'],
                // reloadOnRestart: true
            });
            // setInterval(() => { bs2.reload(); }, 5000);
            // cb();
            started = true;
        }

        console.log('rld');        
        // setTimeout(function() {
            // bs2.reload();
        // }, 500);
        // bs2.exit();


    });
});

gulp.task('set-dev', () => {
    ENV = process.env.NODE_ENV = 'development';
});

gulp.task('webpack', () => {
    const webpackStream = require('webpack-stream');
    const webpack2 = require('webpack');
    // const webpackConfig = require('./webpack.config');

    // webpackConfig.watch = true;
    const webpackConfig = require('./config/webpack')(true, true);

    return gulp.src('src/client.js')
        .pipe(webpackStream(webpackConfig, webpack2))
        // .on('error', (e) => { console.error(e); })
        // .on('error', (e) => { gulp.emit('end') })
        .on('error', (e) => { })
        .pipe(gulp.dest('dist/'))
        .pipe(bs2.stream());
});

gulp.task('bs', () => {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);

    const wmw = webpackDevMiddleware(compiler, {
        stats: {
            children: false,
            chunks: false,
            colors: true
        }
    });

    bs.init({
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
        // https: true,
        files: ['src/**/*'],
        server: 'dist',
        // reloadDebounce: 500,
        online: false,
        // reloadOnRestart: true
    });
});

gulp.task('bs2', () => {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);

    const wmw = webpackDevMiddleware(compiler, {
        stats: {
            children: false,
            chunks: false,
            colors: true
        }
    });

    // wmw.waitUntilValid(() => { console.log('valid'); bs2.reload(); });

    bs2.init({
        port: 3300,
        open: false,
        ghostMode: false,
        // files: ['src/**/*'],
        // server: 'dist',
        reloadDebounce: 500,
        // online: false,
        // reloadOnRestart: true,
        // middleware: [
        //     require("compression")(),
        //     {
        //         route: '/static',
        //         handle: wmw
        //     },
        //     require('./src/server', require).default
        // ],
        proxy: 'http://localhost:3000',
        // files: ['dist/**/*']
    });
});

const configure = (name, x, y) => {
    gulp.task(name, () => {
        config.watch = x;
        config.production = y;
    });

    return name;
}

gulp.task('default', ['start', 'webpack']);
gulp.task('dev', ['set-dev', 'bs']);
gulp.task('dev2', ['set-dev', 'webpack', 'bs2', 'start']);
gulp.task('dev-server', ['set-dev', 'webpack', 'start']);
gulp.task('build', ['webpack']);

// gulp.task('test', [configure('devxxx', true, false), 'bs']);

// const t = gulp.task('noop');
// console.log(t);