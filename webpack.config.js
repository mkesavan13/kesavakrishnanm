const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {LessThemingPlugin} = require('./build/LessThemingPlugin.js');

const paths={
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
}

module.exports = {
  devServer:{
    contentBase: paths.dist,
    compress: true,
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(paths.src,'index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(paths.src,'assets'), to: 'assets' },
      ],
    }),
    new WriteFilePlugin({
        test: new RegExp(path.join('assets','js')),
        useHashIndex: true
    }),
    new LessThemingPlugin({
      src: path.join(paths.src,'assets/css/themes'),
      dist: path.join(paths.dist,'assets/css/compiledThemes'),
      exclude:[
        'dark'
      ]
    })
  ]
};