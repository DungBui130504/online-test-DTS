const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/allusers', adminController.getAllUsers);

router.get('/auser/:id', adminController.getAUser);

router.post('/adduser', adminController.addUser);

router.put('/updateuser', adminController.updateUser);

router.delete('/deleteuser/:id', adminController.deleteUser);

router.put('/restoreuser/:id', adminController.restoreUser);

module.exports = router 