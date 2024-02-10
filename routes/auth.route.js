const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );
  app.post("/auth/signin", controller.signin);
  app.post("/auth/signout", [authJwt.verifyToken], controller.signout);
  app.post("/auth/refreshtoken", controller.refreshToken);
  app.get("/auth/status", [authJwt.verifyToken], controller.checkToken);
};
