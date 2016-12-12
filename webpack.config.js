const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV;

let config = {
  context: path.join(__dirname, 'src'),
  output: {
    library: 'ReduxWebmidi',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  module: {
    loaders: [{
      test: /\.ts/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      query: {
        presets: ["es2015"]
      }
    }]
  },

  node: {
    Buffer: false
  },

  externals: [{
    'redux': {
      root: 'redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux'
    },
  }],

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config;