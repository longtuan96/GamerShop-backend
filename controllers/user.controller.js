const { sendResponse } = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const utilsHelper = require("../helpers/utils.helper");
const Order = require("../models/Order");
const userController = {};

userController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { users },
      null,
      "all users listed!!"
    );
  } catch (error) {
    next(error);
  }
};

userController.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate("favorite")
      .populate("ownedGames")
      .populate("cart");

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "current user listed!!"
    );
  } catch (error) {
    next(error);
  }
};

userController.register = async (req, res, next) => {
  let { name, email, avatarUrl, password } = req.body;
  let avatarUrlNew = avatarUrl || "";
  let user = await User.findOne({ email });
  if (user)
    return sendResponse(res, 400, false, null, null, "Email is already exist!");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const newOrder = await Order.create({});
  user = await User.create({
    name,
    email,
    password,
    avatarUrl: avatarUrlNew,
    cart: newOrder._id,
  });
  const updateOrder = await Order.findByIdAndUpdate(
    newOrder._id,
    { user: user._id },
    { new: true }
  );
  return sendResponse(
    res,
    200,
    true,
    { user, updateOrder },
    null,
    "Create user successful"
  );
};

userController.updateCurrentUser = async (req, res, next) => {
  try {
    const { name, avatarUrl, language, gender, balance } = req.body;
    const userId = req.userId;
    const oldUser = await User.findById(userId);

    const newUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: name || oldUser.name,
        avatarUrl: avatarUrl || oldUser.avatarUrl,
        language: language || oldUser.language,
        gender: gender || oldUser.gender,
        balance: balance || oldUser.balance,
      },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { newUser },
      null,
      "User updated!!"
    );
  } catch (error) {
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    const { name, avatarUrl, language, gender, balance } = req.body;
    const userId = req.params.id;
    const oldUser = await User.findById(userId);

    const newUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: name || oldUser.name,
        avatarUrl: avatarUrl || oldUser.avatarUrl,
        language: language || oldUser.language,
        gender: gender || oldUser.gender,
        balance: balance || oldUser.balance,
      }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { newUser },
      null,
      "User updated!!"
    );
  } catch (error) {
    next(error);
  }
};

userController.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const newUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        isDeleted: true,
      }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { newUser },
      null,
      "User updated!!"
    );
  } catch (error) {
    next(error);
  }
};

userController.topUpBalance = async (req, res, next) => {
  try {
    const { topUp } = req.body;
    const userId = req.userId;
    const oldUser = await User.findById(userId);

    const newUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        balance: parseInt(oldUser.balance) + parseInt(topUp),
      },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { newUser },
      null,
      `Balance increased ${topUp}$!!`
    );
  } catch (error) {
    next(error);
  }
};

userController.addToFavorite = async (req, res, next) => {
  try {
    const { game } = req.body;
    const userId = req.userId;
    const oldUser = await User.findOne({ _id: userId });

    const newUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        favorite: oldUser.favorite.concat(game),
      },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { newUser },
      null,
      `Game added to Favorite!!`
    );
  } catch (error) {
    next(error);
  }
};

userController.removeFromFavorite = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const userId = req.userId;
    const oldUser = await User.findOne({ _id: userId });

    const removeGame = (arr, target) => {
      let targetIndex = arr.indexOf(target);
      if (targetIndex > -1) {
        arr.splice(targetIndex, 1);
      }
      return arr;
    };

    const newUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        favorite: removeGame(oldUser.favorite, gameId),
      },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { newUser },
      null,
      `Game removed from Favorite!!`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
