const path = require("path");

module.exports = {
  entry: "./src/js/logic.js",
  entry: "./src/js/dom.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
};
