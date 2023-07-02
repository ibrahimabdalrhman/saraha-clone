const validationMiddleware = require("../middlewares/validationMiddleware");
const { check, body, } = require("express-validator");
const { param } = require("../routes/userRoute");

exports.messageValildator = [
  check("message").notEmpty().withMessage("message required"),

  validationMiddleware,
];
