const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src\/css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        include: /src/,
        use: {
          loader: 'babel-loader'
        }
      },
      { test: /\.ejs$/, include: /src\/template/, use: ['ejs-loader'] },
      {
        test: /\.(jpe?g|png|gif|svg|webp|woff|woff2|eot|ttf|otf)$/,
        include: /src/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/template/index.ejs'),
      title: 'Webpack Onay'
    }),
  ]
}
