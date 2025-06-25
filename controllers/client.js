const User = require('../models/user');

exports.getClientInfor = async (req, res) => {
    try {
        const { userId } = req?.user;
        const users = await User.find({ _id: userId });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

exports.updateClientInfor = async (req, res) => {
    try {
        const { userId } = req.user;

        const cleanData = Object.fromEntries(
            Object.entries(req.body).filter(([_, value]) => value !== undefined)
        );

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
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteClientAccount = async (req, res) => {
    try {
        const { userId } = req?.user;
        const result = await User.updateOne({ _id: userId }, { isDeleted: true });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Account is not exist or had been deleted" });
        }
        res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json('Server error');
    }
}