const {createProxyMiddleware} = require("http-proxy-middleware")
console.log("setupProxy rqeuired")

module.exports = app => {
    app.use('/ws', createProxyMiddleware({ target: 'ws://127.0.0.1:8000/ws', ws: true }))
}