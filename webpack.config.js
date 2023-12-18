const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    global: false
  },
  entry: {
    core: './src/index.js',
    cli: './cli/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'umd'),
    library: {
      type: 'umd'
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
