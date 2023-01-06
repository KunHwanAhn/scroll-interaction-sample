import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

import webpack from 'webpack';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));
const MODE_PRODUCTION = 'production';
const MODE_DEVELOPMENT = 'development';

const isProduction = process.env.NODE_ENV === MODE_PRODUCTION;

const config = {
  mode: MODE_DEVELOPMENT,
  target: ['web', 'es2015'],
  entry: resolve(__dirname, 'src/main.tsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_props: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            typeofs: false,
          },
          mangle: {
            safari10: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new ESLintWebpackPlugin(),
    new CaseSensitivePathsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? MODE_PRODUCTION : MODE_DEVELOPMENT),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: '' }],
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3.27,
                shippedProposals: true,
              }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
        exclude: /node_modules/,
      },

      // addition - add source-map support
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

if (isProduction) {
  config.mode = MODE_PRODUCTION;

  config.plugins = [
    ...config.plugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new WebpackManifestPlugin(),
  ];
} else {
  config.devtool = 'source-map';

  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ];

  config.devServer = {
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    // hot: true,
    liveReload: false,
    historyApiFallback: true,
    static: {
      directory: resolve(__dirname, 'assets'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };
}

export default config;
