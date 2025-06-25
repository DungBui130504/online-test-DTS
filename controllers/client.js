const User = require('../models/user');

exports.getClientInfor = async (req, res) => {
    try {
        const { userId } = req?.user;

        if (!userId) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Missing userId in request body',
                code: 400,
            });
        }

        const users = await User.find({ _id: userId });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'Something went wrong',
            code: 500
        });
    }
}

exports.updateClientInfor = async (req, res) => {
    try {
        const { userId } = req.user;

        // Lọc các trường hợp không gửi (undefined)
        const cleanData = Object.fromEntries(
            Object.entries(req.body).filter(([_, value]) => value !== undefined)
        );

        const { name, username, password, phone, email } = cleanData;

        // Valid information
        const hasSensitiveUpdate = name !== undefined && username !== undefined && password !== undefined;
        if (hasSensitiveUpdate && (!name || !username || !password)) {
            return res.status(400).json({
                message: 'Missing required fields (name, username, password)'
            });
        }

        if (phone && !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone invalid (must be 10 digits)" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: "Email invalid" });
        }

        const result = await User.updateOne(
            { _id: userId, isDeleted: false },
            { $set: cleanData }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({
                message: "Account not found or no changes applied"
            });
        }

        res.status(200).json({
            message: "User info updated successfully",
            result
        });

    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'Something went wrong',
            code: 500
        });
    }
};


exports.deleteClientAccount = async (req, res) => {
    try {
        const { userId } = req?.user;

        if (!userId) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Missing userId in request body',
                code: 400,
            });
        }

        const result = await User.updateOne(
            { _id: userId, isDeleted: false },
            { $set: { isDeleted: true } }
        );
        
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "User is not exist or had been deleted" });
        }
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'Something went wrong',
            code: 500
        });
    }
}