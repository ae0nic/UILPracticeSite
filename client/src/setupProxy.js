const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Creating proxy middleware")
    app.use(
        '/api/generateQuestions',
        createProxyMiddleware({
        target: 'http://127.0.0.1:3001/api/generateQuestions',
        changeOrigin: true,
        })
    );
};