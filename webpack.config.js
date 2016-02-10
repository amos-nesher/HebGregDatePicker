var path = require('path');

module.exports = {
  context:path.join( __dirname, '/src'),
  entry: 'entry.js',

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [path.join(__dirname, "/src")],
    extensions: ['','.webpack.js', '.js']
  },

  module: {
    loaders: [
      { test: /\.css$/, exclude: [/node_modules/], loaders: ['style', 'css']} //webpack reads the loaders from right to leftnpm


    ]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    inline: true
  },

  devtool: "#inline-source-map"
};
