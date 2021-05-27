const { sendResponse } = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.register = async (req, res, next) => {
  let { name, email, avatarUrl, password } = req.body;
  let avatarUrlNew = avatarUrl || "";
  let user = await User.findOne({ email });
  if (user)
    return sendResponse(res, 400, false, null, null, "Email is already exist!");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    name,
    email,
    password,
    avatarUrl: avatarUrlNew,
  });

  return sendResponse(res, 200, true, { user }, null, "Create user successful");
};

module.exports = userController;
