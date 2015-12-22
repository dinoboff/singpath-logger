# SingPath logger

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