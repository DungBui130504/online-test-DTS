const { hashPassword, comparePassword } = require('../helper/auth');
const User = require('../models/user');
const jwt = require('../util/genJWT');

exports.register = async (req, res) => {
    try {
        const { name, username, password, email, phone, avatar, role } = req.body;

        // validate information
        if (!name || !username || !password) {
            return res.status(400).json({ message: 'Missing required fields (name, username, password)' });
        }

        if (phone && !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone invalid (must be 10 digits)" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: "Email invalid" });
        }

        // Uniqueness check for name & username
        const existedUser = await User.findOne({
            $or: [{ name }, { username }]
        });

        if (existedUser) {
            return res.status(409).json({
                message: "Name or username has already been used"
            });
        }

        const hashedPass = await hashPassword(password);

        const newUser = new User({
            name,
            username,
            password: hashedPass,
            email,
            phone,
            avatar,
            role: role || "client"
        });

        const result = await newUser.save();
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
}

exports.login = async (req, res) => {
    try {
        const username = req?.body?.username;
        const password = req?.body?.password;

        if (!username || !password) {
            return res.status(400).json({
                message: "missing data"
            });
        }

        const user = await User.findOne({ username: username });

        if (!user || user.isDeleted) return res.status(404).json('user not found or deleted');

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const payload = { userId: user._id.toString(), name: user.name, role: user.role };

        const accessToken = jwt.generateAccessToken(payload);
        const refreshToken = jwt.generateRefreshToken(payload);

        let isAdmin = user.role === 'admin' ? true : false;

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.status(200).json({
            message: 'Login success',
            id: user._id,
            isAdmin,
            name: user.name,
            avatar: user.avatar,
            accessToken: accessToken
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        return res.status(200).json({
            message: "logout success"
        });
    } catch (error) {
        res.status(500).json('Server error');
    }
}

exports.renewToken = async (req, res) => {
    try {
        const refreshToken = req?.cookies?.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");

        const decoded = jwt.verifyRefreshToken(refreshToken);

        const { userId, name, role } = decoded;

        const newAccessToken = jwt.generateAccessToken({
            userId,
            name,
            role
        });

        res.status(200).json({
            message: "renew access token successed",
            accessToken: newAccessToken
        });
    } catch (error) {
        res.status(500).json('Server error');
    }
}