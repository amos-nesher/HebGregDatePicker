var path = require('path');
var webpack = require("webpack");

module.exports = {
  context:path.join( __dirname, '/src'),
  entry: 'entry.js',

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [path.join(__dirname, "/src")],
    extensions: ['','.webpack.js', '.js', '.json']
  },

  module: {
    loaders: [
      { test: /\.scss$/, exclude: [/node_modules/], loaders: ['style', 'css', 'scss']} //webpack reads the loaders from right to leftnpm


    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    inline: true
  },

  devtool: "#inline-source-map"
};
