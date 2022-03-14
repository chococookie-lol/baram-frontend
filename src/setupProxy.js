const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://api.baram.ga',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }),
    )
};