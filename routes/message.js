const express = require('express');
const router = express.Router();

const { auth } = require('../controllers/userController');
const messageController = require('../controllers/message');
const { messageValildator } = require('../validation/messagesValidator');

router.post('/:username', messageValildator, messageController.createMessage);
router.get('/', auth, messageController.getMessages);


module.exports=router