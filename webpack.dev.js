const path = require('path'),
      webpack = require('webpack'),
      merge = require('webpack-merge'),
      GoogleFontsPlugin = require("google-fonts-webpack-plugin"),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      common = require('./webpack.common.js'),
      Jarvis = require('webpack-jarvis');

console.log(process.env.NODE_ENV, '=============')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    // new Jarvis({
    //   port: 3800
    // }),
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: "Source Sans Pro" },
    //     { family: "Roboto", variants: [ "400", "700italic" ] }
    //   ]
    // }),
    new CopyWebpackPlugin([
      {
        from: 'src/images/',
        to: 'images'
      },
      {
        from: 'src/assets/',
        to: 'assets'
      }
    ])
  ]
})
