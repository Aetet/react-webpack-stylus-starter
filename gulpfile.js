var gulp = require('gulp');
var stylus = require('gulp-stylus');
var webpack = require('webpack');
var Notifier = require('node-notifier');
var concat = require('gulp-concat');
var connect = require('connect');
var lr = require('tiny-lr')();

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
  var app = connect()
    .use(connect.static('public'))
    .listen(9002);

  lr.listen(35729);
});
gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(myDevConfig);

  new WebpackDevServer(compiler, {
    publicPath: 'public/',
    // server and middleware options
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    console.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
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
  gulp.watch(["src/app/**/*.jsx", "src/app/**/*.js"], ["build-js"]);
  gulp.watch(["src/app/**/*.styl"], ["build-styles"]);
});

//Build application once. Pack scripts and build styles.
gulp.task("build-js", ["webpack:build-dev"], function () {
  notify({
    title: 'Gulp Build',
    message: 'App was built'
  });
  lr.changed({body: {files: ['*']}});
});
gulp.task("build-styles", ["styles"], function () {
  notify({
    title: 'Gulp Build',
    message: 'App was built'
  });
  lr.changed({body: {files: ['*']}});
});

gulp.task("build-app", ["webpack:build-dev","styles"], function () {
  notify({
    title: 'Gulp Build',
    message: 'App was built'
  });
  lr.changed({body: {files: ['*']}});
});
//Default task for gulp
gulp.task('default', ['connect','build-app', 'watch-app'], function () {
  console.log('listen to Connect on 9002');
});
