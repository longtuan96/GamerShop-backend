const express = require("express");
const orderController = require("../controllers/order.controller");
const { loginRequired } = require("../middlewares/authentication");

const router = express.Router();

/**
 * @route GET api/order
 * @description User can get their current order
 * @access user priviledge
 */
router.get("/", loginRequired, orderController.getCurrentOrder);

/**
 * @route GET api/order/all
 * @description User can get all their orders
 * @access user priviledge
 */
router.get("/all", loginRequired, orderController.getCurrentUserAllOrder);

/**
 * @Route POST api/order
 * @description User can create new order
 * @access login required
 */
router.post("/", loginRequired, orderController.createNewOrder);

/**
 * @Route PUT api/order/add
 * @description User can add new item to current order
 * @access login required
 */
router.put("/add", loginRequired, orderController.addItemToOrder);

/**
 * @Route DELETE api/order/remove
 * @description User can remove item from current order
 * @access login required
 */
router.delete(
  "/remove/:id",
  loginRequired,
  orderController.DeleteItemFromOrder
);

/**
 * @Route PUT api/order/payment/:total
 * @description User can pay for current order
 * @access login required
 */
router.put("/payment/:total", loginRequired, orderController.payment);
module.exports = router;
