const utilsHelper = require("../helpers/utils.helper");
const Game = require("../models/Game");
const Order = require("../models/Order");
const User = require("../models/User");

const orderController = {};

orderController.createNewOrder = async (req, res, next) => {
  try {
    const { games } = req.body;
    let userId = req.userId;
    const order = await Order.create({ user: userId, games });

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "New Order created!!"
    );
  } catch (error) {
    next(error);
  }
};

orderController.getCurrentOrder = async (req, res, next) => {
  try {
    let userId = req.userId;
    const order = await Order.findOne({
      user: userId,
      status: "pending",
    }).populate("games");
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "get current User Order success"
    );
  } catch (error) {
    next(error);
  }
};

orderController.getCurrentUserAllOrder = async (req, res, next) => {
  try {
    let userId = req.userId;
    const orders = await Order.find({
      user: userId,
    }).populate("games");
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { orders },
      null,
      "get current User all Orders success"
    );
  } catch (error) {
    next(error);
  }
};

orderController.addItemToOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const currentUser = await User.findById(userId);
    const orderId = currentUser.cart;
    const gameId = req.body.game;
    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $push: { games: gameId } },
      { new: true }
    );

    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, { order }, null, "game added!!");
  } catch (error) {
    next(error);
  }
};

orderController.DeleteItemFromOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const currentUser = await User.findById(userId);
    const orderId = currentUser.cart;
    const itemId = req.params.id;

    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $pull: { games: itemId } },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, { order }, null, "game removed!!");
  } catch (error) {
    next(error);
  }
};

//delete order
orderController.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, nul, null, "order deleted!!");
  } catch (error) {
    next(error);
  }
};

orderController.payment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const currentUser = await User.findById(userId);
    const orderId = currentUser.cart;
    const total = req.params.total;
    if (total < currentUser.balance) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: "paid", total: total },
        { new: true }
      );
      const newOrder = await Order.create({ user: userId });
      //update current user balance and ownedGame
      await User.findByIdAndUpdate(
        userId,
        {
          balance: currentUser.balance - total,
          cart: newOrder._id,
          ownedGames: currentUser.ownedGames.concat(order.games),
        },
        { new: true }
      );
      if (!order) {
        return next(new Error("order not found or User not authorized"));
      }
      utilsHelper.sendResponse(res, 200, true, null, null, "order paid!!");
    } else if (total > currentUser.balance) {
      utilsHelper.sendResponse(
        res,
        400,
        false,
        null,
        null,
        "User balance is not enough!!"
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = orderController;
