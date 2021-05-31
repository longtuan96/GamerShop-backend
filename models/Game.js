const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const gameSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    release_date: { type: Date },
    player_mode: {
      type: String,
      required: true,
      enum: ["Multiplayer", "Single Player"],
    },
    platform: [
      {
        type: String,
        enum: ["PS4", "Xbox", "PS5", "PC"],
        required: true,
      },
    ],
    poster: { type: String, required: true },
    picture: { type: String, required: true },
    icon: { type: String, required: true },
    publisher: { type: String, required: true },
    status: {
      type: "String",
      enum: ["Released", "Early Access", "Pre-Order"],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      enum: [0, 25, 30, 50, 40, 75],
    },
    genre: [{ type: String }],
    languages: [{ type: String, default: "English" }],
    price: { type: Number, default: 0 },
    additionalInfo: {
      type: String,
      default:
        "To play this game, your system may need to be updated to the latest system software. Although this game is playable on PS5, some features available on PS4 may be absent. See Games publisher website for more details. Online features require an account and are subject to terms of service and applicable privacy policy (siris-gamershop.com/terms-of-service & siris-gamershop.com/privacy-policy). Software subject to license (siris-gamershop.com/softwarelicense). You can download and play this content on the main system associated with your account and on any other system when you login with your same account.",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

gameSchema.plugin(require("./plugins/isDeletedFalse"));
gameSchema.plugin(mongoose_fuzzy_searching, { fields: ["name"] });
const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
