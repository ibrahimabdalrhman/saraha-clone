const User = require('../model/userModel');
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { uploadMultipleImages } = require("../middlewares/uploadImage.js");
const ApiError = require('../utils/ApiError');

exports.uploadUserImages = uploadMultipleImages([
  {
    name: "image",
    maxCount: 1,
  },

]);

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.files && req.files.image) {
    const imageName = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.files.image[0].buffer)
      .resize(200)
      .toFormat("jpeg")
      .toFile(`uploads/users/${imageName}`);
    req.body.image = imageName;
  }
    next();
});

const createToken = (paylod) =>
  jwt.sign({ userId: paylod }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
  
exports.signup = asyncHandler(async (req, res, next) => {

  const user = await User.create(req.body);
  const token = createToken(user._id);
  
  res.status(201).json({user:user,token})
});
  
exports.login = asyncHandler(async (req, res, next) => {

  const user = await User.findOne({ username: req.body.username })
  if (user.password === req.body.password) {
    const token = createToken(user._id);
    return res.status(200).json({ user: user, token })
  }
  return next(new ApiError('Invalid username or password', 400))
  
});

exports.users = asyncHandler(async (req, res, next) => {
  
  const users = await User.find();
  res.status(200).json({ length: users.length,users });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token"); // Clear the JWT token cookie
  res.status(200).json({ success: true }); // Send a success response
});


