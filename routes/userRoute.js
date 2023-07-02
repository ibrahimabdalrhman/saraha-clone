const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userValidator = require('../validation/usersValidator');

router.post(
  "/signup",
  userController.uploadUserImages,
  userController.resizeImage,
  userValidator.signupValildator,
  userController.signup
);

router.post(
  "/login",
  userValidator.loginValildator,
  userController.login
);

router.get('/users', userController.users);

router.get("/logout", userController.logout);

module.exports=router