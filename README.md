# SingPath logger

[![Build Status](https://travis-ci.org/singpath/singpath-logger.svg)](https://travis-ci.org/singpath/singpath-logger)
[![Coverage Status](https://coveralls.io/repos/singpath/singpath-logger/badge.svg?branch=master&service=github)](https://coveralls.io/github/singpath/singpath-logger?branch=master)

Basic logger sending messages to stderr with a time stamp.


## Install

```
npm install --save-dev singpath/singpath-logger
```

## Usage

```js
const log = require('singpath-logger');

logger = log({level: log.INFO});
logger.info('hello %s', 'world');
```