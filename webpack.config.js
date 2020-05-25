/*
    ****************************************
    **    Project setup by,               **
    **    Kesava Krishnan Madavan         **
    **    https://github.com/mkesavan13   **
    ****************************************
                                  *
                                *
            *                 *      * 
          *                 *          *
        *                 *              *
      *                 *                  *
        *             *                  *
          *         *                  *
            *     *                  *
                *
              *
            *
*/


const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { LessThemingPlugin } = require('./build/LessThemingPlugin.js');

const my_web_config={
  paths:{
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
  },
  development: process.env.npm_lifecycle_event === 'start' ? true : false //Determines if it is development build or production build
}

module.exports = {
  devServer:{
    contentBase: my_web_config.paths.dist,
    compress: true,
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(my_web_config.paths.src,'index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({ //Production //Development watch
      patterns: [
        {
          from: path.join(my_web_config.paths.src,'assets'),
          to: path.join('assets')
        }
      ]
    }),
    new WriteFilePlugin({ //Development
        test: new RegExp(path.join('assets','js')),
        useHashIndex: true
    }),
    new WriteFilePlugin({ //Development
        test: new RegExp(path.join('assets','images')),
        useHashIndex: true
    }),
    new LessThemingPlugin({
      src: path.join(my_web_config.paths.src,'assets/css/themes'),
      dist: path.join(my_web_config.paths.dist,'assets/css/compiledThemes'),
      exclude:[
        'dark'
      ],
      development: my_web_config.development
    })
  ]
};