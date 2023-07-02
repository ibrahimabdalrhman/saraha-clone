const express = require('express');
const router = express.Router();

const { auth } = require('../controllers/userController');
const messageController = require('../controllers/message');

router.post('/:username',  messageController.createMessage);
router.get('/', auth, messageController.getMessages);


module.exports=router