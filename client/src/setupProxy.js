const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/fetch", "/save"],
    createProxyMiddleware({
      target: "http://localhost:8080",
    })
  );
};