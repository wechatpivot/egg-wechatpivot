const path = require('path');
const PROJECT_PATH = process.cwd();
const { name, ENTRY, DEV_HOST = '0.0.0.0', DEV_PORT = '3001', SOURCE_DIR = 'rsrc', TARGET_DIR = 'app/public/dist', VIEW_DIR = 'app/view' } = require(PROJECT_PATH + '/package.json');


const WEBPACK = {
  entry: ENTRY,

  resolve: {
    modules: [path.resolve(PROJECT_PATH, SOURCE_DIR), 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimeType: 'image/png',
            },
          },
        ],
      },
    ],
  },
};


module.exports = {
  NAME: name.toLowerCase(),
  ENTRY: ENTRY,
  DEV_HOST: DEV_HOST,
  DEV_PORT: DEV_PORT,
  PROJECT_PATH: PROJECT_PATH,
  SOURCE_DIR: SOURCE_DIR,
  TARGET_DIR: TARGET_DIR,
  VIEW_DIR: VIEW_DIR,

  WEBPACK: WEBPACK,
};
