require('babel-register');
require('ignore-styles');

const server = require('./src/server').default;

server.listen(process.env.PORT || 3000);
