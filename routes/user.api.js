const express = require("express");
const userController = require("../controllers/user.controller");
const {
  adminRequired,
  loginRequired,
} = require("../middlewares/authentication");

const router = express.Router();

/**
 * @route POST api/user/register
 * @description User can login with email and password
 * @access Public
 */
router.post("/register", userController.register);

/**
 * @route PUT api/user
 * @description User can modify their profile
 * @access Required Login
 */
router.put("/", loginRequired, userController.updateCurrentUser);

/**
 * @route PUT api/user/admin/:id
 * @description admin can modify user profile
 * @access Admin priviledge
 */
router.put(
  "/admin/:id",
  loginRequired,
  adminRequired,
  userController.updateUser
);

/**
 * @route DELETE api/user/admin/:id
 * @description admin can modify user profile
 * @access Admin priviledge
 */
router.delete(
  "/admin/:id",
  loginRequired,
  adminRequired,
  userController.deleteUser
);

/**
 * @route GET api/user
 * @description Admin can see all users
 * @access Admin priviledge required
 */
router.get("/", loginRequired, adminRequired, userController.getAllUsers);

/**
 * @route GET api/user/me
 * @description get current user information
 * @access Login required
 */
router.get("/me", loginRequired, userController.getCurrentUser);

/**
 * @route PUT api/user/topup
 * @description User can top up their balance
 * @access login required
 */
router.put("/topup", loginRequired, userController.topUpBalance);

/**
 * @route POST api/user/favorite
 * @description User can add game to their favorite
 * @access login required
 */
router.post("/favorite", loginRequired, userController.addToFavorite);

/**
 * @route DELETE api/user/favorite/:id
 * @description User can remove game from their favorite
 * @access login required
 */
router.delete(
  "/favorite/:id",
  loginRequired,
  userController.removeFromFavorite
);

module.exports = router;
