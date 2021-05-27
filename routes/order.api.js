const express = require("express");
const orderController = require("../controllers/order.controller");
const { loginRequired } = require("../middlewares/authentication");

const router = express.Router();

/**
 * @route GET api/order
 * @description User can get their current order
 * @access user priviledge
 */
router.post("/", loginRequired, orderController.getCurrentOrder);

/**
 * @Route POST api/auth/register
 * @description User can register
 * @access Public
 */

module.exports = router;
