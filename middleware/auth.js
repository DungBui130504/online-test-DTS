const { verifyAccessToken } = require('../util/genJWT');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorization' });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is not accepted' });
    }
}

function authorizeUser(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeUser };