const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

module.exports = connectDB;
