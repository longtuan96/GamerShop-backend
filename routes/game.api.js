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
 * @route POST api/game/:id
 * @description Admin can update game
 * @access Admin only
 */
router.put("/:id", loginRequired, adminRequired, gameController.updateGame);

/**
 * @route DELETE api/game/:id
 * @description Admin can delete game (game info still there)
 * @access Admin only
 */
router.delete("/:id", loginRequired, adminRequired, gameController.deleteGame);

/**
 * @route Get api/game
 * @description  see added Game with pagination
 * @access Everyone
 */
router.get("/", gameController.getGames);

/**
 * @route Get api/game/admin
 * @description  see added Game with pagination
 * @access Everyone
 */
router.get("/admin", loginRequired, adminRequired, gameController.getAllGames);

/**
 * @route Get api/game/:id
 * @description  see specific game
 * @access Everyone
 */
router.get("/:id", gameController.getSingleGame);

/**
 * @route GET api/game/search
 * @description  search name of game
 * @access Everyone
 */
router.post("/search", gameController.searchGame);

/**
 * @route POST api/game/search
 * @description  list game with deals
 * @access Everyone
 */
router.post("/deals", gameController.getDiscountGame);

module.exports = router;
