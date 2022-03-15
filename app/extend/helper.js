module.exports = {
  rsrc(action, filename, devHost = '0.0.0.0', devPort = '3001') {
    const { webenv } = this.app.config;
    const ext = filename.split('.').slice(-1).pop();

    if (action === 'dist') {
      if (webenv === 'local') {
        if (ext === 'css') {
          return `<!-- 开发环境的 css 都是通过 webpack-dev-server 热加载的 -->`;
        } else if (ext === 'js') {
          return `<script src="http://${devHost}:${devPort}/static/js/${filename}"></script>`;
        } else {
          throw new TypeError(`INVALID RSRC EXT: ${ext}`);
        }
      } else {
        if (ext === 'css') {
          return `<link rel="stylesheet" href="/public/dist/${filename}">`;
        } else if (ext === 'js') {
          return `<script src="/public/dist/${filename}"></script>`;
        } else {
          throw new TypeError(`INVALID RSRC EXT: ${ext}`);
        }
      }
    } else if (action === 'css') {
      return `<link rel="stylesheet" href="/public/css/${filename}">`;
    } else if (action === 'js') {
      return `<script src="/public/js/${filename}"></script>`;
    } else {
      throw new TypeError(`INVALID RSRC ACTION: ${action}`);
    }
  },
};
