const mongoose = require('mongoose');
const MONGO_SERVER = process.env.MONGO_SERVER;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_SERVER);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

module.exports = connectDB;
