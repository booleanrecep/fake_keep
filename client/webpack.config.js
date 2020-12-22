const path = require("path");
const HTMLWebpackPlugiin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "../build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
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
        test:/\.s[ac]ss$/i,
        use: ["style-loader", "css-loader","sass-loader"]
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugiin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    proxy: {
      '/notes': {
          target: 'http://localhost:5000',
          secure: false
      }
    }
  }
}
