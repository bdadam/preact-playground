require('babel-register');
require('ignore-styles');

const nodemon = require('gulp-nodemon');
const gulp = require('gulp');

let ENV = process.env.NODE_ENV || 'production';

const bs = require('browser-sync').create();

gulp.task('start', cb => {
    
    let started = false;

    return nodemon({
        script: 'index.js',
        ext: 'js',
        env: { 'NODE_ENV': ENV, PORT: 3300 },
        ignore: ['dist/', 'node_modules/']
    }).on('start', () => {

        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', () => {
        // bs.reload({ stream: false });
        // setTimeout(() => bs.reload({ stream: false }), 500);
        // setTimeout(() => bs.reload(), 500);
    });
});

gulp.task('set-dev', () => {
    ENV = process.env.NODE_ENV = 'development';
});

gulp.task('webpack', () => {
    const webpackStream = require('webpack-stream');
    const webpack2 = require('webpack');
    const webpackConfig = require('./webpack.config');

    return gulp.src('src/client.js')
        .pipe(webpackStream(webpackConfig, webpack2))
        // .on('error', (e) => { console.error(e); })
        // .on('error', (e) => { gulp.emit('end') })
        .on('error', (e) => { })
        .pipe(gulp.dest('dist/'));
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
        },
        // lazy: true,
        // serverSideRender: true
    })

    const init = () => bs.init({
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
            
            // (...args) => {
            // // const fresh = require('fresh-require');
            // // const server = fresh('./src/server', require).default;
            // const server = require('./src/server', require).default;
            // server(...args);
        // }
        ],
        // https: true,
        files: ['src/**/*'],
        server: 'dist',
        // reloadDebounce: 500,
        online: false,
        // reloadOnRestart: true
    });

    // bs.watch(['src/**/*.js'], () => {
    //     // console.log(require.cache);
    // });

    init();

    // gulp.watch(['src/**/*.js'], () => {
    //     bs.exit();
    //     init();
    //     // console.log('xxx');
    //     // delete require.cache;
    //     // Object.keys(require.cache).forEach(function (key) { delete require.cache[key] });
    //     // bs.reload();
    // });
    
    // bs.init({
    //     port: 3000,
    //     proxy: 'localhost:3300',
    //     open: false,
    //     files: ['**/*.js', '**/*.scss', '!node_modules'],
    //     // files: ['dist/**/*'],
    //     // reloadDebounce: 500
    // });

    // bs.watch(['**/*.js', '**/*.scss'], () => bs.reload());
    // bs.watch(['./src/**/*.js', './src/**/*.scss']);
});

gulp.task('bs2', () => {
     bs.init({
        port: 3000,
        proxy: 'localhost:3300',
        open: false,
        // files: ['**/*.js', '**/*.scss', '!node_modules'],
        // files: ['dist/**/*'],
        reloadDebounce: 500
    });
});

gulp.task('default', ['start', 'webpack']);

// gulp.task('dev', ['set-dev', 'webpack', 'bs']);
// gulp.task('dev', ['set-dev', 'webpack', 'start', 'bs']);
// gulp.task('dev', ['set-dev', 'start', 'bs']);
// gulp.task('dev', ['set-dev', 'webpack', 'bs']);
gulp.task('dev', ['set-dev', 'bs']);