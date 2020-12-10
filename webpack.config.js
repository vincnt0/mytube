const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: {
    options: "./src/options.js",
    popup: "./src/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "./build"), 
    filename: "[name]-bundle.js",
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
  target: "web",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
     // we use babel-loader to load our jsx and tsx files
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader'
        ]
      },

      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/_direct" }
      ]
    })
  ],
}