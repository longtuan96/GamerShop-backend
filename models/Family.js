const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familySchema = Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    games: [{ type: Schema.Types.ObjectId, ref: "Game", default: null }],

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);
module.exports = Order;
