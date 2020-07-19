const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules(\/|\\)(?!(@feathersjs|debug))/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack", options: { titleProp: true } }],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[contenthash].js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: 1 })],
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    // Avoid pulling in react twice
    alias: {
      react: path.join(process.cwd(), "node_modules/react"),
      "react-dom": path.join(process.cwd(), "node_modules/react-dom"),
      React: path.join(process.cwd(), "node_modules/react"),
      ReactDOM: path.join(process.cwd(), "node_modules/react-dom"),
      "react-bootstrap": path.join(
        process.cwd(),
        "node_modules/react-bootstrap"
      ),
      bootstrap: path.join(process.cwd(), "node_modules/bootstrap"),
      dayjs: path.join(process.cwd(), "node_modules/dayjs"),
      "react-redux": path.join(process.cwd(), "node_modules/react-redux"),
      redux: path.join(process.cwd(), "node_modules/redux"),
      lodash: path.join(process.cwd(), "node_modules/lodash"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./public", to: "./" },
        {
          from: "./node_modules/dataland-gui/dist/blocks-media",
          to: "./blocks-media/",
        },
      ],
    }),
    new Dotenv({ systemvars: true }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
  ],
};
