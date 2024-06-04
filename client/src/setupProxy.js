import { createProxyMiddleware } from "http-proxy-middleware";
export default function (app) {
  app.use(
    ["/fetch", "/save"],    // all paths starting with these will get proxied
    createProxyMiddleware({
      target: "http://localhost:8080",
    })
  );
};