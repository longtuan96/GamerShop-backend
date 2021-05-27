const Order = require("../models/Order");

const orderController = {};

orderController.getCurrentOrder = async (req, res, next) => {
  try {
    let { ...query } = req.query;
    let userId = req.params.id;
    const order = await Order.findOne({ ...query, userId: userId })
      .populate("userId")
      .populate("products");
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

orderController.addItemToOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const itemId = req.body.product;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { $push: { products: itemId } },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, { order }, null, "product added");
  } catch (error) {
    next(error);
  }
};
orderController.DeleteItemFromOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const itemId = req.body.product;
    console.log("orderId", orderId, " itemId ", itemId);
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $pull: { products: itemId } },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "product deleted"
    );
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

module.exports = orderController;
