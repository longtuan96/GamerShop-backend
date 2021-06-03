const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authController = {};

authController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return next(new Error("401 - Email not exists"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401 - Wrong password"));

    const accessToken = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login success"
    );
  } catch (error) {
    next(error);
  }
};
authController.loginWithFacebookOrGoogle = async (req, res, next) => {
  try {
    let user = req.user;
    if (user) {
      user = await User.findOneAndUpdate(
        { _id: user._id },
        { avatarUrl: user.avatarUrl }, // I want to get recent avatar from avatar picture from facebook
        { new: true }
      );

      const accessToken = await user.generateToken();

      res.status(200).json({
        success: true,
        data: { user, accessToken },
        message: "Login successful",
      });
    } else {
      throw new Error("Login fail");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = authController;
