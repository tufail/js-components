const merge           = require('webpack-merge');
const common          = require('./webpack.config.js');
const path            = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = merge(common, {
 mode     : 'development',
 devtool  : 'source-map',
 watch    : true,
 devServer: {
 //  hot: true,
   contentBase: path.resolve(__dirname, "dist")
 } ,
 entry: {
   'js-components.js': './src/main.js',
   '/css/todo.css': './assets/sass/todo.scss'
 },

 output: {
   path: path.resolve(__dirname, "dist"),
   filename: '[name]',
   publicPath: "./dist/"
 },
 plugins  : [
   new BrowserSyncPlugin({
       // browse to http://localhost:3000/ during development,
       // ./public directory is being served
       host: 'localhost',
       port: 3000,
       files:['./dist/*.html'],
       server: { baseDir: ['dist'] }
     }),
 ]
});
