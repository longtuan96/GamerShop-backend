const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcryptjs");
const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    avatarUrl: { type: String, require: false, default: "" },
    language: { type: String, default: "English" },
    gender: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    cart: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Order" },

    ownedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  // delete obj.emailVerified;
  // delete obj.emailVerificationCode;
  delete obj.isDeleted;
  return obj;
};
userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return accessToken;
};

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this();
  this.findOne({ email: profile.email }, async function (error, result) {
    if (!result) {
      // Create new user
      // 1. Make new password
      let newPassword =
        profile.password || "" + Math.floor(Math.random() * 100000000);
      // let newPassword = "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);
      console.log(profile);
      // 2. Save user
      userObj.name = profile.name;
      userObj.email = profile.email;
      userObj.password = newPassword;
      userObj.googleId = profile.googleId;
      userObj.facebookId = profile.facebookId;
      userObj.avatarUrl = profile.avatarUrl;

      // 3. Call the cb
      userObj.save(cb);
    } else {
      // Send that user information back to passport
      cb(error, result);
    }
  });
};

userSchema.plugin(require("./plugins/isDeletedFalse"));

const User = mongoose.model("User", userSchema);
module.exports = User;
