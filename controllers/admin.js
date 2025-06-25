const User = require('../models/user');
const { hashPassword } = require('../helper/auth');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

exports.getAUser = async (req, res) => {
    try {
        const userId = req?.params?.id;
        const user = await User.findOne({ _id: userId }, { isDeleted: false });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

exports.addUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
    try {
        const { userId, ...rest } = req?.body;

        Object.keys(rest).forEach(key => {
            if (rest[key] === undefined) delete rest[key];
        });

        const result = await User.updateOne({ _id: userId }, { $set: rest });
        if (result.modifiedCount === 0) return res.status(404).json({ message: "User not found or no changes applied" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req?.params?.id;
        const result = await User.updateOne({ _id: userId }, { isDeleted: true });
        if (result.modifiedCount === 0) return res.status(404).json({ message: "User not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

exports.restoreUser = async (req, res) => {
    try {
        const userId = req?.params?.id;
        const result = await User.updateOne({ _id: userId }, { isDeleted: false });
        if (result.modifiedCount === 0) return res.status(404).json({ message: "User not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Server error');
    }
}