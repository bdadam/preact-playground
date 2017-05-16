require('babel-register');
require('ignore-styles');

const gulp = require('gulp');

const bs = require('browser-sync').create();
const bs2 = require('browser-sync').create();

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

gulp.task('start', cb => {
    const nodemon = require('gulp-nodemon');

    var started = false;

    return nodemon({
        script: 'index.js',
        ext: 'js',
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

gulp.task('set-devmode', () => {
    process.env.NODE_ENV = 'development';
});

gulp.task('webpack', () => {
    const webpackStream = require('webpack-stream');
    const webpack = require('webpack');

    return gulp.src('src/client.js')
               .pipe(webpackStream(getWebpackConfig(), webpack))
               .on('error', (e) => { })
               .pipe(gulp.dest('dist/'))
               .pipe(bs2.stream());
});

gulp.task('bs', () => {
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
    const compiler = webpack(getWebpackConfig());

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



// gulp.task('jest', () => {
//     const jest = require('jest');
//     const jestConfig = require('./package.json').jest;
//     jestConfig.watch = true;
    
//     jest.runCLI(jestConfig, ['./']);
// });

gulp.task('default', ['start', 'webpack']);
gulp.task('build', ['webpack']);

gulp.task('dev', ['set-devmode', 'bs', 'jest']);
gulp.task('dev2', ['set-devmode', 'webpack', 'bs2', 'start']);
gulp.task('dev-server', ['set-devmode', 'webpack', 'start']);
