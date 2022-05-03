const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/api/**", {
      target: "http://15.164.164.38",
      secure: false,
    })
  );
};
