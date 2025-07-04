const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.post('/renewtoken', userController.renewToken);

module.exports = router