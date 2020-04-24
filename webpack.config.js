const path = require("path");

module.exports = {
  entry: "./src/js/logic.js",
  entry: "./src/js/dom.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: "file-loader",
      },
    ],
  },
};
