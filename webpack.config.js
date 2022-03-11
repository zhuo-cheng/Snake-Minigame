const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",

    environment: {
      arrowFunction: false,
      // Not use const for compatibility of IE10
      const: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // Babel Configuration
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // Set environment plugin
                  "@babel/preset-env",
                  // Configuration Info
                  {
                    // Set target browser of compatibility
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    // Set corejs version
                    corejs: "3",
                    // Set how to use codejs
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // Set the folder not to be compliled
        exclude: /node-modules/,
      },

      // Less Configuration
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",

          // Input postcss
          // Translate CSS to old version for compatibility
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // Browser compatibility plugin
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  // Webpack configuration
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: ""
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },
};
