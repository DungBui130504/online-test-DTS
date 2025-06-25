const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    phone: String,
    avatar: String,
    status: { type: Number, default: 1 }, // 1: active, 0: inactive
    isDeleted: { type: Boolean, default: false }, // used for soft delete
    role: { type: String, default: "client" }
}, { collection: 'Users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
