const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const lineno = require('./tasks/append-line-number.js');
const replaceByLine = require('./tasks/replace-by-line.js');
const { PROJECT_PATH, TARGET_DIR, VIEW_DIR } = require('./config.js');


module.exports.clean = function () {
  return del([
    path.resolve(PROJECT_PATH, TARGET_DIR, '*'),
  ]);
}


module.exports.replace = function () {
  const assetsMap = JSON.parse(fs.readFileSync(path.resolve(PROJECT_PATH, 'webpack-assets.json')));

  const REG = new RegExp('([0-9a-z]*)-stamp4hash\.(css|js)', 'ig');

  return gulp
    .src(path.resolve(PROJECT_PATH, VIEW_DIR, '**/*.html'))
    .pipe(replace(REG, function (match, p1, p2) {
      // console.log(match, p1, p2);
      return assetsMap[p1][p2];
    }))
    .pipe(gulp.dest(path.resolve(PROJECT_PATH, VIEW_DIR)));
}


module.exports.logger = function () {
  const PATTERN = /(ctx\.logger\.)(debug|info|warn|error)\('(.+)'(, .+)?\);(.*)/;
  const LINENO = lineno.LINENO;

  gulp
    .src([
      path.resolve(PROJECT_PATH, 'app/controller/home.js'),
      // '!' + path.resolve(PROJECT_PATH, 'app/middleware/**/*'),
      // '!' + path.resolve(PROJECT_PATH, 'app/public/**/*'),
      // '!' + path.resolve(PROJECT_PATH, 'app/router.js'),
    ], { base: path.resolve(PROJECT_PATH, 'app/') })
    .pipe(lineno(PATTERN))
    .pipe(replaceByLine(PATTERN, function (match, p1, p2, p3, p4, p5) {
      // console.log(method);

      // console.log(match);
      // console.log(p1);
      // console.log(p2);
      // console.log(p3);
      // console.log(p4);
      // console.log(p5);
      const ln = p5.match(LINENO)[1];
      return `${p1}${p2}('${p3}'${p4 || ''}, '[${ln}]');`;
    }))
    .pipe(gulp.dest(path.resolve(PROJECT_PATH, 'app/')));
}
