const Message = require("../model/message");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.createMessage = asyncHandler(async (req, res, next) => {
  
  const message = await Message.create({
    user: req.params.username,
    message: req.body.message
  });

  res.status(201).json({
    status: true,
    message: `message send to ${req.params.username} successfully`
  });
  
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  
  const messages= await Message.find({
    user: req.user.username
  });

  res.status(200).json({
    status: true,
    data: messages,
  });

});
