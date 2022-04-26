const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/api/**", {
      target: "http://54.180.145.5",
      secure: false,
    })
  );
};
