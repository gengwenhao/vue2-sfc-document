const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    core: './src/index.js',
    cli: './cli/index.js'
  },
  target: 'node',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
