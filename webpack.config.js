const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => ({
  mode: argv.mode === "production" ? "production" : "development",
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === "production" ? false : "inline-source-map",
  entry: {
    ui: "./src/ui/index.tsx",
    code: "./src/plugin/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        loader: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/ui/index.html",
      filename: "ui.html",
      inlineSource: ".(js)$",
      chunks: ["ui"],
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
});
