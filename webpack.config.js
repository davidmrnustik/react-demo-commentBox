var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/src/app.js',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'eslint-loader'],
        enforce: 'pre'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
}