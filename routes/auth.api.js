const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const passport = require("passport");
/**
 * @route POST api/auth/login
 * @description User can login with email and password
 * @access Public
 */
router.post("/login", authController.loginWithEmail);

// Login with Facebook
router.post(
  "/login/facebook",
  //passport.authenticate("facebook-token", { session: false }),
  passport.authenticate("facebook-token"),
  authController.loginWithFacebookOrGoogle
);

// Login with Google
router.post(
  "/login/google",
  passport.authenticate("google-token", { session: false }),
  // passport.authenticate("google-token"),
  authController.loginWithFacebookOrGoogle
);
module.exports = router;
