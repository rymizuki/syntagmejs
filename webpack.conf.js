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
    modulesDirectories: [
      "./src",
      "./node_modules/",
    ]
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
    ]
  },
  plugins: [],
  externals: [],
}
