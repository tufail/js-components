var merge             = require('webpack-merge');
var common            = require('./webpack.config.js');
const path            = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(common, {
 mode: 'production',
 entry: {
   'js-components.min.js': './src/main.js'
 },
 output: {
   path: path.resolve(__dirname, "dist"),
   filename: '[name]',
   publicPath: "./dist/"
 },
 optimization: {
    //minimize: true
    minimizer: [
    new UglifyJSPlugin({

      uglifyOptions: {
        warnings: false, 
        compress: {
inline: true
},
      },
    }),
  ],
  }
});
