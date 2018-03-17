const { resolve } = require('path'),
  {
    NoEmitOnErrorsPlugin,
    DefinePlugin,
    SourceMapDevToolPlugin,
    HotModuleReplacementPlugin,
    LoaderOptionsPlugin,
    optimize: {
      CommonsChunkPlugin,
      OccurrenceOrderPlugin ,
      UglifyJsPlugin
    }
  } = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  combineLoaders = require('webpack-combine-loaders'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  { smart, smartStrategy } = require('webpack-merge'),
  { stringify } = JSON,
  { env: { NODE_ENV } } = process,
  { dependencies } = require('./package.json'),
  packages = Object.keys(dependencies),

  config = {
    target: 'web',
    context: resolve('app'),
    entry: {
      packages,
      app: './index'
    },
    output: {
      path: resolve('dist'),
      filename: 'js/[name].js',
      sourceMapFilename: 'js/[name].js.map',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            quiet: true,
            failOnError: false,
            failOnWarning: false,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: /app/,
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: combineLoaders([
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          ]),
        },
        {
          test: /\.scss$/,
          loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract('css-loader!autoprefixer-loader?{browsers:["last 2 version", "iOS 6"]}!sass-loader?sourceMap'))
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new DefinePlugin({
        process: {
          env: {
            NODE_ENV: stringify(NODE_ENV),
          }
        }
      }),
      new CommonsChunkPlugin({
        name: 'packages',
        filename: 'js/vendors.js',
        // minChunks: Infinity
      }),
      new SourceMapDevToolPlugin({
        include: 'app',
        exclude: 'packages'
      }),
      new ExtractTextPlugin('css/main.css', { allChunks: true }),
      new CopyWebpackPlugin([
        { from: 'index.html', to: 'index.html' },
      ]),
      new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true,
      }),
    ]
  };

if (NODE_ENV === 'development') {
  module.exports = smartStrategy({
    entry: {
      packages: 'prepend'
    }
  })(config, {
    entry: {
      packages: [
        // 'babel-polyfill',
        'react-hot-loader/patch',
        'react-hot-loader'
      ]
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          sassLoader: {
            includePaths: [resolve(__dirname, 'app')]
          },
          context: config.context
        }
      })
    ],
    output: {
      pathinfo: true,
    },
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
      historyApiFallback: true,
      publicPath: config.output.publicPath,
    }
  });
}

if (NODE_ENV === 'production') {
  module.exports = smart(config, {
    plugins: [
      new OccurrenceOrderPlugin(),
      new UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: true,
        mangle: true,
        minimize: true
      })
    ]
  });
}