const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },

    games: [{ type: Schema.Types.ObjectId, ref: "Game", default: null }],

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    total: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
