const utilsHelper = require("../helpers/utils.helper");
const Game = require("../models/Game");

const gameController = {};

gameController.getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find({});

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { games },
      null,
      "All Game listed"
    );
  } catch (error) {
    next(error);
  }
};

gameController.getSingleGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findOne({ _id: gameId });

    utilsHelper.sendResponse(res, 200, true, { game }, null, "Game Found!!!");
  } catch (error) {
    next(error);
  }
};

gameController.addGame = async (req, res, next) => {
  try {
    const {
      name,
      description,
      release_date,
      player_mode,
      platform,
      poster,
      picture,
      publisher,
      status,
      genre,
      languages,
      price,
    } = req.body;

    const game = await Game.create({
      name,
      description,
      release_date,
      player_mode,
      platform,
      poster,
      picture,
      publisher,
      status,
      genre,
      languages,
      price,
    });
    utilsHelper.sendResponse(res, 200, true, { game }, null, "Game Added");
  } catch (error) {
    next(error);
  }
};

gameController.updateGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const {
      name,
      description,
      release_date,
      player_mode,
      platform,
      poster,
      publisher,
      status,
      genre,
      languages,
    } = req.body;
    const oldGame = await Game.findById(gameId);

    const newGame = await Game.findByIdAndUpdate(gameId, {
      name: name || oldGame.name,
      description: description || oldGame.description,
      release_date: release_date || oldGame.release_date,
      player_mode: player_mode || oldGame.player_mode,
      platform: platform || oldGame.platform,
      poster: poster || oldGame.poster,
      publisher: publisher || oldGame.publisher,
      status: status || oldGame.status,
      genre: genre || oldGame.genre,
      languages: languages || oldGame.languages,
    });
    utilsHelper.sendResponse(res, 200, true, { newGame }, null, "Game Added");
  } catch (error) {
    next(error);
  }
};

module.exports = gameController;
