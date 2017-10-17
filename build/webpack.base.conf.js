const basePath = process.env.BASE_PATH || '/2017';

module.exports = {
  entry: {
    app: ['./assets/js/app'],
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/../public`,
    publicPath: `${basePath}/`,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          // eslint-disable-next-line global-require
          formatter: require('eslint-friendly-formatter'),
        },
      },
      { test: /\.jsx?$/, use: ['babel-loader'] },
    ],
  },
};
