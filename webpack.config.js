const path    = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  module: {
    rules: [{

          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
          }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {loader:'sass-loader'}]
        })
      },
      // {
      //     test: /\.(scss|css)$/,
      //     use:['style-loader','css-loader', 'sass-loader']
      //  },
      {
        test: /\.html$/,
        use: [
          // apply multiple loaders and options
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]',
      allChunks: true
    })
  ]
};
