const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    options: "./src/options.js",
    popup: "./src/popup.js",
    content: "./src/content.js",
    background: "./src/background.js",
  },
  output: {
    path: path.resolve(__dirname, "./build"), 
    filename: "[name].js",
  },
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