const express = require("express");
const gameController = require("../controllers/game.controller");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authentication");

const router = express.Router();

/**
 * @route POST api/game
 * @description Admin can add games
 * @access Admin only
 */
router.post("/", loginRequired, adminRequired, gameController.addGame);

/**
 * @route Get api/game
 * @description  see all added Game
 * @access Everyone
 */
router.get("/", gameController.getAllGames);

/**
 * @route Get api/game/:id
 * @description  see specific game
 * @access Everyone
 */
router.get("/:id", gameController.getSingleGame);

module.exports = router;
