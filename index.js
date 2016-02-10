'use strict';

const util = require('util');


const DEBUG = 10;
const INFO = 20;
const ERROR = 30;


class Logger {

  constructor(options) {
    options = options || {};

    this.stream = options.stream || process.stderr;
    this.level = options.level || INFO;
    this.formatter = options.formatter || {
      now() {
        return new Date().toISOString().replace('T', ' ').slice(0, -1);
      },

      format(args) {
        args[0] = `[${this.now()}] ${args[0]}\n`;
        return util.format.apply(util, args);
      }
    };
  }

  _log(args, level) {
    if (args.length < 1) {
      return;
    }

    if (level < this.level) {
      return;
    }

    this.stream.write(this.formatter.format(args));
  }

  log() {
    this._log(arguments, INFO);
  }

  info() {
    this._log(arguments, INFO);
  }

  error() {
    this._log(arguments, ERROR);
  }

  warn() {
    this._log(arguments, ERROR);
  }

  debug() {
    this._log(arguments, DEBUG);
  }
}

/**
 * Create a new logger.
 *
 * @param  {object} options
 * @return {Logger}
 */
module.exports = function logger(options) {
  return new Logger(options);
};

module.exports.DEBUG = DEBUG;
module.exports.INFO = INFO;
module.exports.ERROR = ERROR;
