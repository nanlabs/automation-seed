require('ts-node').register({
  transpileOnly: false,
  files: true,
  project: './tsconfig.json',
});
module.exports = require('./config/wdio.remote.conf.ts');
