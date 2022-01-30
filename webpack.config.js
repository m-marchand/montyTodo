const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry:'./client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader?name=/images/[name].[ext]',
      }
    ]
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api/': 'http://localhost:3000'
    }
  }
}