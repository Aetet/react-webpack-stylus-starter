var gulp = require('gulp');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var webpack = require('webpack');
var Notifier = require('node-notifier');
var concat = require('gulp-concat');
var connect = require('connect');

var myDevConfig = require('./webpack.config.js');

var notify = function (options) {
  new Notifier().notify(options);
};

var paths = {
  jsx: 'src/app/**/*.jsx',
  scripts: 'src/app/**/*.js',
  images: '',
  stylus: 'src/app/**/*.styl'
};

gulp.task('connect', function () {
  console.log();
  var app = connect()
    .use(connect.static('public'))
    .listen(9002);
});

//Build all stylus files and and create main.css under public/css folder
gulp.task('styles', function () {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'));
});

//Build all jsx, js files with Webpack bundler
gulp.task('webpack:build-dev', function (callback) {
  var devCompiler = webpack(myDevConfig);
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    callback();
  });
});

//Watch for every change in source
gulp.task("watch-app", function() {
  gulp.watch(["src/app/**/*", "src/app/**/*"], ["build-app"]);
});

//Build application once. Pack scripts and build styles.
gulp.task("build-app", ["webpack:build-dev", "styles"], function () {
  notify({
    title: 'Gulp Build',
    message: 'App was built'
  });
});

//Default task for gulp
gulp.task('default', ['connect', 'build-app', 'watch-app'], function () {
  console.log('listen to Connect on 9002');
});
