const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');

router.get('/getyourinfor', clientController.getClientInfor);

router.put('/updateyourinfor', clientController.updateClientInfor);

router.delete('/deleteyouraccount', clientController.deleteClientAccount);

module.exports = router 