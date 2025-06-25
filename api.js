const express = require('express');
const api = express.Router();
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const clientRoute = require('./routes/client');
const { authenticateToken, authorizeUser } = require("./middleware/auth");

api.get('/', (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
});

api.get("/ping", (req, res) => {
    res.status(200).json({
        message: "ok from backend!"
    });
});

api.use('/admin', authenticateToken, authorizeUser(["admin"]), adminRoute);

api.use('/client', authenticateToken, clientRoute);

api.use('/user', userRoute);

module.exports = api;