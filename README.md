egg-web
==

## Install

```bash
$ npm i egg-web --save
$ docker pull hbrls/eggjs:latest
```

## Usage

```javascript
// config/plugin.js
exports.web = {
  enable: true,
  package: 'egg-web',
};
```

## Logentries

```javascript
// app.js
const LogentriesTransport = require('egg-web/transports/logentries.js');

module.exports = app => {
  app.getLogger('logger').set('logentries', new LogentriesTransport({ level: 'INFO', app }));
  app.getLogger('errorLogger').set('logentries', new LogentriesTransport({ level: 'ERROR', app }));
};
```

## Build-In

1. HttpIn logging

## [MIT License](LICENSE)
