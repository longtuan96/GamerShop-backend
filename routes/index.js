const express = require("express");

const router = express.Router();

//Auth Api
const authApi = require("./auth.api");
router.use("/auth", authApi);

//User Api
const userApi = require("./user.api");
router.use("/user", userApi);
//order Api
const orderApi = require("./order.api");
router.use("/order", orderApi);

//Game Api
const gameApi = require("./game.api");
router.use("/game", gameApi);

module.exports = router;
