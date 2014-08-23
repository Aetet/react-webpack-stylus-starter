react-webpack-stylus-starter
============================

Minimalistic project stub for [React.JS](http://facebook.github.io/react/index.html) with [webpack](http://webpack.github.io/) as module system and [stylus](http://learnboost.github.io/stylus/) for styling.

##Installation:
1. ```npm install```
2. ```./gulp``` If you have *nix-system, or ```node_modules/.bin/gulp``` in other way.

##What's Inside:
For build project just run ```gulp``` from root of the project. And happens some magic:

1. All ```.js``` and ```.jsx``` would be packed with [Webpack](https://github.com/webpack/webpack)

2. All ```.styl``` files would be built with [Stylus](https://github.com/stevelacy/gulp-stylus).

3. On ```port 9002``` would be launched [Connect](http://www.senchalabs.org/connect/) static server.

4. We would watched for every change in app folder with [gulp](https://github.com/gulpjs/gulp) watcher.

5. And of course we would be notified [node-notifier](https://github.com/mikaelbr/node-notifier) when every cycle of build would be completed .

And sweet bonus LiveReload with [tiny-lr](tiny-lr)

###Enjoy your Hack!
