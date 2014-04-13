var gulp = require('gulp');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var webpack = require('webpack');
var Notifier = require('node-notifier');
var concat = require('gulp-concat');
var connect = require('connect');
var WebpackDevServer = require('webpack-dev-server');

var myDevConfig = require('./webpack.config.js');
var es = require('event-stream');

var paths = {
  jsx: 'src/app/**/*.jsx',
  scripts: 'src/app/**/*.js',
  images: '',
  stylus: 'src/app/**/*.styl'
};

gulp.task('connect', function () {
  var app = connect()
    .use(connect.static('public'))
    .listen(9002);
});

//TODO переделать с конкатенацией всех ресурсов в один файл
gulp.task('styles', function () {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('react', function () {
  return es.concat(
    gulp.src(paths.jsx)
    .pipe(react()),
    gulp.src(paths.scripts)
  ).pipe(gulp.dest('src/compiled'));
});

gulp.task('webpack:build-dev', ['react'], function (callback) {
    // run webpack
  var devCompiler = webpack(myDevConfig);
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    callback();
  });
});

gulp.task("build-dev-jsx-loader", ["webpack:build-dev"], function() {
  gulp.watch(["src/app/**/*"], ["webpack:build-dev", 'notify']);
});

gulp.task('notify', ['build-dev-jsx-loader'], function () {
  var notifier = new Notifier();
  notifier.notify({
    title: 'My app',
    message: 'Hello, Gulp!'
  });
//  notify('Hello gulp!');
});

gulp.task('default', ['connect', 'styles', 'build-dev-jsx-loader']);

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(myDevConfig);

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(9002, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:9002/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


