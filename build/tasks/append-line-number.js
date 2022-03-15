const Transform = require('gulp-replace/node_modules/readable-stream/transform');
const rs = require('replacestream');
const istextorbinary = require('istextorbinary');

function lineno(search, _replacement, options) {
  if (!options) {
    options = {};
  }

  if (options.skipBinary === undefined) {
    options.skipBinary = true;
  }

  return new Transform({
    objectMode: true,
    transform: function(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      var replacement = _replacement;
      if (typeof _replacement === 'function') {
        // Pass the vinyl file object as this.file
        replacement = _replacement.bind({ file: file });
      }

      function doReplace() {
        // console.log('gulp-append-line-number.doReplace');
        if (file.isStream()) {
          // file.contents = file.contents.pipe(rs(search, replacement));
          // return callback(null, file);
          throw new TypeError('isBuffer.isRegExp.only');
        }

        if (file.isBuffer()) {
          if (search instanceof RegExp) {
            // console.log('gulp-append-line-number.isBuffer.isRegExp');
            const content = String(file.contents);
            const method = file.history[0]
                               .replace(file.base, '')
                               .replace(/^controller\//, 'c.')
                               .replace(/^service\//, 's.')
                               .replace(/\.js$/, '');
            const replaced = content.split('\n').map(function (line, lineNo) {
              // console.log(lineNo + 1, line);
              // console.log(search);
              if (search.test(line)) {
                return line + ` /* lineno: ${method}:${lineNo + 1} */`;
              } else {
                return line;
              }
            });
            file.contents = new Buffer(replaced.join('\n'));
          } else {
            throw new TypeError('isBuffer.isRegExp.only');
            // var chunks = String(file.contents).split(search);

            // var result;
            // if (typeof replacement === 'function') {
            //   // Start with the first chunk already in the result
            //   // Replacements will be added thereafter
            //   // This is done to avoid checking the value of i in the loop
            //   result = [ chunks[0] ];

            //   // The replacement function should be called once for each match
            //   for (var i = 1; i < chunks.length; i++) {
            //     // Add the replacement value
            //     result.push(replacement(search));

            //     // Add the next chunk
            //     result.push(chunks[i]);
            //   }

            //   result = result.join('');
            // }
            // else {
            //   result = chunks.join(replacement);
            // }

            // file.contents = new Buffer(result);
          }
          return callback(null, file);
        }

        callback(null, file);
      }

      if (options && options.skipBinary) {
        istextorbinary.isText(file.path, file.contents, function(err, result) {
          if (err) {
            return callback(err, file);
          }

          if (!result) {
            callback(null, file);
          } else {
            doReplace();
          }
        });

        return;
      }

      doReplace();
    }
  });
};

lineno.LINENO = /\/\* lineno: (.+) \*\//;

module.exports = lineno;
