const utilsHelper = require("../helpers/utils.helper");

const Game = require("../models/Game");

const gameController = {};

gameController.getAllGames = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalGames = await Game.countDocuments({ ...filter });

    const totalPages = Math.ceil(totalGames / limit);
    const offset = limit * (page - 1);

    const games = await Game.find({ ...filter })
      .skip(offset)
      .limit(limit);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { games, page, totalPages },
      null,
      "All Game listed"
    );
  } catch (error) {
    next(error);
  }
};

gameController.getGames = async (req, res, next) => {
  try {
    let { page, limit, sortBy, name, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalGames = await Game.countDocuments({
      ...filter,
      isDeleted: false,
    });

    const totalPages = Math.ceil(totalGames / limit);
    const offset = limit * (page - 1);

    // const games = await Game.find({
    //   name: { $regex: pattern },
    // });
    const games = await Game.find({}).skip(offset).limit(limit);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { games, page, totalPages },
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
    const game = await Game.findOne({ _id: gameId, isDeleted: false });

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
      icon,
      publisher,
      status,
      genre,
      languages,
      discount,
      additionalInfo,
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
      icon,
      publisher,
      status,
      genre,
      languages,
      discount,
      additionalInfo,
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
      picture,
      icon,
      publisher,
      status,
      genre,
      languages,
      discount,
      additionalInfo,
      price,
    } = req.body;
    console.log(req.body);
    const oldGame = await Game.findOne({ _id: gameId });

    await Game.updateOne(
      { _id: gameId },
      {
        name: name || oldGame.name,
        description: description || oldGame.description,
        release_date: release_date || oldGame.release_date,
        player_mode: player_mode || oldGame.player_mode,
        platform: platform || oldGame.platform,
        poster: poster || oldGame.poster,
        picture: picture || oldGame.picture,
        icon: icon || oldGame.icon,
        publisher: publisher || oldGame.publisher,
        status: status || oldGame.status,
        genre: genre || oldGame.genre,
        languages: languages || oldGame.languages,
        discount: discount || oldGame.discount,
        additionalInfo: additionalInfo || oldGame.additionalInfo,
        price: price || oldGame.price,
      }
    );
    utilsHelper.sendResponse(res, 200, true, null, null, "Game Added");
  } catch (error) {
    next(error);
  }
};

gameController.deleteGame = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    await Game.updateOne({ _id: gameId }, { isDeleted: true });

    utilsHelper.sendResponse(res, 200, true, null, null, "Game Deleted!!");
  } catch (error) {
    next(error);
  }
};

gameController.searchGame = async (req, res, next) => {
  try {
    let { page, limit, sortBy, name, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalGames = await Game.countDocuments({
      name: { $regex: pattern },
      ...filter,
      isDeleted: false,
    });

    const totalPages = Math.ceil(totalGames / limit);
    const offset = limit * (page - 1);

    let pattern = `${name}`;
    if (name === null || name === undefined || name === "") {
      pattern = "";
    }

    const games = await Game.find({
      name: { $regex: pattern },
    })
      .skip(offset)
      .limit(limit);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { games, page, totalPages },
      null,
      "All Game listed"
    );
  } catch (error) {
    next(error);
  }
};

gameController.getDiscountGame = async (req, res, next) => {
  try {
    let { page, limit, sortBy, name, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalGames = await Game.countDocuments({
      discount: { $ne: 0 },
      ...filter,
      isDeleted: false,
    });

    const totalPages = Math.ceil(totalGames / limit);
    const offset = limit * (page - 1);

    const games = await Game.find({
      discount: { $ne: 0 },
    })
      .skip(offset)
      .limit(limit);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { games, page, totalPages },
      null,
      "All Game listed"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = gameController;
