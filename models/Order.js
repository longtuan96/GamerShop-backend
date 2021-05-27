const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: { type: Schema.Types.ObjectId, required: true, ref: "Blog" },
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
