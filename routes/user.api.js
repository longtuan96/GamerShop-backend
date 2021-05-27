const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

/**
 * @route POST api/user/register
 * @description User can login with email and password
 * @access Public
 */
router.post("/register", userController.register);

module.exports = router;
