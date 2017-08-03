const path = require('path')

module.exports = {
  entry: "syntagme",
  output: {
    filename: "syntagme.js",
    library: "syntagme",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [
      ".js"
    ],
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [],
  externals: [],
}
