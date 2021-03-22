// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/erp', { target: 'http://172.16.10.212:8194' }));
};
