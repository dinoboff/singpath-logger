'use strict';

const expect = require('expect.js');
const MemoryStream = require('memorystream');
const sinon = require('sinon');

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

  describe('log', () => {
    let logger, stream;

    beforeEach(() => {
      stream = new MemoryStream();
      logger = log({stream});

      sinon.stub(logger.formatter, 'now').returns('2006-01-02 15:04:05.999');
      sinon.spy(stream, 'write');
    });

    it('should include a time stamp', done => {
      let data = '';

      stream.on('data', chunk => {
        data += chunk.toString();
      });

      stream.on('end', () => {
        expect(data).to.be('[2006-01-02 15:04:05.999] hello\n');
        done();
      });

      logger.log('hello');
      stream.end();
    });

    it('should format arguments', done => {
      let data = '';

      stream.on('data', chunk => {
        data += chunk.toString();
      });

      stream.on('end', () => {
        expect(data).to.be('[2006-01-02 15:04:05.999] hello world!\n');
        done();
      });

      logger.log('hello %s!', 'world');
      stream.end();
    });

    it('should skip message if there is no message', done => {
      let data = '';

      stream.on('data', chunk => {
        data += chunk.toString();
      });

      stream.on('end', () => {
        expect(data).to.be('');
        sinon.assert.notCalled(stream.write);
        done();
      });

      logger.log();
      stream.end();
    });

  });


  testLogMethod('debug', log.DEBUG);
  testLogMethod('info', log.INFO);
  testLogMethod('warn', log.ERROR);
  testLogMethod('error', log.ERROR);


  function testLogMethod(meth, level) {
    describe(meth, () => {
      let logger, stream;

      beforeEach(() => {
        stream = new MemoryStream();
        logger = log({stream, level});
      });

      it('should write to a stream', done => {
        let data = '';

        stream.on('data', chunk => {
          data += chunk.toString();
        });

        stream.on('end', () => {
          expect(data).to.contain('hello\n');
          done();
        });

        logger[meth]('hello');
        stream.end();
      });

      it('should be skipped if the logger level is higher', done => {
        let data = '';

        stream.on('data', chunk => {
          data += chunk.toString();
        });

        stream.on('end', () => {
          expect(data).to.be('');
          done();
        });

        logger.level += 1;
        logger[meth]('hello');
        stream.end();
      });
    });
  }

});
