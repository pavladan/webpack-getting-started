const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";
  return {
    mode: argv.mode,
    devtool: isDevelopment ? "#eval-source-map" : "source-map",
    entry: ["./src/index.js", "./src/style.scss"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js"
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("style.css"),
      new CopyWebpackPlugin([
        {
          from: "./src/index.html",
          to: "./"
        }
      ]),
      new CleanWebpackPlugin(["dist"])
    ],
    devServer: {
      contentBase: path.join(__dirname, "src"),
      stats: {
        children: false,
        maxModules: 0
      },
      port: 8080,
      watchOptions: {
        poll: true
      }
    }
  };
};
