const bcrypt = require('bcrypt');

/**
 * Mã hóa mật khẩu trước khi lưu cơ sở dữ liệu
 * @param {string} plainPassword - mật khẩu cần mã hóa
 * @returns {string} - mật khẩu đã mã hóa
 */
const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
};

/**
 * So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
 * @param {string} plainPassword - Mật khẩu người dùng nhập vào
 * @param {string} hashedPassword - Mật khẩu đã lưu trong database
 * @returns {Promise<boolean>} - Trả về true nếu khớp, ngược lại false
 */
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error("Error comparing password:", error);
        return false;
    }
};

module.exports = { hashPassword, comparePassword }