const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  optimization: {
    minimize: false,
  },
  devServer: {
    contentBase: "./build",
    historyApiFallback: {
      rewrites: [
        /**
         * Since React Router uses virtual urls, this setting reroutes all suburls (like options.html/about)
         * to the options.html. The virtual url is preserved through reload -> perfect hot reload
         */
        { from: /./, to: '/options.html' }  
      ]
    },
  },
  devtool: "source-map",
})