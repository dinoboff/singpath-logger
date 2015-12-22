'use strict';


const DEBUG = 10;
const INFO = 20;
const ERROR = 30;


class Logger {

  constructor(options) {
    options = options || {};
  }
}

/**
 * Create a new logger.
 *
 * @param  {Stream} stream
 * @param  {Number} level
 * @return {Logger}
 */
module.exports = function logger(stream, level) {
  return new Logger(stream, level);
};

module.exports.DEBUG = DEBUG;
module.exports.INFO = INFO;
module.exports.ERROR = ERROR;
