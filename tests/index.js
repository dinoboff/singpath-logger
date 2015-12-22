'use strict';

const expect = require('expect.js');

const log = require('../');

describe('log', () => {

  it('should create a new logger', () => {
    const logger = log();

    expect(logger.log).to.be.a(Function);
    expect(logger.debug).to.be.a(Function);
    expect(logger.info).to.be.a(Function);
    expect(logger.warn).to.be.a(Function);
    expect(logger.error).to.be.a(Function);
  });

});
