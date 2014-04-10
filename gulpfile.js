var gulp = require('gulp');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var webpack = require('webpack');
var myDevConfig = require('./webpack.config.js');
var es = require('event-stream');

var paths = {
  jsx: 'src/app/**/*.jsx',
  scripts: 'src/app/**/*.js',
  images: '',
  stylus: ''
};

gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

gulp.task('webpack:build-dev', function (callback) {
    // run webpack
  var devCompiler = webpack(myDevConfig);
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    callback();
  });
});

gulp.task('stylus', function () {

});

gulp.task('webpack', ['react'], function () {

});

gulp.task('react', function () {
  return es.concat(
    gulp.src(paths.scripts)
    .pipe(react()),
    gulp.src(paths.scripts)
  ).pipe('./src/compiled');
});

gulp.task('images', function () {

});

gulp.task('default', function() {
  // place code for your default task here
});